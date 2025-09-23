import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import { apiService } from "../../services/apiService";
import { handleApiError } from "../../utils/errorHandler";
import "./AdminDashboard.Module.css";


export const AdminDashboard = () => {
  const [flight, setFlight] = useState(0);
  const [hotel, setHotel] = useState(0);
  const [users, setUsers] = useState(0);
  const [giftCard, setGiftCard] = useState(0);
  const [things, setThings] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all dashboard data concurrently
      const [flightData, hotelData, userData, giftCardData, thingsData] = await Promise.allSettled([
        apiService.get(API_ENDPOINTS.FLIGHTS),
        apiService.get(API_ENDPOINTS.HOTELS),
        apiService.get(API_ENDPOINTS.USERS),
        apiService.get(API_ENDPOINTS.GIFTCARDS),
        apiService.get(API_ENDPOINTS.THINGS_TODO),
      ]);

      // Set the counts for successfully fetched data
      if (flightData.status === 'fulfilled') {
        setFlight(flightData.value.length);
      }
      if (hotelData.status === 'fulfilled') {
        setHotel(hotelData.value.length);
      }
      if (userData.status === 'fulfilled') {
        setUsers(userData.value.length);
      }
      if (giftCardData.status === 'fulfilled') {
        setGiftCard(giftCardData.value.length);
      }
      if (thingsData.status === 'fulfilled') {
        setThings(thingsData.value.length);
      }

      // Check for any failures and log them
      const failedRequests = [flightData, hotelData, userData, giftCardData, thingsData].filter(
        result => result.status === 'rejected'
      );
      
      if (failedRequests.length > 0) {
        console.warn('Some dashboard data failed to load:', failedRequests);
      }

    } catch (error) {
      const errorDetails = handleApiError(error, 'Dashboard Data');
      setError(errorDetails);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <div className="mainAdminLandingpage">
        <div className="adminSideBr">
          <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>
        </div>
        <div className="mainBox">
          <div className="mainBoxHead">
            <h1>Admin Dashboard</h1>
            {loading && <p>Loading dashboard data...</p>}
            {error && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', margin: '10px 0' }}>
                Error loading dashboard: {error.message}
              </div>
            )}
            <hr />
            <hr />
            <hr />
          </div>
          <div className="DataBoxes">
            {/*  */}
            <div className="dataBx">
              <h1>Total Hotel</h1>
              {<h1>{hotel}</h1>}
              <Link to="/admin/hotels">View</Link>
            </div>
            <div className="dataBx">
              <h1>Total Flights</h1>
              {<h1>{flight}</h1>}
              <Link to="/admin/flights">View</Link>
            </div>
            <div className="dataBx">
              <h1>Total Users</h1>
              {<h1>{users}</h1>}
              <Link to="/admin">View</Link>
            </div>
            <div className="dataBx">
              <h1>Giftcards</h1>
              {<h1>{giftCard}</h1>}
              <Link to="/admin/giftcards">View</Link>
            </div>
            <div className="dataBx">
              <h1>Pakages Available</h1>
              {<h1>{things}</h1>}
              <Link to="/setThings">View</Link>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};
