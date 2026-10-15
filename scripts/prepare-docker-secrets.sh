#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
secret_dir="$project_dir/.docker-secrets"
umask 077
mkdir -p "$secret_dir"
chmod 700 "$secret_dir"

read_value() {
  source_file=$1
  key=$2
  destination=$3

  if [ ! -f "$source_file" ]; then
    echo "Missing $source_file" >&2
    exit 1
  fi

  value=$(awk -v key="$key" '
    $0 !~ /^[[:space:]]*#/ && index($0, key "=") == 1 {
      sub(/^[^=]*=/, "", $0)
      print $0
      found = 1
      exit
    }
    END { if (!found) exit 1 }
  ' "$source_file") || {
    echo "Missing $key in $source_file" >&2
    exit 1
  }

  case "$value" in
    \"*\") value=${value#\"}; value=${value%\"} ;;
    \'*\') value=${value#\'}; value=${value%\'} ;;
  esac

  if [ -z "$value" ]; then
    echo "Empty $key in $source_file" >&2
    exit 1
  fi

  printf '%s' "$value" > "$secret_dir/$destination"
  chmod 600 "$secret_dir/$destination"
}

backend_env="$project_dir/backend/.env"
python_env="$project_dir/backend-python/.env"

read_value "$backend_env" MYSQL_ROOT_PASSWORD mysql_root_password
read_value "$backend_env" DATABASE_URL database_url
read_value "$backend_env" GOOGLE_CLIENT_ID google_client_id
read_value "$backend_env" JWT_SECRET jwt_secret

read_value "$backend_env" DB_HOST db_host
read_value "$backend_env" DB_PORT db_port
read_value "$backend_env" DB_USER db_user
read_value "$backend_env" DB_PASSWORD db_password
read_value "$backend_env" DB_NAME db_name

read_value "$python_env" GEMINI_API_KEY gemini_api_key
read_value "$python_env" GROQ_API_KEY groq_api_key
read_value "$python_env" groq_backup_key groq_backup_key

echo "Docker secret files prepared in .docker-secrets/"
