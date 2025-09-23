import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase_app from "../01_firebase/config_firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetch_users, userRegister } from "../Redux/Authantication/auth.action";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import "./login.css";
//import Navbar from "../Components/Navbar";

function parsePhone(input) {
  const phoneNumber = parsePhoneNumberFromString(input, 'US');
  if (!phoneNumber) return null;

  return {
    countryCode: phoneNumber.countryCallingCode,
    nationalNumber: phoneNumber.nationalNumber
  };
}

const auth = getAuth(firebase_app);

const state = {
  number: "",
  otp: "",
  user_name: "",
  password: "",
  verify: false,
  otpVerify: false,
};

export const Register = () => {
  const [check, setCheck] = useState(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let exist = false;
  const { number, otp, verify, otpVerify, user_name, password } = check;

  // store value and getting user to check if the number is exist or not
  const { user, isLoading } = useSelector((store) => {
    return {
      user: store.LoginReducer.user,
      isLoading: store.LoginReducer.isLoading,
    };
  });

  //  check if the user is exist of not
  for (let i = 0; i <= user.length - 1; i++) {
    if (user[i].number === number) {
      exist = true;
      break;
    }
  }

  //  capture
  const handleRegisterUser = async () => {
    try {
      // Check if phone was verified with Firebase
      const firebaseUID = localStorage.getItem('lastVerifiedUID');
      if (!firebaseUID) {
        document.querySelector("#loginMesageError").innerHTML = "Phone verification required";
        return;
      }

      // Validate required fields
      if (!user_name || !password) {
        document.querySelector("#loginMesageError").innerHTML = "Please fill in all required fields";
        return;
      }

      document.querySelector("#loginMesageError").innerHTML = "";
      document.querySelector("#loginMesageSuccess").innerHTML = "Processing registration...";

      let newObj = {
        number,
        user_name,
        password,
        email: "",
        dob: "",
        gender: "",
        marital_status: null,
        firebaseUID
      };
      
  const success = await dispatch(userRegister(newObj));
      
      if (success) {
        document.querySelector("#loginMesageSuccess").innerHTML = "Registration successful! Redirecting...";
        localStorage.removeItem('lastVerifiedUID');
        // Add user to localStorage for login compatibility
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(newObj);
        localStorage.setItem('users', JSON.stringify(users));
        // Short delay before redirect to show success message
        setTimeout(() => {
          setCheck(state);
          navigate("/login");
        }, 1500);
      } else {
        document.querySelector("#loginMesageError").innerHTML = "Registration failed. Please try again.";
        document.querySelector("#loginMesageSuccess").innerHTML = "";
      }
    } catch (error) {
      console.error("Registration error:", error);
      document.querySelector("#loginMesageError").innerHTML = "An error occurred during registration.";
      document.querySelector("#loginMesageSuccess").innerHTML = "";
    }
  };

  // Always (re)initialize RecaptchaVerifier after DOM mounts and before phone verification
  useEffect(() => {
    if (document.getElementById("recaptcha-container")) {
      if (window.recaptchaVerifier) {
        // Reset if already exists
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
    }
  }, [verify]);

  //   Verify button
  function handleVerifyNumber() {
    document.querySelector("#nextButton").innerText = "Please wait...";
    document.querySelector("#loginMesageError").innerHTML = "";
    document.querySelector("#loginMesageSuccess").innerHTML = "";
    const phoneNumber = parsePhone(check.number);
    const appVerifier = window.recaptchaVerifier;
    // Validate phone number format (E.164: +12345678901)
    if (!phoneNumber || !/^\d{10,}$/.test(phoneNumber.nationalNumber)) {
      document.querySelector("#loginMesageError").innerHTML = "Mobile Number is Invalid! Please use format +12223334444.";
      document.querySelector("#nextButton").innerText = "Next";
      return;
    }
    if (exist) {
      document.querySelector("#loginMesageError").innerHTML = "User Already exists";
      document.querySelector("#loginMesageSuccess").innerHTML = "";
      document.querySelector("#nextButton").innerText = "Next";
      return;
    }
    signInWithPhoneNumber(auth, `+${phoneNumber.countryCode}${phoneNumber.nationalNumber}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setCheck({ ...check, verify: true });
        document.querySelector("#loginMesageSuccess").innerHTML = `Otp Sent To ${check.number}!`;
        document.querySelector("#loginMesageError").innerHTML = "";
        document.querySelector("#nextButton").style.display = "none";
      })
      .catch((error) => {
        document.querySelector("#loginMesageError").innerHTML = `Failed to send OTP: ${error.message}`;
        document.querySelector("#loginMesageSuccess").innerHTML = "";
        document.querySelector("#nextButton").innerText = "Next";
      });
  }

  // if the code is verifyed
  async function verifyCode() {
    try {
      const result = await window.confirmationResult.confirm(otp);
      if (result.user) {
        // Firebase auth successful
        setCheck({ ...check, otpVerify: true });
        document.querySelector(
          "#loginMesageSuccess"
        ).innerHTML = `Verified Successfully`;
        document.querySelector("#loginMesageError").innerHTML = "";
        document.querySelector("#loginNumber").style.display = "none";
        document.querySelector("#loginOtp").style.display = "none";
        
        // Store Firebase UID for later verification
        localStorage.setItem('lastVerifiedUID', result.user.uid);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      document.querySelector("#loginMesageSuccess").innerHTML = ``;
      document.querySelector("#loginMesageError").innerHTML = "Invalid OTP";
    }
  }

  const handleChangeMobile = (e) => {
    const { name, value } = e.target;
    console.log("Updating:", name, value);

    setCheck((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetch_users());
  }, []);

  return (
    <>
      <div className="mainLogin">
        <div id="recaptcha-container"></div>
        <div className="loginBx">
        <div className="logoImgdivReg"><img className="imglogoReg" src="https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg':'https://i.postimg.cc/fRx4D7QH/logo3.png" alt="" /></div>

          <div className="loginHead">
          <hr /><hr /><hr />

            <h1>Register</h1>
          </div>
          
          <div className="loginInputB" id="loginNumber">
            <label htmlFor="">Enter Your Number</label>
            <span>
              <input
                type="tel"
                readOnly={verify}
                name="number"
                value={check.number}
                onChange={(e) => handleChangeMobile(e)}
                placeholder="Number"
              />
              <button
                disabled={verify}
                onClick={(handleVerifyNumber)}
                id="nextButton"
              >
                Next
              </button>
            </span>
          </div>
          {verify ? (
            <div className="loginInputB" id="loginOtp">
              <label htmlFor="">Enter OTP</label>
              <span>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => handleChangeMobile(e)}
                />
                <button onClick={verifyCode}>Next</button>
              </span>
            </div>
          ) : (
            ""
          )}

          {otpVerify ? (
            <>
              <div className="loginInputB">
                <label htmlFor="">Enter Your Full name</label>
                <span>
                  <input
                    type="text"
                    name="user_name"
                    value={user_name}
                    onChange={(e) => handleChangeMobile(e)}
                  />
                </span>
              </div>
              <div className="loginInputB">
                <label htmlFor="">Your Password</label>
                <span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleChangeMobile(e)}
                  />
                </span>
              </div>
              <div className="loginInputB">
                <button 
                  onClick={handleRegisterUser} 
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait..." : "Continue"}
                </button>
              </div>
            </>
          ) : (
            ""
          )}

          {isLoading ? <h1>Please wait...</h1> : ""}

          <div className="loginTerms">
          <div className="inpChecbx"><input className="inp" type="checkbox" /> <h2>Keep me signed in</h2></div>
            <p>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</p>
            <h6>By signing in, I agree to the Expedia <span> Terms and Conditions</span>, <span>Privacy Statement</span> and <span>Expedia Rewards Terms and Conditions</span>.</h6>
          </div>
          <br />
          <h3 id="loginMesageError"></h3>
          <h3 id="loginMesageSuccess"></h3>
        </div>
      </div>
    </>
  );
};