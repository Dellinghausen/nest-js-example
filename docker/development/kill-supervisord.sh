#!/bin/bash

printf "READY\n";

while read line; do
  echo "Processing Event: $line" >&2;

  if [[ $line == *"eventname:PROCESS_STATE_FATAL"* ]]; then
    kill -SIGKILL $PPID
  fi
done < /dev/stdin
