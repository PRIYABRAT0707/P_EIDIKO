import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import './loading.css'

const Loading = () => {
    return (
        <Box className="bg-blur">
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',

            }}>

              <div className="loader"></div> 
                <div class="loading-container">
                    <div class="loading-text">
                        <span>L</span>
                        <span>O</span>
                        <span>A</span>
                        <span>D</span>
                        <span>I</span>
                        <span>N</span>
                        <span>G</span>
                    </div>
                </div>


            </Container>
        </Box>
    )
}

export default Loading;