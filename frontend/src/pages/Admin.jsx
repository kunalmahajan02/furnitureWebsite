import React, { useState } from 'react'
import Nav from './Nav'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Options =  styled.button`
    flex: 1;
    width: 100vw;
    background-image: linear-gradient(to right, #cadda9, #add625);
`

const Admin = () => {
    
  return (
    <div>
        <Nav/>
        <Wrapper>
            <Options><Link style={{ textDecoration: 'none' , color:"black" , fontSize:"50px"}} to = "Addcat">Add a Category</Link></Options>
            <Options><Link style={{ textDecoration: 'none' , color:"black" , fontSize:"50px"}} to = "Addproduct">Add a Product</Link></Options>
            <Options><Link style={{ textDecoration: 'none' , color:"black" , fontSize:"50px"}} to = "charts">See Company Statistics</Link></Options>
        </Wrapper>
    </div>
  )
}

export default Admin