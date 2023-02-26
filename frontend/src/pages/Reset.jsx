import React, { Component } from "react";
import styled from "styled-components";
const Form = styled.form`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    &::before{
        content: "";
        
        background-image : linear-gradient(to right ,  #e9dabd , #cf9831);
        background-repeat: no-repeat;
        /* background-position: 50% 0; */
        position: absolute;
        background-size: cover;
        top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
        opacity: 0.4;
    }
`

const Inner = styled.div`
    position: relative;
    font-weight: bolder;
    font-size:20px;
`
export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: " ",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    console.log(email);
    alert("The Email has been sent check your email for link");
    fetch("http://localhost:3001/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        alert(data.status);
      });
    
    window.location.href = "/signin"
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3 style={{position:'relative',backgroundColor:"black",color:"white", padding:"10px 10px"}}> Forgot Password</h3>
        <Inner className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </Inner>
        <Inner className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Inner>
        <p style={{position:"relative",fontWeight:"bold", color:"black", fontSize: "20px"}} className="forgot-password text-right">
          <a href="/sign-up"> Sign up</a>
        </p>
      </Form>
    );
  }
}