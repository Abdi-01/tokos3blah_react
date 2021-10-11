import Axios from "axios";

export const authLogin = (data) => {
  console.log("Data masuk Action dari component :", data);
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const userKeepLoginAction = (dispatch, userLocalStorage) => {
  Axios.post(
    "http://localhost:2200/users/keep-login",
    {},
    {
      headers: {
        Authorization: `Bearer ${userLocalStorage}`,
      },
    }
  )
    .then((res) => {
      //delete password user
      delete res.data.dataLogin.password;

      //Save token to local storage -- keep user login
      localStorage.setItem("token_s3blah", res.data.token);

      //Set global state
      dispatch({
        type: "USER_LOGIN",
        payload: res.data.dataLogin,
      });

      console.log(
        `Data from token matches the database, keep user '${res.data.dataLogin.username}' logged in`
      );
    })
    .catch((err) => console.log(err));
};

//CHECK LOCAL STORAGE
export const CheckStorageAction = (dispatch) => {
  dispatch({
    type: "CHECK_STORAGE",
  });
};

export const logoutAction = (dispatch) => {
  localStorage.removeItem("token_s3blah");

  dispatch({
    type: "USER_LOGOUT",
  });
};
