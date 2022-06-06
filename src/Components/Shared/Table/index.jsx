import React from 'react';
import { useState } from 'react';
import styles from './table.module.css';
import Button from '../Button/Button.jsx';
function Table({ title, headers, data, onEdit, onDelete, onAdd }) {
  const [indexPage, setIndexPage] = useState(1);
  const show = data.slice(10 * (indexPage - 1), 10 * indexPage);
  const nextPage = () => {
    if (data.length / 10 >= indexPage) {
      setIndexPage(indexPage + 1);
    }
  };
  const previousPage = () => {
    if (indexPage > 1) {
      setIndexPage(indexPage - 1);
    }
  };
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Button width={'100px'} height={'40px'} fontSize={'15px'} onClick={onAdd}>
        ADD
      </Button>
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
          {show.map((row) => {
            return (
              <tr className={styles.row} key={row.id}>
                {headers.map((header, index) => {
                  return <td key={index}>{row[header]}</td>;
                })}
                <td>
                  <Button onClick={onEdit} width={'50px'} height={'25px'} fontSize={'15px'}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button onClick={onDelete} width={'50px'} height={'25px'} fontSize={'15px'}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <div>
          <p>Page {indexPage}</p>
        </div>
        <div>
          <Button
            width={'100px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage <= 1}
            onClick={() => previousPage()}
          >
            Previous
          </Button>
        </div>
        <div>
          <Button
            width={'100px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage >= data.length / 10}
            onClick={() => nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Table;
