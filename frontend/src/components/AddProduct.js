import React, {useState} from 'react'
const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setcategory] = useState("");
    const [company, setCompany] = useState("");  
    const [error, setError] = useState(false);

    const AddProduct = async() => {

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        
        let result = await fetch('http://localhost:5000/add-products',{
            method:"post",
            body:JSON.stringify({name, price, category, company, userId}),
            headers:{
                "Content-Type" : "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });

        result = await result.json();
        console.log(result);
    }
  return (
    <div className="product">
        <h1>Add Product</h1>
        <input type="text" className="inputBox" value={name}
            placeholder="Enter product name" onChange={(e)=>setName(e.target.value)}
        />
        {error && !name && <span className="invalid-input">Enter valid name</span>}

        <input type="text" className="inputBox" value={price}
            placeholder="Enter product price" onChange={(e)=>setPrice(e.target.value)}
        />
        {error && !price && <span className="invalid-input">Enter valid price</span>}

        <input type="text" className="inputBox" value={category} 
            placeholder="Enter product category" onChange={(e)=>setcategory(e.target.value)}
        />
        {error && !category && <span className="invalid-input">Enter valid category</span>}

        <input type="text" className="inputBox" value={company}
            placeholder="Enter product company" onChange={(e)=>setCompany(e.target.value)}
        />
        {error && !company && <span className="invalid-input">Enter valid company</span>} 

        <button className="button" onClick={AddProduct}>Add Product</button>
    </div>
  )
}
export default AddProduct
