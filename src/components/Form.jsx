import { useState } from 'react';
import Modal from 'react-modal';

const Form = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

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
    alert("Please contact the authorities before making an Incident Report.");
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
          Name: <input type="text" name="name"/>
        </label>
        <label className="incident-label">
          Age: <input type="number" age="age"/>
        </label>
        <label className="incident-label">
          Address: <input type="text" name="address"/>
        </label>
        <label className="incident-label">
          Zipcode: <input type="text" name="zipcode"/>
        </label>
        <label className="incident-label">
        State: <input type="text" name="state" />
      </label>
      <label className="incident-label">
        City: <input type="text" name="city" />
      </label>
      <label>
        Incident Type:
        <select name="incident-type">
<option value="type1">SHOTS FIRED</option>
<option value="type2">DOMESTIC VIOLENCE</option>
<option value="type3">SUSPICIOUS EVENT</option>
<option value="type4">DOMESTIC DISPUTE</option>
<option value="type5">NOISE VIOLATION</option>
<option value="type6">DISORDERLY CONDUCT</option>
<option value="type7">SIMPLE ASSAULT</option>
<option value="type8">ACCIDENT - HIT & RUN</option>
<option value="type9">ACCIDENT - PROPERTY DAMAGE</option>
<option value="type10">THEFT</option>
<option value="type11">SUSPICIOUS VEHICLE</option>
<option value="type12">TRAFFIC STOP</option>
<option value="type13">TRESPASSING</option>
<option value="type12">THREATS/HARASSMENT</option>
        </select>
      </label>
      <label>
          Incident Description: {" "} <textarea name="description"></textarea>
        </label>
        <div className="modal-buttons">
        <button type="submit">Submit</button>
        <button onClick={handleCloseModal}>Cancel</button>
        </div>
      </form>
      </Modal>
      )}
    </div>
  )
}

export default Form;