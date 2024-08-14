const express = require('express');
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/product");
const app = express();

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

// for convert data into json format(middleware)
app.use(express.json());

app.use(cors());//(middleware)

// signup
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "10h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong, Please try after sometime" });
        }
        resp.send({ result, auth: token });
    })
});

// login
app.post("/login", async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "10h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong, Please try after sometime" });
                }
                resp.send({ user, auth: token });
            })

        } else {
            resp.send({ result: "No User Found" });
        }
    } else {
        resp.send({ result: "No User Found" });
    }
});

// add records
app.post("/add-products", verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

// get all records
app.get("/products", verifyToken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No Products found" })
    }
});

// delete record
app.delete("/product/:id", verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

// get single record
app.get("/product/:id", verifyToken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No Record Found." });
    }
})

// update record
app.put("/product/:id", verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
});

// search 
app.get("/search/:key", verifyToken, async (req, resp) => {2
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    resp.send(result)
})

// verify token
function verifyToken(req, resp, next){
    let token = req.headers['authorization'];
    console.log(token);
    if(token){
        token = token.split(" ")[1];
        console.warn('middleware called : ',token);
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                resp.status(401).send({result : "Please provide valid token with header"});
            } else {
                next();
            }
        })
        
    } else {
        resp.status(403).send({result : "Please add token with header"});
    }
}


app.listen(5000);



