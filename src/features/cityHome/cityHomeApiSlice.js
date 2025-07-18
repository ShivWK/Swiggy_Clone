import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cityHomeApiSlice = createApi({
  reducerPath: "cityHome",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swiggy-clone-klzu.onrender.com/api/zestyeats",
  }),
  keepUnusedDataFor: 120,

  endpoints: (builder) => ({
    getDataForCityLocalityCuisine: builder.query({
      query: ({ city, type }) => ({
        url: "/city-locality-cuisine-data",
        params: { city, type },
      }),
    }),

    getRestaurantChainInCityData: builder.query({
      query: ({ city, restaurant }) => ({
        url: "/restaurant-chain-in-city",
        params: { city, restaurant },
      }),
    }),

    getDishInCityData: builder.query({
      query: ({ city, dish }) => ({
        url: "/popular-dish-in-city",
        params: { city, dish },
      }),
    }),
  }),
});

export default cityHomeApiSlice;
export const {
  useLazyGetDataForCityLocalityCuisineQuery,
  useLazyGetRestaurantChainInCityDataQuery,
  useLazyGetDishInCityDataQuery,
} = cityHomeApiSlice;
