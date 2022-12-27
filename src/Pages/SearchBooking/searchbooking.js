import React, { useEffect, useReducer, useState } from "react";
import NavbarComponent from "../../Components/base/header";
import Box from "@mui/material/Box";
import { useSearchParams, useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Footer from "../../Components/base/footer";
import Ticket from "../../Components/module/Ticket";
import HeaderSearch from "../../Components/base/header/search";
import axios from "axios";

const SearchBooking = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sort, setSort] = useState("asc");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [isFilter, setIsFilter] = useState(false);

  const initialState = {
    ticket: [],
    id: "",
    isLoading: false,
  };
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "GET_TICKET_ID":
        return {
          ...state,
          id: action.payload,
        };
      default:
        return state;
    }
  }
  const [dispatch] = useReducer(reducer, {});

  const handleClickTiket = (id) => {
    navigate("/flightdetail");
    dispatch({ type: "GWT_TICKET_ID", payload: id });
  };

  useEffect(() => {
    getData();
  }, []);

  //search param
  const [query] = useSearchParams();
  const queryTransit = query.get("transit") ? query.get("transit") : "";
  const queryFacilities = query.get("facilities")
    ? query.get("facilities")
    : "";
  const queryDeparture = query.get("departure") ? query.get("departure") : "";
  const queryArrive = query.get("arrive") ? query.get("arrive") : "";
  const queryAirlines = query.get("airlines") ? query.get("airlines") : "";
  const queryMinPrice = query.get("minPrice") ? query.get("minPrice") : "";
  const queryMaxPrice = query.get("maxPrice") ? query.get("maxPrice") : "";
  const [transit, setTransit] = useState(queryTransit);
  const [facilities, setFacilities] = useState(queryFacilities);
  const [departure, setDeparture] = useState(queryDeparture);
  const [arrive, setArrive] = useState(queryArrive);
  const [airline, setAirline] = useState(queryAirlines);
  const [value, setValue] = useState([0, 100]);
  const [minPrice, setminPrice] = useState(queryMinPrice);
  const [maxPrice, setMaxPrice] = useState(queryMaxPrice);

  const search = (e) => {
    e.preventDefault();
    setIsFilter(true);
    dispatch(
      getData(
        transit,
        facilities,
        departure,
        arrive,
        airline,
        minPrice,
        maxPrice
      )
    );
    return navigate(
      `?transit=${transit}&facilities=${facilities}&departure=${departure}&arrive=${arrive}&airline=${airline}&min_price=${minPrice}&max_price=${maxPrice}`
    );
  };
  const handleChange = (event, newValue) => {
    const values = [];
    newValue.map((value) => {
      values.push(value * 100);
    });
    setValue(newValue);
    setminPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const reset = () => {
    setTransit("");
    setFacilities("");
    setDeparture("");
    setArrive("");
    setAirline("");
  };

  //end of search
  let tiket = `https://flyer-be-production.up.railway.app/ticket`;
  const getData = () => {
    axios
      .get(tiket)
      .then((res) => {
        console.log("get data success");
        console.log(res.data.data);
        res.data.data && setData(res.data.data);
        setSelected(null);
        // dispatch({ type: "GET_TICKET_ID", payload: res.data });
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
        setData([]);
      });
  };
  return (
    <div className="p-5">
      <nav>
        <NavbarComponent />
      </nav>
      <main>
        <div className="row">
          <HeaderSearch
            onClick={(e) => {
              search(e);
            }}
          />
          {/*filter*/}
          <div className="col-log-4 col">
            <div className="d-flex justify-content-between">
              <h5>
                <b>Filter</b>
              </h5>
              <button
                className="btn btn-transparent text-primary"
                onClick={reset}
              >
                <b>Reset</b>
              </button>
            </div>
            <div className="card">
              {/*Transit*/}
              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                  <h6
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      <b>Transit</b>
                    </button>
                  </h6>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="d-flex justify-content-between">
                          Direct
                          <input
                            type="checkbox"
                            value="direct"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setTransit("direct");
                              } else {
                                setTransit("");
                              }
                            }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          Transit{" "}
                          <input
                            type="checkbox"
                            value="direct"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setTransit("transit1");
                              } else {
                                setTransit("");
                              }
                            }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          Transit 2+
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setTransit("transit2");
                              } else {
                                setTransit("");
                              }
                            }}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/*Facilities*/}
              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                  <h6
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      <b>Facilities</b>
                    </button>
                  </h6>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="d-flex justify-content-between">
                          Luggage
                          <input
                            type="checkbox"
                            value="direct"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFacilities("lunggage");
                              } else {
                                setFacilities("");
                              }
                            }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          In-Flight Meal{" "}
                          <input
                            type="checkbox"
                            value="direct"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFacilities("meal");
                              } else {
                                setFacilities("");
                              }
                            }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          Wi-fi
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFacilities("wifi");
                              } else {
                                setFacilities("");
                              }
                            }}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/*Departure Time*/}

              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                  <h6
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      <b>Departure Time</b>
                    </button>
                  </h6>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="d-flex justify-content-between">
                          00:00 - 06:00
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setDeparture("mid");
                              } else {
                                setDeparture("");
                              }
                            }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          06:00 - 12:00{" "}
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setDeparture("morning");
                              } else {
                                setDeparture("");
                              }
                            }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          12:00 - 18:00
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setDeparture("afternoon");
                              } else {
                                setDeparture("");
                              }
                            }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          18:00 - 24:00
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setDeparture("night");
                              } else {
                                setDeparture("");
                              }
                            }}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/*Time Arrived*/}

              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                  <h6
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      <b>Time Arrived</b>
                    </button>
                  </h6>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="d-flex justify-content-between">
                          00:00 - 06:00
                          <input
                            type="checkbox"
                            // onChange={(e) => {
                            //   if (e.target.checked) {
                            //     setTimeArrive("mid");
                            //   } else {
                            //     setTimeArrive("");
                            //   }
                            // }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          06:00 - 12:00{" "}
                          <input
                            type="checkbox"
                            // onChange={(e) => {
                            //   if (e.target.checked) {
                            //     setTimeArrive("morning");
                            //   } else {
                            //     setTimeArrive("");
                            //   }
                            // }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          12:00 - 18:00
                          <input
                            type="checkbox"
                            // onChange={(e) => {
                            //   if (e.target.checked) {
                            //     setTimeArrive("afternoon");
                            //   } else {
                            //     setTimeArrive("");
                            //   }
                            // }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          18:00 - 24:00
                          <input
                            type="checkbox"
                            // onChange={(e) => {
                            //   if (e.target.checked) {
                            //     setTimeArrive("night");
                            //   } else {
                            //     setTimeArrive("");
                            //   }
                            // }}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/*Airlines*/}

              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                  <h6
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      <b>Airlines</b>
                    </button>
                  </h6>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="d-flex justify-content-between">
                          Garuda Indonesia
                          <input
                            type="checkbox"
                            // onChange={(e) => {
                            //   if (e.target.checked) {
                            //     setAirlines("Garuda Indonesia");
                            //   } else {
                            //     setAirlines("");
                            //   }
                            // }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          Air Asia{" "}
                          <input
                            type="checkbox"
                            // onChange={(e) => {
                            //   if (e.target.checked) {
                            //     setAirlines("Air Asia");
                            //   } else {
                            //     setAirlines("");
                            //   }
                            // }}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          Lion Air
                          <input
                            type="checkbox"
                            // onChange={(e) => {
                            //   if (e.target.checked) {
                            //     setAirlines("Fly Emirates");
                            //   } else {
                            //     setAirlines("");
                            //   }
                            // }}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/*Ticket Price*/}

              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                  <h6
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      <b>Ticket Price</b>
                    </button>
                  </h6>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="d-flex justify-content-between">
                          <p>Lowest</p>
                          <span>Highest</span>
                        </li>
                        <div>
                          <Box>
                            <Slider
                              getAriaLabel={() => "Temperature range"}
                              value={value}
                              onChange={handleChange}
                              valueLabelDisplay="auto"
                            />
                          </Box>
                        </div>
                        <li>
                          <input
                            type="text"
                            style={{
                              width: "25%",
                              background: "white",
                              border: "none",
                            }}
                            // placeholder={"$" + value[0] * 100 + ",00"}
                            className="form-control"
                            disabled
                          />
                          <input
                            type="text"
                            // placeholder={"$" + value[1] * 100 + ",00"}
                            className="form-control "
                            style={{
                              width: "30%",
                              background: "white",
                              border: "none",
                            }}
                            disabled
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*select ticket*/}
          <div className="col col-lg-8">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <h5>
                  <b>
                    Select Ticket{" "}
                    <span
                      className="ms-2 text-secondary"
                      style={{ fontSize: "14px", fontWeight: "600" }}
                    >
                      {`(${data?.length} flight found)`}
                      {/* {`(${data.pagination.totalData} flight found)`} */}
                    </span>
                  </b>{" "}
                </h5>
              </div>
              <button className="btn btn-transparent ">
                <b>Sort By</b>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3097 16.6888L9.43312 13.8123C9.22563 13.6048 9.1219 13.3329 9.1219 13.0609C9.1219 12.789 9.22563 12.5171 9.43312 12.3096C9.84806 11.8947 10.5208 11.8947 10.9357 12.3096L11.9985 13.3724L11.9985 2.23291C11.9985 1.64611 12.4742 1.17041 13.061 1.17041C13.6478 1.17041 14.1235 1.64611 14.1235 2.23291L14.1235 13.3724L15.1862 12.3096C15.6011 11.8947 16.2739 11.8947 16.6888 12.3096C17.1037 12.7246 17.1037 13.3973 16.6888 13.8123L13.8122 16.6888C13.3973 17.1037 12.7246 17.1037 12.3097 16.6888ZM5.00156 14.186L5.00156 3.62761L6.06429 4.69037C6.47923 5.10528 7.15196 5.10528 7.5669 4.69037C7.98184 4.2754 7.98184 3.6027 7.5669 3.18773L4.69035 0.311179C4.27541 -0.103727 3.60268 -0.103727 3.18774 0.311179L0.31119 3.18773C0.103704 3.39522 -2.30485e-05 3.66712 -2.30604e-05 3.93905C-2.30723e-05 4.21099 0.103704 4.48289 0.311189 4.69037C0.726129 5.10528 1.39886 5.10528 1.8138 4.69037L2.87653 3.62761L2.87653 14.186C2.87653 14.7728 3.35223 15.2485 3.93903 15.2485C4.52583 15.2485 5.00156 14.7728 5.00156 14.186Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            <div>
              {data.length >= 1
                ? data.map((item) => (
                    <div className="card mb-3">
                      <Ticket
                        key={item.id}
                        logo={item.airlines_logo}
                        airlines_names={item.airlines_name}
                        departure_city={item.departure_name}
                        departure_code={item.departure_code}
                        arrival_city={item.arrival_name}
                        arrival_code={item.arrival_code}
                        departure={item.departure_time}
                        arrive={item.arrival_time}
                        price={item.price}
                        transit={item.stock}
                        // onClick={
                        //   item.id == selected
                        //     ? () => setSelected(null)
                        //     : () => (setSelected(item.id), select(item))
                        // }
                        onClick={() => handleClickTiket(item.id)}
                      />
                    </div>
                  ))
                : "Ticket not found"}
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default SearchBooking;