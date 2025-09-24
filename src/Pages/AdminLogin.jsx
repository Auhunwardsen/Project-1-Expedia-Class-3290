import React, { useState } from 'react';
import axios from 'axios';
import { Box, Container, Input, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Check if fields are filled
      if (!phone || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      // Get users
      const response = await axios.get('http://localhost:8080/users');
      const users = response.data;
      
      // Find admin user
      const admin = users.find(user => 
        user.number === phone && 
        user.password === password && 
        user.isAdmin === true
      );
      
      if (admin) {
        // Save admin to localStorage
        localStorage.setItem('activeUser', JSON.stringify(admin));
        // Redirect to admin page
        navigate('/admin');
      } else {
        // Not an admin or wrong credentials
        setError('Invalid admin credentials');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.error(err);
    }
    
    setLoading(false);
  };
  
  return (
    <Container centerContent maxW="md" mt={10}>
      <Box p={8} width="100%" borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading mb={6} textAlign="center">Admin Login</Heading>
        
        {error && (
          <Text color="red.500" mb={4} textAlign="center">
            {error}
          </Text>
        )}
        
        <Input 
          placeholder="Phone Number" 
          mb={3} 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
        
        <Input 
          placeholder="Password" 
          mb={6} 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <Button 
          colorScheme="blue" 
          width="100%" 
          onClick={handleLogin} 
          isLoading={loading}
        >
          Login as Admin
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLogin;
