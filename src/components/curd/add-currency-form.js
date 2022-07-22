import React, { Component,useRef,useState,useEffect } from "react";
// import Input from "@material-ui/Input";
import {Button,Input,Grid,Autocomplete,TextField,Paper} from "@mui/material";
import '../styles.css';
import CustomTextField from "../common/custom-text-field";
import curruencies from '../../data/currencies.json'
import { addCurrency, findBase } from "../../api/currency.js";

import List from "./list";

import Axios from 'axios';


export function AddCurrencyForm() {
  const [baseValue,setBaseValue] = useState({});
  const [counterValue,setcounterValue] = useState({});
  const [counterValueList,setcounterValueList] = useState([]);
  const [currencyFilterList,setCurrencyFilterList] = useState([]);
  const [rateValue,setRateValue] = useState(1);
  const [isValidate,setIsValidate] = useState(true);

  const styles = {
    Paper: {
      padding: 20,
      margin: "auto",
      textAlign: "center",
    }
  };
  
  const errorRef = useRef();
  const handleSubmit = e => {
    // e.preventDefault();
    sessionStorage.setItem('baseValue',baseValue.code);

    addCurrency(baseValue.code,counterValue.code,rateValue)
    
  };

  useEffect(()=>{
    if (sessionStorage.baseValue) {
      const findValue = Object.values(curruencies).find(currency=>currency.code===sessionStorage.baseValue)
      console.log(findValue);

      if(findValue){
        setBaseValue(findValue);
      }else{
        setBaseValue(Object.values(curruencies)[0]);
      }

    } else {
      setBaseValue(Object.values(curruencies)[0]);

    }

    // const temp=Object.values(curruencies).filter(currency=>{
    //   return counterValueList.some(existCurrency=>{
    //     return existCurrency.counter.indexOf(currency.code);
    //     })
    //   });
    // const ResultArrayObjOne = Object.values(curruencies).filter(({ code }) => !counterValueList.some(({ counter }) => code === counter));
        
  },[])
  useEffect(()=>{
    findBase(baseValue.code).then((list)=>{
     setcounterValueList(list);

    });

  },[baseValue])

  useEffect(()=>{
    if (rateValue .length === 0 || rateValue<=0){
      setIsValidate(false);
    }else{
      setIsValidate(true);
    }

  },[rateValue])

    useEffect(()=>{
    let filterList = [];
      if(counterValueList.length===0){
        filterList=Object.values(curruencies).filter((x=>x.code!==baseValue.code));
      }else{
        filterList = Object.values(curruencies).filter(({ code }) => !counterValueList.some(({ counter,base }) => code === counter||code ===base));
      }
      setCurrencyFilterList( filterList );
      if (filterList.length>0){
        setcounterValue(filterList[0])
      }
    },[counterValueList])
    return (
      <>
      <Paper style={styles.Paper}>
     
     
      <form onSubmit={(e)=>{handleSubmit(e)}} style={{ display: "flex" }}>

        <Grid container sx={{ display: 'flex', alignItems:"center" }} spacing={1}>
          <Grid item xs={12} lg={4}> 
            <Autocomplete
                disableClearable 
                disablePortal
                // disabled={Object.values(counterValueList).length===0}
                id="combo-box-demo"
                options={Object.values(curruencies)}
                value={baseValue}
                getOptionLabel={(option)=>{
                  return option.code+'-'+option.name
                }}
                onChange={(event, newInputValue) => {
                  setBaseValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Base (CURD)" />}
              />
          </Grid>
          <Grid item xs={12} lg={4}> 
            <Autocomplete
              disableClearable
              disablePortal
              // disabled={Object.values(counterValueList).length===0}
              id="combo-box-demo"
              options={currencyFilterList}
              value={counterValue}
              getOptionLabel={(option)=>{
                return option.code+'-'+option.name
              }}
              onChange={(event, newInputValue) => {
                setcounterValue(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="Currency" />}
            />
          </Grid>
          <Grid item xs={12} lg={4}> 
          <CustomTextField
            type="Number"
            label="Rate"
            value={rateValue}
            setValue={setRateValue}
            InputProps={{
              required: true,
            }}
      
          />
          </Grid>
        </Grid>
        <Button
          type="submit"
          disabled={!isValidate}
          variant="contained"
          color="primary"
          style={{ width: "10%" }}
          sx={{
            marginLeft: 2,
          }}
        >
          Add
        </Button>

        <p ref={errorRef} className="error">
          Error, must enter a value!
        </p>
      </form>
      </Paper>

      <Grid container>
        <List list={counterValueList}/>
      </Grid>
      </>
    );
}
