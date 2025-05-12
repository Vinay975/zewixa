// api/hostelService.js
import axios from 'axios';

const BASE = 'http://192.168.30.213:5000/api';

export async function FetchHostels() {
  const res = await axios.get(`${BASE}/hostels`);
  return res.data;  // an array of hostel objects
}
