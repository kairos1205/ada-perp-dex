import { fetchAccount } from "@/api/wallet.api";
import { cn } from "@/utils/utils";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { LogOut, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const WalletConnect = () => {
  const { wallet, connected, name, connecting, connect, disconnect, error, address } =
    useWallet();
  const [account, setAccount] = useState<string>("");

  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  const getAccount = async () => {
    const res = await fetchAccount(address);
    setAccount(res);
  }

  const [selectedStep, setSelectedStep] = useState<'create' | 'enable'>('create');

  useEffect(() => {
    if (connected) getAccount();
  }, [connected])

  return (
    <div className="rounded-md pt-4 p-3 flex flex-col items-center">
      <div>
        <p className="text-center text-[1.5em] bg-clip-text text-transparent bg-gradient-to-tr from-[#A9F7FF] to-[#3468D1]  font-semibold pb-2 flex items-center justify-center">
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
          <CardanoWallet isDark={true} />
        ) : account == "" ? (
          <div className="px-4 py-2 border-solid bg-[#23303C] rounded-md cursor-pointer hover:bg-[#2d293a]" onClick={() => { setIsCreateAccountOpen(true) }}>
            Create Account
          </div>
        ) : (
          <div className="px-4 py-2 border-solid bg-[#23303C] rounded-md cursor-pointer">Deposit</div>
        )}
      </div>
      <Modal classNames={{
        overlay: cn("text-gray-600 bg-[#1C2732]"),
        modal: "custom-modal",
        root: ""
      }} open={isCreateAccountOpen} onClose={() => setIsCreateAccountOpen(false)} center>
        <div className="pb-3 w-full border-b-2 border-b-gray-800 font-semibold text-white text-lg flex">
          Create account
        </div>
        <p className="font-semibold text-sm">Your previous access has expired, you will receive a signature request to enable trading. Signing is free and will not send a transaction.</p>

        {/* Steps box */}
        <div className="bg-[#2A3946] rounded-md border border-gray-700 my-4">
          <div
            className={cn(
              'flex items-start gap-2 p-3 rounded-t-xl cursor-pointer'
            )}
          >
            <div
              className={cn(
                'w-3 h-3 rounded-full border mt-[3px]',
              )}
            />
            <div>
              <p className="text-sm font-medium text-white">Create account</p>
              <p className="text-xs text-gray-400">
                Confirm wallet ownership to create an account
              </p>
            </div>
          </div>

          <div
            className={cn(
              'flex items-start gap-2 p-3 rounded-b-xl cursor-pointer'
            )}
          >
            <div
              className={cn(
                'w-3 h-3 rounded-full border mt-[3px]',
              )}
            />
            <div>
              <p className="text-sm font-medium text-white">Enable trading</p>
              <p className="text-xs text-gray-400">
                Enable secure access to our API for lightning fast trading
              </p>
            </div>
          </div>
        </div>

        {/* Referral input */}
        {/* <input
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Referral code (Optional)"
          className="w-full bg-[#2a2f3a] text-sm placeholder-gray-500 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-1 focus:ring-teal-400"
        /> */}

        {/* Remember me toggle */}
        {/* <div className="flex justify-between items-center mb-5">
          <span className="text-sm text-gray-300">Remember me</span>
          <button
            onClick={() => setRememberMe(!rememberMe)}
            className={cn(
              'relative w-10 h-5 rounded-full transition-colors',
              rememberMe ? 'bg-teal-500' : 'bg-gray-600'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform',
                rememberMe && 'translate-x-5'
              )}
            />
          </button>
        </div> */}

        {/* Create account button */}
        <div className="cursor-pointer flex items-center justify-center w-full bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium py-2 rounded-md transition mt-4 mb-3"
        >
          Create account
        </div>

        {/* Disconnect wallet */}
        <div className="flex justify-center items-center text-gray-400 text-sm cursor-pointer hover:text-gray-200 transition">
          <LogOut size={14} className="mr-2" />
          Disconnect wallet
        </div>
      </Modal>
    </div>
  );
};

export default WalletConnect;
