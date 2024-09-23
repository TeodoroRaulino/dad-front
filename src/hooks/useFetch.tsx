import api from "@/services/api";
import useSWR, { BareFetcher, SWRConfiguration } from "swr";

export default function useFetch<T>(
  url?: string | null,
  config?: SWRConfiguration<T, unknown, BareFetcher<T>>
) {
  const { data, error, mutate, isLoading } = useSWR<T>(
    url,
    async (url: string) => {
      const response = await api.get(url);

      return response.data;
    },
    config
  );

  return { data, error, mutate, isLoading };
}
