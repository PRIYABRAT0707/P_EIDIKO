import { Grid, Paper, TextField, Link,Divider } from "@mui/material";
import { Button } from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import userServiceModule from "../../Services/user-service/UserService";
import Swal from "sweetalert2";
import passwordErrorHandler from "../../Error/passwordErrorHandler";
import { useNavigate } from "react-router";
import Loading from "../../Components/LoadingComponent/Loading";
import { GlobalButton } from "../../Components/stylecomponent/GlobalButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function ResetPassword() {

    const button1 = { backgroundColor: "#2196F3", color: "white", borderRadius: "20px", marginBottom: "20px", width: "22%" }
    const textfield1 = { width: 400 }
    const[isLoading,setIsLoading]=useState(false)

    const [password, setPassword] = useState(
        {

            "oldPassword": "",
            "newPassword": "",
            "confirmPassword": ""

        }
    )

    const [message, setMessage] = useState("")
    const [validationError1, setValidationError1] = useState({})

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const navigate = useNavigate();
    const { vertical, horizontal, open } = state;

    const changePasswordHandle = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setValidationError1(passwordErrorHandler(password.oldPassword))
        if (password.newPassword !== password.confirmPassword) {
            setMessage("New password and confirm password doesn't match")
            setIsLoading(false)
            return
        }
         else if (password.newPassword.length <8 && password.confirmPassword.length<8){
            setMessage("Password length must be greater than or equal to 8")
            setIsLoading(false)
            return

         }
        else {
            userServiceModule.changePassword(password).then((res) => {
                
                if (res.status === 200 && res.statusMessage === 'success') {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/user/profile');
                }
                else {
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
            }).catch((error) => {
                setIsLoading(false)
                Swal.fire(
                    {
                        position: 'center',
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    }

                )
            })

        }
    }
  //backbutton
  const backbutton=useNavigate()

    return (
        isLoading?<Loading/>:
        <Box style={{ backgroundColor: "#FFFFFF", height: "88vh" }}>

<Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    // marginTop:"10px",marginBottom:"20px"
                    marginRight:"30px"
                }}>
                    {/* <LockResetIcon sx={{
                        fontSize: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#2196F3',
                        color: 'black',
                        margin: '10px 100px',
                        padding: '10px'
                    }} /> */}

                    <Typography style={{marginLeft:"35px",fontSize:"26px"}}  color="#2196F3">
                        Change Password
                    </Typography>
                    <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",
                marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                 onClick={()=>{backbutton("/user/profile")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                
                </Grid>
                </Box>
            <Box ><GlobalButton.GlobalDivider></GlobalButton.GlobalDivider></Box>

            <Container style={{ padding: "20px" }}>
                <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
                <form onSubmit={changePasswordHandle}>
                    <Paper elevation={0} style={{ width: "auto" }} >


                        <Box sx={{ flexFlow: 1 }}>
                            <Grid container spacing={1} gap={3} justifyContent={"center"} alignItems={"center"} alignContent={"center"}>

                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextField type="password" value={password.oldPassword}
                                        onChange={(event) => setPassword({
                                            ...password, oldPassword: event.target.value
                                        })}
                                        required className='outlined-basic-text-box' id="outlined-basic" label="Old Password" variant="outlined" style={textfield1} />
                                </Grid>
                                {validationError1.name && <Typography variant="h5" style={{ color: "red", fontSize: "15px" }}>{validationError1.name}</Typography>}

                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextField type="password" value={password.newPassword} onChange={(event) => setPassword({
                                        ...password, newPassword: event.target.value
                                    })} required className='outlined-basic-text-box' id="outlined-basic" label="New Password" variant="outlined" style={textfield1} />
                                </Grid>
                                {validationError1.name && <Typography variant="h5" style={{ color: "red", fontSize: "15px" }}>{validationError1.name}</Typography>}
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextField type="password" value={password.confirmPassword} onChange={(event) => setPassword({
                                        ...password, confirmPassword: event.target.value
                                    })} required className='outlined-basic-text-box' id="outlined-basic" label="Confirm Password" variant="outlined" style={textfield1} />
                                </Grid>
                                {validationError1.name && <Typography variant="h5" style={{ color: "red", fontSize: "15px" }}>{validationError1.name}</Typography>}





                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Button type="submit" variant="contained" style={button1}>Submit</Button>
                                </Grid>

                                <Typography variant="h4" style={{ color: "red", fontSize: "19px" }}>{message}</Typography>

                            </Grid>
                        </Box>
                    </Paper>
                </form>
            </Container>
        </Box>



    )
}