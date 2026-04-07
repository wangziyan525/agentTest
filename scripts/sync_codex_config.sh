#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
CODEX_HOME="${CODEX_HOME:-${HOME}/.codex}"

DRY_RUN=0
MIRROR=0

usage() {
  cat <<EOF
Usage: $(basename "$0") [options]

Sync local agent and skill assets from this repo into the Codex system directory.

Options:
  --dry-run             Preview changes without writing files
  --mirror              Mirror the source directories into Codex with --delete
  --codex-home PATH     Override the Codex home directory (default: \$CODEX_HOME or ~/.codex)
  -h, --help            Show this help message

Source lookup:
  agents: <repo>/agent, then <repo>/agents
  skills: <repo>/skills

Target directories:
  <codex-home>/agents
  <codex-home>/skills
EOF
}

log() {
  printf '[sync-codex] %s\n' "$*"
}

warn() {
  printf '[sync-codex] %s\n' "$*" >&2
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    warn "missing required command: $1"
    exit 1
  fi
}

resolve_source_dir() {
  local rel
  for rel in "$@"; do
    if [ -d "${REPO_ROOT}/${rel}" ]; then
      printf '%s\n' "${REPO_ROOT}/${rel}"
      return 0
    fi
  done

  return 1
}

sync_dir() {
  local label="$1"
  local src="$2"
  local dest="$3"
  local -a rsync_cmd

  mkdir -p "$dest"

  rsync_cmd=(
    rsync
    -a
    --itemize-changes
    --exclude
    .DS_Store
    --exclude
    .gitkeep
  )

  if [ "$DRY_RUN" -eq 1 ]; then
    rsync_cmd+=(--dry-run)
  fi

  if [ "$MIRROR" -eq 1 ]; then
    rsync_cmd+=(--delete)
  fi

  rsync_cmd+=("${src%/}/" "${dest%/}/")

  log "sync ${label}: ${src} -> ${dest}"
  "${rsync_cmd[@]}"
}

main() {
  local agent_source=""
  local skill_source=""
  local synced=0

  while [ "$#" -gt 0 ]; do
    case "$1" in
      --dry-run)
        DRY_RUN=1
        ;;
      --mirror)
        MIRROR=1
        ;;
      --codex-home)
        if [ "$#" -lt 2 ]; then
          warn "--codex-home requires a path"
          exit 1
        fi
        CODEX_HOME="$2"
        shift
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      *)
        warn "unknown option: $1"
        usage
        exit 1
        ;;
    esac
    shift
  done

  require_command rsync

  if agent_source="$(resolve_source_dir agent agents)"; then
    sync_dir "agents" "$agent_source" "${CODEX_HOME}/agents"
    synced=1
  else
    warn "skip agents: no local agent directory found under ${REPO_ROOT}"
  fi

  if skill_source="$(resolve_source_dir skills)"; then
    sync_dir "skills" "$skill_source" "${CODEX_HOME}/skills"
    synced=1
  else
    warn "skip skills: no local skills directory found under ${REPO_ROOT}"
  fi

  if [ "$synced" -eq 0 ]; then
    warn "nothing to sync"
    exit 1
  fi

  if [ "$DRY_RUN" -eq 1 ]; then
    log "dry run finished"
  else
    if [ "$MIRROR" -eq 1 ]; then
      log "sync finished with mirror mode enabled"
    else
      log "sync finished"
    fi
  fi
}

main "$@"
