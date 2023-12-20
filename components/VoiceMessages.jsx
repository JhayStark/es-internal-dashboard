import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { useDropzone } from 'react-dropzone';
import { FaPlay } from 'react-icons/fa';
import { HiOutlinePause } from 'react-icons/hi';
import { MdDeleteOutline } from 'react-icons/md';

export const AudioListItem = ({ file, handleDelete }) => {
  const audio = new Audio(file.src);
  return (
    <li className='flex items-center justify-between gap-2 text-sm'>
      <div className='flex items-center gap-2'>
        <FaPlay
          className='text-blue-500 cursor-pointer hover:scale-125'
          onClick={() => {
            audio.play();
          }}
        />
        <HiOutlinePause
          className='text-base text-red-800 cursor-pointer hover:scale-125'
          onClick={() => {
            audio.pause();
          }}
        />
      </div>
      <div className='flex items-center gap-2'>
        <span className='truncate max-w-[60ch]'>{file.name}</span>
        <MdDeleteOutline
          className='text-xl text-red-600 rounded-lg cursor-pointer hover:bg-red-100 hover:scale-125 '
          onClick={() => handleDelete(file)}
        />
      </div>
    </li>
  );
};

const VoiceMessages = ({ messages, setAudioFiles, closeModal }) => {
  const handleDrop = file => {
    const fileCopy = file[0];
    const src = URL.createObjectURL(fileCopy);
    fileCopy.src = src;
    setAudioFiles(prev => [...prev, fileCopy]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: true,
  });

  const handleDelete = file => {
    URL.revokeObjectURL(file.src);
    setAudioFiles(prev => prev.filter(audio => audio.name !== file.name));
  };

  return (
    <div className=' box-border fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans  '>
      <div className=' min-w-[50%] first-letter:  h-[50vh] flex flex-col  p-4 mx-auto bg-white rounded-lg shadow-lg'>
        <div className='flex items-center justify-between'>
          <h2>Voice Messages</h2>
          <IoMdCloseCircle
            onClick={() => closeModal()}
            className='text-xl text-red-500 '
          />
        </div>
        <div className='flex flex-col h-full py-3'>
          <div
            {...getRootProps()}
            className={`box-border flex items-center justify-center h-28 rounded text-gray-700  border-dashed border-[1px] ${
              isDragActive ? 'bg-blue-200' : ''
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the audio file here</p>
            ) : (
              <p>Drag and audio file here or click to browse</p>
            )}
          </div>
          <div className='flex-grow mt-5'>
            {messages.length > 0 ? (
              <ul className='px-5 space-y-3'>
                {messages.map(file => (
                  <AudioListItem
                    file={file}
                    handleDelete={handleDelete}
                    key={file.name}
                  />
                ))}
              </ul>
            ) : (
              <p className='flex items-center justify-center flex-grow h-full text-lg text-gray-600'>
                No files uploaded
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessages;
