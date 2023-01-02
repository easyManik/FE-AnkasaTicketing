import React, { useEffect } from "react";
import AccordionC from '../../Components/base/accordion'
import Footer from '../../Components/base/footer'
import NavbarComponent from '../../Components/base/header'
import { useSelector, useDispatch } from "react-redux";
import { detailProfile } from "../../Config/redux/actions/profile";
import { bookingTiket } from "../../Config/redux/actions/bookingTicket"
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import u6 from '../../Assets/img/u6.png'
import u4 from '../../Assets/img/u4.png'
import u7 from '../../Assets/img/u7.png'
import u8 from '../../Assets/img/u8.png'
import u9 from '../../Assets/img/u9.png'
import b1 from '../../Assets/img/b1.png'
import b2 from '../../Assets/img/b2.png'
import b3 from '../../Assets/img/b3.png'





export default function MyBooking() {
    const { profile } = useSelector((state) => state.profile);
    const { ticket } = useSelector((state) => state.ticket);
    console.log(ticket, 'ini data ticket')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // const paymentStatus = ticket.filter( e => e.payment === 0)
    // console.log(paymentStatus)

    useEffect(() => {
        const localdata = localStorage.getItem("Ankasa");
        const { token } = JSON.parse(localdata);
        dispatch(bookingTiket(token));
        dispatch(detailProfile(token));
    }, []);


    const handleLogout = async () => {
        await localStorage.clear();
        swal({
            title: "Log Out",
            text: `Log Out Success`,
            icon: "success",
        });
        navigate("/login");
    };


    return (
        <div className='container-fluid' style={{ backgroundColor: '#F5F6FA' }}>
            <NavbarComponent />
            <div className='container py-5' >
                <div className='row g-5'>
                    <div className='col-lg-4'>
                        <div className="card p-3 shadow p-2 mb-3 bg-body rounded">
                            <div className='card-body text-center'>
                                <img src={profile.photo} alt='' width={'137'} height={'137'}
                                    style={{ borderRadius: '100%', border: 'solid #2395FF', padding: '3%' }}
                                    className="img-fluid" />
                                <div className="my-4">
                                    <Link to='/profile'>
                                        <button className='btn btn-outline-primary p-3 mb-3'>
                                            <b>Select Photo</b>
                                        </button>
                                    </Link>
                                    <h5><b>{profile.fullname}</b></h5>
                                    <p>{profile.address}</p>
                                </div>
                                <div className='d-flex justify-content-between mb-1'>
                                    <h6><b>Cards</b></h6>
                                    <button className='btn'><h6 className='text-primary'>
                                        <b>+Add</b></h6></button>
                                </div>
                                <div className='bg-primary shadow  mb-2 p-3 text-white'
                                    style={{ borderRadius: '8%' }}>
                                    <h4 className='text-start'>1234 0000 5678</h4>
                                    <div className='d-flex justify-content-between'>
                                        <p>x card</p>
                                        <p>$ 100000</p>
                                    </div>
                                </div>
                                {/* profile */}
                                <Link to='/profile'>
                                    <div className='d-flex justify-content-between'>
                                        <button className='btn'><img src={u9} alt='' /></button>
                                        <button className='btn'><img src={b1} alt='' /></button>
                                    </div>
                                </Link>
                                {/* my reviuw */}
                                <div className='d-flex justify-content-between'>
                                    <button className='btn'><img src={u7} alt='' /></button>
                                    <button className='btn'><img src={b3} alt='' /></button>
                                </div>
                                {/* setting */}
                                <div className='d-flex justify-content-between'>
                                    <button className='btn'><img src={u8} alt='' /></button>
                                    <button className='btn'><img src={b3} alt='' /></button>
                                </div>
                                {/* logout */}
                                <div className='d-flex justify-content-between' onClick={handleLogout}>
                                    <button className='btn'><img src={u6} alt='' /></button>
                                    <button className='btn'><img src={b2} alt='' /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8 '>
                        <div className="card p-3 shadow p-2 mb-3 bg-body rounded">
                            <div className="card-body mb-2">
                                <h6 className='text-primary'>MY BOOKING</h6>
                                <div className='d-flex justify-content-between'>
                                    <h3><b>My Booking</b></h3>
                                    <p className='text-primary'><b>Order History</b></p>
                                </div>
                            </div>
                        </div> 
                        { ticket?.length >= 1  ? ticket.map((tiket)=>   {return (
                        // {ticket.map((tiket) => (
                            <div className="card p-3 shadow p-2 mb-3 bg-body rounded" key={tiket.id}>
                                <div className="card-body mb-2">
                                    <p>{tiket.departure} ...Monday, 20 July 20- 12:30</p>
                                    <div className='d-flex justify-content-start'>
                                        <h5><b>{tiket.departure_code}</b></h5>
                                        <img src={u4} alt='' className='mx-5' />
                                        <h5><b>{tiket.arrival_code}</b></h5>
                                    </div>
                                    <p> {tiket.airlines_names},  {tiket.code}</p>
                                    <hr />
                                    <div className='d-flex justify-content-between'>
                                            <div className='d-flex'>
                                                <p className=''><b>Status</b></p>
                                                 {tiket.payment === 0 ? 
                                                // { paymentStatus ? 
                                                <Link to={`/payment/${tiket.id}`} style={{ textDecoration: 'none' }}>  
                                                    <button className='mx-5  text-white btn '
                                                    style={{ backgroundColor: '#FF7F23' }}><b>Waiting for payment</b>
                                                </button> 
                                                </Link>
                                                   :
                                                   <Link to={`/MyBarcode/${tiket.id}`} style={{ textDecoration: 'none' }}>    
                                                    <button className='mx-5 text-white btn' style={{ backgroundColor: '#4FCF4D' }}><b>Eticket Issued</b></button> 
                                                    </Link> 
                                                }  
                                            </div>
                                        <div>
                                            <AccordionC />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        // ))}
                        )}) : 'not data '}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
