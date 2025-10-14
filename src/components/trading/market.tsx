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
  //   const [
  //     data,
  //     {
  //       addToHistory,
  //       favoriteTabs,
  //       updateFavoriteTabs,
  //       updateSymbolFavoriteState,
  //     },
  //   ] = useMarkets(MarketsType.ALL);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [marketInfolist, setMarketInforList] = useState<MarketsItemCustom[]>(
    []
  );

  const getAllMarketInfo = async () => {
    const data = await fetchAllMarketInfoForAllSymbol();
    setMarketInforList(data);
  };

  useEffect(() => {
    if (marketInfolist.length == 0) {
      getAllMarketInfo();
    }
  }, []);

  return (
    <div className="w-full">
      <div className="px-1 pb-1 w-full">
        <SearchInput onChange={setSearchKeyword} value={searchKeyword} />
      </div>

      <div className="px-1 w-full border border-gray-200  rounded-lg overflow-hidden">
        <table className="w-full table-fixed">
          {/* Table Header */}
          <thead className="text-[14px] text-[#5f666e] bg-[#16151d] sticky top-0 z-10">
            <tr>
              <th className="h-[36px] w-1/2 text-left px-2">Market / Volume</th>
              <th className="h-[36px] w-1/2 text-left px-2">Price / Change</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable Body */}
        <div className="max-h-[800px] min-h-[800px] overflow-y-auto px-2">
          <table className="w-full table-fixed ">
            <tbody className="divide-y divide-gray-200">
              {marketInfolist.filter(market => market.symbol.includes(searchKeyword.toUpperCase()))
                .sort((a, b) => b.index_price - a.index_price)
                .map((marketInfo) => (
                  <MarketSymbol
                    key={marketInfo.symbol}
                    {...marketInfo}
                    onClick={() => onSymbolChange(marketInfo)}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Market;
