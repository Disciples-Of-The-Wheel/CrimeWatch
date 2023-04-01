// import React, { PureComponent } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useEffect, useState, CSSProperties } from "react";
import '../charts.css';

const Charts = ({ mappedReports }) => {

  const [selectedChart, setSelectedChart] = useState('bar');

  let tally = {};

  let chartData = [];

  mappedReports.forEach((ele) => {
    let incidentSplit = ele.incident_type.split(' ');
    incidentSplit.forEach(word => {
      if (word === 'DOMESTIC') {
        if (!tally.Domestic) {
          tally.Domestic = 1;
        } else {
          tally.Domestic++
        }
      }
      if (word === 'BURGLARY' || word === 'BURGLAR' || word === 'SHOPLIFTING' || word === 'THEFT' || word === 'ROBBERY' || word === 'STOLEN') {
        if (!tally.Theft) {
          tally.Theft = 1;
        } else {
          tally.Theft++
        }
      }
      if (word === 'ABDUCTION' || word === 'FIGHT' || word === 'ASSAULT' || word === 'WEAPON' || word === 'MURDER' || word === 'SHOOTING' || word === 'SHOTS' || word === 'HOLDUP') {
        if (!tally.Violent) {
          tally.Violent = 1;
        } else {
          tally.Violent++
        }
      }
      if (word === 'TRAFFIC' || word === 'MOTORIST' || word === 'VEHICLE' || word === 'ROADWAY' || word === 'DRIVING') {
        if (!tally.Traffic) {
          tally.Traffic = 1;
        } else {
          tally.Traffic++
        }
      }
      if (word === 'ACCIDENT') {
        if (!tally.Accident) {
          tally.Accident = 1;
        } else {
          tally.Accident++
        }
      }
      if (word === 'MEDICAL' || word === 'MEDIC' || word === 'DISTURBED' || word === 'MENTAL' || word === 'SUICIDE' || word === 'D.O.A./C.P.R') {
        if (!tally.Medical) {
          tally.Medical = 1;
        } else {
          tally.Medical++
        }
      }
      if (word === 'TRUANCY' || word === 'FIREWORKS' || word === 'PROTEST' || word === 'NOISE' || word === 'LOUD' || word === 'SUSPICIOUS' || word === 'DISORDERLY' || word === 'TRESPASSING' || word === 'THREATS/HARASSMENT') {
        if (!tally.MinorOffense) {
          tally.MinorOffense = 1;
        } else {
          tally.MinorOffense++
        }
      }
    })
  });

  for (let key in tally) {
    let type = '';
    if (key === 'Domestic') {
      type = 'Domestic Incident';
    } else if (key === 'Theft') {
      type = 'Burglary/Theft';
    } else if (key === 'Violent') {
      type = 'Violent Crime';
    } else if (key === 'Traffic') {
      type = 'Traffic Violation';
    } else if (key === 'Accident') {
      type = 'Accident';
    } else if (key === 'Medical') {
      type = 'Medical/Psychiatric Incident';
    } else if (key === 'MinorOffense') {
      type = 'Minor Offense';
    }
    chartData.push({
      name: type,
      value: tally[key],
    })
  }

  const calculateChartPercent = (val) => {
    let percent = Math.trunc((val / (mappedReports.length - 1)) * 100);
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
        <Tooltip content={<ChartTooltip />} wrapperStyle={{ backgroundColor: 'yellow', opacity: 0.8 }} />
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
    setSelectedChart(event.target.getAttribute("value"));
  }

  function renderSelect() {
    if (mappedReports[0]) {
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
  }


  return (
    <div>
      <h1>CHARTS</h1>
      <ul class="menu cf">
        <li>
          <a>Select Chart</a>
          <ul class="charts" onClick={onSelect}>
            <li><a value="bar">Bar Graph</a></li>
            <li><a value="pie">Pie Chart</a></li>
            <li><a value="radar">Radar Chart</a></li>
          </ul>
        </li>
      </ul>
      {renderSelect()}
    </div>
  )
}

export default Charts;
