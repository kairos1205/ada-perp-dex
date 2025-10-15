import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS class names safely
 * - Handles conditional classes
 * - Avoids duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const DEFAULT_SYMBOL = "PERP_ETH_USDC";

export const LogoUrl = (symbol: string) => {
  return `https://oss.orderly.network/static/symbol_logo/${symbol}.png`;
};

export const FormatNumber = (num: number) => {
  return Math.floor(num * 100) / 100;
};

export const TradingViewSymbol = (symbol: string) => {
  const arr = symbol.split("_");
  return arr[1] + arr[2];
};

export type MarketsItemCustom = {
  symbol: string;
  index_price: number;
  mark_price: number;
  sum_unitary_funding: number;
  est_funding_rate: number;
  last_funding_rate: number;
  next_funding_time: number;
  open_interest: number;
  "24h_open": number;
  "24h_close": number;
  "24h_high": number;
  "24h_low": number;
  "24h_volume": number;
  "24h_amount": number;
  "24h_volumn": number;
  change: number;
  "8h_funding": number;
  quote_dp: number;
  created_time: number;
  openInterest: number;
  isFavorite: boolean;
  leverage?: number;
};

export type MarketInfo = {
  symbol: string;
  index_price: number;
  mark_price: number;
  sum_unitary_funding: number;
  est_funding_rate: number;
  last_funding_rate: number;
  next_funding_time: number;
  open_interest: number;
  "24h_open": number;
  "24h_close": number;
  "24h_high": number;
  "24h_low": number;
  "24h_volume": number;
  "24h_amount": number;
};
