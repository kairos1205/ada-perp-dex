import { BASE_BE_URL } from "@/utils/request";
import axios from "axios";

export const fetchAccount = async (wallet: string) => {
    try {
        console.log("BASE_BE_URL", BASE_BE_URL);
        const url = `${BASE_BE_URL}/api/user/${wallet}`;
        const res = await axios.get(url);
        console.log(res);
        if (res.data.account)
        {
            return res.data.account
        }
        return "";
    } catch (e) {
        console.log(e);
        return "";
    }
}