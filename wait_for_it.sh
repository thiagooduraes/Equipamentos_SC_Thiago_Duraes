#!/bin/bash
# wait_for_it.sh

TIMEOUT=15
QUIET=0
HOST=""
PORT=""
CHILD_COMMAND=""

usage() {
  cat << USAGE >&2
Usage:
    ${0} host:port [-t timeout] [-- command]
    -t TIMEOUT | --timeout=TIMEOUT      Timeout in seconds, zero for no timeout
    -- COMMAND | ARGS                   Execute command with args after the host is available
USAGE
  exit 1
}

wait_for() {
  local host="$1"
  local port="$2"
  local timeout="$3"
  local start_time=$(date +%s)

  echo "Waiting for $host:$port..." >&2

  while :; do
    if nc -z "$host" "$port" > /dev/null 2>&1; then
      break
    fi
    sleep 1
    if (( $(date +%s) - start_time >= timeout )) && (( timeout > 0 )); then
      echo "Timeout after $timeout seconds waiting for $host:$port" >&2
      exit 1
    fi
  done
  return 0
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    *:* )
    HOST=$(printf "%s\n" "$1"| cut -d : -f 1)
    PORT=$(printf "%s\n" "$1"| cut -d : -f 2)
    shift 1
    ;;
    -t | --timeout)
    TIMEOUT="$2"
    if [[ $TIMEOUT =~ ^[0-9]+$ ]]; then
      shift 2
    else
      echo "Error: Timeout must be an integer." >&2
      usage
    fi
    ;;
    --)
    shift
    CHILD_COMMAND="$@"
    break
    ;;
    *)
    usage
    ;;
  esac
done

if [ -z "$HOST" ] || [ -z "$PORT" ]; then
  echo "Error: Host and port are required." >&2
  usage
fi

wait_for "$HOST" "$PORT" "$TIMEOUT"

if [ -n "$CHILD_COMMAND" ]; then
  exec "$@"
else
  exit 0
fi