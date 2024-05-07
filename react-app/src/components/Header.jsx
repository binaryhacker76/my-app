import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import './login.css';

function Header(props) {

    const [loc, setLoc] = useState(null)
    const [showOver, setshowOver] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    // let locations = [
    //     {
    //         "latitude": 28.6139,
    //         "longitude": 77.2090,
    //         "placeName": "New Delhi, Delhi"
    //     },
    //     {
    //         "latitude": 19.0760,
    //         "longitude": 72.8777,
    //         "placeName": "Mumbai, Maharashtra"
    //     },
    //     {
    //         "latitude": 23.372257,
    //         "longitude": 85.334762,
    //         "placeName": "Lalpur chork ranchi"
    //     },
    //     {
    //         "latitude": 28.6139,
    //         "longitude": 77.2090,
    //         "placeName": "ranchi"
    //     },
    // ]

    return (
        <>
        <div className='header-container d-flex justify-content-between' >

            <div className="header">
                <Link to="/" className='home1'>   HOME </Link>
                {/* <select value={loc} onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value)
                    setLoc(e.target.value)
                }} >
                    {
                        locations.map((item, index) => {
                            return (
                                <option value={`${item.latitude},${item.longitude}`} >
                                    {item.placeName}
                                </option>
                            )
                        })
                    }
                </select> */}

                {/* <input className='search' type='text' placeholder='Search Product' value={props && props.search}
                onChange={(e)=>props.handlesearch&&props.handlesearch(e.target.value)}
                /> */}

              
              {/* <button className='search-btn' onClick={() => props.handleClick && props.handleClick()} > <FaSearch /> </button> */}
           
              <input type='text' className="search1" placeholder="search products" value={props && props.search}   onChange={(e)=>props.handlesearch2&&props.handlesearch2(e.target.value)}/>
           
             <button onClick={() => props.handleClick2 && props.handleClick2()} className='sbtn1'>SEARCH</button>
              <input type='text' className="search2" placeholder="search address" value={props && props.search3}   onChange={(e)=>props.handlesearch3&&props.handlesearch3(e.target.value)}/>
           
              <button onClick={() => props.handleClick3 && props.handleClick3()} className='sbtn2'>SEARCH</button>






                
            </div>

          <h2 className="logo" >LOST FIND </h2>


          


            <div>







                <div
                    onClick={() => {
                        setshowOver(!showOver)
                    }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#002f34',
                        width: '40px',
                        height: '40px',
                        color: '#fff',
                        fontSize: '14px',
                        borderRadius: '50%'
                    }} >  L  F</div>

                {showOver && <div style={{
                    minHeight: '100px',
                    width: '200px',
                    background: '#eee',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    zIndex: 1,
                    marginTop: '50px',
                    marginRight: '50px',
                    color: 'red',
                    fontSize: '14px',
                    background: '#002f34',
                    boxShadow: 'rgba(4, 10, 0, 0.35) 7px 5px 15px',
                    borderRadius: '7px'
                }}>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/add-product">
                                <button className="logout-btn">ADD PRODUCT  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/liked-products">
                                <button className="logout-btn"> SELECTED PRODUCTS</button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-products">
                                <button className="logout-btn">MY PRODUCTS </button>
                            </Link>}
                    </div>


                    {/* <div>
                        {!localStorage.getItem('token') ?
                            <Link to="/advancesearch">  ADVANCE SEARCH </Link> :
                            <button className='logout-btn'> ADVANCE SEARCH </button>}
                    </div> */}



                    <div className='login'>
                        {!localStorage.getItem('token') ?
                            <Link to="/login" className='log'>  LOGIN </Link> :
                            <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>}
                    </div>
                 



                </div>}
            </div>

        </div>
      </>
    )
}


export default Header;