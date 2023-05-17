import { Box, Button, Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React from 'react'
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



export const WorkLocationNew = (props) => {

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


  //---------------------------------------


  const[managerId,setManagerId]=useState(props.manager)
  console.log(managerId)
  const [startDate,setStartDate]=useState(function stringToDate(){
    let sd=managerId.startDate
    
    return new Date(sd).toISOString().slice(0, 10)
  })

  const[endDate,setEndDate]=useState(function stringToDate(){
    let ed=managerId.endDate
    
    return new Date(ed).toISOString().slice(0,10)
  })
 
//for getting empId
const[empId,setEmpId]=useState(props.empId)

const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
  const textfield1={width: 400}

    
 const [state, setState] =useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    });
 
const { vertical, horizontal, open } = state;
// const[empId,setEmpId]=useState(props.empId)

const [isLoading,setIsLoading]=useState(false)
// const[modalClose,setModalClose]=useState(props.onClose1)



const workLocationModalHandle=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    let endDate1=helpFunction.endDateManipulation(endDate)
    EmpUpdateService.updateWorkingLocation(empId,startDate,endDate).then((res)=>{//,LOCATION
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

     //location
     const workinFromHandle=(e)=>{
        setWorkingFrom(e.target.value)
    }
    const[workingFrom,setWorkingFrom]=useState("")
    const[location,setLocation]=useState(managerId.location)




    return (
        isLoading?<Loading/>:
        <Card style={{ maxWidth: 670, padding: "13px 5px", margin: "0 auto" ,marginTop:"55px"}}>
        <CardContent>
            <center>
            <Grid>
                 <Typography style={{fontSize:"25px",marginBottom:"10px"}} color="primary">
               WORK LOCATION
                 </Typography>     
            </Grid>
            </center>
            <GlobalButton.GlobalDivider/>
        <Container style={{padding:"20px"}}>
            <form onSubmit={workLocationModalHandle}>
            <Paper elevation={0} style={{width:"auto"}} >

              <Box sx={{ flexFlow: 1 }}>
                <Grid container spacing={1} gap={1}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
                 {/* <Grid item xs={12} 
                 sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                     }}>
                        <TextField required value={props.empId} name="empId"  className='outlined-basic-text-box' id="outlined-basic" 
                        label="Location Id" variant="outlined" style={textfield1} disabled type='number' ></TextField>
                    </Grid> */}
                <Grid item xs={12} 
                 sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                     }}>
                        <TextField required value={empId} name="empId"  className='outlined-basic-text-box' id="outlined-basic" 
                        label="Employee Id" variant="outlined" style={textfield1} disabled type='number'
                        onChange={(e)=>{setEmpId(e.target.value)}}
                         >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
            <TextField required value={startDate} 
            onChange={(e)=>{setStartDate(e.target.value)}} 
            className='outlined-basic-text-box' id="outlined-basic1" 
            label="Start Date" variant="outlined" 
            style={textfield1} type='date' />  
                    </Grid >
                   
                    <Grid item xs={12}className='form-group row'
             sx={{display:'flex',
                                justifyContent:'center',
                                // alignItems:'center'
                                marginRight:"209px"
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
                                      value={endDate}
                          onChange={(e) => {setEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }

                <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                                <FormControl sx={{display:'flex',width:400}}>
                                    <InputLabel id="demo-simple-select-label">Work Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={wl}
                                        label="WorkLocation"
                                        name="workingfrom"
                                      onChange={workinFromHandle}
                                      value={workingFrom}

                                    >
                                        <MenuItem value="CLIENT_LOCATION" >CLIENT_LOCATION</MenuItem>
                                        <MenuItem   value="WFO">WFO</MenuItem>
                                        <MenuItem   value="WFH">WFH</MenuItem>
                                    </Select>
                                </FormControl>
                        </Grid>

                         {workingFrom==="CLIENT_LOCATION" ? 
                        <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                            <TextField value={location} 
                            onChange={(e)=>{setLocation(e.target.value)}} 
                            className='outlined-basic-text-box'
                             id="outlined-basic" label="Location" 
                             variant="outlined" style={textfield1} />
                        </Grid>

                        :null
 
                        }
                             





{/*                   
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                <TextField className='outlined-basic-text-box' id="outlined-basic1" 
                label="Location" variant="outlined" style={textfield1} type='text'
                 />  
                </Grid > */}
                {/* 
                  <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                <TextField className='outlined-basic-text-box' id="outlined-basic1" 
                label="Working From" variant="outlined" style={textfield1} type='text'
                 />  
                </Grid >

                <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        <TextField required value={props.managerId} 
                        onChange={(e)=>{setManagerId(e.target.value)}} 
                        className='outlined-basic-text-box' id="outlined-basic" 
                        label="Modified By" variant="outlined" 
                        style={textfield1} type='number' />
                    </Grid> */}
                
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
