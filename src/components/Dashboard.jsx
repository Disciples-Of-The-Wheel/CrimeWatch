import Timeline from './Timeline';
import Map from './Map';
import Charts from './Charts';
import Form from './Form';
import '../app.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from "react";
const axios = require('axios');

const Dashboard = () => {

  const [reports, setReports] = useState([])
  const [mappedReports, setMappedReports] = useState([])
  const [zipcode, setZipcode] = useState(null)

  // useEffect(() => {
  //   getReportsFromDb();
  // })

  function getReportsFromDb() {
    axios.get('/api/reports/')
      .then((reports) => {
        // setMappedReports(reports);
        console.log('results of GET request to db: ', reports);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getReports(event) {
    event.preventDefault();
    axios.get(`https://data.nola.gov/resource/pc5d-tvaw.json?$where=TimeCreate between '2023-03-22T00:00:00' and '2023-03-23T23:59:59' and zip = '${zipcode}'`
    )
      .then((response) => {
        setReports(response)
        console.log('GET request response: ', response);
        return response.data.map((ele) => {
          return {
            incident_type: ele.typetext, //typetext
            address: ele.blockaddress, //blockaddress
            lat: ele.location.coordinates[1], //location.coordinates[1]
            long: ele.location.coordinates[0], //location.coordinates[0]
            time: ele.timecreate, //timecreate
            zip: ele.zip, //zip
            description: ele.initialtypetext, //initialtypetext
            user_submitted: false
          };
        })
      })
      .then((mapped) => {
        // console.log('Mapped reports: ', mapped);
        getReportsFromDb()
          .then((dbReports) => {
            setMappedReports([...mapped, ...dbReports]);
          })
          .then()
          .catch((err) => {
            console.error(err);
          })
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
      <button onClick={getReportsFromDb}>TEST DB GET</button>
      <button onClick={getReports}>TEST API GET</button>
      <Map reports={reports} zipcode={zipcode} />
      <Timeline reports={reports} />
      <Charts mappedReports={mappedReports} />
      <Form />
    </div>
  )
}

export default Dashboard;