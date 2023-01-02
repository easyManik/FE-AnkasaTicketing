import axios from "axios";
import swal from "sweetalert";


export const bookingTiket = (token,page) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      baseURL: process.env.REACT_APP_API_BACKEND,
      url:  `order/admin?page=${page}`,
      //   data: id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.data, 'ini');
        dispatch({ type: "GET_ORDER_ADMIN", payload: res.data });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

  export const deleteDataBooking = ( id, token) => async (dispatch) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_API_BACKEND}order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const booking = result.data;
      dispatch({ type: "DELETE_DATA_BOOKING", payload: booking });
      swal({
        title: "Delete booking Success",
        text: `${result.data.message}`,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "Delete booking Fail",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };

