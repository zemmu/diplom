import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HOST } from "../../assets/global";
import { IFilteredLocation, ILocation } from "../../assets/types/types";



export const locationsAPI = createApi({
    reducerPath: "locationsAPI",
    baseQuery: fetchBaseQuery({baseUrl: `${HOST}/recs`}),
    endpoints: (builder) => ({
        getLocations: builder.query<ILocation[], any>({
            query: () => ({
                url: "/location",
            }),
        }),
        getRecs: builder.query<IFilteredLocation[], {gtib_id: string, user_id: number | undefined}>({
            query: (args) => ({
                url: `/rec`,
                params: {
                    gtib_id: args.gtib_id,
                    user_id: args.user_id
                }
            }),
        })
    })
})