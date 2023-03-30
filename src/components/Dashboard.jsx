import Timeline from './Timeline';
import Map from './Map';
import Charts from './Charts';
import Form from './Form';
import '../app.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from "react";
const axios = require('axios');


const Dashboard = () => {

<<<<<<< HEAD
  const [reports, setReports] = useState([])
=======
  const [reports, setReports] = useState(null)
  const [zipcode, setZipcode] = useState(null)
>>>>>>> 800764dc88d5c69c308d5e2d89e45eff058a7962


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
    setZipcode(event.target.value)
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
<<<<<<< HEAD
      <Map reports={reports}/>
      <Timeline reports={reports} />
=======
      <Map reports={reports} zipcode={zipcode}/>
      <Timeline />
>>>>>>> 800764dc88d5c69c308d5e2d89e45eff058a7962
      <Charts />
      <Form />
    </div>
  )
}

export default Dashboard;