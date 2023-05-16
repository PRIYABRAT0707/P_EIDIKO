import axios from "axios"
import { baseUrl } from "../../Server/baseUrl"


export const BiometricServiceModule={

    biometricDataUpload: async function(file){
        let data=null
        await axios({
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': `application/x-www-form-urlencoded; charset=UTF`
              },
              withCredentials: true,
              credentials: 'same-origin',
            url: "http://192.168.1.210:9977/api/v1/biometric/fileupload",
            file: file,
            // headers: {
            //     'Content-Type' : `application/x-www-form-urlencoded; charset=UTF`,
            //     // 'Content-Type': `multipart/form-data`,
            //      "Access-Control-Allow-Origin": `*`,
            //     // " Access-Control-Allow-Methods": `GET, POST`,
            //     // "Access-Control-Allow-Headers": `Content-Type, Authorization`
            // },
        }).then((res)=>{data=res})

           return data
    },
    


}