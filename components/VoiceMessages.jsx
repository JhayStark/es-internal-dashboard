import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { useDropzone } from 'react-dropzone';
import { FaPlay } from 'react-icons/fa';
import { HiOutlinePause } from 'react-icons/hi';

const VoiceMessages = ({ messages, setAudioFiles, closeModal }) => {
  const hanleDrop = file => {
    const fileCopy = file[0];
    const src = URL.createObjectURL(fileCopy);
    fileCopy.src = src;
    setAudioFiles(prev => [...prev, fileCopy]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: hanleDrop,
    multiple: true,
  });

  return (
    <div className=' box-border fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans  '>
      <div className=' min-w-[40%] h-[50vh] flex flex-col  p-4 mx-auto bg-white rounded-lg shadow-lg'>
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
              <p>Drop the file here</p>
            ) : (
              <p>Drag and drop file here or click to browse</p>
            )}
          </div>
          <div className='flex-grow mt-5'>
            {messages.length > 0 ? (
              <ul className='px-5 space-y-3'>
                {messages.map(file => {
                  const audio = new Audio(file.src);

                  return (
                    <li
                      key={file.name}
                      className='flex items-center justify-between gap-2 text-sm'
                    >
                      <div className='flex items-center gap-2'>
                        <FaPlay
                          className='text-blue-500 cursor-pointer hover:scale-125'
                          onClick={() => {
                            audio.play();
                          }}
                        />
                        <HiOutlinePause
                          className='text-base text-red-600 cursor-pointer hover:scale-125'
                          onClick={() => {
                            audio.pause();
                          }}
                        />
                      </div>
                      <span className='truncate max-w-[60ch]'>{file.name}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No file uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessages;
