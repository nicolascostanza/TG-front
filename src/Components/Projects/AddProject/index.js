// import { useState } from 'react';
import React from 'react';

const AddProject = () => {
  // const [projectInput, setProjectInput] = useState(props)
  return (
    <form>
      <label>
        Project name:
        <input type="text" />
      </label>
      <label>
        Description:
        <input type="text" />
      </label>
      <label>
        Client name:
        <input type="text" />
      </label>
      <label>
        Start Date:
        <input type="date" />
      </label>
      <label>
        End date:
        <input type="date" />
      </label>
      <label>
        Project manager:
        <input type="text" />
      </label>
      <label>
        Team:
        <input type="text" />
      </label>
      <label>
        Tasks:
        <input type="text" />
      </label>
      <label>
        Admin:
        <input type="text" />
      </label>
    </form>
  );
};

export default AddProject;
