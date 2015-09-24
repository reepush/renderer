SERVER_PORT=3000
STANDALONE_PORT=3001
N=500

AB_SERVER="ab -n $N 'http://localhost:$SERVER_PORT/?file=template.jade'"
AB_STANDALONE="ab -n $N 'http://localhost:$STANDALONE_PORT/?file=template.jade'"

OUTPUT=$(eval $AB_SERVER 2>&1)
SERVER_MEAN=$(echo $OUTPUT | grep -Eo 'Time per request: (\d+.\d+) \[ms\] \(mean\)' | grep -Eo '\d+.\d+')
SERVER_MAX=$(echo $OUTPUT | grep -Eo '\d+ \(longest request\)' | grep -Eo '\d+')

OUTPUT=$(eval $AB_STANDALONE 2>&1)
STANDALONE_MEAN=$(echo $OUTPUT | grep -Eo 'Time per request: (\d+.\d+) \[ms\] \(mean\)' | grep -Eo '\d+.\d+')
STANDALONE_MAX=$(echo $OUTPUT | grep -Eo '\d+ \(longest request\)' | grep -Eo '\d+')

echo "
mertic  With daemon   Standalone
mean    $SERVER_MEAN  $STANDALONE_MEAN
max     $SERVER_MAX   $STANDALONE_MAX
" | column -t
