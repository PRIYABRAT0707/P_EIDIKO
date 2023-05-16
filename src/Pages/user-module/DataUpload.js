
import { Grid, Paper , TextField, Button, Input,Box,Link,Typography,Container, Divider} from "@mui/material";
import FingerprintIcon from '@mui/icons-material/Fingerprint';

import InventoryIcon from '@mui/icons-material/Inventory';
import { Dropzone } from "@mantine/dropzone";
import Swarm from "../../images/Swarm.png"
import { useState } from "react";
import { BiometricServiceModule } from "../../Services/BiometricService/BiometricServiceModule";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useDropzone } from "react-dropzone";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import axios from "axios";
import { toast } from "react-toastify";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


export default function DataUpload(){
    const button1={backgroundColor:"#2196F3",color:"white",borderRadius:"20px",marginBottom:"20px",width:"22%"}
    const textfield1={width: 400,height:100}
const[biometric,setBiometric]=useState([])


const fileHandler=(file)=>{
  setBiometric(file[0])

 document.getElementById("uploadFile").value=file[0].name;

}
const fileDataSubmit=(e)=>{
e.preventDefault()
console.log(biometric);
axios.post(`https://v2.convertapi.com/upload`,{"file":biometric}).then((res)=>{
    console.log(res.data);
if(res.status===200){
    toast.success("file successfully uploaded",{position:toast.POSITION.TOP_RIGHT})
    setBiometric("");
}
else{
    toast.error(res.message,{position:toast.POSITION.TOP_RIGHT})
}

}).catch((error)=>{
    toast.error(error.message,{position:toast.POSITION.TOP_RIGHT})
})

}


  //backbutton
  const backbutton=useNavigate()



return(
    <Box style={{backgroundColor:"#FFFFFF",height:"92vh"}}>
        <form onSubmit={fileDataSubmit} encType="multipart/form-data">

    
    <Box sx={{
           display: 'flex',
           alignContent: 'center',
           justifyContent: 'space-between',
           alignContent:"center",
           marginRight:"30px",
           
       }}>
        <Typography color={"secondary"}style={{marginLeft:"34px",fontSize:"26px"}}>Bio-Metric</Typography>
           <Grid style={{justifyContent:"center"}}>
           <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
            onClick={()=>{backbutton("#")}}
            startIcon={<ArrowBackIosNewIcon/>}>
       back
           </Button>
           </Grid>
       </Box>


    <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />
    
    
    <section className="dropbox">

    <Container style={{padding:"20px",marginTop:10}} className="container">
        <Paper elevation={0} style={{width:"auto"}} >
        {/* <form onSubmit={fileDataSubmit} encType="multipart/form-data"> */}
        
        <Box sx={{ flexFlow: 1 }}>
            <Grid container spacing={1} gap={3}  justifyContent={"center"}
             alignItems={"center"} alignContent={"center"}>

                <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>


   <Dropzone id="file-upload" maxFiles={3} multiple={true} loading={false} value={biometric}  onDrop={fileHandler} 
   ssx={{height:"25vh",width:"30vw",border:"3px solid #2196F3",backgroundColor:"#4fc3f7",display:"flex",}}>
       
       <Grid container style={{height:"26vh",width:"32vw",}} >
      

        <Grid item xs={12} sx={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
        <Typography align="center"> Drag  or click here to select files</Typography>
        
        </Grid>

      <Grid item xs={12} sx={{ display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
            {/* <InventoryIcon  sx={{borderRadius:"50%",fontSize:"90px"}}></InventoryIcon> */}
            <img style={{width:"150px",height:"120px"}}src='https://www.pngall.com/wp-content/uploads/2/Upload-PNG-Image-File.png'></img>
        </Grid>
<Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
{/* <Input disabled id="uploadFile"></Input> */}<Button variant="outlined">Select File <InsertDriveFileOutlinedIcon style={{fontSize:"16px"}}/></Button>
</Grid>


          
      </Grid>   
       </Dropzone>

                </Grid>

<Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>

                        <Button type="submit" sx={{marginBottom:"10px"}}  variant='contained'  >Upload <FileUploadOutlinedIcon/></Button>
                    </Grid>
            

            </Grid>
        </Box>
        {/* </form> */}
        </Paper>
    </Container>
    </section>
   { biometric!==null ? <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",marginLeft:"55px",marginTop:"15px"}}>
    <Input disabled id="uploadFile"></Input>
<Button type="reset"><ClearOutlinedIcon  style={{color:"red"}}/></Button>
</Grid>:null}
<Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px",marginTop:"55px"}}  />

</form>
</Box>


        


    )

}