import { Grid, Paper, TextField, Button, Link, Avatar, Typography } from "@mui/material";
import eidiko1 from '../../images/eidiko1.jpg';
import img2 from '../../images/img2.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import validation from "../../Error/LoginErrorHandler";
import passwordErrorHandler from "../../Error/passwordErrorHandler";
import { GlobalStyle1 } from "../../Components/stylecomponent/forFirstDiv";
import userServiceModule from "../../Services/user-service/UserService";
import Loading from "../../Components/LoadingComponent/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { GlobalButton } from "../../Components/stylecomponent/GlobalButton";




export default function Login() {



    const grid2 = { height: "85%", width: "100vw", backgroundColor: "#2196F3" }
    const grid3 = { height: "85%", width: "100vw", backgroundColor: "FFFFFF", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", verticalAlign: "middle" }
    const button1 = { backgroundColor: "#2196F3", color: "white", minWidth:"80%",width: "auto", borderRadius: "20px", marginTop: "20px", display: "flex" }


    const [employeeId, setEmployeeId] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [isloading, setIsLoading] = useState(false)


    const navigate = useNavigate()
    const [validationError, setValidationError] = useState({})
    const [validationError1, setValidationError1] = useState({})


    const HandleEmployeeId = (e) => {

        setEmployeeId(e.target.value)
    }
    const HandlePassword = (e) => {
        setPassword(e.target.value)
    }
    const loginHandle = (e) => {
        e.preventDefault();
        setIsLoading(true)
        setValidationError(validation(employeeId))

        setValidationError1(passwordErrorHandler(password))

        userServiceModule.logService(employeeId, password).then((res) => {
           
            if (res.status === 200) {
                setIsLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'login succesfull | redirecting to dashboard',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/user/profile")
            }
            else {
                setIsLoading(false)
                setError("Please enter valid userId or password")
                toast.error(res.message,{position:toast.POSITION.TOP_RIGHT})
                //navigate("/login")
            }


        }).catch(error => {
            setIsLoading(false)
            toast.error(error.message,
            {
                position: toast.POSITION.TOP_RIGHT
              }
            )

        })

    }







    return (
        isloading ? <Loading /> :
            // main grid starts here
            <div style={ {height:"92.9vh",backgroundColor:"#2196F3",width:"100vw",display:"flex"}}>

                <Grid display="flex"
                    justifyContent="center"
                    alignItems="center" container spacing={0} item xs={12} style={{ paddingLeft: "100px", paddingRight: "100px",marginBottom:"50px"}}>



                    {/* child 1 grid starts here */}
                    <Grid display="flex"
                        justifyContent="center"
                        alignItems="center"
                        item xl={6} lg={6} md={6} sm={12} xs={12} xsoffset="auto" mdoffset="auto" style={{ height: "91vh", width: "70vw" }}>

                        <Paper elevation={7} style={grid3}>



                            < Grid container
                                display="grid"
                                direction="column"
                                justifyContent="center"
                                alignContent="center"

                            >
                                <Grid display="flex" alignItems={"center"} justifyContent={"center"}>
                                    <Avatar sx={{ width: 120, height: 120, backgroundColor: "#2196F3" }}>
                                        <img src={eidiko1} style={{ display: "flex", height: "100px", width: "150px" }} alt="not found"></img>
                                    </Avatar>
                                </Grid>

                                <Grid display="flex" alignItems={"center"} justifyContent={"center"}>
                                    <h3>Login</h3>
                                </Grid>

                                <form onSubmit={loginHandle} >

                                    <Grid sx={{display:"flex" ,alignItems:"center" ,justifyContent:"center",alignContent:"center"}} style={{ marginTop: "20px" }}>

                                        <TextField value={employeeId} onChange={HandleEmployeeId} id="employeeId1" label="Employee Id" name="employeeid" type="number" max="4" placeholder="employeeId" fullWidth required></TextField>
                                    </Grid>
                                    {validationError.name && <p style={{ color: "red", fontSize: "15px" }}>{validationError.name}</p>}



                                    <Grid sx={{display:"flex" ,alignItems:"center" ,justifyContent:"center",alignContent:"center"}} style={{ marginTop: "30px" }}>

                                        <TextField value={password} onChange={HandlePassword} style={{ borderRadius: "20px" }} id="password1" label="Password" name="password" type="password" placeholder="password" fullWidth required

                                        ></TextField>

                                    </Grid>
                                    {validationError1.name && <Typography variant="h5" style={{ color: "red", fontSize: "15px" }}>{validationError1.name}</Typography>}


                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-end"
                                    >
                                        <Link href="/forgot-password"><h4 style={{ marginLeft: "220px", marginTop: "5px" }}>forgot password?</h4></Link>

                                    </Grid>

                                    <Grid sx={{display:"flex" ,alignItems:"center" ,justifyContent:"center",alignContent:"center"}}>
                                        <Button id="loginbutton" variant="contained" style={button1} type="submit">login</Button>
                                    </Grid>

                                    <p style={{ color: "red", fontSize: "19px" }}>{error}</p>
                                </form>


                            </Grid>


                        </Paper>

                    </Grid>


                    {/* child1 grid ends here */}


                    {/* child2 grid starts here */}

                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}
                          sx={{ alignItems:"center" ,justifyContent:"center",alignContent:"center",display: { xs: 'none', sm: 'none', md: 'flex',lg:"flex",xl:"flex" }}} style={{height: "91vh", width: "70vw" }}>
                        <Paper   elevation={7} style={grid2}>


                            <img src={img2} style={{ height: "100%", width: "100%" }} alt="not found"></img>

                        </Paper>


                    </Grid>


                    {/* child2 grid ends here */}


                </Grid>
            </div>
        // main grid ends here


    );

}