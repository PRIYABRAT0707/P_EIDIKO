import { myAxios } from "../Server/MyAxios"



export const getProfileData=(empId)=>{
   return myAxios.get(`employee/get-employee/${empId}`).then((response) => response.data)
}