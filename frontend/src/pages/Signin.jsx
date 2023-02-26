import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"

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
        background-image : url("https://images2.alphacoders.com/270/270990.jpg");
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




export default class Signin extends Component {
  
  handleSubmit(e) {
    e.preventDefault();
    const {email, password} = this.state;
    console.log(email, password);
    fetch("http://localhost:3001/login", {
            method : "POST",
            crossDomain : true,
            headers : {
                "Content-Type" : "application/json",
                Accept: "application/json", 
                "Access-Control-Allow-Origin" : "*",           
            },
            body : JSON.stringify({
                email,  
                password,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
            if(data.status == "ok") {
              alert("login successful");
              if(data.userid == "63e3adfdd2d5589da11012f1"){
                window.location.href = `/${data.userid}/admin`
              }else{
                window.location.href = `/${data.userid}/categories`
              }
            }else if (data.status == "error"){
              alert("Invalid password try again!");
            }
        })
  }
  
  constructor(props){
    super(props)
    this.state = {
      email: "", 
      password : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3 style={{position:'relative',backgroundColor:"black",color:"white", padding:"10px 10px"}}>Sign In</h3>

        <Inner className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({email : e.target.value})}
            style={{border:"1.5px solid black"}}
          />
        </Inner>

        <Inner className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({password: e.target.value})}
            style={{border:"1.5px solid black"}}
          />
        </Inner>

        <Inner className="mb-3">
          <Inner className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              style={{border:"1.5px solid black"}}
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </Inner>
        </Inner>

        <Inner className="d-grid">
          <button style={{position:"relative" , textDecoration:"none", color:"black"}}  type="submit" className="btn btn-primary">
           Submit
           </button>
        </Inner>
        <p style={{position:"relative",fontWeight:"bold", color:"black"}} className="forgot-password text-right">
          Forgot <a style={{position:"relative" , textDecoration:"none"}} href="/reset">password?</a>
        </p>
        <p style={{position:"relative",fontWeight:"bold", color:"black", fontSize: "20px"}} className="forgot-password text-right">
          New User <a style={{position:"relative" , textDecoration:"none" , fontSize: "20px"}} href="/register">Register Now!</a>
        </p>
      </Form>
    )
  }
}