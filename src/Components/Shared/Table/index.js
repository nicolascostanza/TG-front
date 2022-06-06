import React from 'react';
import styles from './table.module.css';
function Table({ title, headers, data, onEdit, onDelete, onAdd }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <button onClick={onAdd}>Add</button>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr className={styles.row} key={row.id}>
                {headers.map((header, index) => {
                  return <td key={index}>{row[header]}</td>;
                })}
                <td>
                  <button onClick={onEdit}>Edit</button>
                </td>
                <td>
                  <button onClick={onDelete}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
