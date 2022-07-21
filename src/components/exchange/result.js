import React,{useEffect,useState} from "react";
// import { makeStyles } from "@mui/styles";
import {Card,CardContent,Typography,Grid,IconButton,Box} from "@mui/material";
import curruencies from '../../data/currencies.json'
import {Close} from '@mui/icons-material';

export  function ResultCard({rateInfo,closeResult}) {
    const styles = {
        root:{
            minWidth:'500px',
        },
        Icon: {
            marginLeft: "auto"
          },
        cardcontent: {
            padding: 0,
         },
    }
    const [baseValue,setBaseValue] = useState({});
    const [counterValue,setcounterValue] = useState({});
   useEffect(()=>{
        setBaseValue(Object.values(curruencies).find(x => x.code === rateInfo.base));
        setcounterValue(Object.values(curruencies).find(x => x.code === rateInfo.counter));
        console.log(baseValue,counterValue,rateInfo);
   },[])

  return (

        <Card style={styles.root}>
            <Box display="flex"  >
                <IconButton style={styles.Icon} size="small" onClick={()=>closeResult()}><Close fontSize="small"/></IconButton>
            </Box>
            <CardContent styles={styles.cardcontent}>
                <Grid
                    container 
                    >
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h5" component="h5" >
                            Convert Result
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                >
                    <Grid item >
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                        {rateInfo.amount} {baseValue.name} =
                        </Typography>
                    </Grid>

                
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >                 
                    <Grid item >
                        <Typography variant="h4" color="primary.main" component="p">
                            {rateInfo.amount*rateInfo.rate} {counterValue.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                >
                    <Grid item sx={{ marginTop: '20px'}}>
                        <Typography variant="Display1" color="textPrimary" component="p">
                                1 {baseValue.code} = {rateInfo.rate.toFixed(5)} {counterValue.code}
                        </Typography>
                        <Typography variant="Display1" color="textPrimary" component="p">
                                1 {counterValue.code} = {(1/rateInfo.rate).toFixed(5)} {baseValue.code}
                        </Typography>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
  );
}
