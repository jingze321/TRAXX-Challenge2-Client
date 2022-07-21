import React, { useState,Fragment } from "react";
import { InputAdornment, IconButton, Box, Button,Snackbar } from "@mui/material";
import CustomTextField from "./common/custom-text-field.js";
import { Visibility, VisibilityOff,Close } from "@mui/icons-material";
import { loginUser } from "../api/auth.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


import currency from "../images/currency-basket.webp";
import finance from "../images/money-finance.jpg";


import { CustomButton } from "./common/custom-button";


export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [open,setOpen] = useState(false);


  const images = [currency, finance];


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <Fragment>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </Fragment>
  );


  const onLogin = async (e) => {
      e.preventDefault();
      loginUser(username, password).then((res)=>{
        if (res?.message){
          setErrorMessage(res.message)
          setOpen(true);
        }else{
          window.location.href = "/"
        }

      }).catch(e=>{
        console.log(e,'e');
      });


  };

  return (
    
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingLeft: {
            xs: 2,
            md: 10,
          },
          paddingRight: {
            xs: 2,
            md: 10,
          },
          overflow: "auto",
          position: "relative",
        }}
      >
        {/* <LangSettings
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            backgroundColor: "white",
          }}
        /> */}
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: "90%",
            maxWidth: 200,
            objectFit: "contain",
            margin: 10,
            marginTop: { xs: 0, md: 100, lg: 0 },
            marginBottom: 40,
          }}
        />
        <CustomTextField
          type="username"
          label="username"
          value={username}
          setValue={setUsername}
          InputProps={{
            required: true,
          }}
          sx={{
            marginBottom: 3,
          }}
        />
        <CustomTextField
          type={showPassword ? "text" : "password"}
          label="password"
          value={password}
          setValue={setPassword}
          InputProps={{
            required: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            marginBottom: 3,
          }}
        />

        <CustomButton
          label="login"
          onClick={(e) => {
            onLogin(e);
          }}
          sx={{
            mb: 3,
          }}
        />
      </Box>
      <Box
        sx={{
          display: {
            xs: "none",
            md: "initial",
          },
          flex: {
            xs: 1,
            md: 2,
          },
          overflow: "auto",
        }}
      >
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          transitionTime={1000}
          emulateTouch={true}
        >
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt="carousel"
                style={{
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>
      </Box>
      {/* <ResetPasswordDialog open={open} setOpen={setOpen} /> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={action}
        />
    </Box>
  );
}
