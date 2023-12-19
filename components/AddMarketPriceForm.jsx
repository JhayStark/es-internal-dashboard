import React, { useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import { useMarkets } from '@/hooks/fetchers';
import mtnApi from '@/utils/mtnInstance';

const AddPrice = ({ price, deletePrice, index, handleInputChange }) => {
  const [commodity, setCommodity] = useState('');
  const [market, setMarket] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const { markets } = useMarkets();

  useEffect(() => {
    setCommodity(price.commodity);
    setMarket(JSON.stringify({ name: price.market, city: price.location }));
    setRetailPrice(price['retail_price']);
    setWholesalePrice(price['wholesale_price']);
  }, []);

  useEffect(() => {
    let selectedMarket = { name: '', city: '' };
    if (market) {
      selectedMarket = JSON.parse(market);
    }
    handleInputChange(
      {
        commodity,
        market: selectedMarket.name,
        location: selectedMarket?.city,
        ['retail_price']: retailPrice,
        ['wholesale_price']: wholesalePrice,
        key: price.key,
      },
      index
    );
  }, [commodity, market, retailPrice, wholesalePrice]);

  return (
    <div className='grid grid-cols-1 gap-3 py-2 border-b-2 md:border-b-0 md:grid-cols-3 xl:grid-cols-11 '>
      <select
        name='commodity'
        id=''
        className='border-[1px] bg-inherit rounded pl-2 py-2 focus:outline-none xl:col-span-3'
        onChange={e => setCommodity(e.target.value)}
        value={commodity}
      >
        <option value=''>Select Commodity</option>
        <option value='Cassava'>Cassava</option>
        <option value='Plantain'>Plantain</option>
        <option value='Orange'>Orange</option>
      </select>
      <select
        name='market'
        id=''
        className='border-[1px] bg-inherit rounded pl-2  py-2 focus:outline-none xl:col-span-3'
        onChange={e => setMarket(e.target.value)}
        value={market?.name}
      >
        <option value=''>Select Market</option>
        {markets?.map(market => (
          <option key={market.name} value={JSON.stringify(market)}>
            {market.name}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='wholesale'
        className='border-[1px] bg-inherit rounded px-5 py-2 focus:outline-none xl:col-span-2'
        name='wholesale'
        onChange={e => setWholesalePrice(e.target.value)}
        value={wholesalePrice}
      />
      <input
        type='text'
        placeholder='retail'
        className='border-[1px] bg-inherit rounded px-5 py-2 focus:outline-none xl:col-span-2'
        name='retail'
        onChange={e => setRetailPrice(e.target.value)}
        value={retailPrice}
      />
      {index !== 0 && (
        <RiDeleteBin6Line
          className='self-center text-xl text-red-500 cursor-pointer '
          onClick={() => deletePrice(price.key)}
        />
      )}
    </div>
  );
};

const AddMarketPriceForm = ({ setOpenModal }) => {
  const [marketPrice, setMarketPrice] = useState([
    {
      commodity: '',
      market: '',
      location: '',
      ['wholesale_price']: '',
      ['retail_price']: '',
      key: uuidv4(),
    },
  ]);

  const addPrice = () => {
    setMarketPrice(prev => [
      ...prev,
      {
        commodity: '',
        market: '',
        location: '',
        ['wholesale_price']: '',
        ['retail_price']: '',
        key: uuidv4(),
      },
    ]);
  };

  const deletePrice = key => {
    setMarketPrice(prev => prev.filter(price => price.key !== key));
  };

  const handleInputChange = (data, index) => {
    setMarketPrice(prev => {
      prev[index] = data;
      return prev;
    });
  };

  const submitPrices = async () => {
    const marketPrices = marketPrice.filter(
      price =>
        price.commodity &&
        price.market &&
        price.location &&
        price['wholesale_price'] &&
        price['retail_price']
    );
    try {
      if (marketPrices.length > 0) {
        await mtnApi.post('/market-prices', {
          marketPrices,
        });
        alert('Price added successfully');
        setOpenModal(false);
      } else {
        alert('Please fill all the fields');
      }
    } catch (error) {
      alert('Failed to add market price');
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans  '>
      <div className=' p-5 lg:p-10 mx-auto bg-white rounded-lg shadow-lg w-[90vw] xl:w-[60vw] min-h-[300px] '>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-xl font-medium'>Add Market Price </h2>
          <IoIosCloseCircle
            className='text-xl text-red-500 cursor-pointer'
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>
        <div className='mt-5 space-y-5 max-h-[70vh] overflow-y-auto '>
          {marketPrice.map((price, index) => (
            <AddPrice
              key={price.key}
              deletePrice={deletePrice}
              price={price}
              index={index}
              handleInputChange={handleInputChange}
            />
          ))}
          <button
            className='px-5 py-2 text-white bg-green-500 rounded-lg'
            onClick={() => addPrice()}
          >
            Add Price
          </button>
        </div>
        <div className='flex items-end justify-end'>
          <button
            className='px-5 py-2 text-white rounded-lg bg-primary'
            type='button'
            onClick={submitPrices}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMarketPriceForm;
