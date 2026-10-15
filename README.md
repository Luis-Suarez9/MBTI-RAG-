# MBTI-RAG-

## Docker secrets

The ignored per-service env files remain the editable source values. No root
`.env` is required. Store these variables in each service's file:

- `backend/.env`: `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `DATABASE_URL`,
  `GOOGLE_CLIENT_ID`, `JWT_SECRET`, `DB_HOST`, `DB_PORT`, `DB_USER`,
  `DB_PASSWORD`, `DB_NAME`, and optionally `FRONTEND_URL`.
- `backend-python/.env`: `GEMINI_API_KEY`, `GROQ_API_KEY`, `groq_backup_key`.
- `frontend/.env`: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.

Use `db` as `DB_HOST`, `3306` as `DB_PORT`, and keep the database name and
credentials consistent across the database variables and `DATABASE_URL`.
With `DB_USER=root`, `DB_PASSWORD` must match `MYSQL_ROOT_PASSWORD`.

Before
starting Docker Compose, split the sensitive values into individual local
secret files:

```bash
./scripts/prepare-docker-secrets.sh
docker compose --env-file frontend/.env --env-file backend/.env up --build
```

The script creates `.docker-secrets/`, which is ignored by Git and protected
with local file permissions. Compose mounts only the individual secrets needed
by each service under `/run/secrets`; the env files are not copied into images
or injected through container environment variables.
