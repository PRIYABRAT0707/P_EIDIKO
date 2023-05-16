 import { Divider } from "@mui/material"
 export const GlobalButton={

   OperationButton: {backgroundColor:"#2196F3",color:"white",borderRadius:"20px",marginBottom:"20px",width:"22%"},

   
   HaltButton:{backgroundColor:"#d50000",color:"white",borderRadius:"20px",marginBottom:"20px",width:"22%"},
   GlobalDivider:function(){

    return(
        <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />
    )
   }


}