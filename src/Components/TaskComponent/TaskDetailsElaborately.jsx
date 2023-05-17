
import { useNavigate } from "react-router";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {Grid} from "@mui/material";
import { useLocation } from "react-router";
import { useState } from "react";
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified';
import {GlobalButton} from "../stylecomponent/GlobalButton"

export default function TaskDetailsElaborately(props){

const navigate=useNavigate()

 const { state } = useLocation(props.state);

   const [taskDetail,setTaskDetail]=useState(state)

   let date1=taskDetail?.statusReportDate.slice(0,10)
   
let status=taskDetail.status
 let verifiedBy=taskDetail.verifiedBy


    return (
        <Box>
               <Box sx={{mt:2,display:"flex",justifyContent:"space-between"}}>
    <Typography  style={{marginLeft:"40px",fontSize:"28px"}} color="#2196F3">
        Task Details
    </Typography>
    <Button sx={{marginRight:"47px"}} variant="outlined" startIcon={<ArrowBackIosNewIcon/>} onClick={()=>{navigate("../ts")}} >back</Button>
        </Box>
       <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>



        <Container sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            
            <Box sx={{
                margin: '10px 5px',
                padding: '5px 10px',
                width: '90%',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box>
                        <Typography variant='h6' color='primary'>
                            {taskDetail.taskDetail}
                        </Typography>
                        <Typography variant='p' sx={{
                            fontSize: '12px'
                        }}>
                            (Assigned by {taskDetail.assignedBy} on {taskDetail.assignedDate})
                        </Typography>
                    </Box>
                    <Box>
                       {verifiedBy!=null? <VerifiedIcon sx={{
                            color: 'green'
                        }} /> :<VerifiedIcon sx={{
                            color: 'red'
                        }} />}
                        <Typography variant='p' sx={{
                            fontSize: '12px'
                        }}>
                            Verified by {taskDetail.verifiedBy}
                        </Typography>
                    </Box>
                </Box>
                <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
                <Box sx={{width:"auto",
                    padding: '2%',
                    minHeight: '300px',
                    width:"auto"
                }}>
                    
                        <Typography  variant='p'>
                        {taskDetail.desc}
                    </Typography>
                    
                  
                    <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
                </Box>
                
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                   columnGap:'50px'

                }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Emp Id</TableCell>
                                    <TableCell>Team</TableCell>
                                    <TableCell>Reported Date(g)</TableCell>
                                    <TableCell>Status(g)</TableCell>
                                    <TableCell>Reason</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                    <TableCell>{taskDetail.empId}</TableCell>
                                    <TableCell>{taskDetail.team}</TableCell>
                                    <TableCell>{date1}</TableCell>
                                    <TableCell>{status==="yes"?"Completed":"Not Completed"}</TableCell>
                                    <TableCell>{taskDetail.reason}</TableCell>
                                </TableRow>
                            </TableBody></Table></TableContainer>
                    <Button variant="contained">Verify</Button>
                </Box>

            </Box>
        </Container>
        </Box>

    )


}