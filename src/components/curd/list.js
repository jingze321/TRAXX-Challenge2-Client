import React, { useEffect,useState,useMemo } from "react";
import {DisplayCurrency} from "./display-currency";
import {EditCurrency} from "../curd/edit-currency";
import {Grid} from "@mui/material";
import { saveCurrency,deleteCurrency } from "../../api/currency.js";


export function List({list}) {
  const [listData,setListData]= useState([]);
  useEffect(()=>{
    setListData(
      list.map(x=>{
        return {
          ...x,
          status:"active",
        }
      })
    )
  },[list])

  const removeCurrency = (id) => {
    // const selectedInfo= listData[key];
    const selectedInfo= listData.find(data=> data.id === id);

    deleteCurrency(selectedInfo.base,selectedInfo.counter).then(()=>{
  
      const filterInfo =  listData.filter(data=>data.counter!==selectedInfo.counter);
      setListData(filterInfo);
    })
    // console.log(filterInfo,selectedInfo.counter,'filterInfo');
    // deleteCurrency(selectedInfo.base,selectedInfo.counter).then(()=>{
      // });
  };

  const changeCurrency = (id,rate) => {
    // key.preventDefault();
    var foundIndex = listData.findIndex(x => x.id === id);
    const selectedInfo= listData[foundIndex];
    console.log('key123',foundIndex,id);
    
    saveCurrency(selectedInfo.base,selectedInfo.counter,rate).then(()=>{
      const temp = listData;
      temp[foundIndex].status = "active";
      temp[foundIndex].rate = rate;
      setListData([...temp]);
    });
 

  };

  const updateCurrency = (id) => {
    var foundIndex = listData.findIndex(x => x.id === id);
    let temp = listData;
    setListData(temp);
    temp[foundIndex].status = "editing"; 
    // console.log(temp,'listData');
    setListData([...temp]);
  };
  const renderCurrency = (data,index) => {
    console.log(data,'datadata');

    if (data == null) return null;
    if (data.status === "active") {
      console.log('active');
      return (
        <DisplayCurrency
          key={data.id}
          index={data.id}
          currency={data}
          removeCurrency={removeCurrency}
          updateCurrency={updateCurrency}
        />
      );
    } else if (data.status ==="editing") {
      return (
        <EditCurrency
          key={data.id}
          index={data.id}
          currency={data}
          changeCurrency={changeCurrency}
        />
      );
    }
  };
    return (
      <Grid container>
        {listData&&listData.map((data,index) => renderCurrency(data,index))}
      </Grid>
    );
}

export default List;