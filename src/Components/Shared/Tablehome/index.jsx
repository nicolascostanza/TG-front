import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';

function Tablehome({ title, headers, keys, data, role, onEdit, onAdd, onDelete, openRow }) {
  const [indexPage, setIndexPage] = useState(1);
  const show = data.slice(10 * (indexPage - 1), 10 * indexPage);
  useEffect(() => {
    const maxIndexPage = data.length > 10 ? Math.floor((data.length - 0.01) / 10) + 1 : 1;
    if (indexPage < 1) {
      setIndexPage(1);
    }
    if (indexPage > maxIndexPage) {
      setIndexPage(maxIndexPage);
    }
  }, [data]);
  console.log(keys);
  const nextPage = () => {
    if (data.length / 10 > indexPage) {
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
      {role === `ADMIN` || role === `SUPERADMIN` ? (
        <Button width={'100px'} height={'40px'} fontSize={'15px'} onClick={() => onAdd()}>
          <i className="fa-solid fa-plus"></i>
          ADD
        </Button>
      ) : null}
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            {role === `SUPERADMIN` ? <th>Status</th> : null}
            {role === `ADMIN` ? <th>Edit</th> : null}
            {role === `ADMIN` || role === `SUPERADMIN` ? <th>Delete</th> : null}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {show.map((row) => {
            return (
              <tr className={styles.row} key={row._id} onClick={() => openRow()}>
                {keys.map((key, index) => {
                  if (Array.isArray(row[key])) {
                    <h5>aca van las opciones del objetos o arrays</h5>;
                  } else {
                    return <td key={index}>{row[key]}</td>;
                  }
                })}
                {role === `SUPERADMIN` ? (
                  <td>
                    <button>boolean Is active</button>
                  </td>
                ) : null}
                {role === `ADMIN` ? (
                  <td>
                    <Button
                      className={styles.buttonsRows}
                      width={'50px'}
                      height={'25px'}
                      fontSize={'13px'}
                      onClick={() => onEdit(row._id)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </Button>
                  </td>
                ) : null}
                {role === `ADMIN` || role === `SUPERADMIN` ? (
                  <td>
                    <Button
                      onClick={() => onDelete(row._id)}
                      width={'50px'}
                      height={'25px'}
                      fontSize={'13px'}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </Button>
                  </td>
                ) : null}
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
            width={'50px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage <= 1}
            onClick={() => previousPage()}
          >
            <i className="fa-solid fa-angle-left"></i>
          </Button>
        </div>
        <div>
          <Button
            width={'50px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage >= data.length / 10}
            onClick={() => nextPage()}
          >
            <i className="fa-solid fa-angle-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Tablehome;
