import React from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
const Container = styled.div`
  height: 60px;
  background-image: linear-gradient(to bottom , #70d73c, #42ac42) ;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content:space-between ;
  color: antiquewhite;
`
const Left = styled.div`
  flex:1;
`
const Logo = styled.h2`
  font-weight: 550;
  margin-top:5.92px ;
  margin-bottom: -11.08px;
`
const Middle = styled.div`
  flex:1;
  display: flex;
  align-items: center;
`
const Right = styled.div`
  flex:1;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
`
const Cover = styled.div`
  padding: 10px;
`
const Input = styled.input`
  margin-left: 5px;
  border: none;
  width: 400px;
  height: 25px;
`


const Nav = (props) => {
  const id = props.id;
  const handleevent=()=>{
    window.location.href = `../../${id}/Cart` ;
  }
  return (
    <Container>
      <Wrapper>
        <Left><Logo>FURNTITURE.</Logo></Left>
        {/* <Middle>
          <SearchSharpIcon />
          <Input placeholder='Give the category you want to Explore'/>
        </Middle> */}
        <Right>
          <Cover>
            <button onClick={handleevent}><ShoppingCartIcon /></button>
            
          </Cover>
          <Cover>
            <FavoriteBorderSharpIcon />
          </Cover>
          <Cover>
            <PermIdentitySharpIcon/>
          </Cover>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Nav;