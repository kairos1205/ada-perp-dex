import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

const WalletConnect = () => {
  return (
    <div className="rounded-lg pt-4 p-3 flex flex-col items-center">
      <div>
        <p className="text-center text-[1.5em]">Connect Wallet</p>
        <p className="text-center text-[0.]">
          Please connect wallet before starting to trade
        </p>
      </div>
      <CardanoWallet />
    </div>
  );
};

export default WalletConnect;
