import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { getProductsService } from '../services/product';
import * as d3 from "d3"
import { Chart } from '../components/Chart';


export const Report = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const results = await getProductsService(' ');
      setProducts(results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section id='report'>
      <div className='report-container'>
        <h1><FormattedMessage id='uni' /></h1>
        <div>
          <Chart data={products} />
        </div>
      </div>
    </section>
  );
};
