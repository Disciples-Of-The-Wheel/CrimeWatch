import { useState } from 'react';

const Form = () => {

  return (
    <div>
      <h1>FORM</h1>
      <form>
        <label>
          Name: <input type="text" name="name"/>
        </label>
        <label>
          Age: <input type="number" age="age"/>
        </label>
        <label>
          Address: <input type="text" name="address"/>
        </label>
        <label>
          Zipcode: <input type="text" name="zipcode"/>
        </label>
        <label>
        State: <input type="text" name="state" />
      </label>
      <label>
        City: <input type="text" name="city" />
      </label>
      <label>
        Incident Type:
        <select name="incident-type">
<option value="type1"></option>
<option value="type2"></option>
<option value="type3"></option>
<option value="type4"></option>
<option value="type5"></option>
<option value="type6"></option>
<option value="type7"></option>
<option value="type8"></option>
        </select>
      </label>
      <label>
          Incident Description: <textarea name="description"></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form;