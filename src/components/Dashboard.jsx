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


  function getReports(event) { //this function gets all reports from both the database and the NOPD API and parses them into a single standardized object to make accessing the data easier
    event.preventDefault();

    const currentDate = new Date();
    const twoDaysAgo = new Date(currentDate.getTime() - (48 * 60 * 60 * 1000));
    const formattedStartDate = twoDaysAgo.toISOString().slice(0,19);
    const formattedEndDate = currentDate.toISOString().slice(0,19);

    axios.get(`https://data.nola.gov/resource/pc5d-tvaw.json?$where=TimeCreate between '${formattedStartDate}' and '${formattedEndDate}' and zip = '${zipcode}'`) //gets data from NOPD API with inputted zip code that's within date range
      .then((response) => {
        setReports(response)
        return response.data.map((ele) => {
          return {
            incident_type: ele.typetext, //typetext
            address: ele.block_address, //blockaddress
            lat: ele.location.coordinates[1], //location.coordinates[1]
            long: ele.location.coordinates[0], //location.coordinates[0]
            time: ele.timecreate, //timecreate
            zip: ele.zip, //zip
            description: ele.initialtypetext, //initialtypetext
            disposition: ele.dispositiontext,
            user_submitted: false
          };
        })
      })
      .then((mapped) => {
        axios.get('/api/reports/')
          .then((dbReports) => {
            let promises = dbReports.data.map((ele) => { //gets data from database code that's within date range
              return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=' + ${ele.address} + ' ' + ${ele.city} + ' ' + ${ele.state} ' ' + ${ele.zipcode} + '&key=AIzaSyDNNEUdVHdTmB5zCTXDV_Y4p9dPMZl00rk`)
                .then((res) => {
                  let outpObj = {
                    incident_type: ele.incident_type, //incident_type
                    address: ele.address, //address
                    lat: res.data.results[0].geometry.location.lat,
                    long: res.data.results[0].geometry.location.lng,
                    time: ele.createdAt, //createdAt
                    zip: ele.zipcode, //zipcode
                    description: ele.description, //description
                    user_submitted: true
                  };
                  return outpObj;
                })
                .catch((err) => {
                  console.error(err);
                });
            });
            return Promise.all(promises);
          })
          .then((mappedDb) => { //this part combines the data from the db and the data from NOPD API into one array
            let newMappedReports = [];
            mapped.forEach((ele) => {
              newMappedReports.push(ele);
            });
            mappedDb.forEach((ele) => {
              if (ele.zip === zipcode) {
                newMappedReports.push(ele);
              }
            });
            return newMappedReports;
          })
          .then((newState) => {
            setMappedReports(newState); //sets state with the array created above (see comment on line 66)
          })
          .catch((err) => {
            console.error(err);
          })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function updateZip(event) {
    setZipcode(event.target.value)
  }

  return (
    <div className='container'>
      <div className='form'>
      <Form getReports={getReports} />

        <form className="form__container">

          <input className="form__input" type="text" placeholder="enter zipcode" onChange={updateZip} />
          <input className="form__button" type="submit" onClick={getReports} value="Submit" />
        </form>
      </div>
      <div className='content'>
        <Map mappedReports={mappedReports} zipcode={zipcode} />
        <hr></hr>
        <Timeline reports={mappedReports} />
        <hr></hr>
        <Charts mappedReports={mappedReports} />
        <hr></hr>
      </div>
    </div>
  );
}

export default Dashboard;
