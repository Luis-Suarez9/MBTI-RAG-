import os
from pathlib import Path

from dotenv import dotenv_values


SECRET_DIR = Path("/run/secrets")


def _load_secret_env_file(secret_name: str) -> None:
    secret_path = SECRET_DIR / secret_name
    if not secret_path.exists():
        return

    for name, value in dotenv_values(secret_path).items():
        if name and value is not None:
            # Docker secrets are authoritative when running in a container.
            os.environ[name] = value


def load_secrets() -> None:
    """Load Compose secret env files while preserving local-dev fallbacks."""
    _load_secret_env_file("app_env")
    _load_secret_env_file("backend_python_env")
