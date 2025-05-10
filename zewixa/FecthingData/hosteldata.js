import React, { useEffect } from 'react';
import axios from 'axios';

const FetchingHostelData = () => {
  useEffect(() => {
    axios.get('http://192.168.30.213:5000/hostels')  // your IPv4 address
      .then(response => {
        console.log('Fetched Hostels:', response.data);
      })
      .catch(error => {
        console.error('Error fetching hostel data:', error);
      });
  }, []);

  return null; // or return a <View /> if you're using React Native
};

export default FetchingHostelData;
