#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

is_wsl() {
  if [[ -n "${WSL_DISTRO_NAME:-}" ]]; then
    return 0
  fi
  if [[ -r /proc/version ]] && grep -qi microsoft /proc/version 2>/dev/null; then
    return 0
  fi
  return 1
}

detect_stack() {
  if [[ -n "${COMPOSE_STACK:-}" ]]; then
    case "${COMPOSE_STACK}" in
      linux|desktop) printf '%s' "${COMPOSE_STACK}" ;;
      *)
        echo "COMPOSE_STACK inválido: use linux ou desktop (recebido: ${COMPOSE_STACK})" >&2
        exit 1
        ;;
    esac
    return
  fi

  case "$(uname -s)" in
    Linux*)
      if is_wsl; then
        printf desktop
      else
        printf linux
      fi
      ;;
    Darwin*) printf desktop ;;
    MINGW*|MSYS*|CYGWIN*) printf desktop ;;
    *) printf desktop ;;
  esac
}

STACK="$(detect_stack)"
case "${STACK}" in
  linux)
    FILES=(-f docker-compose.yml -f docker-compose.linux.yml)
    ;;
  desktop)
    FILES=(-f docker-compose.yml -f docker-compose.desktop.yml)
    ;;
  *)
    echo "Stack desconhecido: ${STACK}" >&2
    exit 1
    ;;
esac

exec docker compose "${FILES[@]}" "$@"
