import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This component provides a direct way to access admin features for demonstration purposes
const AdminAccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set up demo admin user in localStorage
    const adminUser = {
      id: "admin123",
      user_name: "DemoAdmin", 
      number: "+12223334444",
      password: "123456",
      isAdmin: true
    };

    // Save admin user in both localStorage keys
    localStorage.setItem('activeUser', JSON.stringify(adminUser));
    localStorage.setItem('MkuserData', JSON.stringify(adminUser));
    localStorage.setItem('MkisAuth', JSON.stringify(true));
    
    console.log('Demo admin access granted');
    
    // Navigate to admin dashboard
    setTimeout(() => {
      navigate('/admin');
    }, 1000);
  }, [navigate]);

  return (
    <div style={{ 
      padding: '40px 20px', 
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginTop: '50px'
    }}>
      <h1 style={{ 
        fontSize: '28px', 
        marginBottom: '20px',
        color: '#512DA8'
      }}>Admin Demo Access</h1>
      
      <div style={{
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#f0f8ff',
        border: '1px solid #b3e0ff',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <p style={{ marginBottom: '10px' }}>Setting up demo admin credentials...</p>
        <p style={{ marginBottom: '10px' }}>Granting admin privileges...</p>
        <p>You will be redirected to the admin dashboard in a moment.</p>
      </div>
      
      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeeba',
        borderRadius: '5px',
        color: '#856404'
      }}>
        <p><strong>Note:</strong> This is a demonstration feature that automatically logs you in as an admin.</p>
        <p>In a real application, proper authentication would be required.</p>
      </div>
    </div>
  );
};

export default AdminAccess;