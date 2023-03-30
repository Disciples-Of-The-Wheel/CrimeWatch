import Timeline from './Timeline';
import Map from './Map';
import Charts from './Charts';
import Form from './Form';
import '../app.css';
import { useEffect, useState } from "react";
const axios = require('axios');


const Dashboard = () => {

  const [reports, setReports] = useState([])

  let zipcode = 0;

  function getReports(event) {
    event.preventDefault();
      axios.get(`https://data.nola.gov/resource/pc5d-tvaw.json?$where=TimeCreate between '2023-03-22T00:00:00' and '2023-03-23T23:59:59' and zip = '${zipcode}'`
      )
      .then((response) => {
        setReports(response)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  function updateZip(event) {
    // setZipcode(event.target.value)
    zipcode = event.target.value
  }

  //   useEffect(() => {
  //   console.log("reports updated:", reports);
  // }, [reports]);

  return (
    <div className='container'>
      <div className='form'>
      <h2>Enter Zipcode</h2>
      <form>
        <input type="text" onChange={updateZip} />
        <input type="submit" onClick={getReports} />
      </form>
      </div>
      <Map reports={reports}/>
      <Timeline reports={reports} />
      <Charts />
      <Form />
    </div>
  )
}

export default Dashboard;