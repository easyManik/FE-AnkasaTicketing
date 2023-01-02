import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAirportAdmin, deleteAirport } from "../../Config/redux/actions/airportAdmin";
import { Link } from 'react-router-dom';




export default function Airport() {
    const { airportAdmin } = useSelector((state) => state.airportAdmin);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    console.log(airportAdmin)
    const totalPageAdmin = airportAdmin.pagination.totalPage
    const current = airportAdmin.pagination.currentPage
    // console.log(airportAdmin.pagination.totalPage)

    const deleteAir = (e, id) => {
        const localdata = localStorage.getItem("Ankasa");
        const { token } = JSON.parse(localdata);
        dispatch(deleteAirport(id, token));
        dispatch(getAirportAdmin(token));
    }

    useEffect(() => {
        const localdata = localStorage.getItem("Ankasa");
        const { token } = JSON.parse(localdata);
        dispatch(getAirportAdmin(token, page));
    }, [page]);

    const pagenateNext = () => {
        if (page === totalPageAdmin) {
            setPage(page = 5)
        } else {
            setPage(page + 1)
            console.log(page)
        }
    }
    const pagenateM = () => {
        if (page === 0) {
            setPage(page = 1)
        }
        else {
            setPage(page - 1)
            console.log(page)
        }
    }


    return (
        // <div>sssss</div>
        <div className='container'>
            <h5 className='text-center mb-4 mt-4'>DAFTAR AIRPORT </h5>
             {/* pagination */}
             <div className='d-flex justify-content-end mb-3 '>
                <button className='btn btn page-item border-secondary' onClick={pagenateNext}>next</button>
                <p className='px-2'>{current}/{totalPageAdmin}</p>
                <button className='btn btn page-item border-secondary' onClick={pagenateM}>Previuw</button>
            </div>
            <Table bordered hover >
                <thead>
                    <tr className='text-center bg-light'>
                        {/* <th>No</th> */}
                        <th >Aiport_Name</th>
                        <th>Code</th>
                        <th>Photo</th>
                        <th >Id</th>
                        <th>Edit/Inser/Delete</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {airportAdmin.data?.length >= 1 ? airportAdmin.data.map((p) => {
                        return (
                            // {airportAdmin.map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.code}</td>
                                <img src={p.photo} alt='airlines_logo' width={100} height={100} />
                                <td>{p.id}</td>
                                <td>
                                    <Link to={`/Admin/airport/update/${p.id}`}><button className='col-lg-6 btn btn-warning text-white' >Update</button></Link>
                                    <button className='col-lg-6 btn btn-danger' onClick={(e) => deleteAir(e, p.id)}>Delete</button>
                                </td>
                            </tr>
                            // ))}
                        )
                    }) : 'not data '}
                </tbody>
            </Table>
            <Link to='/Admin/airport/insert'><button className='btn btn-success col-lg-2 col-3'>Insert</button></Link>
        </div>
    )
}








