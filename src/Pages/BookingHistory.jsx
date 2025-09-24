import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Divider, Container, SimpleGrid, Badge, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getCurrentUser, redirectIfNotLoggedIn } from '../utils/auth';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (redirectIfNotLoggedIn(navigate)) {
      toast({
        title: 'Authentication required',
        description: 'Please login to view your bookings',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    const currentUser = getCurrentUser();
    const userId = currentUser.id;
    
    // Fetch bookings for the logged-in user
    axios.get(`http://localhost:8080/bookings?userId=${userId}`)
      .then(response => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        toast({
          title: 'Error',
          description: 'Failed to load booking history',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      });
  }, [navigate, toast]);

  const cancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      axios.delete(`http://localhost:8080/bookings/${id}`)
        .then(() => {
          setBookings(bookings.filter(booking => booking.id !== id));
          toast({
            title: 'Booking cancelled',
            description: 'Your booking has been cancelled successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: 'Error',
            description: 'Could not cancel booking',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Box textAlign="center" py={10}>
          <Text>Loading your bookings...</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={6}>My Bookings</Heading>
      
      {bookings.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl">You don't have any bookings yet.</Text>
          <Button mt={4} colorScheme="blue" onClick={() => navigate('/')}>
            Explore and Book
          </Button>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {bookings.map(booking => (
            <Box 
              key={booking.id}
              p={5} 
              shadow="md" 
              borderWidth="1px" 
              borderRadius="lg"
              position="relative"
            >
              {/* Show flight or hotel badge */}
              <Badge 
                colorScheme={booking.airlineName ? "blue" : "green"} 
                position="absolute" 
                top={2} 
                right={2}
              >
                {booking.airlineName ? "Flight" : "Hotel"}
              </Badge>

              <Heading fontSize="xl" mb={4}>
                {booking.airlineName 
                  ? `${booking.departureCity} to ${booking.arrivalCity}` 
                  : booking.name || "Hotel Booking"}
              </Heading>
              
              <Text>
                <strong>Booked on:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
              </Text>
              
              {booking.airlineName && (
                <>
                  <Text><strong>Airline:</strong> {booking.airlineName}</Text>
                  <Text><strong>Flight:</strong> {booking.flightNumber}</Text>
                  <Text>
                    <strong>Departure:</strong> {new Date(booking.departureTime).toLocaleString()}
                  </Text>
                </>
              )}
              
              {booking.city && (
                <>
                  <Text><strong>Location:</strong> {booking.city}</Text>
                  {booking.address && <Text><strong>Address:</strong> {booking.address}</Text>}
                </>
              )}
              
              <Text color="green.500" fontWeight="bold" mt={2}>
                ₹{booking.price ? booking.price.toLocaleString() : 'N/A'}
              </Text>
              
              <Divider my={4} />
              
              <Button 
                colorScheme="red" 
                size="sm"
                onClick={() => cancelBooking(booking.id)}
              >
                Cancel Booking
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default BookingHistory;