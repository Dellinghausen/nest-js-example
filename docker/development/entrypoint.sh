#!/usr/bin/dumb-init /bin/bash

set -euo pipefail

SSM_PARAMETERS_PATH=${SSM_PARAMETERS_PATH=""}

if [ "$SSM_PARAMETERS_PATH" != "" ]; then
  echo '>>> Configure envs'
  env_vars=$(aws ssm get-parameters-by-path \
    --path="$SSM_PARAMETERS_PATH" \
    --with-decryption \
    --recursive \
    --query 'Parameters[].[Name,Value]' \
    --output text | \
    awk -F'\t' '{
      gsub("^.*/", "", $1)
      gsub("-", "_", $1)
      gsub("\t", "=")
      printf "export %s='\''%s'\''\n", toupper($1), $2
    }')

  eval $env_vars
fi


echo '>>> runing migrations'
cd /opt/app/v1
make run-migration

echo '>>> Starting supervisord'
cd /opt/run
supervisord -c supervisord.conf
