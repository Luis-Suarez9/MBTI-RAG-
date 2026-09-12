"""Retrieve useful MBTI reference chunks for the language-model prompt.

This module deliberately does not create embeddings or rebuild the index. The
notebook/build step creates the store; this module loads and searches it.
"""

from __future__ import annotations

import logging
import re
from functools import lru_cache
from pathlib import Path

from langchain_core.embeddings import Embeddings
from langchain_community.vectorstores import FAISS


LOGGER = logging.getLogger(__name__)
PROJECT_ROOT = Path(__file__).resolve().parents[2]
STORE_DIR = PROJECT_ROOT / "data" / "embeddings"
INDEX_NAME = "mbti_faiss"
EMBEDDING_MODEL = "models/gemini-embedding-001"


@lru_cache(maxsize=1)
def _load_vector_store() -> FAISS:
    """Load the persisted FAISS index once per API process."""
    index_file = STORE_DIR / f"{INDEX_NAME}.faiss"
    metadata_file = STORE_DIR / f"{INDEX_NAME}.pkl"
    if not index_file.exists() or not metadata_file.exists():
        raise FileNotFoundError(
            f"Vector store not found in {STORE_DIR}. Run the notebook first."
        )

    # Structured retrieval selects saved Documents by metadata, so it does not
    # create a new query embedding or call Gemini at API request time.
    class LocalOnlyEmbeddings(Embeddings):
        def embed_documents(self, texts: list[str]) -> list[list[float]]:
            raise RuntimeError("Structured retrieval does not create embeddings.")

        def embed_query(self, text: str) -> list[float]:
            raise RuntimeError("Structured retrieval does not create embeddings.")

    # load_local restores the FAISS index and its original Documents/metadata.
    # The pickle metadata file is trusted because it was created by this project.
    return FAISS.load_local(
        str(STORE_DIR),
        LocalOnlyEmbeddings(),
        index_name=INDEX_NAME,
        allow_dangerous_deserialization=True,
    )


class MBTIRetriever:
    """Turn a user's MBTI result into grounded reference context."""

    @staticmethod
    def _type_code(mbti: list[dict] | str) -> str:
        """Extract the four-letter type from the API's MBTI payload."""
        # The frontend currently sends a list of dictionaries, so extracting the
        # code makes this work whether the value is INFJ or [{'type': 'INFJ'}].
        matches = re.findall(r"\b[IE][NS][TF][JP]\b", str(mbti).upper())
        if not matches:
            raise ValueError(f"Could not find an MBTI type in {mbti!r}")
        return matches[0]

    @staticmethod
    def _documents(store: FAISS):
        """Read the original Documents that FAISS saved beside its vectors."""
        # FAISS stores IDs in its index and maps those IDs to Documents in its
        # docstore. Reading that mapping lets us select by metadata deterministically.
        return [
            store.docstore.search(doc_id)
            for doc_id in store.index_to_docstore_id.values()
        ]

    def retrieve(self, mbti: list[dict] | str, answers: list[dict] | None = None):
        """Return ordered context: axes, profile, best match, then worst match."""
        type_code = self._type_code(mbti)
        store = _load_vector_store()
        documents = self._documents(store)

        # Always put the four foundational MBTI axes first and in a stable order.
        axis_order = {
            "Extraversion (E) vs. Introversion (I)": 0,
            "Sensing (S) vs. Intuition (N)": 1,
            "Thinking (T) vs. Feeling (F)": 2,
            "Judging (J) vs. Perceiving (P)": 3,
        }
        axes = sorted(
            [doc for doc in documents if doc.metadata.get("chunk_type") == "letter_axis_context"],
            key=lambda doc: axis_order.get(doc.metadata.get("axis", ""), 99),
        )

        # Then select only the profile and the two compatibility explanations
        # belonging to this user's exact MBTI type.
        profile = [
            doc for doc in documents
            if doc.metadata.get("chunk_type") == "mbti_type_profile"
            and doc.metadata.get("mbti_type") == type_code
        ]
        best = [
            doc for doc in documents
            if doc.metadata.get("chunk_type") == "match_reason"
            and doc.metadata.get("mbti_type") == type_code
            and doc.metadata.get("match_kind") == "best"
        ]
        worst = [
            doc for doc in documents
            if doc.metadata.get("chunk_type") == "match_reason"
            and doc.metadata.get("mbti_type") == type_code
            and doc.metadata.get("match_kind") == "worst"
        ]

        structured = axes + profile[:1] + best[:1] + worst[:1]
        if structured:
            return structured

        # Do not fall back to random/global similarity ranking: missing metadata
        # means this index must be rebuilt with the notebook's chunk metadata.
        return structured

    def context(self, mbti: list[dict] | str, answers: list[dict] | None = None) -> str:
        """Return retrieved Documents formatted for insertion into a prompt."""
        try:
            documents = self.retrieve(mbti, answers)
            return "\n\n".join(
                f"[{doc.metadata.get('chunk_type', 'reference')}] {doc.page_content}"
                for doc in documents
            )
        except Exception as exc:
            # Retrieval improves grounding, but a temporary embedding outage
            # should not take down the existing Groq endpoint.
            LOGGER.warning("MBTI retrieval unavailable: %s", exc)
            return ""


retriever = MBTIRetriever()
