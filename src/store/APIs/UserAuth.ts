import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { HOST } from "../../assets/global";
import { IUser, IUserData, IUserCreds, IMe } from "../../assets/types/types";


export const userAuthAPI = createApi({
  reducerPath: "userAuthAPI",
  baseQuery: fetchBaseQuery({baseUrl: `${HOST}/`}),
  endpoints:(builder) => ({
    me: builder.query<IMe, string>({
      query:(token) => ({ 
        url:"auth/users/me",
        headers: { Authorization: `Token ${token}` }
      })
    }),
    createUser: builder.mutation<string, IUserData>({
      query: (userData) => ({
        url: "auth/users/",
        method: "post",
        body: userData
      })
    }),
    loginUser: builder.mutation<{auth_token: string}, IUserCreds>({
      query: (creds) => ({
        url: "auth/token/login/",
        method: "post",
        body: creds
      })
    }),
    saveAdditionalData: builder.mutation<string, IUser>({
      query: (user) => ({
        url: "user_auth/reg/",
        method: "put",
        body: user
      }),
    })
  })
})

