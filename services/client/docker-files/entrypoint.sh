#!/bin/sh

export API_HOST=${API_HOST:="https://api.qa.hype.taraxa.io"}
export WALLET_HOST=${WALLET_HOST:="https://wallet.qa.hype.taraxa.io"}
export GRAPHQL_HOST=${GRAPHQL_HOST:="https://indexer.qa.hype.taraxa.io/subgraphs/name/taraxa/hype-pool"}
export TELEGRAM_BOT_NAME=${TELEGRAM_BOT_NAME:="HypeAppBot"}
export HYPE_ADDRESS=${HYPE_ADDRESS:="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"}
export ESCROW_ADDRESS=${ESCROW_ADDRESS:="0x5FbDB2315678afecb367f032d93F642f64180aa3"}
export IPFS_HOST=${IPFS_HOST:="ipfs.infura.io"}
export IPFS_PORT=${IPFS_PORT:="5001"}
export IPFS_PROTOCOL=${IPFS_PROTOCOL:="https"}
export IPFS_USE_AUTH=${IPFS_USE_AUTH:=false}


export STATIC_FOLDER="/usr/share/nginx/html"

# Removing trailing slash if exists
API_HOST=${API_HOST%/}
WALLET_HOST=${WALLET_HOST%/}
GRAPHQL_HOST=${GRAPHQL_HOST%/}


echo "Replace from env vars..."

find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_API_HOST_STRING_REPLACE,$API_HOST,g" {} \;
find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_WALLET_HOST_STRING_REPLACE,$WALLET_HOST,g" {} \;
find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_GRAPHQL_HOST_STRING_REPLACE,$GRAPHQL_HOST,g" {} \;
find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_TELEGRAM_BOT_NAME_STRING_REPLACE,$TELEGRAM_BOT_NAME,g" {} \;
find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_HYPE_ADDRESS_STRING_REPLACE,$HYPE_ADDRESS,g" {} \;
find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_ESCROW_ADDRESS_STRING_REPLACE,$ESCROW_ADDRESS,g" {} \;
find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_IPFS_HOST_STRING_REPLACE,$IPFS_HOST,g" {} \;
find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_IPFS_PORT_STRING_REPLACE,$IPFS_PORT,g" {} \;
find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_IPFS_PROTOCOL_STRING_REPLACE,$IPFS_PROTOCOL,g" {} \;
find $STATIC_FOLDER -type f -exec sed -i "s,REACT_APP_IPFS_USE_AUTH_STRING_REPLACE,$IPFS_USE_AUTH,g" {} \;

exec "$@"
