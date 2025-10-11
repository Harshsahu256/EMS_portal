// import React from 'react';

// function Form() {
//   const mainCardStyle = {
//     borderRadius: '1.5rem',
//     backgroundColor: '#f1f5f9',
//   };

//   const signInButtonStyle = {
//     backgroundColor: '#0d286e',
//     border: 'none',
//     borderRadius: '10px',
//     paddingLeft: '4rem',
//     paddingRight: '4rem',
//   };

//   const socialButtonStyle = {
//     borderRadius: '10px',
//     backgroundColor: '#fff',
//     position: 'relative',
//   };

//   return (

//     <div className="w-100 mb-3" style={{ maxWidth: '420px', marginLeft: '250px', marginTop:"10px" }}>

//       <div className="card shadow-lg" style={mainCardStyle}>
//         <div className="card-body p-4 p-md-5">
//           <h2
//             className="fw-bold mb-2"
//             style={{ color: '#c93434', whiteSpace: 'nowrap' }}
//           >
//             Welcome Back 👋
//           </h2>
//           <p className="text-secondary mb-4">
//             I am happy to see you again. You can continue where you left off by
//             logging in
//           </p>

//           <form>
//             <div className="form-outline mb-3">
//               <input
//                 type="email"

//                 className="form-control form-control-lg rounded-pill border-dark"
//               />
//             </div>

//             <div className="form-outline mb-4">
//               <input
//                 type="password"

//                 className="form-control form-control-lg rounded-pill border-dark"
//               />
//             </div>

//             <div className="text-center">
//               <button
//                 className="btn btn-primary shadow-sm text-white py-2"
//                 style={signInButtonStyle}
//                 type="submit"
//               >
//                 Sign In
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <div className="text-center mt-3">
//         {/* Google Button */}
//         <div className="d-grid gap-2 col-11 mx-auto mb-2">
//           <button
//             className="btn btn-lg shadow border fw-semibold"
//             style={socialButtonStyle}
//             type="button"
//           >
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
//               alt="Google icon"
//               style={{
//                 position: 'absolute',
//                 left: '20px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 height: '22px',
//               }}
//             />
//             Sign in with Google
//           </button>
//         </div>

//         {/* Facebook Button */}
//         <div className="d-grid gap-2 col-11 mx-auto">
//           <button
//             className="btn btn-lg shadow border"
//             style={socialButtonStyle}
//             type="button"
//           >
//             <i
//               className="bi bi-facebook"
//               style={{
//                 position: 'absolute',
//                 left: '20px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 color: '#1877F2',
//               }}
//             ></i>
//             <span style={{ color: '#1877F2', fontWeight: '600' }}>
//               Sign in with Facebook
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Form;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- बदलाव यहाँ है ---
// 'loginUser' की जगह 'userLogin' इम्पोर्ट करें और सही फ़ाइल का पाथ दें
import { userLogin } from "../../Services/authApi"; // सुनिश्चित करें कि यह पाथ सही है

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     // --- बदलाव यहाँ है ---
  //     // अब हम आपके 'userLogin' फंक्शन को कॉल कर रहे हैं
  //     const data = await userLogin(email, password);

  //     console.log('Login Successful:', data);
  //     alert('Login successful!');
  //     navigate('/');

  //   } catch (err) {
  //     // आपके फंक्शन में पहले से ही अच्छा एरर हैंडलिंग है, इसलिए यह काम करेगा
  //     setError(err.toString().replace('Error: ', ''));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // --- JSX में कोई बदलाव नहीं ---
  // बाकी का पूरा JSX कोड वैसा का वैसा ही रहेगा

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await userLogin(email, password);

      // ✅ JWT token को localStorage में save करें
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        throw new Error("Token not found in response");
      }

      console.log("Login Successful:", data);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.toString().replace("Error: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const mainCardStyle = {
    borderRadius: "1rem",
    border: "none",
  };

  const signInButtonStyle = {
    backgroundColor: "#0d286e",
    fontWeight: "600",
  };

  const facebookButtonStyle = {
    backgroundColor: "#e7f0ff",
    color: "#1877F2",
    fontWeight: "600",
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-lg" style={mainCardStyle}>
            <div className="card-body p-4 p-md-5 text-center">
              <h2 className="fw-bold mb-2" style={{ color: "#c93434" }}>
                Welcome To EMS 👋
              </h2>
              <p className="text-muted mb-4">
                Login to continue with Express Media Services.
              </p>

              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="text-end mb-4">
                  <a href="#!" className="text-muted small">
                    Forgot password?
                  </a>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-lg text-white"
                    style={signInButtonStyle}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </div>
              </form>

              {/* <div className="d-flex align-items-center my-4">
                <hr className="flex-grow-1" />
                <span className="px-3 text-muted small">OR</span>
                <hr className="flex-grow-1" />
              </div>
              
              <div className="d-grid gap-3">
                <button
                  className="btn btn-light btn-lg border d-flex align-items-center justify-content-center gap-2"
                  type="button"
                >
                  <i className="bi bi-google text-danger"></i>
                  <span>Sign in with Google</span>
                </button>
                
                <button
                  className="btn btn-lg d-flex align-items-center justify-content-center gap-2"
                  style={facebookButtonStyle}
                  type="button"
                >
                  <i className="bi bi-facebook"></i>
                  <span>Sign in with Facebook</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
