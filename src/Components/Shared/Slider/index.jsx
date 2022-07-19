import React from 'react';

const Slider = ({ id, name, value, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        id="approved"
        name="approved"
        value="approved"
        checked={row.approveSlider === true ? true : false}
        // checked={false}
        // {...(register ? register(registerValue) : registerValue)}
        onChange={() => onApprove(row, row._id)}
      />
    </div>
  );
};

export default Slider;
