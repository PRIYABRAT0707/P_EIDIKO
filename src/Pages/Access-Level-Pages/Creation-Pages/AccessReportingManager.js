

import Person3Icon from '@mui/icons-material/Person3';
import { Box,TextField,Typography,Paper,Grid,Container, Autocomplete} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import {Divider} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from 'react-router';
import Loading from '../../../Components/LoadingComponent/Loading';
import AutoEmpSearch from '../../../Services/AutoEmpSearch/AutoEmpSearch';
import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import dayjs from 'dayjs';


export default function AccessReportingManager(props){
    const{state}=useLocation(props.state)
    const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
    const textfield1={width: 400}
    const[empId,setEmpId]=useState(state.empId)
    const[managerId,setManagerId]=useState("")
    const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))
    const [endDate,setEndDate]=useState("")
    const [isloading ,setIsLoading]=useState(false)
    const navigate=useNavigate()

const reportingManagerHandle=(e)=>{
    e.preventDefault()
    
    setIsLoading(true)
    let endDate1=helpFunction.endDateManipulation(endDate)

    EmployeeAccessLevelService.CreateReportingManagerFromProfile(empId,managerId,startDate,endDate1).then((res)=>{
       console.log(res)
        if(res.status===201 && res.statusMessage==='success'){
            setIsLoading(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1500
            })
           
        }
        else{
            setIsLoading(false)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: res.message,
                showConfirmButton: false,
                timer: 1500
            }
            )
        }

    }).catch((error)=>{
        setIsLoading(false)
        Swal.fire(
            {
                position: 'center',
                icon: 'error',
                title: error.message,
                showConfirmButton: false,
                timer: 1500
            }

        )

    })

}

 const backbutton=useNavigate()

const [data, setData]=useState([]);
const[records,setRecords]=useState();

useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })
    },[records])

    
    return(
        isloading ? <Loading/> :
        <Box style={{backgroundColor:"#FFFFFF",height:"92vh"}}>
<Box sx={{display:"flex",
                 justifyContent:"space-between",alignContent:"center",marginRight:"30px"}}>
                
                  <center><Typography color={"secondary"} style={{marginLeft:"34px",fontSize:"26px"}}>Reporting Manager</Typography></center>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                 onClick={()=>{backbutton(`../employee-reportingManager-via-profile`,{state:{"empId":empId}})}}
                 startIcon={<ArrowBackIosNewIcon/>}>
                back
                </Button>
                </Grid>
                 </Box>

        <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />

        <Container style={{padding:"20px"}}>
            <form onSubmit={reportingManagerHandle}>
            <Paper elevation={0} style={{width:"auto"}} >

            
            <Box sx={{ flexFlow: 1 }}>
                <Grid container spacing={1} gap={3}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>

                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <TextField label="Employee Id" value={empId} disabled style={textfield1}></TextField>
                     {/* <Autocomplete 
            sx={{display:"flex"}}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                style={textfield1}
                                required
                                 value={empId}
                                 {...params} 
                                label='Employee Id'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                // OptionEqualToValue={employee.empId}
                                type='text'
                               onChange={(e)=>{setManagerId(e.target.value)}}
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} /> */}
                    
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
                                label='ManagerId'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                // OptionEqualToValue={employee.empId}
                                type='text'
                               onChange={(e)=>{setManagerId(e.target.value)}}
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} />
                       
                    </Grid>
                   
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                       
              <TextField InputLabelProps={{shrink:true}} required value={startDate} onChange={(e)=>{setstartDate(e.target.value)}} className='outlined-basic-text-box' id="outlined-basic1" label="Start Date" variant="outlined" style={textfield1} type='date'
                                        
                                    />  

                    </Grid >
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        
                        <TextField InputLabelProps={{shrink:true}} className='outlined-basic-text-box' id="outlined-basic1" label="End Date" variant="outlined" style={textfield1} type='date'
                                    value={endDate} onChange={(e)=>{setEndDate(e.target.value)}}
                                    />  

                    </Grid >
                   
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        <Button type='submit' disableElevation variant="contained" style={button1}>Submit</Button>
                    </Grid>

                </Grid>
            </Box>
            </Paper>
            </form>
        </Container>
    </Box>

               


    )



}