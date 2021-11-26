import { useEffect, useState } from "preact/hooks"
import { baseApi } from "../api/api";
import { TokensI } from "../types"

export const useFetchTokens = () => {
    const [tokens, setTokens] = useState<TokensI[]>([]);

    const fetchTokens = async () => {
        const { data } = await baseApi.getTokens();
        setTokens(data);
    };

    useEffect(() => {
        fetchTokens();

        const fetchInterval = setInterval(() => {
            fetchTokens();
        }, 10000);

        return () => clearInterval(fetchInterval);
    }, [])

    return tokens;
}