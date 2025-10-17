import { CardanoWallet } from "@meshsdk/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/perp/PERP_ETH_USDC");
  }, [router]);
  return (
    <div>
    </div>
  );
}
