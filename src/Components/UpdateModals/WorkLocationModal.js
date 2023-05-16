import { Box, Button, Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import React from 'react'
import WorkIcon from '@mui/icons-material/Work';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GlobalButton } from '../stylecomponent/GlobalButton';
import {Typography} from '@mui/material';
import { EmpUpdateService } from '../../Services/Employee-Update-Service/EmpUpdSer';
import Loading from "../../Components/LoadingComponent/Loading";
import Swal from 'sweetalert2';
import { helpFunction } from "../../Components/HelperComponent/helpFunction";
import { toast } from "react-toastify";

export const WorkLocationModal = (props) => {
const [initialStartDate,setInitialStartDate]=useState("")
const[initialEndDate,setInitialEndDate]=useState("")
const[location,setLocation]=useState("")
const[wloc,setWloc]=useState("")
const[empId,setEmpId]=useState(props.empId)
const[empWorkLocationId,setempWorkLocationId]=useState(props.working.empWorkLocationId)

const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
const textfield1={width: 400}
const[isLoading,setIsLoading]=useState(false)
let func1=props.onClose1

const updateEmployeeWorkInfo=(e)=>{
e.preventDefault()
setIsLoading(true)
let endDate1=helpFunction.endDateManipulation(initialEndDate)
EmpUpdateService.updateWorkingLocation(empWorkLocationId,empId,initialStartDate,endDate1,location,wloc).then((res)=>{

    if(res.status===200 && res.statusMessage==='success' ){
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
    toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
    });
    func1()
})

}




    return (
        isLoading ? <Loading/> :
        <Card style={{ maxWidth: 500, padding: "13px 5px", margin: "0 auto" ,marginTop:"10px"}}>
        <CardContent>
            <center>
                <Grid>
                <WorkIcon sx={{
                    fontSize: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#2196F3',
                    color: 'black',
                    margin: '10px 100px',
                    padding: '10px'
                }} />
                <Typography  style={{fontSize:"25px"}} color="primary">
           Update Working Location
        </Typography>
                </Grid>
                <p>
                <GlobalButton.GlobalDivider/></p>
            </center>


<Container style={{padding:"2px"}}>

        <Paper elevation={0} style={{width:"auto"}} >


          <form onSubmit={updateEmployeeWorkInfo}> 
        <Box sx={{ flexFlow: 1 }}>
        <Grid container spacing={1} gap={1.5}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
        <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
                    <TextField value={props.empId} className='outlined-basic-text-box' id="outlined-basic" label="Employee Id" variant="outlined" disabled sx={{width:400}}/>
                </Grid>

                <Grid  item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>                                 
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Start Date"  className='outlined-basic-text-box'  sx={{width:400}} />
                    </LocalizationProvider> */}
              <TextField InputLabelProps={{shrink: true,}} required value={initialStartDate} onChange={(e)=>{setInitialStartDate(e.target.value)}} className='outlined-basic-text-box' id="outlined-basic1" label="Start Date" variant="outlined" style={textfield1} type='date' />  


                </Grid>
                <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="End Date" defaultValue={dayjs('2023-01-01')} className='outlined-basic-text-box'  sx={{width:400}} />
                 </LocalizationProvider>       */}
                 <TextField InputLabelProps={{shrink: true,}} className='outlined-basic-text-box' id="outlined-basic1" label="End Date" variant="outlined" style={textfield1} type='date'
                value={initialEndDate} onChange={(e)=>{setInitialEndDate(e.target.value)}} />  
                </Grid>
                <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
                        <FormControl sx={{display:'flex',width:400}}>
                            <InputLabel id="demo-simple-select-label">Work Location</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e)=>{setLocation(e.target.value)}}
                                label="WorkLocation" 
                                value={location}>

                                <MenuItem value="CLIENT_LOCATION">CLIENT_LOCATION</MenuItem>
                                <MenuItem value="WFO">WFO</MenuItem>
                                <MenuItem value="WFH">WFH</MenuItem>
                            </Select>
                        </FormControl>
                </Grid>

                {location==="CLIENT_LOCATION" ?
                <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
                    <TextField className='outlined-basic-text-box' id="outlined-basic" label="Location" variant="outlined" style={textfield1} 
                    value={wloc} onChange={(e)=>{setWloc(e.target.value)}} />
                </Grid> :null}

                <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
            
            <Button sx={{marginTop:"10px"}} type="submit" variant="contained"   style={GlobalButton.OperationButton} >UPDATE</Button>
               <Button sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                </Grid>
                {/* <Grid item xs={12} sx={{justifyContent:"right",display:"flex"}}>
                     <Button onClick={handleWlClose} style={{marginRight:"32px",color:"red",fontWeight:"bold"}}>Cancel</Button>
                    </Grid> */}

                    
            </Grid>
            </Box>

            </form> 
</Paper>
</Container>
<GlobalButton.GlobalDivider/>  
</CardContent>

    </Card>

    )
}
