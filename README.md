# MBTI-RAG-

## Docker secrets

The existing ignored env files remain the editable source values. Before
starting Docker Compose, split the sensitive values into individual local
secret files:

```bash
./scripts/prepare-docker-secrets.sh
docker compose up --build
```

The script creates `.docker-secrets/`, which is ignored by Git and protected
with local file permissions. Compose mounts only the individual secrets needed
by each service under `/run/secrets`; the env files are not copied into images
or injected through container environment variables.
