/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import SearchInput from "../ui/searchInput";
import MarketSymbol from "../ui/symbol";
import { fetchAllMarketInfoForAllSymbol } from "@/api/orderly.api";
import { MarketsItemCustom } from "@/utils/utils";

enum MarketsType {
  FAVORITES = 0,
  RECENT = 1,
  ALL = 2,
}

type SymbolsProps = {
  onSymbolChange: (data: any) => void;
};

const Market: React.FC<SymbolsProps> = ({ onSymbolChange }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [marketInfolist, setMarketInforList] = useState<MarketsItemCustom[]>(
    []
  );

  const getAllMarketInfo = async () => {
    const data = await fetchAllMarketInfoForAllSymbol();
    console.log(data);
    setMarketInforList(data);
  };

  useEffect(() => {
    if (marketInfolist.length == 0) {
      getAllMarketInfo();
    }
  }, []);

  useEffect(() => {
    console.log(marketInfolist)
  }, [marketInfolist])

  return (
    <div className="w-full">
      <div className="px-1 pb-1 w-full">
        <SearchInput onChange={setSearchKeyword} value={searchKeyword} />
      </div>
      <div className="px-1 w-full">
        <table className="w-full">
          <thead className="text-[14px] text-[#5f666e]">
            <tr>
              <td className="h-[36px] w-1/2">Market / Volume</td>
              <td className="h-[36px] w-1/2">Price / Change</td>
            </tr>
          </thead>
          <tbody>
            {marketInfolist.map((marketInfo) => (
              <MarketSymbol
                key={marketInfo.symbol}
                {...marketInfo}
                onClick={() => onSymbolChange(marketInfo)}
              />
            ))}
            {/* <MarketSymbol /> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Market;
