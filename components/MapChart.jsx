import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';

const MapChart = ({ markers, isLoading }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });
  const [markersData, setMarkersData] = useState();
  const [infoWindowData, setInfoWindowData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const center = useMemo(() => ({ lat: 5.614818, lng: -0.205874 }), []);

  useEffect(() => {
    setMarkersData(markers);
  }, [markers, isLoading]);

  return (
    <div className='h-[500px] w-full'>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName='h-full w-full'
          zoom={8}
          center={center}
        >
          {markersData?.map((item, index) => (
            <MarkerF
              position={{
                lat: item.capture.latitude,
                lng: item.capture.longitude,
              }}
              title={item?.region}
              key={item.region}
              onClick={() => {
                setInfoWindowData({ id: index, item });
                setIsOpen(true);
              }}
            >
              {isOpen && infoWindowData?.id === index && (
                <InfoWindowF
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <div className='grid grid-cols-2 gap-2 p-2'>
                    <h2 className='col-span-2 font-medium'>{item.region}</h2>
                    <p>Male:</p>{' '}
                    <h3 className='font-medium text-right'>
                      {infoWindowData?.item.male}
                    </h3>
                    <p>Female:</p>
                    <h3 className='font-medium text-right'>
                      {infoWindowData?.item.female}
                    </h3>
                    <p>Total:</p>
                    <h3 className='font-medium text-right'>
                      {infoWindowData?.item.male + infoWindowData?.item.female}
                    </h3>
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapChart;
