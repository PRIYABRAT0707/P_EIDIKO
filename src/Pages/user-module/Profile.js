import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, Card, CardContent, CardMedia, Container, Divider, Fade, Grid, Modal, TextField, Typography } from '@mui/material'
import { AddLocation, Call, Create } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { getProfileData } from '../../Services/ProfileService';
import userServiceModule from '../../Services/user-service/UserService';
import { toast } from 'react-toastify';
import Loading from '../../Components/LoadingComponent/Loading';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';


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


const Profile = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [authorities, setAuthorities] = useState([]);
    const [reportingManagers, setReportingManagers] = useState({})
    const [workLocation, setWorkLocation] = useState({});
    const [shiftTimings, setShiftTimings] = useState({});
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [about, setAbout] = useState("");

    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    const authoritiesToString = (authorities) => {
        let arr = [];
        authorities.map(({ authority }) =>
            arr.push(authority)
        )
        return arr.join(',')
    }

    async function fetchData() {
        await getProfileData(sessionStorage.getItem("id")).then(res => {
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
        console.log(about);
        if (about.length < 50) {
            toast.error('length must be greater than 50', {
                position: toast.POSITION.TOP_RIGHT
            });
            return
        }
        userServiceModule.updateAbout(about).then((res) => {
            if (res.status == 200 && res.statusMessage == 'success') {

                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                handleModalClose()
            } else {

                toast.error("not updated", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            toast.error("not updated", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        )
    }


    const stringToDate = (date) => {
        return new Date(date).toISOString().slice(0, 10)
    }

    useEffect(() => {

        fetchData();
    }, []);
     

const [isLoading,setIsLoading]=useState(true)
//backbutton
const backbutton=useNavigate()

    return (
        isLoading?<Loading/>:

        <Container sx={{
            margin: '10px 0px'
        }}>

            {/* <Typography variant='h5' color="secondary">
                Employee Information
            </Typography> */}
            <Box sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                alignContent:"center",
                marginRight:"1px",
                
            }}>
                <Typography color={"secondary"}style={{marginLeft:"15px",fontSize:"26px"}}>Employee Information</Typography>
                <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"0px"}} 
                 onClick={()=>{backbutton("/user/employees")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
            </Box>
<GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

            <Box sx={{
                flexGrow: 1,
            }} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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

                            {/* <Create color='primary' sx={{
                                cursor: 'pointer'
                            }}
                                onClick={handleModalOpen}
                            /> */}

                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
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
                    <Grid item  xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB'
                        }}>

                            <CardContent>
                                <Call />
                                <Typography variant='h6'>
                                    {profileData.contactNo}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB'
                        }}>

                            <CardContent>
                                <ManageAccountsIcon />(Reporting Manager)
                                <Typography variant='h6'>
                                    {reportingManagers?.empName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB',
                            height: '100px'
                        }}>

                            <CardContent>
                                <AddLocation />Work Location <br />
                                <Typography variant='p'>
                                    {workLocation?.workingFrom}{workLocation?.location ? <><br /><span>({workLocation.location})</span></> : ''}
                                    {/* {workLocation.workingFrom == undefined || null || '' ? '' : workLocation.workingFrom} */}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB'
                        }}>

                            <CardContent>
                                <AddLocation />(Shift Timing)
                                <Typography variant='h6'>
                                    {shiftTimings?.shiftStartTime} - {shiftTimings?.shiftEndTime}
                                </Typography>
                            </CardContent>
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
                                    margin: '0px 150px'
                                }}>Update</Button>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>


        </Container>

    )
}
export default Profile