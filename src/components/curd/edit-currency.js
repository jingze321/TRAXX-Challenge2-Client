import React, { Component,useRef,useState,useEffect } from "react";
import Save from '@mui/icons-material/Save';
import CustomTextField from "../common/custom-text-field.js";

import {Input,Grid,Paper,IconButton} from "@mui/material";
const styles = {
  Icon: {
    marginLeft: "auto",
    width: "10%"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    width: "80%"
  }
};
export function EditCurrency(props) {
  const [rateValue,setRateValue]=useState(props.currency.rate);
  return (
    <Grid xs={6} item key={props.index}>
      <Paper elevation={2} style={styles.Paper}>
        <form

          style={{ display: "flex" }}
        >
          {/* <Input
            style={{ width: "90%" }}
            defaultValue={props.todo.rate}
            onChange={e=>{
              setRateValue(e.target.value)
            }}
          /> */}
          <CustomTextField
            type="Number"
            label="Currency Rate"
            size = "small"
            value={rateValue}
            setValue={setRateValue}
            InputProps={{
              required: true,
            }}
          />
          
          <IconButton
            type="button"
            color="primary"
            aria-label="Add"
            style={styles.Icon}
            disabled={(rateValue<=0||rateValue===0)}
            onClick={() => {
              props.changeCurrency(
                props.index,
                rateValue
              );
            }}
          >
            <Save fontSize="small" />
          </IconButton>
        </form>
      </Paper>
    </Grid>
  );
}
