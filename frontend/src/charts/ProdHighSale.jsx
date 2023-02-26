import { React, useState, useEffect } from 'react'
import Chart from 'chart.js/auto'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import {CategoryScale} from 'chart.js'; 
import { Doughnut } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components';
const Style = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
`

const ProdHighSale = (props) => {
    const labels = props.data?.map((datas) => datas.ProductName);
    const dataexampe = {
        labels: labels,
        datasets: [{
            label: 'Top 3 Selling Products',
            data: props.data?.map((datas) => datas.quantitysold),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    return (
        <Style>
            <div style={{ width: "700px" }}>
                <Bar data={dataexampe} />
            </div>
        </Style>
    )
}

export default ProdHighSale