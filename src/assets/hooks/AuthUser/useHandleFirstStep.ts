import { useEffect, useState } from "react";
import { userAuthAPI } from "../../../store/APIs/UserAuth";
import { IUserData } from "../../types/types";




const useHandleFirstStep = (userData: IUserData) => {
  const [regUser] = userAuthAPI.useCreateUserMutation();

  const handleRegUser = async () => { 
    try {
      const data = await regUser(userData)
      // @ts-ignore
      if (data?.error) {
        // @ts-ignore
        console.log(data?.error?.data);
        return {
          status: false,
          user: {}
        }
      } 
    
      return {
        status: true,
        // @ts-ignore
        user: data?.data
      }
    } catch (error) {
      console.log(error)
      return {
        status: false,
        user: {}
      }
    }
   };


   return {handleRegUser}
};

export default useHandleFirstStep;