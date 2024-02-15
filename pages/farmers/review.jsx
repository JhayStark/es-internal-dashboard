import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReportsNavigationTab from '@/components/ReportsNavigationTab';
import AddFarmer from '@/components/farmers/AddFarmer';
import { useRouter } from 'next/router';
import { useTableDataMtn } from '@/hooks/fetchers';
import { LuFileEdit } from 'react-icons/lu';
import { AiOutlineEye } from 'react-icons/ai';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const farmerTableData = [
  {
    name: 'Dickie Deppe',
    location: '2928 Waxwing Pass',
    contact: '523-687-3505',
    status: false,
  },
  {
    name: 'Sanford Mothersdale',
    location: '8 Jenifer Parkway',
    contact: '780-797-6222',
    status: true,
  },
  {
    name: 'Brittney Conman',
    location: '19747 Hallows Terrace',
    contact: '126-348-9752',
    status: false,
  },
  {
    name: 'Lek Yitzhakof',
    location: '73 Lyons Way',
    contact: '836-212-8563',
    status: false,
  },
  {
    name: 'Tandy Millin',
    location: '82 Sunfield Plaza',
    contact: '973-299-7522',
    status: false,
  },
  {
    name: 'Harlen Oleksiak',
    location: '18 Moose Lane',
    contact: '162-948-8456',
    status: false,
  },
  {
    name: 'Jamil Burkin',
    location: '820 Knutson Junction',
    contact: '435-240-5285',
    status: false,
  },
  {
    name: 'Ardisj Di Boldi',
    location: '002 Bultman Trail',
    contact: '491-953-9784',
    status: true,
  },
  {
    name: 'Emery Syvret',
    location: '6 Mandrake Lane',
    contact: '873-811-2590',
    status: false,
  },
  {
    name: 'Sherye Duckering',
    location: '306 Loomis Plaza',
    contact: '483-924-3499',
    status: true,
  },
  {
    name: "Corinna D'Alessio",
    location: '56 Spohn Hill',
    contact: '272-463-8712',
    status: true,
  },
  {
    name: 'Hyacinthia Whitesel',
    location: '65 Grover Hill',
    contact: '122-892-4777',
    status: true,
  },
  {
    name: 'Kyle Olin',
    location: '7 Cottonwood Hill',
    contact: '323-615-8953',
    status: false,
  },
  {
    name: 'Carie Quick',
    location: '601 Donald Terrace',
    contact: '969-238-0169',
    status: true,
  },
  {
    name: 'Laurella Clopton',
    location: '840 Sullivan Way',
    contact: '428-395-5115',
    status: true,
  },
  {
    name: 'Siegfried Fouracre',
    location: '1 Dexter Avenue',
    contact: '414-574-5913',
    status: false,
  },
  {
    name: 'Rachel Skep',
    location: '9 Portage Street',
    contact: '373-886-1762',
    status: false,
  },
  {
    name: 'Falkner Tattersall',
    location: '7264 Transport Drive',
    contact: '214-826-8530',
    status: false,
  },
  {
    name: 'Gladys Charrisson',
    location: '83470 Corry Center',
    contact: '662-938-6936',
    status: true,
  },
  {
    name: 'Shandeigh Clarae',
    location: '23283 Londonderry Center',
    contact: '880-272-8550',
    status: true,
  },
  {
    name: 'Margeaux Kubasek',
    location: '901 Graedel Hill',
    contact: '737-387-1664',
    status: true,
  },
  {
    name: 'Agna Buttwell',
    location: '3188 Buhler Avenue',
    contact: '854-533-7589',
    status: false,
  },
  {
    name: 'Aurilia MacGiffin',
    location: '72 Schlimgen Avenue',
    contact: '882-299-1034',
    status: true,
  },
  {
    name: 'Thornie Hellin',
    location: '5602 Service Crossing',
    contact: '550-791-7856',
    status: false,
  },
  {
    name: 'Lorrayne Isitt',
    location: '91 Corscot Point',
    contact: '790-636-0935',
    status: true,
  },
  {
    name: 'Kassia Blethyn',
    location: '6 Novick Junction',
    contact: '140-363-6484',
    status: false,
  },
  {
    name: 'Antonina Speachley',
    location: '0038 Kedzie Parkway',
    contact: '495-895-2405',
    status: true,
  },
  {
    name: 'Waldemar Tosh',
    location: '13 Delladonna Pass',
    contact: '998-339-1006',
    status: true,
  },
  {
    name: 'Esme Thomassen',
    location: '0 Talmadge Parkway',
    contact: '516-583-9449',
    status: false,
  },
  {
    name: 'Alica Venton',
    location: '75 Northview Terrace',
    contact: '858-130-1282',
    status: true,
  },
  {
    name: 'Geneva Lind',
    location: '7132 Evergreen Point',
    contact: '145-776-8062',
    status: false,
  },
  {
    name: 'Willis Cogswell',
    location: '62848 Manitowish Lane',
    contact: '647-552-2523',
    status: false,
  },
  {
    name: 'Coleman Livingstone',
    location: '5 Brown Street',
    contact: '243-963-5988',
    status: true,
  },
  {
    name: 'Barbaraanne Aumerle',
    location: '70 Shelley Court',
    contact: '516-342-0993',
    status: false,
  },
  {
    name: 'Mattie Roullier',
    location: '9877 Barby Way',
    contact: '705-549-0891',
    status: true,
  },
  {
    name: 'Jaclin Pogson',
    location: '36678 Golf View Parkway',
    contact: '854-538-3972',
    status: false,
  },
  {
    name: 'Salvidor Oley',
    location: '513 Kensington Road',
    contact: '773-468-8709',
    status: true,
  },
  {
    name: 'Christy Gonet',
    location: '5959 Londonderry Street',
    contact: '610-799-5245',
    status: true,
  },
  {
    name: 'Maria Shanley',
    location: '1450 Macpherson Hill',
    contact: '994-808-0391',
    status: true,
  },
];

const farmerTableColumns = [
  {
    name: 'Name',
    selector: row => row.name,

    sortable: true,
  },
  {
    name: 'Location',
    selector: row => row.community,
    sortable: true,
  },
  {
    name: 'Category',
    selector: row => row.category,
    sortable: true,
  },
  {
    name: 'Contact',
    selector: row => row.phone,
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    cell: row => (
      <p
        className={` w-14 text-center py-1 rounded-lg text-xs text-gray-600 ${
          row.status ? 'bg-yellow-200' : 'bg-green-200'
        }`}
      >
        {row.status ? 'pending' : 'reviewed'}
      </p>
    ),
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => {
      const rowData = JSON.stringify(row);
      const viewData = () => {
        localStorage.setItem('viewData', rowData);
      };
      return (
        <div className='flex items-center gap-2 text-2xl'>
          <Link
            href={`/farmers/review?addFarmer=true&farmerId=${row.id}&rowData=${rowData}`}
          >
            <LuFileEdit className='text-orange-300 cursor-pointer hover:scale-110' />
          </Link>
          <Link href={`/farmers/${row.id}`} onClick={() => viewData()}>
            <AiOutlineEye className='text-[#699BF7] cursor-pointer hover:scale-110' />
          </Link>
        </div>
      );
    },
    center: true,
  },
];

const Review = () => {
  const router = useRouter();
  const query = router.query;
  const {
    filterText,
    handlePageChange,
    handlePageNumberChange,
    setFilterText,
    tableData,
    tableDataIsLoading,
  } = useTableDataMtn('/farmers');

  return (
    <div>
      <ReportsNavigationTab
        routes={[
          { route: '/farmers', title: 'Farmers' },
          { route: '/farmers/review', title: 'New Farmers' },
        ]}
      />
      <div className='flex items-center justify-end w-full p-2 '>
        <button
          className='p-2 font-medium text-white bg-blue-700 rounded hover:scale-90'
          type='button'
          onClick={() => router.push('/farmers/review?addFarmer=true')}
        >
          Add Farmer
        </button>
      </div>
      <div className='col-span-4 px-5 py-2 bg-white rounded-lg lg:col-span-3 shadow-3xl '>
        <NoSSRTable
          data={tableData?.data || []}
          columns={farmerTableColumns}
          title='Farmer Profiles'
          loading={tableDataIsLoading}
          totalRows={tableData?.totalRowCount}
          handlePerRowsChange={handlePageNumberChange}
          setFilterText={setFilterText}
          filterText={filterText}
          handlePageChange={handlePageChange}
          farmerTable
          setUploadModalState={() => 'void'}
          setFarmerFilterModalState={() => 'void'}
        />
      </div>
      {query.addFarmer && (
        <AddFarmer
          modalState={query.addFarmer}
          close={() => router.push('/farmers/review')}
        />
      )}
    </div>
  );
};

export default Review;
