import os
from pathlib import Path

SECRET_DIR = Path("/run/secrets")


def _load_secret(secret_name: str, environment_name: str) -> None:
    secret_path = SECRET_DIR / secret_name
    if not secret_path.exists():
        return

    # Docker secrets are authoritative when running in a container.
    os.environ[environment_name] = secret_path.read_text(encoding="utf-8").rstrip("\n")


def load_secrets() -> None:
    """Load only the Python service's individual Docker secrets."""
    _load_secret("gemini_api_key", "GEMINI_API_KEY")
    _load_secret("groq_api_key", "GROQ_API_KEY")
    _load_secret("groq_backup_key", "groq_backup_key")
