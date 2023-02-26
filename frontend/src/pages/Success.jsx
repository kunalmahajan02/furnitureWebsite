
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Center = styled.div`
  display: flex;
  justify-content: end;
  text-align: center;
  flex-direction: column;
  background-image: url("https://momentumacademy.net/wp-content/uploads/2020/05/Paymentsuccessful21.png");
  height: 90vh;
  background-size: cover;`

const handleSubmit = (e) => {
  e.preventDefault();
  //const { email } = this.state;
  //console.log(email);
  fetch("http://localhost:3001/sendconfirmation", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Email Sent");
    });
}
const Success = () => {
  return (
    <Center >
      {/* <h1>
          Your Payment is Succcessful 
        </h1> */}
      {/* <Link  style={{ textDecoration: 'none' , color:"black" , fontSize:"50px", border:"1.5px solid black",paddingTop:"2500px" , paddingBottom:"2000px"}} to = "../signin">.</Link> */}
      <button onClick={handleSubmit}>
        Send Confirmation
      </button>
    </Center>
  )
}

export default Success;