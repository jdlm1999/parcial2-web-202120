import React, { useEffect, useState } from 'react';
import { getProductsService } from '../services/product';
import { Card } from '../components/Card';
import { FormattedMessage } from 'react-intl';

export const Home = ({ searchKey }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, [searchKey]);

  const getData = async () => {
    try {
      if(searchKey === ''){
        console.log(searchKey);
      }
      const results = await getProductsService(searchKey);
      setProducts(results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section id='home'>
      <div className='home-container'>
        <h1><FormattedMessage id="gallery" /></h1>
        <div className='home-card'>
          {products?.map(item => (
            <Card {...item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
};
