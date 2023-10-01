import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from "./types";

// create endpoints to call backend

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products", "Transactions"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>, void>({ //endpoint
            query: () => "kpi/kpis/",
            providesTags: ["Kpis"]
        }),
        getProducts: build.query<Array<GetProductsResponse>, void>({ //endpoint
            query: () => "product/products/",
            providesTags: ["Products"]
        }),
        getTransactions: build.query<Array<GetTransactionsResponse>, void>({ //endpoint
            query: () => "transaction/transactions/",
            providesTags: ["Transactions"]
        })
    })
}) 

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api