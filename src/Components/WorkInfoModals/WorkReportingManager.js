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
import { EmpUpdateService } from '../../Services/Employee-Update-Service/EmpUpdSer';
import { toast } from "react-toastify";
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import RemoveIcon from '@mui/icons-material/Remove';


export const WorkReportingManager = (props) => {
   
     //------EndDate
  const[visible,setVisible]=useState(false);
  const[status,setStatus]=useState("click")

  const handlelerButton=(e)=>{
if(status==="click"){
 setVisible(true)
  setStatus("")
}
else if(status!==1){
setVisible(false)
 setStatus("click")
}
  }
  //------------
    
    
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

const[empId,setEmpId]=useState(manager1.empId)
const[managerId,setManagerId]=useState(manager1.reportingManagerId)
const[modifiedby,setModifiedBy]=useState(manager1.modifiedBy)

const[modifiedDate,setModifiedDate]=useState(dateFormat(manager1.modifiedDate))
const[reportingManager,setReportingManager]=useState(manager1.reportingManagerName)
const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))
const [endDate,setEndDate]=useState("")



//AutoComplete
const [data, setData]=useState([{
    empId:727
}]);
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
    EmpUpdateService.updateReportingManager(empId,managerId,initialStartDate,endDate1).then((res)=>{
        if(res.status===201 && res.statusMessage==='success'){

            setIsLoading(false)
            // setModalClose(true)
            toast.success(res.message, {
                position: toast.POSITION.TOP_CENTER
              });
            // Swal.fire({
            //     position: 'center',
            //     icon: 'success',
            //     title: res.message,
            //     showConfirmButton: false,
            //     timer: 1500 })
            }
        else{

            setIsLoading(false)
            toast.error(res.message, {
                position: toast.POSITION.TOP_CENTER
            });
            }
             }).catch((error)=>{

                setIsLoading(false)
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
     })}

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
                REPORTING MANAGER
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
                     value={managerId}
            sx={{display:"flex"}}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                style={textfield1}
                                required
                               
                                 {...params} 
                                label='Manager Id'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                // OptionEqualToValue={employee.empId}
                               
                               onChange={(e)=>{setManagerId(e.target.value)}}
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />}
            />

                     </Grid>

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




                    <Grid item xs={12}className='form-group row'
             sx={{display:'flex',
                                justifyContent:'center',
                                // alignItems:'center'
                                marginRight:"199px"
                            }}>

                     <Grid className='col-sm-2  mt-2'>
                      
                      {
                        status==="click"?<Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         :
                         <Button>
                        <RemoveIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                      }
                     <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>

                   
                 </Grid>
                  </Grid>
                  
                  { 
                  visible ?
                  
                     <Grid item xs={12} sx={{display:'flex',
                                justifyContent:'center',
                                // alignItems:'center'
                            }}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={textfield1} type='date'
                                      value={initialEndDate}
                          onChange={(e) => {setInitialEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }

               
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
