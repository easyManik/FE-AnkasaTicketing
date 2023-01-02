import axios from "axios";
import swal from "sweetalert";


  export const getAirportAdmin = (token, page) => async (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BACKEND,
        url:  `airport?page=${page}`,
        //   data: id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data.data,'ini');
          dispatch({ type: "GET_AIRPORT_ADMIN", payload: res.data });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  export const getAirportAdminId = (id, token) => async (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BACKEND,
        url:  `airport/${id}`,
        //   data: id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data.data,'ini');
          dispatch({ type: "GET_AIRPORT_ADMIN_ID", payload: res.data.data });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  export const insertAirport = (formData, token, navigate) => async (dispatch) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_BACKEND}airport`,
        formData,
        {
          "content-type": "multipart/form-data",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const airportAdmin = result.data;
      dispatch({ type: "ADD_AIRPORT", payload: airportAdmin });
      swal({
        title: "Insert Airport Success",
        text: `${result.data.message}`,
        icon: "success",
      });
      navigate('/Admin/airport')
    } catch (error) {
      console.log(error);
      swal({
        title: "Insert Airport Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };


  export const updateAirport = (id,formData,token, navigate) => async (dispatch) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_API_BACKEND}airport/${id}`,
        formData,
        {
          "content-type": "multipart/form-data",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const airportAdmin = result.data;
      dispatch({ type: "UPDATE_AIRPORT", payload: airportAdmin });
      swal({
        title: "Update Airport Success",
        text: `${result.data.message}`,
        icon: "success",
      });
      navigate('/Admin/airport')
    } catch (error) {
      console.log(error);
      swal({
        title: "Update Airport Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };


  export const deleteAirport = ( id, token) => async (dispatch) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_API_BACKEND}airport/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const airportAdmin = result.data;
      dispatch({ type: "DELETE_AIRPORT", payload: airportAdmin });
      swal({
        title: "Delete Airport Success",
        text: `${result.data.message}`,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "Delete Airport Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };