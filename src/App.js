import React, { useState, useEffect } from 'react';
import './App.css';
import { SECTORS } from './utils/contant';
// import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [data, setData] = useState([]);
  const [nameError, setNameError] = useState('');
  const [sectorError, setSectorError] = useState('');
  const [agreedError, setAgreedError] = useState('');

  useEffect(() => {
    // fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3001/data');
  //     setData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleNameChange = (value) => {
    setName(value);
    setNameError('');
  };

  const handleSectorChange = (value) => {
    setSector(value);
    setSectorError('');
  };

  const handleAgreedChange = () => {
    setAgreed(!agreed);
    setAgreedError('');
  };

  const handleSubmit = async () => {
    try {
      setNameError('');
      setSectorError('');
      setAgreedError('');

      let isValid = true;

      if (!name) {
        setNameError('Name is required');
        isValid = false;
      }

      if (!sector) {
        setSectorError('Sector is required');
        isValid = false;
      }

      if (!agreed) {
        setAgreedError('Agree to terms is required');
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // await axios.post('http://localhost:3001/data', { name, sector, agreed });

      // fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 border rounded shadow-lg bg-white w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl font-bold text-center mb-8">Form</h1>
        <ul className="mb-4">
          {data.map((item) => (
            <li key={item._id} className="mb-2">
              {item.name}, Sector: {item.sector}, Agreed: {item.agreed ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mb-4">
          Please enter your name and pick the sector you are currently involved in.
        </h2>
        <label className="block mb-4">
          <span className="text-gray-700">
            Name <span className="text-red-500">*</span>:
          </span>
          <input
            type="text"
            className={`border p-2 w-full rounded-md ${nameError && 'border-red-500'}`}
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">
            Sector <span className="text-red-500">*</span>:
          </span>
          <select
            className={`border p-2 w-full rounded-md ${sectorError && 'border-red-500'}`}
            value={sector}
            onChange={(e) => handleSectorChange(e.target.value)}
          >
            <option value="" disabled>
              Select a sector
            </option>
            {SECTORS.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
          {sectorError && <p className="text-red-500">{sectorError}</p>}
        </label>
        <label className="block mb-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={handleAgreedChange}
            className={`mr-2 ${agreedError && 'border-red-500'}`}
          />{' '}
          <span className={`text-gray-700 ${agreedError && 'text-red-500'}`}>
            Agree to terms <span className="text-red-500">*</span>
          </span>
          {agreedError && <p className="text-red-500">{agreedError}</p>}
        </label>
        <button
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-700 transition duration-300"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default App;
