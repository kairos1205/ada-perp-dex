import { FormatNumber, LogoUrl, MarketInfo } from "@/utils/utils";
import React from "react";

type MarketInfoComProps = {
  marketInfo: MarketInfo;
};

const MarketInfoCom: React.FC<MarketInfoComProps> = ({ marketInfo }) => {
  return (
    <div className="flex flex-row w-full justify-between items-center gap-6">
      <div className="flex flex-row items-center gap-3 pl-4">
        <span className="w-[24px] h-[24px]">
          <img src={LogoUrl(marketInfo.symbol.split("_")[1])} alt="Logo Img" />
        </span>
        <span className="font-bold text-xl">{marketInfo.symbol}</span>
      </div>
      <div className="flex flex-row justify-start items-center gap-16">
        <div className="price flex items-center text-2xl h-100% border-l border-l-white border-solid text-[#6a95eb] font-semibold">${marketInfo.mark_price}</div>
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold text-[#dddddd77]">24h change</div>
          <div>{FormatNumber(marketInfo["24h_amount"])}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold text-[#dddddd77]">Mark</div>
          <div>{FormatNumber(marketInfo.mark_price)}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold text-[#dddddd77]" >Index</div>
          <div>{FormatNumber(marketInfo.index_price)}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold text-[#dddddd77]">24h Volume</div>
          <div>{FormatNumber(marketInfo["24h_volume"])}</div>
        </div>
      </div>
    </div>
  );
};

export default MarketInfoCom;
