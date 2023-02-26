import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
const Adderr = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content:center;
    width: 150px;
    border: 2px solid black;
`

const Adder = (props) => {
    const [counter, setCounter] = useState(props.quantity);

    const handleClick1 = async () => {
        setCounter(counter + 1)
        let data = {
            quan: counter + 1,
            ProdId: props.ProductId
        }
        const res = await axios.put(`http://localhost:5000/Cart/${props.userid}`, data)
        // console.log(res.data);
        const res2 = await axios.get(`http://localhost:5000/Cart/${props.userid}`)
        props.setproducts(res2.data)
        const ress = await axios.get(`http://localhost:5000/Cart/${props.userid}/1`)
            // console.log(ress.data[0])
            props.setcost(ress.data);
    }

    const handleClick2 = async () => {
        if (counter > 0) {
            setCounter(counter - 1)
            let data = {
                quan: counter - 1,
                ProdId: props.ProductId
            }
            const res = await axios.put(`http://localhost:5000/Cart/${props.userid}`, data)
            // console.log(res.data);
            const res2 = await axios.get(`http://localhost:5000/Cart/${props.userid}`)
            props.setproducts(res2.data)
            const ress = await axios.get(`http://localhost:5000/Cart/${props.userid}/1`)
            // console.log(ress.data[0])
            props.setcost(ress.data);
        }

    }

    return (
        <Adderr>
            <button class = " btn btn-secondary" style={{ height: "100%", flex: "1", border: "2px solid black" }} onClick={handleClick2}>-</button>
            <h3 id='1' style={{ flex: "2", display: "flex", alignContent: "center", justifyContent: "center" }}>{counter}</h3>
            <button class = " btn btn-primary" style={{ flex: "1", border: "2px solid black" }} onClick={handleClick1}>+</button>
        </Adderr>
    )
}

export default Adder