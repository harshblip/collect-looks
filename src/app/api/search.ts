import { apiClient } from "@/lib/apiClient";
import { BASE_URL } from "@/lib/constants";
import { Files } from "@/types/mediaTypes";
import axios from "axios";

export const SearchService = {
    getSuggestions: async (word: string, userId: number): Promise<Files[]> => {
        return apiClient.get<Files[]>(`${BASE_URL}/upload/getSuggestions`, {
            params: {
                userId: userId,
                words: word
            }
        })
    },

    getSearchResults: async (word: string, userId: number): Promise<Files[]> => {
        return apiClient.get<Files[]>(`${BASE_URL}/upload/searchResults`, {
            params: {
                userId: userId,
                words: word
            }
        })
    }
}