import React from "react";

import { Navigate, Route ,Outlet } from "react-router-dom";
import { useContext } from 'react';
import {loginContext} from './../../App.js'

export default function PrivateRoute() {
    const login = useContext(loginContext);
    if (login.length===0) return;
    const pathname = window.location.pathname;
    if(pathname==="/login"){
      return login!=="noData"? <Navigate to="/" /> :<Outlet />;
    }
      // alert(login.length>0);
      return login!=="noData"? <Outlet/> : <Navigate to="/login" />;
  }
