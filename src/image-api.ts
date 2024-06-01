import axios from "axios";
import { Images } from "./types";

const API_KEY = "JlndqMeT14v0DbGn_8sX7HLiugjRkXzRSQkrDAvNevQ";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos";

export const fetchImages = async (
  currentPage: number,
  searchQuery: string
): Promise<[Images]> => {
  const response = await axios.get("", {
    params: {
      query: searchQuery,
      page: currentPage,
      per_page: 8,
      orientation: "landscape",
      client_id: API_KEY,
    },
  });

  return response.data.results;
};
