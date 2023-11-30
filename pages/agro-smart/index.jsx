import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import AgroSmartNavigationTab from '../../components/AgroSmartNavigationTab';
import AddMarketPriceForm from '../../components/AddMarketPriceForm';
import { useMarketPrices } from '@/hooks/fetchers';

const priceData = [
  {
    commodity: 'Goldencarpet Buckwheat',
    market: 'CBL & Associates Properties, Inc.',
    date_recorded: '10/24/2023',
    wholesale_price: 'n/a',
    retail_price: '$1.44B',
  },
  {
    commodity: 'Purplestem Phacelia',
    market: 'USA Technologies, Inc.',
    date_recorded: '6/11/2023',
    wholesale_price: '$203.67M',
    retail_price: '$17.01M',
  },
  {
    commodity: 'Salvation Jane',
    market: 'Duke Energy Corporation',
    date_recorded: '5/23/2023',
    wholesale_price: 'n/a',
    retail_price: '$164.16M',
  },
  {
    commodity: 'Common Crupina',
    market: 'Universal Display Corporation',
    date_recorded: '11/9/2023',
    wholesale_price: '$5.5B',
    retail_price: 'n/a',
  },
  {
    commodity: 'Sagebrush Mariposa Lily',
    market: 'National Retail Properties',
    date_recorded: '3/10/2023',
    wholesale_price: 'n/a',
    retail_price: '$1.65B',
  },
  {
    commodity: 'Seapurslane',
    market: 'First Trust Nasdaq Retail ETF',
    date_recorded: '3/14/2023',
    wholesale_price: '$1.93M',
    retail_price: '$39.11B',
  },
  {
    commodity: 'Knotweed',
    market: 'Legacy Reserves LP',
    date_recorded: '3/25/2023',
    wholesale_price: '$102.4M',
    retail_price: '$186.89M',
  },
  {
    commodity: 'Fastigiate Mouse-ear Chickweed',
    market: 'Cree, Inc.',
    date_recorded: '12/28/2022',
    wholesale_price: '$2.35B',
    retail_price: '$378.24M',
  },
  {
    commodity: 'Porknut',
    market: 'Carrizo Oil & Gas, Inc.',
    date_recorded: '6/9/2023',
    wholesale_price: '$1.23B',
    retail_price: '$1.66B',
  },
  {
    commodity: 'Meadow Evening Primrose',
    market: 'SodaStream International Ltd.',
    date_recorded: '4/26/2023',
    wholesale_price: '$1.13B',
    retail_price: 'n/a',
  },
  {
    commodity: 'Felt Lichen',
    market: 'Coastway Bancorp, Inc.',
    date_recorded: '10/26/2023',
    wholesale_price: '$91.14M',
    retail_price: '$534.38M',
  },
  {
    commodity: 'Horsehair Lichen',
    market: 'Macatawa Bank Corporation',
    date_recorded: '1/29/2023',
    wholesale_price: '$321.8M',
    retail_price: '$30.92M',
  },
  {
    commodity: 'Turion Duckweed',
    market: 'Old Dominion Freight Line, Inc.',
    date_recorded: '12/13/2022',
    wholesale_price: '$7.81B',
    retail_price: 'n/a',
  },
  {
    commodity: "Baker's Hawksbeard",
    market: 'Commerce Union Bancshares, Inc.',
    date_recorded: '4/25/2023',
    wholesale_price: '$187.29M',
    retail_price: '$5.4M',
  },
  {
    commodity: 'Pacific Felt Lichen',
    market: 'L.B. Foster Company',
    date_recorded: '3/20/2023',
    wholesale_price: '$202.5M',
    retail_price: 'n/a',
  },
  {
    commodity: 'Small Mountain Bittercress',
    market: 'Meritage Corporation',
    date_recorded: '5/3/2023',
    wholesale_price: '$1.62B',
    retail_price: '$70.38M',
  },
  {
    commodity: 'Scarlet Globemallow',
    market: 'Agrium Inc.',
    date_recorded: '9/6/2023',
    wholesale_price: '$12.97B',
    retail_price: '$8.75B',
  },
  {
    commodity: 'Papillate Rinodina Lichen',
    market: 'Allied Motion Technologies, Inc.',
    date_recorded: '11/14/2023',
    wholesale_price: '$253.74M',
    retail_price: '$33.78M',
  },
  {
    commodity: "Wright's Milkpea",
    market: 'LifePoint Health, Inc.',
    date_recorded: '9/18/2023',
    wholesale_price: '$2.59B',
    retail_price: '$230.63M',
  },
  {
    commodity: 'Atlantic Pigeonwings',
    market: 'LightInTheBox Holding Co., Ltd.',
    date_recorded: '2/28/2023',
    wholesale_price: '$170.21M',
    retail_price: '$21.39B',
  },
  {
    commodity: 'Black Hills Meadow-rue',
    market: 'CPB Inc.',
    date_recorded: '9/3/2023',
    wholesale_price: '$967.78M',
    retail_price: '$380.1M',
  },
  {
    commodity: 'Monkeypuzzle Tree',
    market: 'New Oriental Education & Technology Group, Inc.',
    date_recorded: '6/21/2023',
    wholesale_price: '$11.67B',
    retail_price: 'n/a',
  },
  {
    commodity: 'Northern Rimmed Lichen',
    market: 'Chanticleer Holdings, Inc.',
    date_recorded: '12/3/2022',
    wholesale_price: '$6.31M',
    retail_price: '$107.61M',
  },
  {
    commodity: 'Trichostomum Moss',
    market: 'La Quinta Holdings Inc.',
    date_recorded: '12/7/2022',
    wholesale_price: '$1.78B',
    retail_price: '$8.33B',
  },
  {
    commodity: "Ives' Phacelia",
    market: 'China Auto Logistics Inc.',
    date_recorded: '12/29/2022',
    wholesale_price: '$8.19M',
    retail_price: 'n/a',
  },
  {
    commodity: 'Camden Woollybutt',
    market: 'bebe stores, inc.',
    date_recorded: '4/13/2023',
    wholesale_price: '$40.31M',
    retail_price: '$323.56M',
  },
  {
    commodity: 'Riverbank Creepingoxeye',
    market: 'Quad Graphics, Inc',
    date_recorded: '12/30/2022',
    wholesale_price: '$1.18B',
    retail_price: '$1.23M',
  },
  {
    commodity: 'Psorotichia Lichen',
    market: 'Territorial Bancorp Inc.',
    date_recorded: '6/9/2023',
    wholesale_price: '$309.27M',
    retail_price: '$1.64B',
  },
  {
    commodity: 'Entodon Moss',
    market: 'Pegasystems Inc.',
    date_recorded: '5/26/2023',
    wholesale_price: '$4.6B',
    retail_price: '$189.23B',
  },
  {
    commodity: 'Dotted Wild Coffee',
    market: 'Olympic Steel, Inc.',
    date_recorded: '1/6/2023',
    wholesale_price: '$184.08M',
    retail_price: '$62.27B',
  },
  {
    commodity: 'Corkyfruit Waterdropwort',
    market: 'Douglas Emmett, Inc.',
    date_recorded: '3/13/2023',
    wholesale_price: '$6.03B',
    retail_price: '$111.6M',
  },
  {
    commodity: 'California Blackberry',
    market: 'Oncobiologics, Inc.',
    date_recorded: '1/31/2023',
    wholesale_price: 'n/a',
    retail_price: '$238.94M',
  },
  {
    commodity: 'Woodland Dewberry',
    market: 'Community Health Systems, Inc.',
    date_recorded: '8/27/2023',
    wholesale_price: '$1.03B',
    retail_price: '$390.47M',
  },
  {
    commodity: 'Farewell To Spring',
    market: 'Capital One Financial Corporation',
    date_recorded: '10/13/2023',
    wholesale_price: '$39.27B',
    retail_price: '$1.68B',
  },
  {
    commodity: "Long's Northern Rockcress",
    market: 'Rentech, Inc.',
    date_recorded: '8/9/2023',
    wholesale_price: '$10.31M',
    retail_price: '$181.01M',
  },
  {
    commodity: 'Dwarf Butterfly Orchid',
    market: 'Select Comfort Corporation',
    date_recorded: '5/22/2023',
    wholesale_price: '$1.32B',
    retail_price: 'n/a',
  },
  {
    commodity: "Reverchon's Bristlegrass",
    market: 'Gladstone Commercial Corporation',
    date_recorded: '5/19/2023',
    wholesale_price: '$25.74M',
    retail_price: '$4.11B',
  },
  {
    commodity: 'Wideleaf Waterparsnip',
    market: 'Armstrong Flooring, Inc.',
    date_recorded: '10/11/2023',
    wholesale_price: '$504.86M',
    retail_price: '$725.83M',
  },
  {
    commodity: 'Forked Aster',
    market: 'Vonage Holdings Corp.',
    date_recorded: '8/3/2023',
    wholesale_price: '$1.55B',
    retail_price: '$51.95B',
  },
  {
    commodity: 'White Fenrose',
    market: 'WageWorks, Inc.',
    date_recorded: '10/14/2023',
    wholesale_price: '$2.67B',
    retail_price: '$30.7B',
  },
  {
    commodity: 'Redflame',
    market: 'Allegiant Travel Company',
    date_recorded: '8/30/2023',
    wholesale_price: '$2.38B',
    retail_price: '$362.41M',
  },
  {
    commodity: 'Broadleaf Milkweed',
    market: 'Urstadt Biddle Properties Inc.',
    date_recorded: '8/30/2023',
    wholesale_price: 'n/a',
    retail_price: '$59.41M',
  },
  {
    commodity: 'California Bedstraw',
    market: 'Grupo Aeroportuario del Centro Norte S.A.B. de C.V.',
    date_recorded: '12/11/2022',
    wholesale_price: '$2.25B',
    retail_price: '$8.66M',
  },
  {
    commodity: "Ornduff's Meadowfoam",
    market: 'Jewett-Cameron Trading Company',
    date_recorded: '7/10/2023',
    wholesale_price: '$28.24M',
    retail_price: '$5.4M',
  },
  {
    commodity: 'Sierra Primrose',
    market: 'Teradyne, Inc.',
    date_recorded: '7/8/2023',
    wholesale_price: '$6.47B',
    retail_price: '$226.82M',
  },
  {
    commodity: 'Elama',
    market: 'General Dynamics Corporation',
    date_recorded: '7/24/2023',
    wholesale_price: '$61.14B',
    retail_price: '$3.99B',
  },
  {
    commodity: 'Arizona Signalgrass',
    market: 'Verint Systems Inc.',
    date_recorded: '5/18/2023',
    wholesale_price: '$2.54B',
    retail_price: '$725.53M',
  },
  {
    commodity: 'Edwards Plateau Spiderwort',
    market: 'National General Holdings Corp',
    date_recorded: '3/25/2023',
    wholesale_price: 'n/a',
    retail_price: '$159.61M',
  },
  {
    commodity: 'Arrowhead Maiden Fern',
    market: 'Synalloy Corporation',
    date_recorded: '9/27/2023',
    wholesale_price: '$96.77M',
    retail_price: '$103.1B',
  },
  {
    commodity: "'ie'ie",
    market: 'LRAD Corporation',
    date_recorded: '2/24/2023',
    wholesale_price: '$51.2M',
    retail_price: '$3.9B',
  },
];

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const pricesColumns = [
  {
    name: 'Commodity',
    selector: row => row['commodity'],
    sortable: true,
  },
  {
    name: 'Market',
    selector: row => row['market'],
    sortable: true,
  },
  {
    name: 'Wholesale Price',
    selector: row => row['wholesale_price'],
    sortable: true,
  },
  {
    name: 'Retail Price',
    selector: row => row['retail_price'],
    sortable: true,
  },
  {
    name: 'Date Recorded',
    selector: row => row['date_recorded'],
    sortable: true,
  },
];

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [filterText, setFilterText] = useState('');
  const { marketPrices, marketPricesIsLoading } = useMarketPrices();
  return (
    <div className='box-border'>
      <AgroSmartNavigationTab />
      <div className='flex justify-end'>
        <button
          className='p-2 text-sm font-medium text-white bg-green-500 rounded-md shadow '
          onClick={() => setOpenModal(true)}
        >
          Add Market Price
        </button>
      </div>
      <div className='p-4 mt-2 bg-white rounded-lg shadow-3xl '>
        <NoSSRTable
          data={marketPrices?.data}
          columns={pricesColumns}
          loading={marketPricesIsLoading}
          totalRows={marketPrices?.totalRowCount}
          // handlePerRowsChange={handlePageNumberChange}
          setFilterText={setFilterText}
          filterText={filterText}
          // handlePageChange={handlePageChange}
          // options={['Push', 'Insyt']}
          title='Market Prices'
        />
      </div>
      {openModal && <AddMarketPriceForm setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Index;
