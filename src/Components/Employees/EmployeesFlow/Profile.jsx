import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
  const param = useParams();
  const initValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    adress: '',
    dob: '',
    active: false,
    phone: ''
  };
  const [update, setUpdate] = useState(true);
  const [employee, setEmployee] = useState(initValues);

  useEffect(() => {
    requestById();
  }, []);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };
  const requestById = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${param.id}`);
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Welcome {employee.firstName}</h1>
      <form>
        <div>
          <label>Name</label>
          {update ? (
            <p>{employee.firstName}</p>
          ) : (
            <input
              type="text"
              name="firstName"
              disabled={update}
              value={employee.firstName}
              onChange={handleInputChanges}
            ></input>
          )}
        </div>
        <span>{employee.lastName}</span>
        <span>{employee.email}</span>
        <span>{employee.gender}</span>
        {/* cambiar el adress con 2 d */}
        <span>{employee.adress}</span>
        {/* <span>{new Date(employee.dob).toISOString().split('T')[0]}</span> */}
        <span>{employee.active ? 'true' : 'false'}</span>
        <span>{employee.phone}</span>
      </form>
      <button onClick={() => setUpdate(!update)}>EDIT</button>
    </>
  );
}

export default Profile;
