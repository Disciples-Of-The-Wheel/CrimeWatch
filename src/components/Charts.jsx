// import React, { PureComponent } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useEffect, useState, CSSProperties } from "react";

const Charts = ({ mappedReports }) => {

  const [selectedChart, setSelectedChart] = useState('radar');


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
