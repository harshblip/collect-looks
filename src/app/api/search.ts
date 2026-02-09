import { apiClient } from "@/lib/apiClient";
import { BASE_URL } from "@/lib/constants";
import { Files, Filter } from "@/types/mediaTypes";

export const SearchService = {
  getSuggestions: async (
    word: string,
    userId: number,
    filters: Filter,
  ): Promise<Files[]> => {
    const { type, locked, starred, date } = filters;
    return apiClient.get<Files[]>(`${BASE_URL}/upload/getSuggestions`, {
      params: {
        userId: userId,
        words: word,
        type: type,
        starred: starred,
        locked: locked,
        date: date,
      },
    });
  },

  getSearchResults: async (word: string, userId: number): Promise<Files[]> => {
    return apiClient.get<Files[]>(`${BASE_URL}/upload/searchResults`, {
      params: {
        userId: userId,
        words: word,
      },
    });
  },
};
