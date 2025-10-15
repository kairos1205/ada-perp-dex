// import { ConnectButton } from '@rainbow-me/rainbowkit';

import { CardanoWallet } from "@meshsdk/react";

export const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-[#161E28] border-b border-gray-800">
    <div className="flex items-center space-x-2 cursor-pointer select-none">
      <img src="/ada.png" alt="logo" width={40} />
      <span className="text-2xl hover:text-3xl hover:duration-300 font-semibold text-white">AdaPerp</span>
    </div>
    <CardanoWallet isDark={true}/>
  </nav>
);
