import "./Admin.Module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addHotel } from "../../Redux/AdminHotel/action";
import { useDispatch } from "react-redux";
import { validateForm, hotelValidationRules } from "../../utils/validation";
import { handleApiError } from "../../utils/errorHandler";

let initialState = {
  image: "",
  name: "",
  place: "",
  price: "",
  description: "",
  additional: "",
};
export const AdminStay = () => {
  const [hotel, setHotel] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotel((prev) => {
      return { ...prev, [name]: name === "price" ? +value : value };
    });

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Clear submit messages
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const { errors: validationErrors, isValid } = validateForm(hotel, hotelValidationRules);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await dispatch(addHotel(hotel));
      setHotel(initialState);
      setErrors({});
      setSubmitSuccess(true);
      console.log('Hotel added successfully:', hotel);
    } catch (error) {
      const errorDetails = handleApiError(error, 'Add Hotel');
      setSubmitError(errorDetails.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="adminFlightMai">
        <div className="adminSideBr">
        <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>

        </div>
        <div className="adminFlightBox">
          <div className="adminHead">
            <h2>Admin Panel for Hotel</h2>
            {submitSuccess && (
              <div style={{ color: 'green', marginTop: '10px', padding: '10px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px' }}>
                Hotel added successfully!
              </div>
            )}
            {submitError && (
              <div style={{ color: 'red', marginTop: '10px', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
                Error: {submitError}
              </div>
            )}
          </div>

          <div className="adminFlightInputs">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="adminFlightInputBx">
                <label htmlFor="">Hotel Image</label>
                <input
                  type="url"
                  name="image"
                  value={hotel.image}
                  onChange={(e) => handleChange(e)}
                />
                {errors.image && <span style={{ color: 'red', fontSize: '12px' }}>{errors.image}</span>}
              </div>

              <div className="adminFlightInputBx">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={hotel.name}
                  onChange={(e) => handleChange(e)}
                />
                {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
              </div>

              <div className="adminFlightInputBx">
                <label htmlFor="">Place</label>
                <input
                  type="text"
                  name="place"
                  value={hotel.place}
                  onChange={(e) => handleChange(e)}
                />
                {errors.place && <span style={{ color: 'red', fontSize: '12px' }}>{errors.place}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  name="price"
                  value={hotel.price}
                  onChange={(e) => handleChange(e)}
                />
                {errors.price && <span style={{ color: 'red', fontSize: '12px' }}>{errors.price}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  value={hotel.description}
                  onChange={(e) => handleChange(e)}
                />
                {errors.description && <span style={{ color: 'red', fontSize: '12px' }}>{errors.description}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Additional</label>
                <input
                  type="text"
                  name="additional"
                  value={hotel.additional}
                  onChange={(e) => handleChange(e)}
                />
                {errors.additional && <span style={{ color: 'red', fontSize: '12px' }}>{errors.additional}</span>}
              </div>

              <div className="adminFlightInputBx">
                <span></span>
                <button type="submit" disabled={loading}>
                  {loading ? 'Adding Hotel...' : 'Add Hotel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

