import React, { useState } from 'react';

const Form = (props) => {
  let [adminInput, setInput] = useState({});

  //   const completar async = () => {

  //   }

  //   if (props.name) {
  //     setInput({
  //       firstName: props.name,
  //       lastName: props.lastName,
  //       email: props.email,
  //       //   password: props.password,
  //       active: true
  //     });
  //     console.log(adminInput);
  //   } else {
  //     setInput({
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       password: '',
  //       active: true
  //     });
  //   }

  const onChange = (e) => {
    setInput({ ...adminInput, [e.target.name]: e.target.value });
    console.log(
      JSON.stringify({
        first_name: adminInput.firstName,
        lastName: adminInput.Lastame,
        email: adminInput.email,
        password: adminInput.password,
        active: adminInput.active
      })
    );
  };

  const onSubmit = (e) => {
    console.log(adminInput);
    e.preventDefault();
    const postaAdmin = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: adminInput.firstName,
        lastName: adminInput.lastName,
        email: adminInput.email,
        password: adminInput.password,
        active: adminInput.active
      })
    };
    const url = `http://localhost:4000/admins/${props.admin._id}`;

    fetch(url, postaAdmin)
      .then((response) => response.json())
      .then((data) => console.log('data:', data));

    setInput({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: ''
    });
  };
  console.log(props);

  return (
    <div>
      <div>
        <h2>Add new admin</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            placeholder={props.admin.firstName}
            value={adminInput.firstName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder={props.admin.lastName}
            value={adminInput.lastName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder={props.admin.email}
            value={adminInput.email}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder={props.admin.password}
            value={adminInput.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Active</label>
          <input
            type="text"
            name="active"
            placeholder={props.admin.active}
            value={adminInput.active}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
};
export default Form;
