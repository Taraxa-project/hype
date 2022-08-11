# Hype SubGraph

## Clone the repo
### Install dependencies

```
yarn install
```

## Configure the Subgraph
### Update the address and (the startBlock optional) in subgraph.yaml
```
  network: taraxa
  source:
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    abi: HypePool
    startBlock: 74113
```

### Generating types
```
yarn codegen
```

## Deploy the Subgraph
### First, we need to register the subgraph name on the graph node. To do that run yarn create-local
```
yarn create-local
```

### Once the subgraph is registered, now you can deploy it by executing the following command:
```
yarn deploy-local
```