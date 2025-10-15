import { fetchAccount } from "@/api/wallet.api";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

const WalletConnect = () => {
  const { wallet, connected, name, connecting, connect, disconnect, error, address } =
    useWallet();
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    const res = await fetchAccount(address);
    setAccount(res);
  }

  useEffect(() => {
    if (connected) getAccount();
  }, [connected])

  return (
    <div className="rounded-md pt-4 p-3 flex flex-col items-center">
      <div>
        <p className="text-center text-[1.5em] text-[#12bf8f] font-semibold pb-2 flex items-center justify-center">
          {/* {!connected && "Connect Wallet"}
            {!connected && account && "Create Account"}
            {!connected && !account && "Create Account"} */}
          {!connected
            ? "Connect Wallet"
            : !account
            ? "Create Account"
            : "Start Trading"}
        </p>
        <p className="text-center text-sm">
          {!connected
            ? "Please connect wallet before starting to trade"
            : !account
            ? "You need to create wallet before you start trading"
            : "You can deposit ada from your wallet"}
        </p>
      </div>
      <div className="mt-3 mb-1">
        {!connected ? (
          <CardanoWallet isDark={true}/>
        ) : account == "" ? (
          <div className="px-4 py-2 border-solid bg-[#23303C] rounded-md cursor-pointer hover:bg-[#2d293a]">
            Create Account
          </div>
        ) : (
          <div className="px-4 py-2 border-solid bg-[#23303C] rounded-md cursor-pointer">Deposit</div>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
