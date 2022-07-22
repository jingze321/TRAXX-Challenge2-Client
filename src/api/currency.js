import axios, { Axios } from 'axios';

export const addCurrency = async (base, counter, rate) => {
    const data ={base, counter, rate}
    const url = `http://localhost:4000/api/currency/add`;
    return new Promise((resolve, reject) => {

      axios
          .post(url,data)
          .then(({ status, headers, data }) => {
  
            if (status < 200 || status >= 300) {
              return reject("error occurred");
            }
            return resolve(data);
          })
          .catch((err) => {
            if (
              !!err.response &&
              !!err.response.data &&
              err.response.data.message
            ) {
              return reject(err.response.data.message);
            }
            return reject(err.message);
          });
      });
  };

  export const saveCurrency = async (base, counter, rate) => {
    const data ={base, counter, rate}
    const url = `http://localhost:4000/api/currency/save`;
    return new Promise((resolve, reject) => {

      axios
          .post(url,data)
          .then(({ status, headers, data }) => {
  
            if (status < 200 || status >= 300) {
              return reject("error occurred");
            }
            return resolve(data);
          })
          .catch((err) => {
            if (
              !!err.response &&
              !!err.response.data &&
              err.response.data.message
            ) {
              return reject(err.response.data.message);
            }
            return reject(err.message);
          });
      });
  };

  export const deleteCurrency = async (base, counter) => {
    const data ={base, counter}
    sessionStorage.setItem('baseValue',base);
    const url = `http://localhost:4000/api/currency/delete`;
    return new Promise((resolve, reject) => {

      axios
          .post(url,data)
          .then(({ status, headers, data }) => {
  
            if (status < 200 || status >= 300) {
              return reject("error occurred");
            }
            return resolve(data);
          })
          .catch((err) => {
            if (
              !!err.response &&
              !!err.response.data &&
              err.response.data.message
            ) {
              return reject(err.response.data.message);
            }
            return reject(err.message);
          });
      });
  };

  export const findBase = async (base) => {
    const url = `http://localhost:4000/api/currency/find-base`;
    return new Promise((resolve, reject) => {
      axios
          .get(url,{ params: { base } })
          .then(({ status, headers, data }) => {
  
            if (status < 200 || status >= 300) {
              return reject("error occurred");
            }
            return resolve(data.result);
          })
          .catch((err) => {
            if (
              !!err.response &&
              !!err.response.data &&
              err.response.data.message
            ) {
              return reject(err.response.data.message);
            }
            return reject(err.message);
          });
      });
  };

  export const getExistCurrencyList = async (column) => {
    const url = `http://localhost:4000/api/currency/get-exist-currency`;
    return new Promise((resolve, reject) => {
      axios
          .get(url,{ params: { column } })
          .then(({ status, headers, data }) => {
  
            if (status < 200 || status >= 300) {
              return reject("error occurred");
            }
            return resolve(data.result);
          })
          .catch((err) => {
            if (
              !!err.response &&
              !!err.response.data &&
              err.response.data.message
            ) {
              return reject(err.response.data.message);
            }
            return reject(err.message);
          });
      });
  };

  export const getCurrentRate = async (base,counter) => {
    const url = `http://localhost:4000/api/currency/get-rate`;
    return new Promise((resolve, reject) => {
      axios
          .get(url,{ params: { base,counter } })
          .then(({ status, headers, data }) => {
  
            if (status < 200 || status >= 300) {
              return reject("error occurred");
            }
            return resolve(data.result);
          })
          .catch((err) => {
            if (
              !!err.response &&
              !!err.response.data &&
              err.response.data.message
            ) {
              return reject(err.response.data.message);
            }
            return reject(err.message);
          });
      });
  };
