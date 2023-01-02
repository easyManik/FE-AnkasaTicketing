import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";


  export const getAirlines = (token, page) => async (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BACKEND,
        url:  `airlines?page=${page}`,
        //   data: id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data.data,'ini');
          dispatch({ type: "GET_AIRLINES", payload: res.data });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  export const getAirlinesId = (id,token) => async (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BACKEND,
        url:  `airlines/detail/${id}`,
        //   data: id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data.data,'ini');
          dispatch({ type: "GET_AIRLINES_ID", payload: res.data.data });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };


  export const insertAirlines = (formData, token, navigate) => async (dispatch) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_BACKEND}airlines`,
        formData,
        {
          "content-type": "multipart/form-data",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const airlines = result.data;
      dispatch({ type: "INSERT_AIRLINES", payload: airlines });
      swal({
        title: "Insert Data Success",
        text: `${result.data.message}`,
        icon: "success",
      });
      navigate('/Admin/airlines')
    } catch (error) {
      console.log(error);
      swal({
        title: "Insert Data Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };


  export const deleteAirlines = (id,token) => async (dispatch) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_API_BACKEND}airlines/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const airlines = result.data;
      dispatch({ type: "DELETE_AIRLINES", payload: airlines });
      swal({
        title: "Delete Data Success",
        text: `${result.data.message}`,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "Delete Data Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };


  export const updateAirlines = (id,formData,token, navigate) => async (dispatch) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_API_BACKEND}airlines/${id}`,formData,
        {
          "content-type": "multipart/form-data",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const airlines = result.data;
      dispatch({ type: "UPDATE_AIRLINES", payload: airlines });
      swal({
        title: "Update Data Success",
        text: `${result.data.message}`,
        icon: "success",
      });
      navigate('/Admin/airlines')
    } catch (error) {
      console.log(error);
      swal({
        title: "Update Data Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };

  

  

  

  