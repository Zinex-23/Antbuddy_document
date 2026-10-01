#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

node "$SCRIPT_DIR/test_runner.js"
node "$SCRIPT_DIR/ui_test_runner.js"

echo
echo "ALL TEST SUITES PASSED"
