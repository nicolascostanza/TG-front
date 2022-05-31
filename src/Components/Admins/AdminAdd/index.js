// import React from 'react';
// import { useState } from 'react';

// function Form() {
//   const [admin, setAdmin] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     active: true
//   });

//   const onChangeAdmin = (event) => {
//     setAdmin({ ...admin, [event.target.name]: event.target.value });
//     console.log(admin);
//   };

//   const onSubmitAdmin = (event) => {
//     event.preventDefault();
//     console.log('entro al add item');

//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         admin
//         //   firstName: 'Gina',
//         //   lastName: 'SchiappaPietra',
//         //   email: 'gina@gmail.com',
//         //   password: '123456788',
//         //   active: true
//       })
//     };
//     fetch(`http://localhost:4000/admins`, requestOptions).then((response) => response.json());
//     console.log('entro al fetch');
//     // props.addAmin(admin);
//     setAdmin({
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       status: true
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmitAdmin}>
//         <input name="name" placeholder="name" onChange={onChangeAdmin} />
//         <input name="lastName" placeholder="last name" onChange={onChangeAdmin} />
//         <input name="email" placeholder="email" onChange={onChangeAdmin} />
//         <input name="password" placeholder="pass" onChange={onChangeAdmin} />
//         <input name="status" placeholder="status" onChange={onChangeAdmin} />
//         <button type="submit">send</button>
//       </form>
//     </div>
//   );
// }
// export default Form;

// function AddEdit() {
//   const [admins, setAdmins] = useState([]);
//   useEffect(() => {
//     fetch(`http://localhost:4000/admins`)
//       .then((response) => response.json())
//       .then((response) => {
//         setAdmins(response.data);
//       });
//   }, []);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setlastName] = useState('');
//   const [active, setActive] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const addAdmin = (Admin) => {
//     setAdmins([...admins, Admin]);
//   };
//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (!firstName || !lastName || !active || !email || !password) {
//       alert('complete all fields');
//       return;
//     }
//     addAdmin(firstName, lastName, active, email, password);
//     setFirstName('');
//     setlastName('');
//     setActive(false);
//     setEmail('');
//     setPassword('');
//   };
//   return (
//     <form className={styles.container} onSubmit={onSubmit}>
//       <div>
//         <label>FirstName</label>
//         <input
//           type="text"
//           placeholder="FirstName"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>LastName</label>
//         <input
//           type="text"
//           placeholder="LastName"
//           value={lastName}
//           onChange={(e) => setlastName(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Active</label>
//         <input
//           type="checkbox"
//           checked={active}
//           value={active}
//           onChange={(e) => setActive(e.currentTarget.checked)}
//         />
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <input type="submit" value="Save Admin" />
//     </form>
//   );
// }

// export default AddEdit;
import React, { useState } from 'react';
// import Form from './Form';
// const params = new URLSearchParams(window.location.search);
// const adminId = params.get('id');
// const adminName = params.get('firstName');
// const adminLastName = params.get('lastName');
// const adminEmail = params.get('email');

const AddAdmin = () => {
  // const [admin, setAdmin] = useState({});
  const [adminInput, setInput] = useState({});
  //   const requestAdmins = async () => {
  //     const res = await fetch(`http://localhost:4000/admins`);
  //     const data = await res.json();
  //     setAdmins(data);
  //     const adminSelect = listAdmins.find((admin) => admin._id === adminId);
  //     setInput({
  //       firstName: adminSelect.firstName,
  //       lastName: adminSelect.lastName,
  //       email: adminSelect.email,
  //       password: adminSelect.password,
  //       active: true
  //     });
  //   };

  // useEffect(() => {
  //   fetch(`http://localhost:4000/admins/${adminId}`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setAdmin(response.data);
  //     });
  // }, []);
  // //   const adminSelect = listAdmins.find((admin) => admin._id === adminId);
  // console.log(admin);
  // return <Form admin={admin} />;

  //   if (adminId) {
  //     setInput({
  //       firstName: adminSelect.firstName,
  //       lastName: adminSelect.lastName,
  //       email: adminSelect.email,
  //       password: adminSelect.password,
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

  //   console.log(adminSelect);
  //     if (adminId) {
  //       const [adminInput, setInput] = useState({
  //         firstName: adminSelect.name,
  //         lastName: '',
  //         email: '',
  //         password: '',
  //         active: true
  //       });
  //       console.log(adminInput);
  //     } else {
  //   const [adminInput, setInput] = useState({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: '',
  //     active: true
  //   });
  //   console.log(adminInput);
  //   //   }

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
      method: 'POST',
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
    const url = `http://localhost:4000/admins`;

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
            // value={adminId ? adminSelect.name : ''}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={adminInput.lastName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            // value={adminId ? adminSelect.email : ''}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={adminInput.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Active</label>
          <input type="text" name="active" value={adminInput.active} onChange={onChange}></input>
        </div>
        <div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
};
export default AddAdmin;
