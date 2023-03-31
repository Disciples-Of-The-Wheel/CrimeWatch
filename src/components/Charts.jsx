// import React, { PureComponent } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useEffect, useState, CSSProperties } from "react";

const Charts = ({ mappedReports }) => {

  const [selectedChart, setSelectedChart] = useState('pie');

  let tally = {};

  let chartData = [];

  mappedReports.forEach((ele) => {
    let misc = true;
    let incidentSplit = ele.incident_type.split(' ');
    incidentSplit.forEach(word => {
      if(word === 'DOMESTIC'){
        if(!tally.Domestic){
          tally.Domestic = 1;
        }else{
          tally.Domestic++
        }
        misc = false;
      }
      if(word === 'BURGLARY' || word === 'THEFT' || word === 'ROBBERY' || word === 'STOLEN'){
        if(!tally.Theft){
          tally.Theft = 1;
        }else{
          tally.Theft++
        }
        misc = false;
      }
      if(word === 'ASSAULT' || word === 'WEAPON' || word === 'MURDER' || word === 'SHOOTING' || word === 'SHOTS'){
        if(!tally.Violent){
          tally.Violent = 1;
        }else{
          tally.Violent++
        }
        misc = false;
      }
      if(word === 'TRAFFIC' || word === 'VEHICLE' || word === 'ROADWAY' || word === 'DRIVING'){
        if(!tally.Traffic){
          tally.Traffic = 1;
        }else{
          tally.Traffic++
        }
        misc = false;
      }
      if(word === 'ACCIDENT'){
        if(!tally.Accident){
          tally.Accident = 1;
        }else{
          tally.Accident++
        }
        misc = false;
      }
      if(word === 'MEDICAL' || word === 'MEDIC' || word === 'DISTURBED'){
        if(!tally.Medical){
          tally.Medical = 1;
        }else{
          tally.Medical++
        }
        misc = false;
      }
      if(misc === true){
        if(!tally.Misc){
          tally.Misc = 1;
        }else{
          tally.Misc++
        }
      }
    })
  });

  for (let key in tally) {
    let type = '';
    if(key === 'Domestic'){
      type = 'Domestic Issues';
    }else if(key === 'Theft'){
      type = 'Burglary/Theft';
    }else if(key === 'Violent'){
      type = 'Violent Crime';
    }else if(key === 'Traffic'){
      type = 'Traffic Incidents';
    }else if(key === 'Accident'){
      type = 'Accidents';
    }else if(key === 'Medical'){
      type = 'Medical/Psychiatric Incidents';
    }else if (key === 'Misc'){
      type = 'Miscellaneous Reports';
    }
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

  function BarChartTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div>
          <p>{`Incident Type: ${payload[0].payload.name}`}</p>
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
        <Tooltip content={<BarChartTooltip />} />
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
