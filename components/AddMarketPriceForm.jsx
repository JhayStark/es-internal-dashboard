import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { IoIosCloseCircle } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import { useMarkets } from '@/hooks/fetchers';
import mtnApi from '@/utils/mtnInstance';

const selectStyles =
  'border-[1px] bg-inherit rounded pl-2 py-2 focus:outline-none xl:col-span-3';

const inputStyles =
  'border-[1px] bg-inherit rounded px-5 py-2 focus:outline-none xl:col-span-2';

const marketPriceSchema = z.object({
  marketPrice: z.array(
    z.object({
      commodity: z.string().min(1),
      market: z.string().min(1),
      location: z.string().min(1),
      ['wholesale_price']: z.string().min(1),
      ['retail_price']: z.string().min(1),
    })
  ),
});

const AddMarketPriceForm = ({ setOpenModal }) => {
  const { register, control, handleSubmit, setValue } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'marketPrice',
  });
  const { markets } = useMarkets();
  const [formErrors, setFormErrors] = useState({});

  const onSelectMarket = (index, marketValue) => {
    const selectedMarket = JSON.parse(marketValue);
    const { name, city } = selectedMarket;
    setValue(`marketPrice.${index}.market`, name);
    setValue(`marketPrice.${index}.location`, city);
  };

  const onSubmit = async data => {
    try {
      marketPriceSchema.parse(data);

      await mtnApi.post('/market-prices', {
        marketPrices: data.marketPrice,
      });

      alert('Price added successfully');
      setOpenModal(false);
    } catch (error) {
      if (error instanceof Error && error.errors && error.errors.length > 0) {
        // Map Zod validation errors to form fields in React Hook Form formState
        const zodErrors = {};
        error.issues.forEach(errorMsg => {
          const { path, message } = errorMsg;
          const newMessage = {};
          newMessage[path[2]] = message;
          zodErrors[path[1]] = { ...zodErrors[path[1]], ...newMessage };
        });

        setFormErrors(zodErrors);
      } else {
        alert('Failed to add market price');
      }
    }
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({
        commodity: '',
        market: '',
        location: '',
        ['wholesale_price']: '',
        ['retail_price']: '',
        key: uuidv4(),
      });
    }
  }, []);

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans'>
      <div className='p-5 lg:p-10 mx-auto bg-white rounded-lg shadow-lg w-[90vw] xl:w-[60vw] min-h-[300px]'>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-lg font-medium 3xl:text-xl'>Add Market Price</h2>
          <IoIosCloseCircle
            className='text-xl text-red-500 cursor-pointer'
            onClick={() => setOpenModal(false)}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-5 space-y-5 max-h-[70vh] overflow-y-auto'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='grid grid-cols-1 gap-3 py-2 border-b-2 md:border-b-0 md:grid-cols-3 xl:grid-cols-11'
              >
                <select
                  {...register(`marketPrice.${index}.commodity`)}
                  className={` ${selectStyles} ${
                    formErrors[index]?.commodity && 'border-red-500'
                  }`}
                >
                  <option value=''>Select Commodity</option>
                  <option value='Cassava'>Cassava</option>
                  <option value='Plantain'>Plantain</option>
                  <option value='Orange'>Orange</option>
                </select>
                <select
                  onChange={e => onSelectMarket(index, e.target.value)}
                  className={` ${selectStyles} ${
                    formErrors[index]?.market && 'border-red-500'
                  }`}
                >
                  <option value=''>Select Market</option>
                  {markets?.map(market => (
                    <option key={market.name} value={JSON.stringify(market)}>
                      {market.name}
                    </option>
                  ))}
                </select>
                <input
                  type='number'
                  placeholder='Wholesale price'
                  {...register(`marketPrice.${index}.wholesale_price`)}
                  className={`${inputStyles} ${
                    formErrors[index]?.wholesale_price && 'border-red-500'
                  }`}
                  min={0}
                />
                <input
                  type='number'
                  placeholder='Retail price'
                  {...register(`marketPrice.${index}.retail_price`)}
                  className={`${inputStyles} ${
                    formErrors[index]?.retail_price && 'border-red-500'
                  }`}
                  min={0}
                />
                {index !== 0 && (
                  <RiDeleteBin6Line
                    className='self-center text-xl text-red-500 cursor-pointer'
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            ))}
            <button
              type='button'
              className='px-5 py-2 text-white bg-green-500 rounded-lg hover:opacity-80'
              onClick={() =>
                append({
                  commodity: '',
                  market: '',
                  location: '',
                  ['wholesale_price']: '',
                  ['retail_price']: '',
                  key: uuidv4(),
                })
              }
            >
              Add Price
            </button>
          </div>
          <div className='flex items-end justify-end'>
            <button
              type='submit'
              className='px-5 py-2 text-white rounded-lg bg-primary hover:opacity-80'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarketPriceForm;
