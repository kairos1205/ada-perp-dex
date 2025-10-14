/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Market from "@/components/trading/market";
import { useParams, useSearchParams } from "react-router-dom";
import { DEFAULT_SYMBOL, MarketInfo, TradingViewSymbol } from "@/utils/utils";
import { useRouter } from "next/navigation";
import {
  DEFAULT_MARKET_INFO,
  fetchMarketInfoForOneSymbol,
} from "@/api/orderly.api";
import MarketInfoCom from "@/components/trading/marketinfo";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import Positions from "@/components/trading/positions";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import WalletConnect from "@/components/trading/walletconnect";

const Page = () => {
  // const params = useParams();
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);
  const [marketInfo, setMarketInfo] = useState<MarketInfo>(DEFAULT_MARKET_INFO);
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();
  const [accounts, setAccounts] = useState(false);

  const router = useRouter();

  useEffect(() => {
    console.log("MarketInfo", marketInfo);
  }, [marketInfo]);

  const getMarketInfo = async (_symbol: string) => {
    const res = await fetchMarketInfoForOneSymbol(_symbol);
    setMarketInfo(res);
  };

  const onSymbolChange = useCallback(
    (data: any) => {
      const _symbol = data.symbol;
      setSymbol(_symbol);
      getMarketInfo(_symbol);
      router.push(`/perp/${_symbol}`);
    },
    [router]
  );
  return (
    <>
      <Navbar />
      <div className="flex flex-row gap-2 p-2">
        <div className="min-w-[200px] min-h-[800px] max-w-[300px] bg-[#16151d] rounded-lg p-4">
          <Market onSymbolChange={onSymbolChange} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="bg-[#16151d] rounded-md p-3 flex items-center justify-start">
            <MarketInfoCom marketInfo={marketInfo} />
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-[#16151d] p-2 rounded-md min-h-[400px] w-[100%]">
              <AdvancedRealTimeChart
                symbol={TradingViewSymbol(symbol)}
                theme="dark"
                autosize
              ></AdvancedRealTimeChart>
            </div>
            <div className="bg-[#16151d] max-w-[300px] min-w-[300px]">
              Order Book
            </div>
          </div>
          <div className="bg-[#16151d] rounded-md p-2">
            <Positions symbol={symbol} />
          </div>
        </div>
        <div className="flex flex-col gap-2 min-w-[300px]">
          <div className="bg-[#16151d] rounded-md">
            <WalletConnect />
          </div>
          <div className="bg-[#16151d]   min-h-[300px]">Trade</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
