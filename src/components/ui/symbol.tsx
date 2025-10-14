import React from "react";
import { LogoUrl, MarketsItemCustom } from "@/utils/utils";

type MarketSymbolProps = MarketsItemCustom & {
  onClick?: () => void;
};

const MarketSymbol: React.FC<MarketSymbolProps> = (value) => {
  const coin = value.symbol.split("_")[1];
  const logoUrl = LogoUrl(coin);
  return (
    <tr className="w-full" onClick={value.onClick}>
      <td className="">
        <div className="">
          <div className="flex flex-row gap-1 items-center">
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="oui-size-3 oui-text-base-contrast-36 hover:oui-text-[rgba(255,154,46,1)]"
            >
              <path d="M6.012 1.72c-.286 0-.577.178-.75.532L4.2 4.438l-2.42.344c-.78.108-1.03.872-.47 1.42l1.75 1.703-.407 2.39c-.133.773.508 1.24 1.203.874.268-.142 1.648-.857 2.155-1.124l2.155 1.124c.695.367 1.339-.1 1.202-.874l-.421-2.39 1.749-1.702c.565-.547.326-1.31-.453-1.421l-2.436-.344L6.76 2.252c-.172-.354-.464-.531-.75-.531m0 1.297 1.03 2.108c.073.15.211.242.375.266l2.343.343-1.702 1.64a.48.48 0 0 0-.14.437l.405 2.312L6.246 9.03a.5.5 0 0 0-.468 0L3.7 10.123l.39-2.296a.52.52 0 0 0-.14-.453l-1.687-1.64 2.327-.328a.52.52 0 0 0 .39-.28z"></path>
            </svg>
            <div className="flex flex-col gap-0">
              <div className="flex flex-row gap-1 items-center">
                <span className="">
                  <img className="w-[20px] h-[20px]" src={logoUrl} alt={coin} />
                </span>
                <span className="">{coin}</span>
                <div className="">{value.leverage}x</div>
              </div>

              <span className="">{Math.floor(value["24h_volume"])}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="" style={{ width: "100%" }}>
        <div className="">
          <div className="">
            <span className="">{value.mark_price}</span>
            <span className="">{Math.floor(value.change * 10000) / 100}</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default MarketSymbol;
