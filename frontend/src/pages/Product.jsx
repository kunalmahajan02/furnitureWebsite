import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Nav from './Nav';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { width } from '@mui/system';
import { Card, CardBody } from '@chakra-ui/react'
import styled from 'styled-components';
import { ChakraProvider, Image, Stack, Heading, Text, Divider } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

const Productt = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10vh;
`
const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-left: 10vw;
    font-size: 20px;
    font-weight: 900;
`
const Cart = styled.div`
    display: flex;
    flex-direction: column-reverse;
    padding: 20px 20px;
    width: 250px;
    justify-content: space-between;
    align-items: center;
`
const Container = styled.div`
    
`
const Similar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '500px',
    width: '40vw',
}

const Adder = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content:center;
    width: 150px;
    border: 2px solid black;
`

const Form = styled.form`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Inner = styled.div`
    position: relative;
    font-weight: bolder;
    font-size:20px;
`

const Product = () => {
    const { ProductId } = useParams();
    const { custid } = useParams();
    // console.log(useParams());
    const [product, setprod] = useState([]);
    const [images, setimage] = useState([]);
    const [products, setproducts] = useState([]);
    useEffect(() => {
        const FetchProduct = async () => {
            try {
                const res = await axios.get("http://localhost:5000/product/" + ProductId);
                setprod(res.data);

            } catch (err) {
                console.log(err);
            }
        }
        FetchProduct();
    }, []);
    useEffect(() => {
        const FetchImages = async () => {
            try {
                const res = await axios.get("http://localhost:5000/images/" + ProductId);
                setimage(res.data);
            } catch (err) {
                console.log("err");
            }
        }
        FetchImages();

    }, []);

    // const [products, setproducts] = useState([]);

    useEffect(() => {
        const FetchAllProd = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/productCat/${ProductId}`)
                setproducts(res.data)

            } catch (err) {
                console.log(err);
            }
        }
        FetchAllProd();
    }, []);


    const [counter, setCounter] = useState(0);
    const handleClick1 = () => {
        setCounter(counter + 1)
    }

    const handleClick2 = () => {
        setCounter(counter - 1)
    }
    const handleEvent = async () => {
        const data = {
            userid: custid,
            ProductId: ProductId,
            quantity: document.getElementById("1").innerText
        }
        const res = await axios.post("http://localhost:5000/AddCart", data)
        console.log(res);
    }

    const [review, setreview] = useState("");
    const handleSubmitfinal = async (e) => {
        e.preventDefault();
        fetch("http://localhost:5005/sentiment", {
            'method': 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                // const v = {...breakdown, data};
                // console.log(v);
                // setbreakdown(v);
                setreview("")
                // document.getElementById("5").value("")
                let data2 = {
                    comment: review,
                    userid: custid,
                    productid: ProductId,
                    positive: data.Positive,
                    negative: data.Negative,
                    neutral: data.Neutral
                }
                console.log(data2)
                fetch("http://localhost:3001/addreview", {
                    'method': 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify(data2)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
            })

    }
    return (
        <div>
            <Nav id={custid} />
            <Container>
                {product.map(prod => (
                    <Productt key={prod.ProductId}>
                        <div className="slide-container">
                            <Slide>
                                {images.map((slideImage, index) => (
                                    <div key={index}>
                                        <img style={{ ...divStyle }} src={`${slideImage.url}`} />
                                    </div>
                                ))}
                            </Slide>
                        </div>
                        <Content>
                            <h1 style={{ fontSize: "40px" }}>{prod.ProductName}</h1>
                            <h2>{prod.Desc}</h2>
                            <h2>-/ {prod.Cost} Rs</h2>

                            <Cart>
                                <Adder>
                                    <button style={{ flex: "1", border: "2px solid black" }} onClick={handleClick2}>-</button>
                                    <h3 id='1' style={{ flex: "1", display: "flex", alignContent: "center", justifyContent: "center" }}>{counter}</h3>
                                    <button style={{ flex: "1", border: "2px solid black" }} onClick={handleClick1}>+</button>
                                </Adder>

                                <button style={{ flex: "content", color: "red" }} onClick={handleEvent}>
                                    Add To Cart
                                </button>


                            </Cart>
                        </Content>
                    </Productt>
                ))
                }
            </Container>
            <br />
            <Form onSubmit={handleSubmitfinal}>
                <h3 style={{ position: 'relative', backgroundColor: "black", color: "white", padding: "10px 10px" }}>Add a Review</h3>

                <Inner className="mb-3">
                    <label>Type a Review</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Review here"
                        value={review}
                        id="5"
                        style={{ border: "1.5px solid black", width: "400px", height: "200px" }}
                        onChange={() => { setreview(document.getElementById("5").value) }}
                    />
                </Inner>

                <Inner style={{ paddingTop: "10px" }} className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        <a style={{ position: "relative", textDecoration: "none", color: "black" }} > Add</a>
                    </button>
                </Inner>

            </Form>
            <ChakraProvider>
                <Similar style={{ padding: "100px" }}>
                    {products.map(product => (
                        <Card maxW='sm' >
                            <CardBody>
                                <Image
                                    src={`${product.Img}`}
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{product.ProductName}</Heading>
                                    <Text>
                                        This sofa is perfect for modern tropical spaces, baroque inspired
                                        spaces, earthy toned spaces and for people who love a chic design with a
                                        sprinkle of vintage design.
                                    </Text>
                                    <Text color='blue.600' fontSize='2xl'>
                                        {product.Cost} Rs
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                        </Card>
                    ))}
                </Similar>
            </ChakraProvider>
        </div >
    )
}

export default Product