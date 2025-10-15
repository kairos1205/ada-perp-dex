import React from "react";

type PositionProps = {
  symbol: string;
};

const Positions: React.FC<PositionProps> = ({ symbol }) => {

  //   console.log("Position data:", data);
  return (
    <div className="w-[100%]">
      <div className="flex flex-row gap-2 w-full text-[14px]">
        <div className="py-2 px-3 rounded-lg bg-[#23303C] cursor-pointer">
          Positions
        </div>
        <div className="py-2 px-3 rounded-lg bg-[#23303C] cursor-pointer">
          Pending
        </div>
        <div className="py-2 px-3 rounded-lg bg-[#23303C] cursor-pointer">
          TP/SL
        </div>
        <div className="py-2 px-3 rounded-lg bg-[#23303C] cursor-pointer">
          Filled
        </div>
        <div className="py-2 px-3 rounded-lg bg-[#23303C] cursor-pointer">
          Position History
        </div>
        <div className="py-2 px-3 rounded-lg bg-[#23303C] cursor-pointer">
          Order history
        </div>
        <div className="py-2 px-3 rounded-lg bg-[#23303C] cursor-pointer">
          Liquidation
        </div>
        <div className="py-2 px-3 rounded-lg bg-[#23303C] cursor-pointer">
          Assets
        </div>
      </div>
    </div>
  );
};

export default Positions;
