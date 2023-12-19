import Image from 'next/image';
import React from 'react';
import { WiDaySunnyOvercast, WiDayCloudy, WiDayFog } from 'react-icons/wi';

const WeatherWidget = ({ location = 'Accra, Ghana', weatherData }) => {
  return (
    <div className='flex flex-col items-center justify-around flex-grow '>
      <div className='flex flex-col items-center'>
        <h2 className='text-lg antialiased font-medium text-white'>
          {location}
        </h2>
        <p className='antialiased font-medium text-white opacity-80 '>
          {new Date().toUTCString()}
        </p>
      </div>
      <div className='flex items-center justify-around w-[70%]'>
        <div className='flex flex-col items-center space-x-2'>
          <p className='text-lg text-white'>
            {weatherData?.humidity?.value || 0}
          </p>
          <p className='text-white opacity-60'> Humidity</p>
        </div>
        <Image
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt='weather'
          width={150}
          height={100}
        />
        <div className='flex flex-col items-center space-x-2'>
          <p className='text-lg text-white '>
            {weatherData?.windSpeed?.value || 0}
            <span className='ml-1 text-xs'>m/s</span>
          </p>
          <p className='text-white opacity-60'> Wind Speed</p>
        </div>
      </div>
      <div className='flex items-center justify-between w-full px-10'>
        <p className='space-x-2'>
          <span className='text-white opacity-60'> Min:</span>
          <span className='text-lg text-white'>
            {parseInt(weatherData?.minTemperature?.value)}°c
          </span>
        </p>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-4xl font-semibold text-white'>
            {parseInt(weatherData?.averageTemperature?.value)}°c
          </p>
          <p className='text-white opacity-60'>Average temperature</p>
        </div>
        <p className='space-x-2'>
          <span className='text-white opacity-60'> Max:</span>
          <span className='text-lg text-white'>
            {parseInt(weatherData?.maxTemperature?.value)}°c
          </span>
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;
