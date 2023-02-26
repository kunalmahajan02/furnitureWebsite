import axios from 'axios';
import React, { Component, useState } from 'react'
import styled from 'styled-components';
import cors from 'cors'

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
        background-image : url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fque_shariffz%2Fbackground-stage%2F&psig=AOvVaw1OGTVlzAboPRZdsYEFoCa8&ust=1676442925151000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOi8kN6ylP0CFQAAAAAdAAAAABAI");
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
const Addproducts = () => {

    const handleSubmit1 = (e) => {
        const file = e.target.files[0];
        // previewfile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview1(reader.result);
        }
    }
    const handleSubmit2 = (e) => {
        const file = e.target.files[0];
        // previewfile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview2(reader.result);
        }
    }
    const handleSubmit3 = (e) => {
        const file = e.target.files[0];
        // previewfile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview3(reader.result);
        }
    }
    const [name, setName] = useState("");
    const [Descrip, setDesc] = useState("");
    const [preview1, setPreview1] = useState();
    const [preview2, setPreview2] = useState();
    const [preview3, setPreview3] = useState();
    const [Cost, setcost] = useState("");
    const [dimension,setDimen] = useState("");
    // const previewfile1 = (file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setPreview1(reader.result);
    //     }
    // }
    const handleSubmitfinal = async(e) => {
        e.preventDefault();
        if (!preview2) return;
        // uploadImage(preview);
        console.log(preview1,preview2,preview3,name,Descrip,Cost,dimension)
        let data = {
            name: name,
            desc: Descrip,
            image1: preview1,
            image2 : preview2,
            image3 : preview3,
            cost : Cost,
            dim : dimension
        }
        try {
            const a = await axios.post("http://localhost:5000/addproduct", data);
            console.log(a);
        } catch (e) {
            console.log(e);
        }
    }

    // const uploadImage = async (base64EncodedImage) => {
    //     // console.log(base64EncodedImage)
    //     let data = {
    //         name: name,
    //         desc: Descrip,
    //         image: base64EncodedImage
    //     }
    //     try {
    //         const a = await axios.post("http://localhost:5000/addcategory", data);
    //         console.log(a);
    //     } catch (e) {
    //         console.log(e);
    //     }

    
    return (
        <Form onSubmit={handleSubmitfinal}>
            <h3 style={{ position: 'relative', backgroundColor: "black", color: "white", padding: "10px 10px" }}>Add Products</h3>

            <Inner className="mb-3">
                <label>Product Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Category name"
                    id="1"
                    style={{ border: "1.5px solid black" }}
                    onChange={() => { setName(document.getElementById("1").value) }}
                />
            </Inner>

            <Inner className="mb-3">
                <label>Give Product Description</label>
                <input style={{ border: "1.5px solid black" }}
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    id="2"
                    onChange={() => { setDesc(document.getElementById("2").value) }} />
            </Inner>
            <Inner className="mb-3">
                <label>Give Product Cost</label>
                <input style={{ border: "1.5px solid black" }}
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    id="3"
                    onChange={() => { setcost(document.getElementById("3").value) }} />
            </Inner>
            <Inner className="mb-3">
                <label>Give Product Dimensions</label>
                <input style={{ border: "1.5px solid black" }}
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    id="4"
                    onChange={() => { setDimen(document.getElementById("4").value) }} />
            </Inner>

            <Inner className="mb-3">
                <label>Select Images</label>
                <input
                    type="file"
                    className="form-control"
                    name="image1"
                    // value={fileinput1}
                    onChange={handleSubmit1}
                    style={{ border: "1.5px solid black" }}
                />
            </Inner>
            <Inner className="mb-3">
                {/* <label>Select Category Image</label> */}
                <input
                    type="file"
                    className="form-control"
                    name="image2"
                    // value={fileinput2}
                    onChange={handleSubmit2}
                    style={{ border: "1.5px solid black" }}
                />
            </Inner>
            <Inner className="mb-3">
                {/* <label>Select Category Image</label> */}
                <input
                    type="file"
                    className="form-control"
                    name="image3"
                    // value={fileinput3}
                    onChange={handleSubmit3}
                    style={{ border: "1.5px solid black" }}
                />
            </Inner>

            <Inner style={{ paddingTop: "10px" }} className="d-grid">
                <button type="submit" className="btn btn-primary">
                    <a style={{ position: "relative", textDecoration: "none", color: "black" }} > Add Product </a>
                </button>
            </Inner>

        </Form>
    )
}

export default Addproducts