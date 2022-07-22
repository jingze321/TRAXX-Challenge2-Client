
import React, { useState,useEffect } from "react";
import {IconButton} from "@mui/material";
import {SyncAlt,Edit,CurrencyExchange} from '@mui/icons-material';
import {Button,InputAdornment,Grid,Autocomplete,TextField,Box,Paper,Typography} from "@mui/material";
import CustomTextField from "../common/custom-text-field.js";
import {  getExistCurrencyList,getCurrentRate,findBase} from "../../api/currency.js";
import curruencies from '../../data/currencies.json'
import {ResultCard} from './result.js'

 const styles = {
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
    margin: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
    summaryCard: {
      flexGrow: 1,
    },
  };


  export function SummaryCard({ title, value, valueDescription, component }) {
    return (
      <Paper elevation={2} className={styles.summaryCard}>
        <Typography color={"textSecondary"} variant="h6" gutterBottom>
          {title}
        </Typography>
        {component || (
          <Typography color={"primary"} variant={"h4"}>
            {value}
            {valueDescription && (
              <Typography color={"primary"} component="span">
                {valueDescription}
              </Typography>
            )}
          </Typography>
        )}
      </Paper>
    );
  }

export function ExchangeForm(props) {

  const [baseValue,setBaseValue] = useState({});
  const [counterValue,setCounterValue] = useState({});
  const [counterList,setCounterList] = useState([]);
  const [searchResult,setSearchResult]=useState([]);
  const [baseList,setBaseList] = useState([]);
  const [amountValue,setAmountValue] = useState(1);
  const [rateInfo,setRateInfo] = useState({});
  const [isValidate,setIsValidate] = useState(false);


  const switchCurrency =()=>{
    setBaseValue({...counterValue});
  }
  const closeResult =()=>{
    setRateInfo({});
  }

  const searchRate =()=>{
    setRateInfo({})
    getCurrentRate(baseValue.code,counterValue.code).then((res)=>{
        let data = res[0];
        data['amount'] = amountValue;
        setRateInfo(data);
    });
  }

  useEffect(()=>{
    getExistCurrencyList('base').then((list)=>{

      const filterList = 
        Object.values(curruencies).filter((x) => list.some((y) => x.code===y.base));
        setBaseList(filterList)
        
        if (filterList.length>0){
          // setCounterValue(filterList[0])
          setBaseValue(filterList[0])
        }
    });

  },[])

  useEffect(()=>{
    if (baseList.length>0){
      findBase(baseValue.code).then((list)=>{
        const filterList = 
          Object.values(curruencies).filter((x) => list.some((y) => x.code===y.counter));
        setCounterList(filterList)
        if(!Object.values(counterValue).length>0 || (!filterList.some(x=>x.code===counterValue.counter))){
          setCounterValue(filterList[0]);
        }
      });
    }


  },[baseValue])
    return (
      <>
      {(baseList.length>0) &&
      <Grid
        container 
        sx={{ display: 'flex' ,marginTop: '20px',marginBottom:'20px'}}
        alignItems="center" 
        justifyContent="center"
        direction="row"
      >   
          <Grid item xs={3} >
            <CustomTextField
              type="number"
              label="Amount"
              value={amountValue}
              setValue={setAmountValue}
              InputProps={{
                required: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {Object.keys(baseValue).length>0&&baseValue.symbol}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
 
            />

          </Grid>
          <Grid item xs={3}> 

            <Autocomplete
              disableClearable 
              disablePortal
              id="combo-box-demo"
              options={baseList}
              value={baseValue}
              getOptionLabel={(option)=>{
                return option?.code;
              }}
              onChange={(event, newInputValue) => {
                setBaseValue(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="From" />}
            />
                
          </Grid>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={()=>{switchCurrency()}}
          >
            <SyncAlt color="action" fontSize="small" />
          </IconButton>
          <Grid item xs={3}> 

            <Autocomplete
              disableClearable 
              disablePortal
              id="combo-box-demo"
              options={counterList}
              value={counterValue}
              getOptionLabel={(option)=>{
                return option?.code??"";
              }}
              onChange={(event, newInputValue) => {
                setCounterValue(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="To" />}
            />
          </Grid>
          <Grid item > 
              <Button
              type="button"
              disabled={amountValue<=0
                ||(baseValue &&Object.keys(baseValue).length===0)
                ||(counterValue&&Object.keys(counterValue).length===0)}
              variant="contained"
              color="primary"
              style={{ height:"100%"}}
              sx={{
                marginLeft: 2,
              }}
              endIcon={<CurrencyExchange/>}
              onClick={()=>searchRate()}
            >
              Convert
            </Button>
          </Grid>
      </Grid>}
      {(Object.keys(rateInfo).length>0)&&
          <Grid 
            container 
            sx={{ display: 'flex' ,marginTop: '20px' ,marginBottom: '20px'}}
            alignItems="center" 
            justifyContent="center"
            direction="row"
          >
              <ResultCard rateInfo={rateInfo} closeResult={closeResult}/>
            </Grid>
      }
          </>
    );
}

