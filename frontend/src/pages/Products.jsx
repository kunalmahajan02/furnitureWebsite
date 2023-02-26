import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Nav from './Nav';
import styled from 'styled-components';
const Wrapper = styled.div`
    display: flex;
    text-align: center;
    margin: 20px 50px;
    &:nth-child(2n+1){
        flex-direction: row-reverse;
    }
`
const Imgg = styled.div`
    flex: 2;
    position: relative;
    &::after{
        content: "";
        position: absolute;
        width: 250px;
        height: 250px;
        background-color: #d1b091;
        top: 20px;
        left: 160px;
        z-index: -1;
    }
`
const Img = styled.img`
    width: 250px;
    height: 250px;
    object-fit: cover;
`
const Content = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`

const Productss = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 150px;
`


const Products = () => {
    const { catId } = useParams();
    const { custid } = useParams();
    const [products, setproducts] = useState([]);

    useEffect(() => {
        const FetchAllProd = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/products/${catId}`)
                setproducts(res.data)

            } catch (err) {
                console.log(err);
            }
        }
        FetchAllProd();
    }, []);

    return (
        <div>
            <Nav id={custid} />
            <Productss>
                {products.map(product => (
                    <Wrapper className="Product" key={product.ProductId}>
                        <Imgg>
                            <Link to={`../${custid}/product/${product.ProductId}`}>
                                <Img src={`${product.Img}`} alt="" />
                            </Link>
                        </Imgg>
                        <Content>
                            <Link style={{ textDecoration: 'none' }} to={`../${custid}/product/${product.ProductId}`}>
                                {/* <h2  style={{ textDecoration: 'none', color: '#220606' }}>{product.ProductId}</h2> */}
                                <h2  style={{ textDecoration: 'none', color: '#220606' }}>{product.ProductName}</h2>
                                <h2 style={{ textDecoration: 'none', color: '#220606' }}>{product.Desc}</h2>
                                <h2  style={{ textDecoration: 'none', color: '#220606' }}>₹{product.Cost}</h2>
                            </Link>
                            {/* <Link to={`../${custid}/product/${product.ProductId}`}>Explore</Link> */}
                        </Content>
                    </Wrapper>
                ))}
            </Productss>
        </div>
    )
}

export default Products;