import { FormatNumber, LogoUrl, MarketInfo } from "@/utils/utils";
import React from "react";

type MarketInfoComProps = {
  marketInfo: MarketInfo;
};

const MarketInfoCom: React.FC<MarketInfoComProps> = ({ marketInfo }) => {
  return (
    <div className="flex flex-row justify-start gap-6">
      <div className="flex flex-row items-center gap-3 pl-4">
        <span className="w-[24px] h-[24px]">
          <img src={LogoUrl(marketInfo.symbol.split("_")[1])} alt="Logo Img" />
        </span>
        <span className="font-bold text-[0.9em]">{marketInfo.symbol}</span>
      </div>
      <div className="flex flex-row justify-start gap-3">
        <div className="price flex items-center h-100% px-6 border-l border-l-white border-solid">${marketInfo.mark_price}</div>
        <div className="flex flex-col">
          <div>24h change</div>
          <div>{FormatNumber(marketInfo["24h_amount"])}</div>
        </div>
        <div className="flex flex-col">
          <div>Mark</div>
          <div>{FormatNumber(marketInfo.mark_price)}</div>
        </div>
        <div className="flex flex-col">
          <div>Index</div>
          <div>{FormatNumber(marketInfo.index_price)}</div>
        </div>
        <div className="flex flex-col">
          <div>24h Volume</div>
          <div>{FormatNumber(marketInfo["24h_volume"])}</div>
        </div>
      </div>
    </div>
  );
};

export default MarketInfoCom;
