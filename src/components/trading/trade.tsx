import React, { useState } from "react";

type OrderSide = "buy" | "sell";
type OrderType = "Limit" | "Market" | "Stop";

interface TradeOrderPanelProps {
  available?: number;
  takerFee?: number;
  makerFee?: number;
}

const TradeOrderPanel: React.FC<TradeOrderPanelProps> = ({
  available = 0,
  takerFee = 0.06,
  makerFee = 0.03,
}) => {
  const [side, setSide] = useState<OrderSide>("sell");
  const [orderType, setOrderType] = useState<OrderType>("Limit");
  const [leverage, setLeverage] = useState(10);
  const [price, setPrice] = useState(115157);
  const [qty, setQty] = useState(0);
  const [reduceOnly, setReduceOnly] = useState(false);
  const [orderConfirm, setOrderConfirm] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [execution, setExecution] = useState("Post only");

  return (
    <div className="p-4 space-y-3 w-[100%]">
      {/* Tabs */}
      <div className="grid grid-cols-2 bg-[#1b1f25] rounded-lg overflow-hidden">
        <div
          onClick={() => setSide("buy")}
          className={`py-2 font-semibold flex items-center justify-center cursor-pointer hover:text-white hover:duration-300 ${
            side === "buy" ? "bg-green-600" : "text-gray-400"
          }`}
        >
          Buy
        </div>
        <div
          onClick={() => setSide("sell")}
          className={`py-2 font-semibold flex items-center justify-center cursor-pointer hover:text-white hover:duration-300 ${
            side === "sell" ? "bg-pink-600" : "text-gray-400"
          }`}
        >
          Sell
        </div>
      </div>

      {/* Order type + leverage */}
      <div className="flex justify-between items-center text-sm">
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value as OrderType)}
          className="bg-[#1b1f25] rounded-md px-2 py-1 text-gray-300 focus:outline-none"
        >
          <option>Limit</option>
          <option>Market</option>
          <option>Stop</option>
        </select>

        <div className="flex items-center gap-1">
          <span className="text-gray-400">Cross</span>
          <input
            type="number"
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="w-12 bg-[#1b1f25] text-center rounded-md outline-none"
          />
          <span className="text-gray-400">X</span>
        </div>
      </div>

      {/* Available */}
      <div className="text-xs text-gray-400">Available {available} USDC</div>

      {/* Price and Quantity */}
      <div className="space-y-2 bg-[#1b1f25] rounded-lg p-3">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Price</span>
          <span>USDC</span>
        </div>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full text-right bg-transparent text-white text-lg outline-none"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Qty</span>
          <span>BTC</span>
        </div>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="w-full text-right bg-transparent text-white outline-none"
        />
      </div>

      {/* Slider */}
      <input type="range" className="w-full accent-pink-600" />

      {/* Action button */}
      <button
        className={`w-full py-2 rounded-md font-semibold ${
          side === "buy"
            ? "bg-green-600 hover:bg-green-500"
            : "bg-pink-600 hover:bg-pink-500"
        }`}
      >
        {side === "buy" ? "Buy / Long" : "Sell / Short"}
      </button>

      {/* Fees + Info */}
      <div className="text-sm text-gray-400 space-y-2">
        <div className="flex justify-between">
          <span>Est. liq. price</span> <span>— USDC</span>
        </div>
        <div className="flex justify-between">
          <span>Fees:</span>
          <span className="text-gray-200">
            <span className="text-gray-400">Taker: </span> {takerFee}% /{" "}
            <span className="text-gray-400">Maker: </span>
            {makerFee}%
          </span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col space-y-2 text-sm text-gray-300">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={reduceOnly}
            onChange={() => setReduceOnly(!reduceOnly)}
          />
          TP / SL
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={reduceOnly}
            onChange={() => setReduceOnly(!reduceOnly)}
          />
          Reduce only
        </label>

        <div className="p-4 rounded-md oui-bg-base-7 space-y-2">
          <div className="flex flex-wrap gap-4">
            {["Post only", "IOC", "FOK"].map((opt) => (
              <label key={opt} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="execution"
                  value={opt}
                  checked={execution === opt}
                  onChange={() => setExecution(opt)}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="flex flex-row gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={orderConfirm}
                onChange={() => setOrderConfirm(!orderConfirm)}
              />
              Order confirm
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hidden}
                onChange={() => setHidden(!hidden)}
              />
              Hidden
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeOrderPanel;
