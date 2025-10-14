import { BASE_ORDERLY_URL } from "@/utils/request"
import axios from "axios";

export const fetchAllMarketInfoForAllSymbol = async () => {
    try {
        const url = `${BASE_ORDERLY_URL}/v1/public/futures`;
        const res = await axios.get(url);
        console.log("res", res);
        if (res) {
            console.log(res.data.data.rows[0])
            return res.data.data.rows;
        }
        return [];
    } catch (e) {
        return [];
    }
}

// https://api.orderly.org/v1/public/futures