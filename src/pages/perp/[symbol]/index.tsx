/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Market from "@/components/trading/market";
import { useParams, useSearchParams } from "react-router-dom";
import { DEFAULT_SYMBOL } from "@/utils/utils";
import { useRouter } from "next/navigation";

const Page = () => {
  // const params = useParams();
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);
  const router = useRouter();

  const onSymbolChange = useCallback(
    (data: any) => {
      const symbol = data.symbol;
      setSymbol(symbol);

      // const searchParamsString = searchParams.toString();
      // const queryString = searchParamsString ? `?${searchParamsString}` : "";

      // router.push(`/perp/${symbol}${queryString}`);
      router.push(`/perp/${symbol}`);
    },
    [router]
  );
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-2 p-2">
        <div className="min-w-[200px] min-h-[800px] max-w-[300px] bg-[#16151d] rounded-lg p-4">
          <Market onSymbolChange={onSymbolChange}/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
