import axios, { Axios } from 'axios';

export const loginUser = async (username, password) => {

    axios.defaults.withCredentials = true;
    try {
      const user = await login(username, password);

      return user;
    } catch (e) {
         return e;
    }
  };

  const login = async (username, password) => {
    const data = { username, password };
    const url = `http://localhost:4000/api/login`;
    return new Promise((resolve, reject) => {
    axios
        .post(url,data,{ withCredentials: true })
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

  export const logoutUser = async () => {
    const logoutUrl = `http://localhost:4000/api/logout`;
    return new Promise((resolve, reject) => {
        axios
        .post(logoutUrl,{ withCredentials: true })
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
    })
  }