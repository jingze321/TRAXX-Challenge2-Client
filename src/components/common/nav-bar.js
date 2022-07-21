import React, { Component,useContext } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Box, Typography,Toolbar,IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from "../../api/auth.js";
import { WindowSharp } from '@mui/icons-material';

import {loginContext} from './../../App.js'




export const Navbar = () => {
    const login = useContext(loginContext);
    // console.log(login,'loginlogin');
    const onLogout = async () => {
 
        logoutUser().then(()=>{
            window.location.href = "/login"
          });
      };

    return (
        <AppBar position="sticky">
            <Toolbar>
            <Box display='flex' flexGrow={1}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div
                style={{  
                    display: 'flex',
                    alignItems: 'center',
                }}
              >
                <img
                  src='logo.png'
                  alt="carousel"
                  style={{
                    height: "20px",
                    objectFit: "cover",
                    marginRight:"5px",
                  }}
                />
                    TRAXX ASIA
                </div>
            </Typography>
            </Box>
              {(login.length>0&&login!=="noData") &&<LogoutIcon onClick={()=>{onLogout()}}/>}
            </Toolbar>
      </AppBar>
    )
}