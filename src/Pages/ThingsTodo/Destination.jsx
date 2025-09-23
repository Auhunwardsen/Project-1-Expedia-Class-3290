import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DestinationCard from './DestinationCard';
import { API_ENDPOINTS } from '../../config/api';
import { apiService } from '../../services/apiService';
import { handleApiError } from '../../utils/errorHandler';

import {Grid,Box,Center} from '@chakra-ui/react';


export const Destination = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
 
  let place = searchParams.get("place");
  
  useEffect(() => {
    const fetchDestinations = async () => {
      if (!place) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await apiService.get(`${API_ENDPOINTS.EXTERNAL_THINGS_TODO}?place=${place}`);
        setPlaces(data);
        console.log(data);
      } catch (error) {
        const errorDetails = handleApiError(error, 'Fetch Destinations');
        setError(errorDetails);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [place]);
 
 
  return (

    
      <>
      
        <Center>
      
      <Grid templateColumns={{ base: 'repeat(1, 1fr)',  md: 'repeat(2, 1fr)',lg:'repeat(3, 1fr)'} } columnGap={20} rowGap={20} mt={"60px"}>
       {places.map((el)=>(<DestinationCard key={el.id} image={el.image} title={el.title} price={el.price} rating={+el.rating ? +el.rating : 0} place={el.place}/>
        ))}
        </Grid>
    
  </Center>
   
      
      
      </>
      
  )
}
