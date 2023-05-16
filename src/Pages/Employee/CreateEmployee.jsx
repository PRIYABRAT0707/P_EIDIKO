import { PersonAddOutlined } from '@mui/icons-material'
import { Box, Button, Container, Grid, Snackbar, TextField, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Paper } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import { createEmployee } from '../../Services/employee-service/EmployeeService';
import Swal from 'sweetalert2';
import {Divider} from '@mui/material';
import {IconButton} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Loading from '../../Components/LoadingComponent/Loading';


const CreateEmployee = () => {

    const navigate=useNavigate()
    const employeeTableHandle=()=>{
        navigate("/user/employees")
    }


    const button1 = { backgroundColor: "#2196F3", color: "white", borderRadius: "20px", marginBottom: "20px", width: "18%" }
    const textfield1 = { width: 400 }
    const[isLoading,setIsLoading]=useState(false)

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    const handleClose = () => {
        setState({ ...state, open: false });
      };


    let date = new Date("2023-01-01");

    const [employee, setEmployee] = useState({
        "empId": "",
        "empName": "",
        "emailId": "",
        "dateOfJoining": date,
        "contactNo": ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
             
        createEmployee(employee).then(

            res => {
                
               // console.log(res);
                if (res.status === 200 && res.statusMessage === 'success') {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setEmployee({
                        "empId": "",
                        "empName": "",
                        "emailId": "",
                        "dateOfJoining": date,
                        "contactNo": ""
                    })
                } else {
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
            }
        ).catch(err => {
            setIsLoading(false)
            Swal.fire(
                {

                    position: 'center',
                    icon: 'error',
                    title: err.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                }

            )
        })

    }

//backbutton
const backbutton=useNavigate()
    return (
isLoading ? <Loading/> : 


        <Box style={{ backgroundColor: "#FFFFFF", height: "92vh" }}>
             <Box sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                alignContent:"center",
                marginRight:"30px",
                
            }}>
        
                    {/* <PersonAddOutlined sx={{
                        fontSize: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        margin: '10px 100px',
                        padding: '10px'
                    }} /> */}

                <Typography color={"secondary"}style={{marginLeft:"34px",fontSize:"26px"}}>Create Employee</Typography>
                <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                 onClick={()=>{backbutton("/user/employees")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
            </Box>

            

            <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}} />

            <Container style={{ padding: "20px" }}>
                <Paper elevation={0} style={{ width: "auto" }} >

                    <form onSubmit={handleSubmit} >
                        <Box sx={{ flexFlow: 1 }}>
                            <Grid container spacing={1} gap={1} justifyContent={"center"} alignItems={"center"} alignContent={"center"}>

                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextField required type='number' className='outlined-basic-text-box' id="outlined-basic" label="Employee Id" variant="outlined" style={textfield1}
                                        value={employee.empId}
                                        onChange={(event) => setEmployee({
                                            ...employee, empId: event.target.value
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextField required  InputProps={{ inputProps: { maxLength:50,minLength:5} }} className='outlined-basic-text-box' id="outlined-basic" label="Employee Name" variant="outlined" style={textfield1}
                                        value={employee.empName}
                                        onChange={(event) => setEmployee({
                                            ...employee, empName: event.target.value
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextField required type='email' className='outlined-basic-text-box' id="outlined-basic" label="Employee Email-Id" variant="outlined" style={textfield1}
                                        value={employee.emailId}
                                        onChange={(event) => setEmployee({
                                            ...employee, emailId: event.target.value
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DatePicker label="Date Of Joining"  className='outlined-basic-text-box' sx={{ width: 400 }} 
                                            value={employee.dateOfJoining}
                                            onChange={(newValue) => setEmployee({
                                                ...employee,dateOfJoining:newValue
                                            })}
                                        />
                                    </LocalizationProvider> */}

                                    <TextField required className='outlined-basic-text-box' id="outlined-basic" label="Date of Joining" variant="outlined" style={textfield1} type='date'
                                        value={employee.dateOfJoining}
                                        onChange={(event) => setEmployee({
                                            ...employee, dateOfJoining: event.target.value
                                        })}
                                    />

                                </Grid >
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextField required type='number' InputProps={{ inputProps: { max:9999999999,min:1111111111} }} className='outlined-basic-text-box' id="outlined-basic" label="Contact No" variant="outlined" style={textfield1}
                                        value={employee.contactNo}
                                        onChange={(event) => setEmployee({
                                            ...employee, contactNo: event.target.value
                                        })}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Button variant="contained" type='submit' style={button1}>Create</Button>
                                </Grid>

                            </Grid>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>

    )
}

export default CreateEmployee