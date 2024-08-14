import React, {useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setcategory] = useState("");
    const [company, setCompany] = useState("");  
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails = async() => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setcategory(result.category)
        setCompany(result.company)
    }

    const updateProduct = async() => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"put",
            body:JSON.stringify({name, price, category, company}),
            headers:{
                "Content-Type" : "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
        result = await result.json()
        navigate("/")
    }

  return (
    <div className="product">
        <h1>Update Product</h1>
        <input type="text" className="inputBox" value={name}
            placeholder="Enter product name" onChange={(e)=>setName(e.target.value)}
        />
        <input type="text" className="inputBox" value={price}
            placeholder="Enter product price" onChange={(e)=>setPrice(e.target.value)}
        />
        <input type="text" className="inputBox" value={category} 
            placeholder="Enter product category" onChange={(e)=>setcategory(e.target.value)}
        />
        <input type="text" className="inputBox" value={company}
            placeholder="Enter product company" onChange={(e)=>setCompany(e.target.value)}
        />
        <button className="button" onClick={updateProduct}>Update Product</button>
    </div>
  )
}
export default UpdateProduct

