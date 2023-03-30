import { LineChart, Line, BarChart, Bar, PieChart, Pie, Sector, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Charts = ({ reports }) => {

  const chartData = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 300, pv: 1400, amt: 1400 }, { name: 'Page A', uv: 500, pv: 3000, amt: 3000 }];


  let dummyData = [{
    type: 'DOMESTIC VIOLENCE',
    location: '026XX Poydras St',
    time: '2023-03-22T00:04:16.803',
    zip: 70119,
    description: 'DOMESTIC VIOLENCE',
    alert: false, 
  },
  {
    type: 'SUSPICIOUS EVENT',
    location: '037XX Desire Pkwy',
    time: '2023-03-22T00:10:10.690',
    zip: 70126,
    description: 'SHOTS FIRED',
    alert: false, 
  },
  {
    type: 'ALARM: COMMERCIAL - BURGLARY',
    location: '033XX Huntlee Dr',
    time: '2023-03-22T00:10:33.920',
    zip: 70131,
    description: 'ALARM: COMMERCIAL - BURGLARY',
    alert: false, 
  },
  {
    type: 'SHOTS FIRED',
    location: 'Almonaster A & Elaine St',
    time: '2023-03-22T00:11:25.940',
    zip: 70126,
    description: 'SHOTS FIRED',
    alert: false, 
  },
  {
    type: 'SUSPICIOUS EVENT',
    location: '037XX Desire Pkwy',
    time: '2023-03-22T00:10:10.690',
    zip: 70126,
    description: 'SHOTS FIRED',
    alert: false, 
  },
  {
    type: 'DOMESTIC DISPUTE',
    location: '021XX Louisiana Av',
    time: '2023-03-22T00:13:38.380',
    zip: 70115,
    description: 'DOMESTIC DISPUTE',
    alert: false, 
  },
  {
    type: 'SUSPICIOUS EVENT',
    location: '037XX Desire Pkwy',
    time: '2023-03-22T00:10:10.690',
    zip: 70126,
    description: 'SHOTS FIRED',
    alert: false, 
  },
  {
    type: 'NOISE VIOLATION',
    location: '046XX Lynhuber Dr',
    time: '2023-03-22T00:14:29.433',
    zip: 70126,
    description: 'NOISE VIOLATION',
    alert: false, 
  },
  {
    type: 'SHOTS FIRED',
    location: '083XX Chef Menteur Hwy',
    time: '2023-03-22T00:15:24.740',
    zip: 70126,
    description: 'SHOTS FIRED',
    alert: false, 
  },
  {
    type: 'SUSPICIOUS EVENT',
    location: '037XX Desire Pkwy',
    time: '2023-03-22T00:10:10.690',
    zip: 70126,
    description: 'SHOTS FIRED',
    alert: false, 
  },
  {
    type: 'VEHICLE RECOVERY',
    location: 'General De Gaulle Dr & Shirley Dr',
    time: '2023-03-22T00:21:24.990',
    zip: 70114,
    description: 'ABANDONED VEHICLE',
    alert: false, 
  },
  {
    type: 'DOMESTIC VIOLENCE',
    location: 'S Claiborne Av & General Taylor St',
    time: '2023-03-22T00:23:15.440',
    zip: 70125,
    description: 'SIMPLE ASSAULT',
    alert: false, 
  }];

  

  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
  ];

  function getIntroOfPage(label) {
    if (label === 'Page A') {
      return 'Page A is about men\'s clothing';
    } if (label === 'Page B') {
      return 'Page B is about women\'s dress';
    } if (label === 'Page C') {
      return 'Page C is about women\'s bag';
    } if (label === 'Page D') {
      return 'Page D is about household goods';
    } if (label === 'Page E') {
      return 'Page E is about food';
    } if (label === 'Page F') {
      return 'Page F is about baby food';
    }
  }

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  }


  const renderPieChart = (
    <ResponsiveContainer width="100%" height="50%">
    <PieChart width={200} height={200}>
    <Tooltip />
      <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
      <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
    </PieChart>
  </ResponsiveContainer>
  )

  const renderLineChart = (
    <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )

  const renderBarChart = (
    <BarChart width={600} height={300} data={chartData}>
      <XAxis dataKey="name" stroke="#8884d8" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="uv" barSize={30} fill="#8884d8" />
    </BarChart>
  );

  return (
    <div>
      <h1>CHARTS</h1>
      <h2>Line Graph</h2>
      {renderLineChart}
      <h2>Bar Graph</h2>
      {renderBarChart}
      <h2>Pie Chart</h2>
      {renderPieChart}
    </div>
  )
}

export default Charts;
