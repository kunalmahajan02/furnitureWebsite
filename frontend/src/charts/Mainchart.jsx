import { React, useState, useEffect } from 'react'
import Chart from 'chart.js/auto'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import {CategoryScale} from 'chart.js'; 
import { Doughnut } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2'
import Bargraph from "./Bargraph"
import axios from 'axios';
import ProdHighSale from './ProdHighSale';
import ReviewChart from './ReviewChart';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-align: center;
`
const Mainchart = () => {
    const [catdata, setdata] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const x = await axios.get("http://localhost:5000/categorysale");
                setdata(x);
                console.log(x);
            } catch (e) {
                console.log(e);
            }
        };

        fetchdata();
    }, [])
    const [productstats, setproductstats] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const x = await axios.get("http://localhost:5000/productsale");
                setproductstats(x);
                console.log(x);
            } catch (e) {
                console.log(e);
            }
        };

        fetchdata();
    }, [])
    return (
        <div>
            <Wrapper>
                <div >
                    <Bargraph data={catdata.data} />
                    <ProdHighSale data={productstats.data} />
                </div>
                <ReviewChart />
            </Wrapper>
        </div>
    )
}

export default Mainchart