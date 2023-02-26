import express from "express"
import mysql from "mysql"
import cors from "cors"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { status } from "init"
import * as fs from 'fs';
dotenv.config()

// import mongoose from "mongoose"
const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "furnituresweb"
})


// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     next();
// })
app.use(cors())
app.get("/", function (req, res) {
    res.json("Hello From backend");
});

app.get("/categories", (req, res) => {
    const q = "Select * from categories"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/categories", (req, res) => {
    const q = "insert into categories (`CategoryName`,`CategoryId`) values (?)"
    // const values = ["manoj","khabhi bhi","kajs"]
    const values = [
        req.body.CategoryId,
        req.body.CategoryName,
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })

})


app.get("/products/:CatId", (req, res) => {
    const catId = req.params.CatId;
    const q = "Select * from product where Category_Id = ?"
    db.query(q, [catId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get("/product/:ProductId", (req, res) => {
    const productId = req.params.ProductId;
    const q = "Select * from product where ProductId = ?"
    db.query(q, [productId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get("/productCat/:ProductId", (req, res) => {
    const productId = req.params.ProductId;
    const q = "Select * from product where Category_Id in (select Category_Id from product p where p.ProductId = ?) and ProductId != ?"
    db.query(q, [productId, productId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get("/images/:ProductId", (req, res) => {
    const productId = req.params.ProductId;
    const q = "select * from images where ProductId = ?"
    db.query(q, [productId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/AddCart", (req, res) => {
    const data = [
        req.body.userid,
        req.body.ProductId,
        req.body.quantity
    ]
    const q = "insert into cart values(?)"
    db.query(q, [data], (err, data) => {
        if (err) return res.json(err);
        return res.json({ "status": "200" });
    })
})
app.get("/Cart/:userid", (req, res) => {
    const userid = req.params.userid;
    const q = "Select * from product p , cart c where c.ProductId = p.ProductId and c.CustomerId = ?"
    db.query(q, [userid], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
app.get("/Cart/:userid/1", (req, res) => {
    const userid = req.params.userid;
    const q = "Select SUM(Cost*Quantity) as totcost from product p , cart c where c.ProductId = p.ProductId and c.CustomerId = ?"
    db.query(q, [userid], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.put("/Cart/:userid", (req, res) => {
    const userid = req.params.userid;
    const ProductId = req.body.ProdId;
    const quantity = req.body.quan;
    const q = "update cart set Quantity = ? where CustomerId = ? and ProductId = ?"
    db.query(q, [quantity, userid, ProductId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })

})
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.ProductName,
                        },
                        unit_amount: item.Cost,
                    },
                    quantity: item.Quantity,
                };
            }),
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/failure`,
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.post("/addcategory", (req, res) => {

    try {
        const filestr = req.body.image;
        const name = req.body.name;
        const desc = req.body.desc;
        const Uploadstats = cloudinary.uploader.upload(filestr)
            .then((result) => {
                console.log(result.url);
                const q = `Insert into categories values(6,"${name}","${result.url}","${desc}")`
                db.query(q, (err, data) => {
                    if (err) return res.json(err);
                    return res.json(data);
                })
                // res.json({ Msg: "HOgaya Bro" })
            })
            .catch((err) => {
                console.error(err);
            });

    } catch (e) {
        console.log(e);
        res.json({ err: "nahi hua bro" })
    }
})
app.post("/addproduct", (req, res) => {

    try {
        const filestr1 = req.body.image1;
        const filestr2 = req.body.image2;
        const filestr3 = req.body.image3;
        const dimensions = req.body.dim;
        // const catid = req.body.catid;
        const name = req.body.name;
        const desc = req.body.desc;
        // console.log()
        const cost = req.body.cost;
        const Uploadstats3 =() =>  cloudinary.uploader.upload(filestr3)
            .then((result) => {
                console.log(result.url);

                // const q2 = `Insert into images values(6,"${filestr1}")`;
                // const q3 = `Insert into images values(6,"${filestr2}")`;
                const q4 = `Insert into images values(6,"${result.url}")`;
                // db.query(q2, (err, data) => {
                //     if (err) return res.json(err);
                //     // return res.json(data);
                // })
                // db.query(q3, (err, data) => {
                //     if (err) return res.json(err);
                //     // return res.json(data);
                // })
                db.query(q4, (err, data) => {
                    if (err) return res.json(err);
                    // return res.json(data);
                })
                return res.json({ Msg: "HOgaya Bro" })
            })
            .catch((err) => {
                console.error(err);
            });
        const Uploadstats2 =() =>  cloudinary.uploader.upload(filestr2)
            .then((result) => {
                console.log(result.url);

                // const q2 = `Insert into images values(6,"${filestr1}")`;
                const q3 = `Insert into images values(6,"${result.url}")`;
                // const q4 = `Insert into images values(6,"${filestr3}")`;
                // db.query(q2, (err, data) => {
                //     if (err) return res.json(err);
                //     // return res.json(data);
                // })
                db.query(q3, (err, data) => {
                    if (err) return res.json(err);
                    // return res.json(data);
                    Uploadstats3();
                })
                // db.query(q4, (err, data) => {
                //     if (err) return res.json(err);
                //     // return res.json(data);
                // })
                // return res.json({ Msg: "HOgaya Bro" })
            })
            .catch((err) => {
                console.error(err);
            });
        const Uploadstats=() => cloudinary.uploader.upload(filestr1)
            .then((result) => {
                console.log("hi")
                console.log(result.url);
                const q = `Insert into product values(6,"${name}","${desc}",${cost},"${dimensions}",6,"${result.url}")`;
                db.query(q, (err, data) => {
                    if (err) return res.json(err);
                    // return res.json(data);
                })
                const q2 = `Insert into images values(6,"${result.url}")`;
                db.query(q2, (err, data) => {
                    if (err) return res.json(err);
                    // return res.json(data);
                    Uploadstats2()
                })

                // return res.json({ Msg: "HOgaya Bro" })
            })
            .catch((err) => {
                console.error(err);
            });
        
        Uploadstats();



    } catch (e) {
        console.log(e);
        res.json({ err: "nahi hua bro" })
    }
})


app.get("/categorysale" , (req,res)=>{
    const q = "Select SUM(quantitysold) as soldquantity ,c.CategoryName  from product p , categories c where c.CategoryId = p.Category_Id group by Category_Id order by Category_Id"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get("/productsale" , (req,res)=>{
    const q = "Select quantitysold , ProductName  from product p  order by quantitysold  DESC limit 0 , 3"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(5000, () => {
    console.log("Connected to backend");
});