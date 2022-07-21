
import { InputAdornment, IconButton, Box, Link } from "@mui/material";
import {  Paper,Grid,Typography} from "@mui/material";

import { useContext, useState,useEffect,Fragment } from 'react';
import {loginContext} from '../App.js'
import curruencies from '../data/currencies.json'

import {AddCurrencyForm} from './curd/add-currency-form.js'
import {ExchangeForm} from './exchange/exchange-form.js'


export function Dashboard() {
  const login = JSON.stringify(useContext(loginContext));
  const [list,setList]=useState({});


  const addCurrencyList = async (e) => {
  };


  return (


    <Grid container >
      <Grid item xs={12} >
          <ExchangeForm/>
      </Grid>
      <Grid item xs={12}>
          <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            // height: "100%",
          }}
          >
            <Fragment>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                    <AddCurrencyForm addCurrencyList={addCurrencyList} />
                </Grid>
              </Grid>
            </Fragment>
          </Box>
      </Grid>
    </Grid>
  );
}


