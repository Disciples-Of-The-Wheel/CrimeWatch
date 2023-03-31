// import React, { PureComponent } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useEffect, useState, CSSProperties } from "react";

const Charts = ({ mappedReports }) => {

  const [selectedChart, setSelectedChart] = useState("pie");


  function clickTest(){
    console.log('mappedReports: ', mappedReports);
  }

  // let dummyData = [{
  //   type: 'DOMESTIC VIOLENCE',
  //   location: '026XX Poydras St',
  //   time: '2023-03-22T00:04:16.803',
  //   zip: 70119,
  //   description: 'DOMESTIC VIOLENCE',
  //   alert: false,
  // },
  // {
  //   type: 'SUSPICIOUS EVENT',
  //   location: '037XX Desire Pkwy',
  //   time: '2023-03-22T00:10:10.690',
  //   zip: 70126,
  //   description: 'SHOTS FIRED',
  //   alert: false,
  // },
  // {
  //   type: 'ALARM: COMMERCIAL - BURGLARY',
  //   location: '033XX Huntlee Dr',
  //   time: '2023-03-22T00:10:33.920',
  //   zip: 70131,
  //   description: 'ALARM: COMMERCIAL - BURGLARY',
  //   alert: false,
  // },
  // {
  //   type: 'SHOTS FIRED',
  //   location: 'Almonaster A & Elaine St',
  //   time: '2023-03-22T00:11:25.940',
  //   zip: 70126,
  //   description: 'SHOTS FIRED',
  //   alert: false,
  // },
  // {
  //   type: 'SUSPICIOUS EVENT',
  //   location: '037XX Desire Pkwy',
  //   time: '2023-03-22T00:10:10.690',
  //   zip: 70126,
  //   description: 'SHOTS FIRED',
  //   alert: false,
  // },
  // {
  //   type: 'DOMESTIC DISPUTE',
  //   location: '021XX Louisiana Av',
  //   time: '2023-03-22T00:13:38.380',
  //   zip: 70115,
  //   description: 'DOMESTIC DISPUTE',
  //   alert: false,
  // },
  // {
  //   type: 'SUSPICIOUS EVENT',
  //   location: '037XX Desire Pkwy',
  //   time: '2023-03-22T00:10:10.690',
  //   zip: 70126,
  //   description: 'SHOTS FIRED',
  //   alert: false,
  // },
  // {
  //   type: 'NOISE VIOLATION',
  //   location: '046XX Lynhuber Dr',
  //   time: '2023-03-22T00:14:29.433',
  //   zip: 70126,
  //   description: 'NOISE VIOLATION',
  //   alert: false,
  // },
  // {
  //   type: 'SHOTS FIRED',
  //   location: '083XX Chef Menteur Hwy',
  //   time: '2023-03-22T00:15:24.740',
  //   zip: 70126,
  //   description: 'SHOTS FIRED',
  //   alert: false,
  // },
  // {
  //   type: 'SUSPICIOUS EVENT',
  //   location: '037XX Desire Pkwy',
  //   time: '2023-03-22T00:10:10.690',
  //   zip: 70126,
  //   description: 'SHOTS FIRED',
  //   alert: false,
  // },
  // {
  //   type: 'VEHICLE RECOVERY',
  //   location: 'General De Gaulle Dr & Shirley Dr',
  //   time: '2023-03-22T00:21:24.990',
  //   zip: 70114,
  //   description: 'ABANDONED VEHICLE',
  //   alert: false,
  // },
  // {
  //   type: 'DOMESTIC VIOLENCE',
  //   location: 'S Claiborne Av & General Taylor St',
  //   time: '2023-03-22T00:23:15.440',
  //   zip: 70125,
  //   description: 'SIMPLE ASSAULT',
  //   alert: false,
  // }];

  let tally = {};

  let chartData = [];

  mappedReports.forEach((ele) => {
    if (tally[ele.incident_type]) {
      tally[ele.incident_type]++;
    } else {
      tally[ele.incident_type] = 1;
    }
  });

  for (let key in tally) {
    chartData.push({
      name: key,
      value: tally[key],
    })
  }

  let chosenColor = 'yellow';

  const calculateChartPercent = (val) => {
    let percent = Math.trunc((val / (chartData.length - 1)) * 100);
    // if(percent < 20){
    //   chosenColor = "green";
    // }else if (percent >= 20 && percent < 50){
    //   chosenColor = "yellow";
    // }else if(percent >= 50 && percent < 75){
    //   chosenColor = "orange";
    // }else{
    //   chosenColor = "red"
    // }
    return percent + '%';
  }


  function ChartTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div>
          <p>{`Incident Type: ${payload[0].name}`}</p>
          <p>{`Number of Incidents: ${payload[0].value}`}</p>
          <p>Percentage of Incidents: {calculateChartPercent(payload[0].value)}</p>
        </div >
      );
    }

    return null;
  }

  const renderPieChart = (
    <ResponsiveContainer width="100%" height="50%">
      <PieChart width={200} height={200}>
        <Tooltip content={<ChartTooltip />} wrapperStyle={{ backgroundColor: chosenColor, opacity: 0.8 }} />
        <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={140} fill="#1411bd" />
        <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={140} outerRadius={180} fill="#cc1c0c" label />
      </PieChart>
    </ResponsiveContainer>
  )

  const renderBarChart = (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="value" barSize={30} fill="#cc1c0c" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderRadarChart = (
    <ResponsiveContainer width="100%" height="50%">
      <RadarChart outerRadius={180} width={200} height={200} data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} />
        <Radar dataKey="value" stroke="#d91d0f" fill="#de0b19" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );

  function onSelect(event) {
    setSelectedChart(event.target.value);
  }

  function renderSelect() {
    //     if (selectedChart === 'pie') {
    //       return (
    //         <h2>Pie Chart</h2>
    //         { renderPieChart }
    //       );
    //     } else if (selectedChart === 'radar') {
    //   return (
    //     <h2>Radar Chart</h2>
    //   { renderRadarChart }
    //   );
    // } else if (selectedChart === 'bar') {
    //   return (
    //     <h2>Bar Graph</h2>
    //   { renderBarChart }
    //   );
    // } else {
    //   return null;
    // }
    if (selectedChart === 'pie') {
      return renderPieChart;
    } else if (selectedChart === 'radar') {
      return renderRadarChart;
    } else if (selectedChart === 'bar') {
      return renderBarChart;
    } else {
      return null;
    }
  }


  return (
    <div>
      <h1>CHARTS</h1>
      <button >TEST</button>
      <select name="charts" id="charts" onChange={onSelect}>
        <option value="pie">Pie Chart</option>
        <option value="radar">Radar Chart</option>
        <option value="bar">Bar Graph</option>
      </select>
      {renderSelect()}
    </div>
  )
}

export default Charts;
