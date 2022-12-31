import React from "react";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTicket,
  deleteTicketId,
} from "../../Config/redux/actions/adminTicket";
import { Link } from "react-router-dom";
import Footer from "../../Components/base/footer";
import NavbarComponentAdmin from "../../Components/base/header/headerAdmin";

export default function Admin() {
  // get ticket
  const { adminTicket } = useSelector((state) => state.adminTicket);
  const dispatch = useDispatch();
  console.log(adminTicket);

  //deleteTicket
  const deleteTicket = (e, id) => {
    const localdata = localStorage.getItem("Ankasa");
    const { token } = JSON.parse(localdata);
    dispatch(deleteTicketId(id, token));
    dispatch(getAllTicket());
  };

  useEffect(() => {
    dispatch(getAllTicket());
  }, []);

  return (
    // <div>sssss</div>
    <div className="container">
      <nav>
        <NavbarComponentAdmin />
      </nav>
      <div className="py-5">
        <h5 className="text-center mb-4 mt-4">DAFTAR TIKET </h5>
        <Table bordered hover>
          <thead>
            <tr className="text-center">
              {/* <th>No</th> */}
              <th>Airlines Name</th>
              <th>Logo</th>
              <th>Deaprture - Arrival</th>
              <th>Price</th>
              <th>Id</th>
              <th>Edit/Inser/Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {adminTicket.data?.length >= 1
              ? adminTicket.data.map((p) => {
                  return (
                    <tr>
                      <td>{p.airlines_name}</td>
                      <img
                        src={p.airlines_logo}
                        alt="airlines_logo"
                        width={100}
                        height={100}
                      />
                      <td>
                        {p.departure_name}({p.departure_code}) -{" "}
                        {p.arrival_name}({p.arrival_code})
                      </td>
                      <td>$.{p.price}</td>
                      <td>{p.id}</td>
                      <td>
                        <Link to={`/Admin/ticket/update/${p.id}`}>
                          <button className="col-lg-6 m-3 btn btn-warning text-white">
                            Update
                          </button>
                        </Link>
                        <button
                          className="col-lg-6 btn btn-danger"
                          onClick={(e) => deleteTicket(e, p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "not data "}
          </tbody>
        </Table>
        <Link to="/Admin/ticket/insert">
          <button className="btn btn-success col-lg-2 col-3">Insert</button>
        </Link>
      </div>

      <nav>
        <Footer />
      </nav>
    </div>
  );
}
