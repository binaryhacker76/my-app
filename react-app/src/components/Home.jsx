import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";


function Home() {

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search3, setsearch3] = useState('');
    const [search2, setsearch2] = useState('');
    const [issearch, setissearch] = useState(false);

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = API_URL + '/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])

    // const handlesearch = (value) => {
    //     setsearch(value);
    // }

    // const handleClick = () => {

        // const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        // axios.get(url)
        //     .then((res) => {
        //         setcproducts(res.data.products);
        //         setissearch(true);
        //     })
        //     .catch((err) => {
        //         alert('Server Err.')
        //     })

    //     let filteredProducts = products.filter((item) => {
    //         if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
    //             item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
    //             item.category.toLowerCase().includes(search.toLowerCase())) {
    //             return item;
    //         }
    //     })
    //     setcproducts(filteredProducts)

    // }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first. Please')
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Pined Success.	&#128513;')
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })

    }


    const handleProduct = (id) => {
        navigate('/product/' + id)
    }



const handlesearch2=(value)=>{
    // console.log("hiiii",value);
    setsearch2(value);

}

const handlesearch3=(value)=>{
    // console.log("hiiii",value);
    setsearch3(value);

}

const handleClick2=()=>{
    console.log("clicked",products);
    let filteredProducts=products.filter((item)=>{
        if(item.pname.toLowerCase().includes(search2.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search2.toLowerCase()) ||
        item.category.toLowerCase().includes(search2.toLowerCase())){
            return item;
        }

    })
    setproducts(filteredProducts)
    
}


const handleClick3=()=>{
    console.log("clicked",products);
    let filteredProducts=products.filter((item)=>{
        if(item.pname.toLowerCase().includes(search3.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search3.toLowerCase()) ||
        item.category.toLowerCase().includes(search3.toLowerCase())){
            return item;
        }

    })
    setproducts(filteredProducts)
    
}



    return (
        <div>
            <Header search={search2} search3={search3} handlesearch2={handlesearch2} handlesearch3={handlesearch3} handleClick2={handleClick2} handleClick3={handleClick3} />
            <Categories handleCategory={handleCategory} />
            {issearch && cproducts &&
                <h5> SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setissearch(false)}> CLEAR </button>
                </h5>}

            {issearch && cproducts && cproducts.length == 0 && <h5> No Results Found </h5>}
            {issearch && <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {

                        return (
                            <div key={item._id} className="card m-3 ">
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                <i class="fa-solid fa-thumbtack"></i>
                                </div>
                                <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />

                                <h2 className="m-2"> {item.pname}  | {item.category} </h2>
                                <h3 className="m-2 text-danger"> {item.price} </h3>
                                <p className="m-2 text-success"> {item.pdesc} </p>
                            </div>
                        )

                    })}
            </div>}

            {!issearch && <div className=" d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                            <div className="cardbox">
                            <div  onClick={() => handleProduct(item._id)} key={item._id} className=" card " >
                                <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                                   {/* <FaHeart className="icons" /> */}
                                   <i class="fa-solid fa-thumbtack" style={{color:"blue"}}></i>
                                </div>
                                <img width="250px" height="150px" src={API_URL + '/' + item.pimage} />
                              
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <h6 className="m-2 price-text" style={{color:"black"}}> Contact No-{item.price} </h6>
                                <p className="m-2 " >Add- {item.pdesc} </p>
                            </div>
                            </div>
                        )

                    })}
            </div>}

        </div>
    )
}

export default Home;