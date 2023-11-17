import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards';
import './style.css';

function App() {
  const [locationId, setLocationId] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [residents, setResidents] = useState([]);
  
  

  useEffect(() => {
    fetchLocation(1)
  }, [locationId]);


  useEffect(() => {
    if (locationData) {
      fetchResidents(locationData.residents.slice(0, 5));
    }
  }, [locationData]);

  const fetchLocation = async (id) => {
    let stylesId = 1
    try {
      if(!id) {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${locationId}`);
      setLocationData(response.data);
      stylesId = locationId
    }

      else {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
      setLocationData(response.data)
      stylesId = id
      };
      console.log('locationData');
      // Change background color based on location ID
      changeBackgroundColor(stylesId);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const fetchResidents = async (residentUrls) => {
    try {
      const residentsPromises = residentUrls.map(url => axios.get(url));
      const residentsData = await Promise.all(residentsPromises);
  
      const residentsWithOrigin = await Promise.all(residentsData.map(async resident => {
        const originResponse = await axios.get(resident.data.origin.url);
        const residentWithOrigin = {
          ...resident.data,
          originName: originResponse.data.name
        };
        return residentWithOrigin;
      }));
  
      const sortedResidents = residentsWithOrigin.sort((a, b) => a.name.localeCompare(b.name));
      setResidents(sortedResidents);
    } catch (error) {
      console.error('Error fetching residents data:', error);
    }
  };

  const changeBackgroundColor = (id) => {
    const body = document.querySelector('body');
    if (id < 50) body.style.backgroundColor = 'green';
    else if (id >= 50 && id < 80) body.style.backgroundColor = 'blue';
    else body.style.backgroundColor = 'red';
  };


  return (
    <div className="App">
      <form onSubmit={(e) => { e.preventDefault(); fetchLocation(); }}>
    {/* <label htmlFor="locationId">Enter Location ID:</label> */}
    <input type="text" placeholder='Location Id' id="locationId" name="locationId" value={locationId} onChange={(e) => setLocationId(e.target.value)} />
    <button type="submit" style={{ borderRadius: '20px' }}><i className="fas fa-search"></i></button>
  </form>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

      {locationData && (
        <div className="location-info">
          {/* <h2>Location Information</h2>
          <p>ID: {locationData.id}</p>
          <p>Name: {locationData.name}</p> */}
          {/* Add more location details as needed */}
        </div>
      )}

      <div className="residents">
        
        <Cards residents={residents}/>   
      </div>

    
    </div>
  );
}

export default App;

