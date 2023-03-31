import { useState } from 'react';
import Modal from 'react-modal';
const axios = require('axios');

const Form = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [incident_type, setIncidentType] = useState('');
  const [incident_description, setIncidentDescription] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowReportForm(false);
  };

  const handleConfirmYes = () => {
    setShowReportForm(true);
    setIsModalOpen(false);
  }

  const handleConfirmNo = () => {
    setIsModalOpen(false);
    alert("Please contact the authorities before making an Incident Report. \nHere's a list of contacts: \nPolice: 911 \nVIA LINK crisis line: Call 211 or 1-800-749-2673 \n988 Suicide and Crisis Lifeline: Call 988, Text 988, or Chat Online \nCrisis Text Line: Text NAMI to 741741 \nAlcohol Hotline: (800) 331-2900 \nNational Help Line for Substance Abuse: (800) 262-2463 \nNational Domestic Violence Hotline: (800) 799-7233 \nFor more information & assistance please visit:  namineworleans.org/crisis-info/");
  }

  function updateName(event) {
    setName(event.target.value)
  }
  function updateAge(event) {
    setAge(event.target.value)
  }
  function updateAddress(event) {
    setAddress(event.target.value)
  }
  function updateZipCode(event) {
    setZipCode(event.target.value)
  }
  function updateState(event) {
    setState(event.target.value)
  }
  function updateCity(event) {
    setCity(event.target.value)
  }
  function updateIncidentType(event) {
    setIncidentType(event.target.value)
  }
  function updateIncidentDescription(event) {
    setIncidentDescription(event.target.value)
  }

  function postIncidentReports() {
    axios.post('/api/reports', {
      "report": {
        name: name,
        age: age,
        address: address,
        zipcode: zipcode,
        state: state,
        city: city,
        incident_type: incident_type,
        description: incident_description
      }
    })
    .then((response) => {
      console.log(response);
      alert('Incident report created successfully!');
    })
    .catch((error) => {
      console.error(error);
      alert('Error creating incident report');
    });
  }

  return (
    <div>
      <h1>FORM</h1>
      <button onClick={handleOpenModal}>Create Incident Report</button>
      <Modal isOpen={isModalOpen}>
        <div>
          <h2>Have you contacted the authorities?</h2>
          <button onClick={handleConfirmYes}>Yes</button>
          <button onClick={handleConfirmNo}>No</button>
        </div>
        </Modal>
        {showReportForm && (
           <Modal isOpen={true}>
      <form className="incident-form">
        <label className="incident-label">
          Name: <input type="text" name="name" onChange={updateName}/>
        </label>
        <label className="incident-label">
          Age: <input type="number" name="age" onChange={updateAge}/>
        </label>
        <label className="incident-label">
          Address: <input type="text" name="address" onChange={updateAddress}/>
        </label>
        <label className="incident-label">
          Zipcode: <input type="text" name="zipcode" onChange={updateZipCode}/>
        </label>
        <label className="incident-label">
        State: <input type="text" name="state" onChange={updateState}/>
      </label>
      <label className="incident-label">
        City: <input type="text" name="city" onChange={updateCity}/>
      </label>
      <label>
        Incident Type:
        <select name="incident_type" onChange={updateIncidentType}>
<option value="SHOTS FIRED">SHOTS FIRED</option>
<option value="DOMESTIC VIOLENCE">DOMESTIC VIOLENCE</option>
<option value="SUSPICIOUS EVENT">SUSPICIOUS EVENT</option>
<option value="DOMESTIC DISPUTE">DOMESTIC DISPUTE</option>
<option value="NOISE VIOLATION">NOISE VIOLATION</option>
<option value="DISORDERLY CONDUCT">DISORDERLY CONDUCT</option>
<option value="SIMPLE ASSAULT">SIMPLE ASSAULT</option>
<option value="ACCIDENT - HIT & RUN">ACCIDENT - HIT & RUN</option>
<option value="ACCIDENT - PROPERTY DAMAGE">ACCIDENT - PROPERTY DAMAGE</option>
<option value="THEFT">THEFT</option>
<option value="SUSPICIOUS VEHICLE">SUSPICIOUS VEHICLE</option>
<option value="TRAFFIC STOP">TRAFFIC STOP</option>
<option value="TRESPASSING">TRESPASSING</option>
<option value="THREATS/HARASSMENT">THREATS/HARASSMENT</option>
        </select>
      </label>
      <label>
          Incident Description: {" "} <textarea name="incident_description" onChange={updateIncidentDescription}></textarea>
        </label>
        <div className="modal-buttons">
        <button type="submit" onClick={postIncidentReports}>Submit</button>
        <button onClick={handleCloseModal}>Cancel</button>
        </div>
      </form>
      </Modal>
      )}
    </div>
  )
}

export default Form;