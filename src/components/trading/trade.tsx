import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type OrderSide = "buy" | "sell";
const orderTypes = [
  "Limit",
  "Market",
  "Stop limit",
  "Stop market",
  "Scaled",
  "Trailing stop",
];

const bboOptions = [
  "Counterparty 1",
  "Counterparty 5",
  "Queue 1",
  "Queue 5"
]

const qtyDistributedOptions = ["Flat", "Asc.", "Desc."];

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
  // order dropbox
  const [orderType, setOrderType] = useState<string>("Limit");
  const [orderDropBoxOpen, setOrderDropBoxOpen] = useState(false);

  // QTY Distribution option
  const [selectedQtyDis, setSelectedQtyDis] = useState("Flat");
  const [bboDropBoxOpen, setBboDropBoxOpen] = useState(false);
  const [bbtOption, setBbtOption] = useState("Counterpay 1");

  const [isMid, setIsMid] = useState(true);

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
      <div className="grid grid-cols-2 rounded-lg overflow-hidden gap-2">
        <div
          onClick={() => setSide("buy")}
          className={`py-2 font-semibold flex items-center justify-center cursor-pointer rounded-md w-full hover:text-white hover:duration-300 ${side === "buy" ? "bg-green-600" : "text-gray-400 bg-[#1c2732]"
            }`}
        >
          Buy
        </div>
        <div
          onClick={() => setSide("sell")}
          className={`py-2 font-semibold flex items-center justify-center cursor-pointer rounded-md w-full hover:text-white hover:duration-300 ${side === "sell" ? "bg-[#D73866] hover:bg-[#B73866]" : "text-gray-400 bg-[#1c2732]"
            }`}
        >
          Sell
        </div>
      </div>

      {/* Order type + leverage */}
      <div className="grid grid-cols-2 items-center text-sm w-full gap-2">
        <div className="relative w-full text-sm">
          {/* Dropdown button */}
          <div
            onClick={() => setOrderDropBoxOpen(!orderDropBoxOpen)}
            className="flex w-full items-center justify-between cursor-pointer rounded-md bg-[#1c2732] px-3 py-2 text-gray-200 hover:bg-[#23303c] focus:outline-none duration-200"
          >
            <span>{orderType}</span>
            {orderDropBoxOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
          {/* Dropdown list */}
          {orderDropBoxOpen && (
            <ul className="absolute left-0 top-10 mt-1 w-full rounded-md bg-[#1c2732] py-1 shadow-lg ring-1 ring-black/40 z-20">
              {orderTypes.map((type) => (
                <li
                  key={type}
                  onClick={() => {
                    setOrderType(type);
                    setOrderDropBoxOpen(false);
                  }}
                  className={`flex items-center justify-between cursor-pointer px-3 py-2 text-gray-300 hover:bg-[#23303c] ${type === orderType ? "text-white font-medium" : ""
                    }`}
                >
                  {type}
                  {type === orderType && (
                    <span className="ml-2 h-1 w-1 rounded-full bg-green-400"></span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center gap-1 w-full bg-[#1c2732] py-2 px-3 shadow-lg ring-1 ring-black/40 rounded-md">
          <span className="text-gray-200">Cross</span>
          <input
            type="number"
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="w-14 bg-[#1b1f2580] text-center rounded-md outline-none text-white"
          />
          <span className="text-gray-200">X</span>
        </div>
      </div>

      {/* Available */}
      <div className="text-xs text-gray-400 w-full flex justify-between items-center">
        <span className="font-semibold">Available</span>
        <span>{available} USDC</span>
      </div>

      {/*----1 Limit comp ----- */}
      {
        orderType == "Limit" && (
          <div className="grid grid-cols-2 gap-2 w-full text-sm font-semibold">
            {/* Price Box */}
            <div className="col-span-2 rounded-t-xl rounded-b-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Price</span>
                <span>USDC</span>
              </div>

              <div className="flex items-center justify-between">
                {isMid ? (
                  <input
                    placeholder="0"
                    className="bg-transparent text-white text-base font-semibold focus:outline-none w-24"
                  />
                ) : (
                  <div className="relative w-full text-sm">
                    {/* Dropdown button */}
                    <div
                      onClick={() => setBboDropBoxOpen(!bboDropBoxOpen)}
                      className="flex w-full items-center justify-between cursor-pointer rounded-md bg-[#1c2732] px-3 py-2 text-gray-200 hover:bg-[#23303c] focus:outline-none duration-200"
                    >
                      <span>{bbtOption}</span>
                      {bboDropBoxOpen ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    {/* Dropdown list */}
                    {bboDropBoxOpen && (
                      <ul className="absolute left-0 top-10 mt-1 w-full rounded-md bg-[#1c2732] py-1 shadow-lg ring-1 ring-black/40 z-20">
                        {bboOptions.map((type) => (
                          <li
                            key={type}
                            onClick={() => {
                              setBbtOption(type);
                              setBboDropBoxOpen(false);
                            }}
                            className={`flex items-center justify-between cursor-pointer px-3 py-2 text-gray-300 hover:bg-[#23303c] ${type === bbtOption ? "text-white font-medium" : ""
                              }`}
                          >
                            {type}
                            {type === bbtOption && (
                              <span className="ml-2 h-1 w-1 rounded-full bg-green-400"></span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div
                    className={`${isMid ? "text-gray-300 border border-[#2b3a47]" : "text-[#60a9a4] border border-[#60a9a4]"} rounded-md border px-2 py-[2px] text-[12px] hover:bg-[#23303c] cursor-pointer`}
                    onClick={() => setIsMid(false)}
                  >
                    BBO
                  </div>
                  <span className={`${isMid ? "text-[#60a9a4]" : ""} text-[12px] cursor-pointer`} onClick={() => { setIsMid(true) }}>Mid</span>
                </div>
              </div>
            </div>

            {/* Qty Box */}
            <div className="rounded-sm rounded-bl-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Qty</span>
                <span>ETH</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>

            {/* Total Box */}
            <div className="rounded-sm rounded-br-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Total ≈</span>
                <span>USDC</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>
          </div>
        )
      }

      {/*----2 Market Comp ----- */}
      {
        orderType == "Market" && (
          <div className="w-full text-sm grid grid-cols-2 gap-2 font-semibold">
            <div className="rounded-sm rounded-l-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Qty</span>
                <span>ETH</span>
              </div>
              <input
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>

            {/* Total Box */}
            <div className="rounded-sm rounded-r-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Total ≈</span>
                <span>USDC</span>
              </div>
              <input
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>
          </div>
        )
      }

      {/*----3 Stop limit Comp ----- */}
      {
        orderType == "Stop limit" && (
          <div className="grid grid-cols-2 gap-2 w-full text-sm font-semibold">
            {/* Trigger */}
            <div className="col-span-2 rounded-t-xl rounded-b-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Trigger</span>
                <span>USDC</span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  className="bg-transparent text-white text-base font-semibold focus:outline-none w-24"
                />
              </div>
            </div>
            {/* Price */}
            <div className="col-span-2 rounded-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Price</span>
                <span>USDC</span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  className="bg-transparent text-white text-base font-semibold focus:outline-none w-24"
                />
              </div>
            </div>
            {/* QTY */}
            <div className="rounded-sm rounded-bl-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Qty</span>
                <span>ETH</span>
              </div>
              <input
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>

            {/* Total Box */}
            <div className="rounded-sm rounded-br-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Total ≈</span>
                <span>USDC</span>
              </div>
              <input
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>
          </div>
        )
      }

      {/*----4 Stop market Comp ----- */}
      {
        orderType == "Stop market" && (
          <div className="grid grid-cols-2 gap-2 w-full text-sm font-semibold">
            {/* Trigger */}
            <div className="col-span-2 rounded-t-xl rounded-b-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Trigger</span>
                <span>USDC</span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  className="bg-transparent text-white text-base font-semibold focus:outline-none w-24"
                />
              </div>
            </div>
            {/* QTY */}
            <div className="rounded-sm rounded-bl-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Qty</span>
                <span>ETH</span>
              </div>
              <input
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>

            {/* Total Box */}
            <div className="rounded-sm rounded-br-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Total ≈</span>
                <span>USDC</span>
              </div>
              <input
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>
          </div>
        )
      }

      {/*----5 Scaled ----- */}
      {
        orderType == "Scaled" && (
          <div className="grid grid-cols-2 gap-2 w-full text-sm font-semibold">
            {/* Start Price Box */}
            <div className="col-span-2 rounded-t-xl rounded-b-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Start price</span>
                <span>USDC</span>
              </div>

              <div className="flex items-center justify-between">
                <input
                  className="bg-transparent text-white text-base font-semibold focus:outline-none w-24"
                />
              </div>
            </div>

            {/* End Price Box */}
            <div className="col-span-2 rounded-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>End price</span>
                <span>USDC</span>
              </div>

              <div className="flex items-center justify-between">
                <input
                  className="bg-transparent text-white text-base font-semibold focus:outline-none w-24"
                />
              </div>
            </div>

            {/* Qty Box */}
            <div className="rounded-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Qty</span>
                <span>ETH</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>

            {/* Total orders Box */}
            <div className="rounded-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400">
                <span>Total orders</span>
              </div>
              <input
                type="number"
                placeholder="2-20"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>
            {/* QTY Distribution Option */}
            <div className="rounded-sm rounded-b-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2 w-full text-sm col-span-2">
              {/* Header */}
              <div className="text-[12px] text-gray-400 border-b border-dashed border-b-[#2b3a47] pb-[2px]">
                Qty distribution
              </div>

              {/* Options */}
              <div className="flex items-center gap-4">
                {qtyDistributedOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-1.5 cursor-pointer select-none text-gray-300 hover:text-white"
                  >
                    <input
                      type="radio"
                      name="qty-distribution"
                      value={option}
                      checked={selectedQtyDis === option}
                      onChange={() => setSelectedQtyDis(option)}
                      className="accent-[#60a9a4] w-2.5 h-2.5"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/*----6 Trailing stop ----- */}
      {
        orderType == "Trailing stop" && (
          <div className="grid grid-cols-2 gap-2 w-full text-sm font-semibold">
            {/* Trigger Price Box */}
            <div className="col-span-2 rounded-t-xl rounded-b-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Trigger price</span>
                <span>USDC</span>
              </div>

              <div className="flex items-center justify-between">
                <input
                  placeholder="0 (Optional)"
                  className="bg-transparent text-white text-base font-semibold focus:outline-none w-24 placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Trailing value Box */}
            <div className="col-span-2 rounded-sm bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Trailing value</span>
                <span>USDC</span>
              </div>

              <div className="flex items-center justify-between">
                <input
                  placeholder="0"
                  className="bg-transparent text-white text-base font-semibold focus:outline-none w-24"
                />
              </div>
            </div>

            {/* Qty Box */}
            <div className="rounded-sm rounded-bl-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Qty</span>
                <span>ETH</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>

            {/* Total Box */}
            <div className="rounded-sm rounded-br-xl bg-[#1c2732] border border-[#2b3a47] px-3 py-2">
              <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                <span>Total ≈</span>
                <span>USDC</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="bg-transparent text-white text-base font-semibold focus:outline-none w-full"
              />
            </div>
          </div>
        )
      }
      {/* Slider */}
      <input type="range" className="w-full accent-blue-500" />

      {/* Action button */}
      <div
        className={`w-full py-2 rounded-md font-semibold flex items-center justify-center cursor-pointer mt-2 ${side === "buy"
          ? "bg-green-600 hover:bg-green-500"
          : "bg-[#D73866] hover:bg-[#B73866]"
          }`}
      >
        {side === "buy" ? "Buy / Long" : "Sell / Short"}
      </div>

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
