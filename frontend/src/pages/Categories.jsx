import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom"
import Nav from './Nav';
import styled from 'styled-components'
import { buttonBaseClasses } from '@mui/material';
import { green } from '@mui/material/colors';

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
const Wrapper = styled.div`
    display: flex;
    text-align: center;
    margin: 20px 50px;

    &:nth-child(2n+1){
        flex-direction: row-reverse;
    }
`
const Categoriess = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 150px;
`
const Content = styled.div`
    flex: 3;
`

const Categories = () => {
    const {custid} = useParams();
    console.log(useParams());
    const [catagories, setCat] = useState([]);
    useEffect(() => {
        const fetchAllCat = async () => {
            try {
                const res = await axios.get("http://localhost:5000/categories");
                setCat(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllCat();
    }, [])



    return (
        <div>
            <Nav id = {custid}  />
            <Categoriess>
                {catagories.map(category => (
                    <Wrapper key={category.CategoryId}>
                        <Imgg>
                            <Link to={`../${custid}/products/${category.CategoryId}`}>
                                <Img src={category.Imgurll} alt="" />
                            </Link>
                        </Imgg>
                        <Content>
                            <Link style={{ textDecoration: 'none' }} to={`../${custid}/products/${category.CategoryId}`}>
                                <h2 style={{ textDecoration: 'none', color: '#220606' }}>{category.CategoryName}</h2>
                                <p style={{ textDecoration: 'none', color: '#220606' }}>{category.catdesc}</p>
                            </Link>
                        </Content>

                    </Wrapper>
                ))}
            </Categoriess>
            
        </div>
    )
}


// <!DOCTYPE html>
// <html lang="en">
//   <head>

//     <meta charset="utf-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1" />
//     <link rel="icon" href="https://glitch.com/favicon.ico" />
    
//     <script src="https://cdn.jsdelivr.net/gh/aframevr/aframe@1c2407b26c61958baa93967b5412487cd94b290b/dist/aframe-master.min.js"></script>
//     <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
    
//     <link rel="stylesheet" href="/style.css" />
//     <script src="/script.js" defer></script>
//   </head>
//   <body>
//     <h1>
//       hello world
//     </h1>
//     <a-scene embedded arjs>
//       <a-assets>
//         <a-asset-item id = "model" response-type = "arraybuffer" src = "https://cdn.glitch.global/be4e8cb7-df3f-4a20-886c-806c34f827b8/arkunal.glb?v=1676379154109"></a-asset-item>
//       </a-assets>
      
//       <a-marker present="hiro" >
//         <a-entity gltf-model = "#model" position = "0 0 0" scale = "0.25 0.25 0.25" rotation = "0 0 0"></a-entity>
//       </a-marker>
      
//       <a-entity camera></a-entity>
//     </a-scene>
//   </body>
// </html>
export default Categories
