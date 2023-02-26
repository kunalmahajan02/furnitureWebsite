import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import Adder from './Adder';
import Nav from './Nav'

const Wrapper = styled.div`
display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* padding: 20px; */
  padding-bottom: 40px;
  border: 2px solid black;
`
const Imagee = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Mycart = () => {
  const { custid } = useParams();
  const [products, setproducts] = useState([]);
  const [totalcost, settotcost] = useState([]);

  useEffect(() => {
    const FetchAllProd = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/Cart/${custid}`)
        setproducts(res.data)

        const ress = await axios.get(`http://localhost:5000/Cart/${custid}/1`)
        console.log(ress.data[0])
        settotcost(ress.data);
      } catch (err) {
        console.log(err);
      }
    }
    FetchAllProd();
  }, []);



  return (
    <>
      <Nav id={custid} />
      <div>
        {products.map(product => (
          <Wrapper>
            <Imagee>
              <img src={`${product.Img}`}></img>
            </Imagee>
            <Content>
              <h3>{product.ProductId}</h3>
              <div>{product.ProductName}</div>
              <div>{product.cost}</div>
              <div>{product.Dimensions}</div>
              <div> {product.Cost * product.Quantity}</div>
              <Adder quantity={product.Quantity} ProductId={product.ProductId} userid={custid} setproducts={setproducts} setcost={settotcost} />

            </Content>
          </Wrapper>
        ))}
      </div>
      <div>
        <button onClick={() => {
          // products.map(async (product) => {
          //   let data = {
          //     productId: product.ProductId,
          //     userid: custid,
          //     quantity: product.Quantity
          //   }
          //   try {
          //     const a = await axios.post("http://localhost:5000/addorder", data);
          //     console.log(a);
          //   } catch (e) {
          //     console.log(e);
          //   }
          // })
          

          fetch("http://localhost:5000/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
            // const res = await axios.post("http://localhost:5000/create-checkout-session", products)
          }
          ).then((res) => {
            if (res.ok) return res.json()
            return res.json().then((json) => Promise.reject(json));
          }).then(({ url }) => {

            console.log("url");
            window.location = url;
          }).catch((e) => {
            console.error(e.error);
          });

          // // })

        }}>Confirm Order</button>
        {totalcost.map(cost => (
          <div>{cost.totcost}</div>
        ))}
      </div>
    </>
  )
}

export default Mycart