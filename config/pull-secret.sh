echo "🔍  $(tput bold)Pull secret$(tput sgr0)"

if [ "$#" -lt 1 ]; then
  printf "Secret key: "
  read key
else
  key=$1
fi;

aws ssm get-parameter --name $key --region eu-central-1 --with-decryption
