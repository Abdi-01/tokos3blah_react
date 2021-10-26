const INITIAL_STATE = {
  iduser: null,
  fullname: "",
  password: "",
  role: "",
  id_warehouse: "",
  email: "",
  age: "",
  gender: "",
  profile_picture: "",
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Data masuk Reducer dari loginAction :", action);
      // return data yang didapat dari action
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    case "USER_LOGOUT":
      return { ...INITIAL_STATE, storageIsChecked: true };
    case "CHECK_STORAGE":
      return { ...state, storageIsChecked: true };
    default:
      return state;
  }
};
