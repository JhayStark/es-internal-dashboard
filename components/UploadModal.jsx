import { useRef, useState } from 'react';
import { AiFillCloseCircle, AiOutlineCloudUpload } from 'react-icons/ai';
import { LuMerge } from 'react-icons/lu';
import api from '../utils/axiosInstance';
import UploadDataTable from './UploadDataTable';

const UploadModal = ({ modalState, close }) => {
  const modalRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [duplicates, setDuplicates] = useState([]);
  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    await api
      .post('/reports/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(res => {
        if (!res.data.message.includes('duplicated')) {
          alert('File uploaded successfully');
          return;
        }
        const mergedData = [];
        res.data.duplicated.map(item => {
          const newObject = { ...item, original: false };
          mergedData.push(newObject);
        });
        res.data.existing.map(item => {
          const newObject = { ...item, original: true };
          mergedData.push(newObject);
        });
        console.log(mergedData);
        setDuplicates(mergedData);
        alert('Duplicates found');
      })
      .catch(() => alert('Failed to update'));
  };

  const outsideClick = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      close();
    }
  };

  const farmerTableColumns = [
    {
      name: 'Key',
      selector: row => row.key,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,

      sortable: true,
    },
    {
      name: 'District',
      selector: row => row.district,
      sortable: true,
    },
    {
      name: 'Region',
      selector: row => row.region,
      sortable: true,
    },
    {
      name: 'Network',
      selector: row => row.network,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Contact',
      selector: row => row.contact,
      sortable: true,
    },
  ];
  return (
    <div>
      {modalState && (
        <div
          onClick={outsideClick}
          className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans  '
        >
          <div
            ref={modalRef}
            className='min-w-[30%] p-4 mx-auto bg-white rounded-lg shadow-lg'
          >
            <div className='flex flex-row items-center justify-between mb-4'>
              <h2 className='text-xl font-bold'>Upload Farmer Data</h2>
              <AiFillCloseCircle
                className='text-2xl text-red-400 cursor-pointer'
                onClick={close}
              />
            </div>
            <div className='flex flex-row items-center justify-between mt-5'>
              <input
                type='file'
                id='fileUpload'
                name='fileUpload'
                className=''
                onChange={handleFileChange}
              />
              <button
                onClick={handleUpload}
                className='flex flex-row gap-2 px-2 py-1 text-black bg-green-300 rounded-md'
              >
                Upload
                <AiOutlineCloudUpload className='text-2xl font-extrabold cursor-pointer hover:scale-125' />
              </button>
            </div>
            {duplicates.length > 1 && (
              <div className='mt-4'>
                <UploadDataTable
                  data={duplicates}
                  columns={farmerTableColumns}
                  title='Duplicates'
                />
                <div className='flex flex-row justify-end gap-2'>
                  <button className='flex flex-row gap-2 px-2 py-1 text-black bg-yellow-300 rounded-md'>
                    Overwrite
                  </button>
                  <button className='flex flex-row gap-2 px-2 py-1 text-black bg-blue-300 rounded-md'>
                    Merge
                    <LuMerge className='text-xl font-extrabold cursor-pointer hover:scale-125' />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadModal;
