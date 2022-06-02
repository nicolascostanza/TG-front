import React, { useState, useEffect } from 'react';
import Form from './Form';
const params = new URLSearchParams(window.location.search);
const adminId = params.get('id');

const EditAdmin = () => {
  const [admin, setAdmin] = useState({});
  useEffect(() => {
    fetch(`http://localhost:4000/admins/${adminId}`)
      .then((response) => response.json())
      .then((response) => {
        setAdmin(response.data);
      });
  }, []);
  console.log(admin);
  return <Form admin={admin} />;
};

export default EditAdmin;
