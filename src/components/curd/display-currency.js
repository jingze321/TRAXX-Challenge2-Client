
import React, { Component, Fragment,useState,useRef } from "react";
import Delete from '@mui/icons-material/Delete';
import {Grid, Paper} from "@mui/material";
import {IconButton} from "@mui/material";
import {SyncAlt,Edit} from '@mui/icons-material';
import { loginUser } from "../../api/currency.js";
const styles = {
  Icon: {
    marginLeft: "auto"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    width: "90%"
  }
};

export function DisplayCurrency(props) {
    // console.log(props,'props');
   const [fade,setFade] = useState(false);
   const gridRef = useRef();
   
  const fadedCurrency = () => {

    //  fade = true;
     setFade(true);

    var promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(true);
      }, 500);
    });

    // console.log(index,'indexindex');
    promise.then(() => props.removeCurrency(props.currency.id));

  };

    const gridClass = fade ? "fade-out" : "";

    return (
      <Grid
        xs={12}
        xl={4}
        lg={6}
        className={`${gridClass}`}
        item
        key={props.index}
        ref={gridRef}
      >
        <Paper elevation={2} style={styles.Paper} >
            <Grid container  alignItems="center" justifyContent="start">
                <Grid item>
                    {props.currency.base}
                </Grid>
                <Grid item>
                    <SyncAlt color="action" fontSize="small" />
                </Grid>
                <Grid item>
                    {props.currency.counter}
                </Grid>
            </Grid>

            <Grid container  >
            
            <Grid item xs={6} sm={3}>
                    <b>{(Number.parseFloat(props.currency.rate).toFixed(5))}</b>
                </Grid>
            </Grid>
          <IconButton
            color="primary"
            aria-label="Edit"
            style={styles.Icon}
            onClick={() => props.updateCurrency(props.currency.id)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={() =>fadedCurrency()}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
    );
}

