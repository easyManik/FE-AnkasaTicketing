import axios from "axios";
import swal from "sweetalert";



  export const getAllTicket = (page) => async (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BACKEND,
        url:  `ticket?page=${page}`,
        //   data: id,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
        .then((res) => {
          console.log(res.data.data,'ini');
          dispatch({ type: "GET_TICKET_ALL", payload: res.data });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };


  export const getTicketId = (id) => async (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BACKEND,
        url:  `ticket/${id}`,
        //   data: id,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
        .then((res) => {
          console.log(res.data.data,'ini');
          dispatch({ type: "GET_TICKET_ID", payload: res.data.data });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };


  export const insertTicket = (formData, token, navigate) => async (dispatch) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_BACKEND}ticket/add`,
        formData,
        {
          "content-type": "multipart/form-data",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const adminTicket = result.data;
      dispatch({ type: "ADD_TICKET", payload: adminTicket });
      swal({
        title: "Insert Ticket Success",
        text: `${result.data.message}`,
        icon: "success",
      });
      navigate('/Admin/ticket')
    } catch (error) {
      console.log(error);
      swal({
        title: "Insert Ticket Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };


  export const updateTicket = (id,formData,token, navigate) => async (dispatch) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_API_BACKEND}ticket/${id}`,
        formData,
        {
          "content-type": "multipart/form-data",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const adminTicket = result.data;
      dispatch({ type: "UPDATE_TICKET", payload: adminTicket });
      swal({
        title: "Update Ticket Success",
        text: `${result.data.message}`,
        icon: "success",
      });
      navigate('/Admin/ticket')
    } catch (error) {
      console.log(error);
      swal({
        title: "Update Ticket Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };


  export const deleteTicketId = ( id, token) => async (dispatch) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_API_BACKEND}ticket/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const adminTicket = result.data;
      dispatch({ type: "DELETE_TICKET", payload: adminTicket });
      swal({
        title: "Delete Ticket Success",
        text: `${result.data.message}`,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "Delete Ticket Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };