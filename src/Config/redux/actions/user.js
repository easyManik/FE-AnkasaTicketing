import axios from "axios";
import swal from "sweetalert";

export const loginUser = (loginData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}user/login`,
      loginData
    );
    const user = result.data.data;
    const dataLocal = user;
    console.log(dataLocal);
    localStorage.setItem("Ankasa", JSON.stringify(dataLocal));
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    swal({
      title: "Good job!",
      text: `${result.data.message}`,
      icon: "success",
    });
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: "USER_LOGIN_ERROR" });
    swal({
      title: "Oops!",
      text: `${error.response.data.message}`,
      icon: "error",
    });
  }
};

export const registerUser = (dataForm, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const result = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}user/register/`,
      dataForm
    );
    const user = result.data.data;
    console.log(user);
    console.log(result.data.data);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
    navigate("/verifOtp");
  } catch (error) {
    console.log(error);
    dispatch({ type: "USER_REGISTER_ERROR" });
    swal({
      title: "Oops!",
      text: `${error.response.data.message}`,
      icon: "error",
    });
  }
};
export const VerifOtp = (data, navigate) => async (dispacth) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}user/verification`,
      data
    );
    const user = result.data.data;
    console.log(user);
    localStorage.setItem("Token ", user.token);
    dispacth({ type: "USER_VERIFICATION_SUCCESS", payload: user });
    navigate("/login");
    console.log("user verif success");
  } catch (err) {
    console.log("user verif fail");
    console.log(err);
  }
};
export const ForgotPw = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const result = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}user/forgot-password`,
      data
    );
    const user = result.data.data;
    console.log(user);
    console.log(result.data.data);
    dispatch({ type: "CONFIRM_EMAIL_SUCCESS", payload: user });
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch({ type: "CONFIRM_EMAIL_ERROR" });
    swal({
      title: "Oops!",
      text: `${error.response.data.message}`,
      icon: "error",
    });
  }
};
