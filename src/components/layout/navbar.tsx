// import { ConnectButton } from '@rainbow-me/rainbowkit';

import { CardanoWallet } from "@meshsdk/react";

export const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-[#16151d] border-b border-gray-800">
    <div className="flex items-center space-x-2 cursor-pointer select-none">
      <div className="w-6 h-6 bg-teal-400 rounded-full" />
      <span className="text-xl font-semibold text-white">AdaPerp</span>
    </div>
    <CardanoWallet />
  </nav>
);
