import './App.css';
import {BrowserRouter as Router, Route, Routes,useParams } from 'react-router-dom'
import {SignIn} from './components/singIn.js'
import PrivateRoute from './components/common/private-route.js'
import {Navbar} from './components/common/nav-bar.js'
import {Dashboard} from './components/dashboard.js'
import Axios from 'axios';
import React, { useState,useEffect,createContext  } from 'react'

export const loginContext = createContext();

function App() {
  const [loginStatus,setLoginStatus]= useState([]);

  Axios.defaults.withCredentials = true;
  useEffect(()=>{
    Axios.get("http://localhost:4000/api/login")
          .then(res=>{
            if (res.data.loggedIn){
              setLoginStatus(res.data.user[0].username);
            }else{
              setLoginStatus("noData");
            }
          })
  },[])

  return (
    <>
    <loginContext.Provider value={loginStatus}>
      <Navbar/>
        <Router>
              <Routes>
                <Route exact path='/login' element={<PrivateRoute />}>
                  <Route exact path="/login" element={<SignIn/>} />
                </Route>
                <Route exact path='/' element={<PrivateRoute/>}>
                  <Route exact path='/' element={<Dashboard/>}/>
                </Route>
              </Routes>
        </Router>
      </loginContext.Provider>
    </>
  );
}

export default App;
