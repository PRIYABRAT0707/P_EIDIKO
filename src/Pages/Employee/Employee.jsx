import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Fade, Grid, IconButton, Modal, TextField, Typography } from '@mui/material'
import { AddLocation, Call, Create, Delete, Update } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate, useParams } from 'react-router';
import CommentIcon from '@mui/icons-material/Comment';
import { getProfileData } from '../../Services/ProfileService';
import userServiceModule from '../../Services/user-service/UserService';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import Swal from 'sweetalert2';
import {Paper } from '@mui/material';
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import {Checkbox,FormLabel,FormGroup,FormControlLabel} from '@mui/material';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
//updatemodals
import {ContactModal} from "../Access-Level-Pages/UpdateModals/ContactModal"
import Loading from "../../Components/LoadingComponent/Loading";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { updateEmployeeService } from '../../Services/employee-service/EmployeeService';
import GradingIcon from '@mui/icons-material/Grading';
import { FcNext } from "react-icons/fc";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const  convertDateToYyyyMmDd = (date) => {
    if (!date) return '';
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  };

const Employee = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [authorities, setAuthorities] = useState([]);
    const [reportingManagers, setReportingManagers] = useState({})
    const [workLocation, setWorkLocation] = useState({});
    const [shiftTimings, setShiftTimings] = useState({});
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [about, setAbout] = useState("");
    const [updateEmployee, setUpdateEmployee] = useState({
        "empName": "",
        "emailId": "",
        "contactNo": "",
        "dateOfJoining": ""
    })
    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    const [openModal2, setOpenModal2] = React.useState(false);
    const handleModal2Open = () => {
        setUpdateEmployee({
            "empId": profileData?.empId,
            "empName": profileData?.empName,
            "emailId": profileData?.emailId,
            "contactNo": profileData?.contactNo,
            "dateOfJoining": profileData?.dateOfJoining
        })
        setOpenModal2(true);
    };
    const handleModal2Close = () => {
        setOpenModal2(false);
    };

    ///////////////updating employee////////////////////////////////////

    const handleUpdateEmployeeSubmit = (e)=>{
        e.preventDefault();
        const dateString  = dayjs(updateEmployee.dateOfJoining).format('YYYY-MM-DD');
        updateEmployee.dateOfJoining = dateString;

        updateEmployeeService(updateEmployee).then((res)=>{
            if(res.status===200 && res.statusMessage==='success'){
                toast.success(res.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                handleModal2Close()
            }
            else{
                toast.error(res.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                handleModal2Close()
            }
        }).catch((error)=>{
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            handleModal2Close()
        })

      
    }

    async function fetchData() {
        await getProfileData(id).then(res => {
            setProfileData(res.result);
            setAuthorities(res.result.authorities);
            setDateOfJoining(stringToDate(res.result.dateOfJoining));
            setReportingManagers(res.reportingManagers[0]);
            setWorkLocation(res.employeeWorkingLocation[0]);
            setShiftTimings(res.empShiftTimings[0])
            
           setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })

    }

    const handleAboutSubmit = (e) => {
        e.preventDefault();
       // console.log(about);
        if (about.length < 50) {
            // toast.error('length must be greater than 50', {
            //     position: toast.POSITION.TOP_RIGHT
            // });
            setIsLoading(false)
            return
        }
        userServiceModule.updateAbout(about).then((res) => {
            if (res.status == 200 && res.statusMessage == 'success') {

                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsLoading(false)
                handleModalClose()
            } else {

                toast.error("not updated", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsLoading(false)
            }
        }).catch(err => {
            toast.error("not updated", {
                position: toast.POSITION.TOP_RIGHT
            });
            setIsLoading(false)
        }
        )
    }


    const stringToDate = (date1) => {
       
        return new Date(date1).toISOString().slice(0, 10)
    }

    useEffect(() => {

        fetchData();
        
    }, []);


    // for modal update Contact
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  //modal for reporting manager updation
  const [reportm,setReportm]= React.useState(false);
  const handleRmOpen =() => setReportm(true);
  const handleRmClose = () => setReportm(false);
  const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
    const textfield1={width: 400}

 
// modal for  Work Location
const [workl,setWorkl]= React.useState(false);
const handleWlOpen =() => setWorkl(true);
const handleWlClose = () => setWorkl(false);
const [wl, setwl] = useState(false);

//modal for shift timing
const [shiftt,setShiftt]= React.useState(false);
const handleStOpen =() => setShiftt(true);
const handleStClose = () => setShiftt(false);
const minute1=[0,15,30,45,60]



const [isLoading,setIsLoading]=useState(true)
const navigate1=useNavigate()
//backbutton
const backbutton=useNavigate()

    return (
        isLoading?<Loading/>:

        <Container sx={{
            margin: '10px 0px'
        }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '5px 0px'

            }}>
                
                {/* <ArrowBackIcon color="primary" onClick={()=>{navigate1("/user/employees")}}></ArrowBackIcon> */}
                <Typography variant='h5' color="secondary">
                
                    Employee Information
                </Typography>
            

                <Box sx={{
                justifyContent: 'flex-end',
            }}>
               
                <Button startIcon={<ArrowCircleUpIcon/>} variant='outlined' onClick={handleModal2Open} >
                    Update Employee
                </Button>
               
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",
                marginBottom:"3px",marginTop:"4px",marginRight:"12px",marginLeft:"10px"}} 
                 onClick={()=>{backbutton("../employees")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
             </Box>
                
            </Box>
        <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
            <Box sx={{
                flexGrow: 1,
            }} >
                <Grid container spacing={2}>
                    <Grid item  xs={12} sm={12} md={6} lg={6} xl={6}>

                        <Card sx={{
                            display: 'flex',
                            margin: '20px',
                            boxShadow: 'none'
                        }}>

                            <Grid container > 
                             <Grid item  xs={12} sm={12} md={4} lg={4} xl={4}>
                  
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="Live from space album cover"
                            />
                             </Grid>
                             <Grid item  xs={12} sm={12} md={8} lg={8} xl={8}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>

                                    <Typography component="div" variant="h5" color="secondary">
                                        {profileData.empName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        (Software  Engineer)
                                    </Typography>
                                 
                                </CardContent>

                            </Box>
                           </Grid>
                            </Grid>
                        </Card>
                        <Typography variant='h6' color="secondary">
                            About:
                        </Typography>
                        <Typography variant='p' color='text.secondary' sx={{ fontSize: '12px' }}>
                            {profileData?.about ? profileData?.about : <>No Data</>} &nbsp; &nbsp; &nbsp;

                            <Create color='primary' sx={{
                                cursor: 'pointer'
                            }}
                                onClick={handleModalOpen}
                            />

                        </Typography>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                        margin: '20px 0px'
                    }}>
                        <Box sx={{
                            flexGrow: 1
                        }}>
                            <Grid container spacing={2} sx={{
                                fontSize: '15px'
                            }}>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Email
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong> {profileData.emailId}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Employee Id
                                    </Typography><br />
                                    <Typography variant='p'>
                                        {/* <strong>{authorities.map(a => <p>{a.authority},</p>)}</strong> */}
                                        <strong>{profileData?.empId}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Designation
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong>Software Engineer</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Date Of Joining
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong>{dateOfJoining}</strong>
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{
                    margin: '15px 0px'
                }}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB',  
                        }}
                       
                        
                        style={{cursor: "pointer"}}
                        >
                            <CardContent>
                                <Call />CONTACT
                                <Typography variant='h6'>
                                    {profileData.contactNo}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                                
                                <Button onClick={handleOpen} size="small" >update</Button>
                               
                                <Modal
                                 
                                 open={open}
                        
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description">
                                    <ContactModal empId={profileData?.empId}  onClose={handleClose}  contact={profileData?.contactNo ? profileData?.contactNo:null}/>
                                </Modal>
                            </CardActions>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                   
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB',
                           
                        }}
                        style={{cursor: "pointer"}}
                        onClick={()=>{navigate("/user/employee-reportingManager-via-profile",{state:{"empId":id}})}}
                        >
                             <CardContent>
                                <ManageAccountsIcon />Reporting Manager
                                <Typography variant='h6'>
                                    {reportingManagers?.empName ? reportingManagers?.empName : <small>(Manager not assigned)</small>}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>

                       <FcNext color="primary" ></FcNext>

                              
                            </CardActions>
                        </Card>
                    </Grid>


                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB',

                        }}
                        onClick={()=>{navigate(`/user/employee-workingLocation-via-profile`,{state:{"empId":id}})}}
                        style={{cursor: "pointer"}}
                        >

                            <CardContent>
                                <AddLocation />Work Location <br />
                                <Typography variant='p'>
                                    {!workLocation?.workingFrom && <small>Not Assigned</small>}
                                    {workLocation?.workingFrom}{workLocation?.location ? <><br /><span>({workLocation.location})</span></> : ''}
                                    {/* {workLocation.workingFrom == undefined || null || '' ? '' : workLocation.workingFrom} */}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                                 <FcNext color="primary"></FcNext>
                               
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB'
                        }}
                        onClick={()=>{navigate(`/user/employee-shiftTiming-via-profile`,{state:{"empId":id}})}}
                        style={{cursor: "pointer"}}
                        >

                            <CardContent>
                                <AddLocation />Shift Timing
                                <Typography variant='h6'>
                                    {shiftTimings?.shiftStartTime} - {shiftTimings?.shiftEndTime}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                                  <FcNext color="primary"></FcNext>
                              
                                
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>

            </Box>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Box sx={style}>
                            <form onSubmit={handleAboutSubmit}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="About Me"
                                    sx={{
                                        width: '100%',
                                        margin: '10px 0px'
                                    }}
                                    defaultValue={profileData.about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                                <Button type='submit' variant="contained" sx={{
                                    margin: '0px 150px !important'
                                }}>Update</Button>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                open={openModal2}
                onClose={handleModal2Close}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Card style={{
                    maxWidth: 500, padding: "13px 5px", margin: "20px auto",
                    height: 600

                }}>
                    <CardContent>

                        <center>

                            <CommentIcon sx={{
                                fontSize: '50px',
                                borderRadius: '50%',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                margin: '0px 1px',
                                padding: '10px'
                            }} />
                            <h2>Update Employee</h2>
                            <GlobalButton.GlobalDivider/>

                            {/* <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  /> */}
                            <form onSubmit={handleUpdateEmployeeSubmit}>
                                <Grid container spacing={1} >

                                    <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
                                        <TextField
                                            onChange={(e)=>setUpdateEmployee({
                                                ...updateEmployee,empName:e.target.value
                                            })}
                                            defaultValue={updateEmployee.empName}
                                            type="text" label="Name" required placeholder="Employee Name" variant='outlined' fullWidth style={{ width: "550px", marginTop: "15px" }}></TextField>
                                    </Grid>

                                    <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
                                        <TextField
                                             onChange={(e)=>setUpdateEmployee({
                                                ...updateEmployee,emailId:e.target.value
                                            })}                                            
                                            defaultValue={updateEmployee?.emailId}
                                            type="text" label="Email Id" required placeholder="Email Id" variant='outlined' fullWidth style={{ width: "550px", marginTop: "15px" }}></TextField>
                                    </Grid>
                                    <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }} style={{ width: "550px", marginTop: "15px" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker 
                                              onChange={(newValue)=>setUpdateEmployee({
                                                ...updateEmployee,dateOfJoining:newValue
                                            })} 
                                            label="Date Of Joining" defaultValue={dayjs(`${updateEmployee.dateOfJoining}`)}
                                                className='outlined-basic-text-box' sx={{ width: "550px" }} />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
                                        <TextField
                                          onChange={(e)=>setUpdateEmployee({
                                            ...updateEmployee,contactNo:e.target.value
                                        })} 
                                            defaultValue={updateEmployee?.contactNo}
                                            type="number" label="Contact Number" required placeholder="Contact Number" variant='outlined' fullWidth style={{ width: "550px", marginTop: "15px" }}></TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button sx={{marginTop:"10px"}} type="submit" variant="contained" color="primary" style={GlobalButton.OperationButton} >UPDATE</Button>

                                        <Button sx={{marginLeft:"20px",marginTop:"10px"}} variant='contained' onClick={handleModal2Close} style={GlobalButton.HaltButton}>Cancel</Button>
                                    </Grid>
                                    </Grid>
                                    {/* <Grid item xs={12} sx={{ justifyContent: "right", display: "flex" }}>
                                       
                                </Grid> */}
                            </form>
                            <GlobalButton.GlobalDivider/>
                        </center>
                    </CardContent>

                </Card>
            </Modal>
        </Container>

    )
}
export default Employee