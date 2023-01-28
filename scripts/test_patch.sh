node_range=$1

if [ -z "$node_range" ]; then
  echo "usage: ./test_patch.sh <nodeVersion>"
  echo "       where nodeVersion is of the form 'node18' or 'node16'"
  exit 1
fi

echo "Applying patches for $node_range"

command="npm run applyPatches -- --node-range $node_range --quiet-extraction"
output=$($command)
status=$?

if [ $status -ne 0 ]; then
  echo -e "Command failed:\n$command\n$output"
  exit 1
fi

echo "Checking output"

expected_include_strings=("fetching" "extracting" "applying patches" "patching file")
failing_strings=("failed" "offset" "rejects")

found_all_expected_strings=true
for s in "${expected_include_strings[@]}"; do
  if [[ "${output,,}" != *"${s,,}"* ]]; then
    found_all_expected_strings=false
    echo -e "ERROR: Did not find \"$s\" in output"
  fi
done

if [ "$found_all_expected_strings" = false ]; then
  echo -e "\nDid not find the expected text when applying patches.\n\nOutput:\n$output"
  exit 1
fi

line_errors=0
while IFS= read -r line; do
  for fString in "${failing_strings[@]}"; do
    if [[ "${line,,}" == *"${fString,,}"* ]]; then
      echo "ERROR: Found \"$fString\" in line: \"$line\"";
      line_errors=$((line_errors + 1))
    fi
  done
done <<< "$output"

if [ $line_errors -gt 0 ]; then
  echo "ERROR: errors found while attempting to apply patches"
  exit $line_errors
fi

echo "All checks complete"
