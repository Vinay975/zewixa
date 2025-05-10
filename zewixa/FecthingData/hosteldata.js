import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchingHostelData = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        // Replace 'your-api-url' with the actual API URL you're calling
        const response = await axios.get('http://192.168.30.213:5000/hostels'); // Ensure this is correct
        
        console.log('Fetched Hostel Data:', response.data); // Log the fetched data

        // Pass the data to the parent component via the onDataFetched prop
        onDataFetched(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchHostels();
  }, []);

  return null; // Don't render anything here, just fetch data
};

export default FetchingHostelData;
