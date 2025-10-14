import { BASE_ORDERLY_URL } from "@/utils/request";
import { MarketInfo, MarketsItemCustom } from "@/utils/utils";
import axios from "axios";

export const DEFAULT_MARKET_INFO: MarketInfo = {
    symbol: "PERP_ETH_USDC",
    index_price: 3943.55,
    mark_price: 3943.08,
    sum_unitary_funding: 1140.79,
    est_funding_rate: 0.0001,
    last_funding_rate: 0.00010041,
    next_funding_time: 1760457600000,
    open_interest: 1708.5775,
    "24h_open": 4129.32,
    "24h_close": 3942.28,
    "24h_high": 4294.9,
    "24h_low": 3891.8,
    "24h_volume": 106477.1177,
    "24h_amount": 436332947.851448,
};

export const fetchAllMarketInfoForAllSymbol = async () => {
  try {
    const url = `${BASE_ORDERLY_URL}/v1/public/futures`;
    const res = await axios.get(url);
    if (res) {
      return res.data.data.rows;
    }
    return [];
  } catch (e) {
    return [];
  }
};

export const fetchMarketInfoForOneSymbol = async (symbol: string) => {
  try {
    const url = `${BASE_ORDERLY_URL}/v1/public/futures/${symbol}`;
    console.log("url", url)
    const res = await axios.get(url);
    if (res) {
      return res.data.data;
    }
    return DEFAULT_MARKET_INFO;
  } catch (e) {
    return DEFAULT_MARKET_INFO;
  }
};

// https://api.orderly.org/v1/public/futures
