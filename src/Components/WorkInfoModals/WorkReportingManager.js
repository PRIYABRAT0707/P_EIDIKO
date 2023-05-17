import { Autocomplete, Box, Button, Card, CardContent, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Person3Icon from '@mui/icons-material/Person3';
import { useState } from 'react';
import userServiceModule from '../../Services/user-service/UserService';
import Swal from 'sweetalert2';
import { GlobalButton } from '../stylecomponent/GlobalButton';
import {Divider} from '@mui/material';
import Loading from '../../Components/LoadingComponent/Loading';
import { helpFunction } from '../../Components/HelperComponent/helpFunction';
import { toast } from "react-toastify";
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';


export const WorkReportingManager = (props) => {
    //method for date format for modified date
const dateFormat=(date)=>{
    let date1=""
if(date.length>0){
   date1= date.slice(0,10)
return date1
}else{
    return "null"
}

}
//----------------------

const[manager1,setManager1]=useState(props.manager1)
console.log(manager1)
const[empId,setEmpId]=useState(manager1.empId)
const[managerId,setManagerId]=useState(manager1.reportingManagerId)
const[modifiedby,setModifiedBy]=useState(manager1.modifiedBy)
console.log(modifiedby)
const[modifiedDate,setModifiedDate]=useState(dateFormat(manager1.modifiedDate))
const[reportingManager,setReportingManager]=useState(manager1.reportingManagerName)
const [startDate,setstartDate]=useState(manager1.startDate)
const [endDate,setEndDate]=useState(manager1.endDate)



//AutoComplete
const [data, setData]=useState([]);
const[records,setRecords]=useState();

useEffect(()=>{
 AutoEmpSearch(records).then((res)=>{
   setData(res.data.result)
 })

   },[records])
   //-------------
  const [initialStartDate,setInitialStartDate]=useState(function stringToDate(){
    let sd=props.startdate
    
    return new Date(sd).toISOString().slice(0, 10)
  })

  const[initialEndDate,setInitialEndDate]=useState(function stringToDate(){
    let ed=props.enddate
    
    return new Date(ed).toISOString().slice(0,10)
  })

const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
  const textfield1={width: 400}
   //const state1=useLocation(props.state)
  

   
   
   // const navigate=useNavigate()
    
 const [state, setState] =useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    });
 
const { vertical, horizontal, open } = state;
const [isLoading,setIsLoading]=useState(false)
// const[modalClose,setModalClose]=useState(props.onClose1)



const reportingManagerModalHandle=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    let endDate1=helpFunction.endDateManipulation(initialEndDate)
    // EmployeeAccessLevelService.updateReportingManager(empId,managerId,initialStartDate,endDate1).then((res)=>{
    //     if(res.status===201 && res.statusMessage==='success'){

    //         setIsLoading(false)
    //         // setModalClose(true)
    //         toast.success(res.message, {
    //             position: toast.POSITION.TOP_CENTER
    //           });
    //         // Swal.fire({
    //         //     position: 'center',
    //         //     icon: 'success',
    //         //     title: res.message,
    //         //     showConfirmButton: false,
    //         //     timer: 1500 })
    //         }
    //     else{

    //         setIsLoading(false)
    //         toast.error(res.message, {
    //             position: toast.POSITION.TOP_CENTER
    //         });
    //         }
    //          }).catch((error)=>{

    //             setIsLoading(false)
    //             toast.error(error.response.data.message, {
    //                 position: toast.POSITION.TOP_CENTER
    //             });
    //  })
    
    
    }

     const [employee, setEmployee] = useState({
        "fromDate":"",
        "toDate":"",
        "empId": ""
    });

    return (
        isLoading?<Loading/>:
        <Card style={{ maxWidth: 670, padding: "13px 5px", margin: "0 auto" ,marginTop:"55px"}}>
        <CardContent>
            <center>
            <Grid>
            
                 <Typography style={{fontSize:"25px",marginBottom:"10px"}} color="primary">
                 Reporting Manager
                 </Typography>     
            </Grid>
            </center>
            <GlobalButton.GlobalDivider/>
        <Container style={{padding:"20px"}}>
            <form onSubmit={reportingManagerModalHandle}>
            <Paper elevation={0} style={{width:"auto"}} >

              <Box sx={{ flexFlow: 1 }}>
                <Grid container spacing={1} gap={1} 
                 justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
                 <Grid item xs={12} 
                 sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                     }}>
                        <TextField required value={empId} name="empId"  className='outlined-basic-text-box' id="outlined-basic" 
                        label="Employee Id" variant="outlined" style={textfield1} disabled type='number'
                        onChange={(e)=>{setEmpId(e.target.value)}} ></TextField>
                    </Grid>

                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Autocomplete 
            sx={{display:"flex"}}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                style={textfield1}
                                required
                                value={managerId}
                                 {...params} 
                                label='Manager Id'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                // OptionEqualToValue={employee.empId}
                               
                               onChange={(e)=>{setManagerId(e.target.value)}}
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />}
            />

                        {/* <TextField required value={props.managerId} 
                        onChange={(e)=>{setManagerId(e.target.value)}} 
                        className='outlined-basic-text-box' id="outlined-basic" 
                        label="Manager Id" variant="outlined" 
                        style={textfield1} type='number' /> */}
                    </Grid>
                    {/* <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        <TextField required value={modifiedby} 
                        onChange={(e)=>{setModifiedBy(e.target.value)}} 
                        className='outlined-basic-text-box' id="outlined-basic"
                         label="Modified By" variant="outlined" 
                        style={textfield1} type='text' />
                    </Grid>

                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
            <TextField required value={modifiedDate}
             onChange={(e)=>{setModifiedDate(e.target.value)}} 
            className='outlined-basic-text-box' id="outlined-basic1" 
            label="Modified Date" variant="outlined" 
            style={textfield1} type='date' />  
                    </Grid >
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
            <TextField required  
            className='outlined-basic-text-box' id="outlined-basic1" 
            label="Manager Name" variant="outlined" 
            style={textfield1} type='text' 
            value={reportingManager}
             onChange={(e)=>{setReportingManager(e.target.value)}} 
            />  
                    </Grid > */}

                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
            <TextField required value={startDate} 
            onChange={(e)=>{setstartDate(e.target.value)}} 
            className='outlined-basic-text-box' id="outlined-basic1" 
            label="Start Date" variant="outlined" 
            style={textfield1} type='date' />  
                    </Grid >
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                <TextField className='outlined-basic-text-box' id="outlined-basic1" 
                label="End Date" variant="outlined" style={textfield1} type='date'
                value={endDate} onChange={(e)=>{setEndDate(e.target.value)}} />  
                </Grid >
                
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={button1}>UPDATE</Button>

                        <Button  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                    </Grid>
                    {/* <Grid item xs={12} sx={{justifyContent:"right",display:"flex"}}>
                         <Button onClick={handleRmClose} style={{marginRight:"32px",color:"red",fontWeight:"bold"}}>Cancel</Button>
                        </Grid> */}
                </Grid>
            </Box>
            </Paper>
            </form>
        </Container>
        <GlobalButton.GlobalDivider/>
        </CardContent>
        </Card>

    )
}
