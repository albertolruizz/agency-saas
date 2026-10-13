#!/usr/bin/env bash
# Abre un túnel SSH a la base de datos Postgres del SaaS en la VPS de iUROP.
# Deja la base accesible en localhost:${AGENCY_DB_LOCAL_PORT:-5434} mientras el script esté abierto.
set -euo pipefail

credentials_file="${IUROP_VPS_ENV_FILE:-$HOME/Projects/IUROP/IUROP DEVELOPMENT/.env.vps.local}"
local_port="${AGENCY_DB_LOCAL_PORT:-5434}"

if [[ ! -r "$credentials_file" ]]; then
  printf 'No se puede leer %s. Define IUROP_VPS_ENV_FILE.\n' "$credentials_file" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$credentials_file"
set +a

: "${IUROP_VPS_HOST:?Falta IUROP_VPS_HOST}"
: "${IUROP_VPS_PORT:?Falta IUROP_VPS_PORT}"
: "${IUROP_VPS_USER:?Falta IUROP_VPS_USER}"

ssh_cmd=(ssh)
if [[ -n "${IUROP_VPS_PASSWORD:-}" ]]; then
  command -v sshpass >/dev/null || { printf 'Falta sshpass en este equipo.\n' >&2; exit 1; }
  export SSHPASS="$IUROP_VPS_PASSWORD"
  ssh_cmd=(sshpass -e ssh)
fi
unset IUROP_VPS_PASSWORD

printf 'Túnel abierto: localhost:%s -> VPS 127.0.0.1:5434 (Ctrl+C para cerrar)\n' "$local_port"
exec "${ssh_cmd[@]}" -N \
  -o ExitOnForwardFailure=yes \
  -o ServerAliveInterval=30 \
  -o StrictHostKeyChecking=accept-new \
  -p "$IUROP_VPS_PORT" \
  -L "127.0.0.1:$local_port:127.0.0.1:5434" \
  "$IUROP_VPS_USER@$IUROP_VPS_HOST"
