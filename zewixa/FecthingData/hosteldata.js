// api/hostelService.js
import axios from 'axios';

const BASE = 'https://zewixa-backend.onrender.com/api';

export async function FetchHostels() {
  const res = await axios.get(`${BASE}/hostels`);
  return res.data;  // an array of hostel objects
}
