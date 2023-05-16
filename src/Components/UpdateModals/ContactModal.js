import {Button, Card, CardContent,TextField,Grid,Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { GlobalButton } from '../stylecomponent/GlobalButton';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { EmpUpdateService } from '../../Services/Employee-Update-Service/EmpUpdSer';
import { toast } from "react-toastify";
import Loading from '../LoadingComponent/Loading';



export const ContactModal= (props) => {
   
    const[contact,setContact]=useState(props.contact)
    const[isLoading,setIsLoading]=useState(false)
const[empId,setEmpId]=useState(props.empId)
let func1=props.onClose

    const handleContact=(e)=>{
        setIsLoading(true)
        EmpUpdateService.updateContact(contact,empId).then((res)=>{
           // console.log(res)
    if(res.status===200 && res.statusMessage==='success' )
    {
         setIsLoading(false)
         toast.success(res.message, {
             position: toast.POSITION.TOP_CENTER
           });
           func1()
    }
    else{
        setIsLoading(false)
        toast.error(res.message, {
            position: toast.POSITION.TOP_CENTER
        });
        func1()
    }

    
    }).catch((error)=>{
        setIsLoading(false)
        toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER
        });
        func1()
    })
}
 
    return (
        isLoading?<Loading/>:
     
            <Card style={{ maxWidth: 400, padding: "13px 5px", margin: "0 auto" ,marginTop:"150px"}}>
                                        <CardContent>


                                        <Box sx={{
              display: 'flex',
            alignContent: 'center',
            justifyContent: 'center'
        }}>                       
                <ContactPhoneIcon sx={{
                    fontSize: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#2196F3',
                    color: 'black',
                    margin: '10px 100px',
                    padding: '10px'
                }} /> </Box>

                                            <center>
                                                <Typography style={{fontSize:"25px"}} color="primary">Update Contact</Typography>
                                                <GlobalButton.GlobalDivider/>
                                            
                                             <form onSubmit={handleContact}>
                                                <Grid container spacing={1} >
                                                    <Grid item xs={12} sx={{justifyContent:"center",display:"flex"}}>
                                                    <TextField value={contact} onChange={(e)=>{setContact(e.target.value)}} type="number" label="Update Contact" required placeholder="update contact" variant='outlined'  style={{width:"550px",marginTop:"15px"}}></TextField>
                                                    </Grid>
                                                    <Grid item xs={12} >
                                                     <Button sx={{marginTop:"10px"}} type="submit" variant="contained"   style={GlobalButton.OperationButton} >UPDATE</Button>
                                                     <Button  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose}  variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                                                    </Grid>
                                                  
                                                </Grid>
                                                </form>
                                                <GlobalButton.GlobalDivider/>
                                            </center>
                                        </CardContent>
            </Card>

    )
}
