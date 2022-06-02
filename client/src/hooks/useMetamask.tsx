import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

function useMetamask() {
  const metamaskData = useMetaMask();

  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [provider, setProvider] = useState(undefined);

  useEffect(() => {
    if (metamaskData.account) {
      setAccount(ethers.utils.getAddress(metamaskData.account));
    }
  }, [metamaskData.account]);

  useEffect(() => {
    if (metamaskData.chainId) {
      setChainId(metamaskData.chainId);
    }
  }, [metamaskData.chainId]);

  useEffect(() => {
    if (metamaskData.ethereum) {
      setProvider(metamaskData.ethereum);
    }
  }, [metamaskData.ethereum]);

  const connect = metamaskData.connect;

  const status = metamaskData.status

  return { provider, account, chainId, status, connect };
}

export default useMetamask;
