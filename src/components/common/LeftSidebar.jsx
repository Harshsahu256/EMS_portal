
// import React, { useRef, useState } from "react";
// import ReactDOM from "react-dom";
// import { NavLink } from "react-router-dom";
// import logo from '../../assets/logo.png';
// import playStoreImage from '../../assets/playstore.png';
// import appStoreImage from '../../assets/appstore.png';
// import { FiHome, FiFlag, FiFilm, FiStar, FiAward, FiZap, FiBriefcase, FiUser, FiFolder } from "react-icons/fi";
// import { FaLandmark, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

// const capitalizeFirstLetter = (string) => string?.charAt(0).toUpperCase() + string?.slice(1);

// const NavItem = ({ to, Icon, text }) => (
//   <NavLink to={to} className={({ isActive }) => "nav-link d-flex align-items-center fw-bold px-2 py-1 " + (isActive ? 'text-danger' : 'text-dark')}>
//     <span style={{ width: '30px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginRight: '12px' }}>
//       {Icon && <Icon size={18} />}
//     </span>
//     {text}
//   </NavLink>
// );

// const LeftSidebar = ({ isOpen, onClose, states = [] }) => {
//   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
//   const stateRef = useRef(null);

//   const handleMouseEnter = () => setIsStateDropdownOpen(true);
//   const handleMouseLeave = () => setIsStateDropdownOpen(false);

//   const DropdownMenu = () => {
//     const portalRoot = document.getElementById('portal-root');
//     if (!portalRoot) return null;
//     return ReactDOM.createPortal(
//       <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ 
//         position: "fixed", 
//         top: 150, 
//         left: 250, 
//         backgroundColor: "#c82333", 
//         color: "#fff", 
//         padding: "15px", 
//         borderRadius: "8px", 
//         zIndex: 9999, 
//         width: "300px" 
//       }}>
//         {states.map(state => (
//           <NavLink 
//             key={state._id} 
//             to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`} 
//             className="d-block text-white py-1"
//             onClick={onClose}
//           >
//             {state.name}
//           </NavLink>
//         ))}
//       </div>,
//       portalRoot
//     );
//   };

//   return (
//     <div 
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         height: "100vh",
//         width: "250px",
//         backgroundColor: "#fff",
//         boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
//         transform: isOpen ? "translateX(0)" : "translateX(-100%)",
//         transition: "transform 0.3s ease-in-out",
//         zIndex: 10000,
//         display: "flex",
//         flexDirection: "column",
//         padding: "10px",
//         overflowY: "auto",

//         /* ✅ Scrollbar hide */
//         scrollbarWidth: "none",     // Firefox
//         msOverflowStyle: "none",    // IE/Edge
//       }}
//       className="custom-sidebar"
//     >
//       {/* Close Button */}
//       <div className="d-flex justify-content-end mb-3">
//         <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: "24px", cursor: "pointer", color: "#c82333" }}>×</button>
//       </div>

//       {/* Logo */}
//       <div className="mb-3 d-flex justify-content-center align-items-center">
//         <img src={logo} alt="EMS Logo" style={{ width: '100%', height: 'auto', maxHeight: '80px', objectFit: 'contain' }} />
//       </div>

//       {/* Nav Items */}
//       <div className="flex-grow-1 d-flex flex-column" style={{ gap: '8px' }}>
//         <NavItem to="/" Icon={FiHome} text="Home" />
//         <NavItem to="/india" Icon={FiFlag} text="India" />

//         {/* State Dropdown */}
//         <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={stateRef}>
//           <div className="nav-link d-flex align-items-center text-dark fw-bold px-2 py-1" style={{ cursor: "pointer" }}>
//             <span style={{ width: '30px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginRight: '12px' }}>
//               <FaLandmark size={18} />
//             </span>
//             State ▾
//           </div>
//           {isStateDropdownOpen && <DropdownMenu />}
//         </div>

//         <NavItem to="/entertainment" Icon={FiFilm} text="Entertainment" />
//         <NavItem to="/astrology" Icon={FiStar} text="Astrology" />
//         <NavItem to="/sports" Icon={FiAward} text="Sports" />
//         <NavItem to="/thoughts" Icon={FiZap} text="Thoughts" />
//         <NavItem to="/business" Icon={FiBriefcase} text="Business" />
//         <NavItem to="/youth" Icon={FiUser} text="Youth" />
//         <NavItem to="/directory" Icon={FiFolder} text="Directory" />
//       </div>

//       {/* Social & App */}
//       <div className="pt-2">
//         <div className="d-flex justify-content-around mb-2">
//           <a href="#"><FaFacebookF size={16} /></a>
//           <a href="#"><FaXTwitter size={16} /></a>
//           <a href="#"><FaYoutube size={16} /></a>
//           <a href="#"><FaInstagram size={16} /></a>
//         </div>
//         <p className="small text-muted mb-1">Download App from</p>
//         <a href="YOUR_PLAY_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block" style={{ marginBottom: "-95px" }}>
//           <img src={playStoreImage} alt="Get it on Google Play" style={{ width: '135px', height: 'auto', display: 'block' }} />
//         </a>
//         <a href="YOUR_APP_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block">
//           <img src={appStoreImage} alt="Download on the App Store" style={{ width: '135px', height: 'auto', display: 'block' }} />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;
// import React, { useRef, useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { NavLink } from "react-router-dom";
// import logo from '../../assets/logo.png';
// import playStoreImage from '../../assets/playstore.png';
// import appStoreImage from '../../assets/appstore.png';
// import { FiHome, FiFlag, FiFilm, FiStar, FiAward, FiZap, FiBriefcase, FiUser, FiFolder } from "react-icons/fi";
// import { FaLandmark, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

// const NavItem = ({ to, Icon, text }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       "nav-link d-flex align-items-center fw-bold px-2 py-1 " +
//       (isActive ? "text-danger" : "text-dark")
//     }
//   >
//     <span
//       style={{
//         width: "30px",
//         display: "inline-flex",
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: "12px",
//       }}
//     >
//       {Icon && <Icon size={18} />}
//     </span>
//     {text}
//   </NavLink>
// );

// const LeftSidebar = ({ isOpen, onClose, states = [] }) => {
//   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const stateRef = useRef(null);

//   const handleMouseEnter = () => setIsStateDropdownOpen(true);
//   const handleMouseLeave = () => setIsStateDropdownOpen(false);

//   // Click outside to close
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target)
//       ) {
//         onClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   const DropdownMenu = () => {
//     const portalRoot = document.getElementById("portal-root");
//     if (!portalRoot) return null;

//     return ReactDOM.createPortal(
//       <div
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         style={{
//           position: "fixed",
//           top: 150,
//           left: 250,
//           backgroundColor: "#c82333",
//           color: "#fff",
//           padding: "12px",
//           borderRadius: "8px",
//           zIndex: 9999,
//           minWidth: "540px",
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: "6px 12px",
//         }}
//       >
//         {states.map((state) => (
//           <NavLink
//             key={state._id}
//             to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
//             className="d-block text-white"
//             style={{
//               padding: "4px 6px",
//               fontSize: "14px",
//               lineHeight: "1.3",
//               borderRadius: "4px",
//             }}
//             onClick={onClose}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "transparent")
//             }
//           >
//             {state.name}
//           </NavLink>
//         ))}
//       </div>,
//       portalRoot
//     );
//   };

//   return (
//     <div
//       ref={sidebarRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         height: "100vh",
//         width: "250px",
//         backgroundColor: "#fff",
//         boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
//         transform: isOpen ? "translateX(0)" : "translateX(-100%)",
//         transition: "transform 0.3s ease-in-out",
//         zIndex: 10000,
//         display: "flex",
//         flexDirection: "column",
//         padding: "10px",
//         overflowY: "auto",
//         scrollbarWidth: "none", // Firefox
//         msOverflowStyle: "none", // IE/Edge
//       }}
//       className="custom-sidebar"
//     >
//       {/* Close Button */}
//       <div className="d-flex justify-content-end mb-3">
//         <button
//           onClick={onClose}
//           style={{
//             background: "transparent",
//             border: "none",
//             fontSize: "24px",
//             cursor: "pointer",
//             color: "#c82333",
//           }}
//         >
//           ×
//         </button>
//       </div>

//       {/* Logo */}
//       <div className="mb-3 d-flex justify-content-center align-items-center">
//         <img
//           src={logo}
//           alt="EMS Logo"
//           style={{
//             width: "100%",
//             height: "auto",
//             maxHeight: "80px",
//             objectFit: "contain",
//           }}
//         />
//       </div>

//       {/* Nav Items */}
//       <div className="flex-grow-1 d-flex flex-column" style={{ gap: "8px" }}>
//         <NavItem to="/" Icon={FiHome} text="Home" />
//         <NavItem to="/india" Icon={FiFlag} text="India" />

//         {/* State Dropdown */}
//         <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={stateRef}>
//           <div
//             className="nav-link d-flex align-items-center text-dark fw-bold px-2 py-1"
//             style={{ cursor: "pointer" }}
//           >
//             {/* ✅ Icon only for 'State ▾' */}
//             <FaLandmark size={15} style={{ marginRight: "25px",marginLeft: "8px" }} />
//             State ▾
//           </div>
//           {isStateDropdownOpen && <DropdownMenu />}
//         </div>

//         <NavItem to="/entertainment" Icon={FiFilm} text="Entertainment" />
//         <NavItem to="/astrology" Icon={FiStar} text="Astrology" />
//         <NavItem to="/sports" Icon={FiAward} text="Sports" />
//         <NavItem to="/thoughts" Icon={FiZap} text="Thoughts" />
//         <NavItem to="/business" Icon={FiBriefcase} text="Business" />
//         <NavItem to="/youth" Icon={FiUser} text="Youth" />
//         <NavItem to="/directory" Icon={FiFolder} text="Directory" />

//         {/* Footer Options */}
//         <div className="mt-3">
//           <h6 className="fw-bold mb-2">About EMS</h6>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none">About Us</a>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none">Advertise With Us</a>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none">Contact Us</a>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none">Careers</a>

//           <h6 className="fw-bold mt-3 mb-2">Quick Links</h6>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none">• T&C</a>
//           <a href="#" className="d-block text-dark text-decoration-none">• Privacy Policy</a>
//         </div>
//       </div>

//       {/* Social + App Download */}
//       <div className="pt-2 mt-auto">
//         <div className="d-flex justify-content-around mb-2">
//           <a href="#"><FaFacebookF size={16} /></a>
//           <a href="#"><FaXTwitter size={16} /></a>
//           <a href="#"><FaYoutube size={16} /></a>
//           <a href="#"><FaInstagram size={16} /></a>
//         </div>
//         <p className="small text-muted mb-1">Download App from</p>
//         <a href="YOUR_PLAY_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block" style={{ marginBottom: "-95px" }}>
//           <img src={playStoreImage} alt="Get it on Google Play" style={{ width: "135px", height: "auto", display: "block" }} />
//         </a>
//         <a href="YOUR_APP_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block">
//           <img src={appStoreImage} alt="Download on the App Store" style={{ width: "135px", height: "auto", display: "block" }} />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;





// import React, { useRef, useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { NavLink } from "react-router-dom";
// import logo from '../../assets/logo.png';
// import playStoreImage from '../../assets/playstore.png';
// import appStoreImage from '../../assets/appstore.png';
// import { FiHome, FiFlag, FiFilm, FiStar, FiAward, FiZap, FiBriefcase, FiUser, FiFolder } from "react-icons/fi";
// import { FaLandmark, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

// const NavItem = ({ to, Icon, text, onClick }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       "nav-link d-flex align-items-center fw-bold px-2 py-1 " +
//       (isActive ? "text-danger" : "text-dark")
//     }
//     onClick={onClick} // ✅ Click पर sidebar close
//   >
//     <span
//       style={{
//         width: "30px",
//         display: "inline-flex",
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: "12px",
//       }}
//     >
//       {Icon && <Icon size={18} />}
//     </span>
//     {text}
//   </NavLink>
// );

// const LeftSidebar = ({ isOpen, onClose, states = [] }) => {
//   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const stateRef = useRef(null);

//   const handleMouseEnter = () => setIsStateDropdownOpen(true);
//   const handleMouseLeave = () => setIsStateDropdownOpen(false);

//   // Click outside to close
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target)
//       ) {
//         onClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   const DropdownMenu = () => {
//     const portalRoot = document.getElementById("portal-root");
//     if (!portalRoot) return null;

//     return ReactDOM.createPortal(
//       <div
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         style={{
//           position: "fixed",
//           top: 150,
//           left: 250,
//           backgroundColor: "#c82333",
//           color: "#fff",
//           padding: "12px",
//           borderRadius: "8px",
//           zIndex: 9999,
//           minWidth: "540px",
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: "6px 12px",
//         }}
//       >
//         {states.map((state) => (
//           <NavLink
//             key={state._id}
//             to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
//             className="d-block text-white"
//             style={{
//               padding: "4px 6px",
//               fontSize: "14px",
//               lineHeight: "1.3",
//               borderRadius: "4px",
//             }}
//             onClick={onClose} // ✅ Click पर sidebar close
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "transparent")
//             }
//           >
//             {state.name}
//           </NavLink>
//         ))}
//       </div>,
//       portalRoot
//     );
//   };

//   return (
//     <div
//       ref={sidebarRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         height: "100vh",
//         width: "250px",
//         backgroundColor: "#fff",
//         boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
//         transform: isOpen ? "translateX(0)" : "translateX(-100%)",
//         transition: "transform 0.3s ease-in-out",
//         zIndex: 10000,
//         display: "flex",
//         flexDirection: "column",
//         padding: "10px",
//         overflowY: "auto",
//         scrollbarWidth: "none", // Firefox
//         msOverflowStyle: "none", // IE/Edge
//       }}
//       className="custom-sidebar"
//     >
//       {/* Logo */}
//       <div className="mb-3 d-flex justify-content-center align-items-center">
//         <img
//           src={logo}
//           alt="EMS Logo"
//           style={{
//             width: "100%",
//             height: "auto",
//             maxHeight: "80px",
//             objectFit: "contain",
//           }}
//         />
//       </div>

//       {/* Nav Items */}
//       <div className="flex-grow-1 d-flex flex-column" style={{ gap: "8px" }}>
//         <NavItem to="/" Icon={FiHome} text="Home" onClick={onClose} />
//         <NavItem to="/india" Icon={FiFlag} text="India" onClick={onClose} />

//         {/* State Dropdown */}
//         <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={stateRef}>
//           <div
//             className="nav-link d-flex align-items-center text-dark fw-bold px-2 py-1"
//             style={{ cursor: "pointer" }}
//           >
//             {/* Icon only for 'State ▾' */}
//             <FaLandmark size={15} style={{ marginRight: "25px", marginLeft: "8px" }} />
//             State ▾
//           </div>
//           {isStateDropdownOpen && <DropdownMenu />}
//         </div>

//         <NavItem to="/entertainment" Icon={FiFilm} text="Entertainment" onClick={onClose} />
//         <NavItem to="/astrology" Icon={FiStar} text="Astrology" onClick={onClose} />
//         <NavItem to="/sports" Icon={FiAward} text="Sports" onClick={onClose} />
//         <NavItem to="/thoughts" Icon={FiZap} text="Thoughts" onClick={onClose} />
//         <NavItem to="/business" Icon={FiBriefcase} text="Business" onClick={onClose} />
//         <NavItem to="/youth" Icon={FiUser} text="Youth" onClick={onClose} />
//         <NavItem to="/directory" Icon={FiFolder} text="Directory" onClick={onClose} />

//         {/* Footer Options */}
//         <div className="mt-3">
//           <h6 className="fw-bold mb-2">About EMS</h6>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>About Us</a>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Advertise With Us</a>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Contact Us</a>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Careers</a>

//           <h6 className="fw-bold mt-3 mb-2">Quick Links</h6>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>• T&C</a>
//           <a href="#" className="d-block text-dark text-decoration-none" onClick={onClose}>• Privacy Policy</a>
//         </div>
//       </div>

//       {/* Social + App Download */}
//       <div className="pt-2 mt-auto">
//         <div className="d-flex justify-content-around mb-2">
//           <a href="#"><FaFacebookF size={16} /></a>
//           <a href="#"><FaXTwitter size={16} /></a>
//           <a href="#"><FaYoutube size={16} /></a>
//           <a href="#"><FaInstagram size={16} /></a>
//         </div>
//         <p className="small text-muted mb-1">Download App from</p>
//         <a href="YOUR_PLAY_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block" style={{ marginBottom: "-95px" }}>
//           <img src={playStoreImage} alt="Get it on Google Play" style={{ width: "135px", height: "auto", display: "block" }} />
//         </a>
//         <a href="YOUR_APP_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block">
//           <img src={appStoreImage} alt="Download on the App Store" style={{ width: "135px", height: "auto", display: "block" }} />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;

import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';
import playStoreImage from '../../assets/playstore.png';
import appStoreImage from '../../assets/appstore.png';
import { FiHome, FiFlag, FiFilm, FiStar, FiAward, FiZap, FiBriefcase, FiUser, FiFolder } from "react-icons/fi";
import { FaLandmark, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const NavItem = ({ to, Icon, text, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "nav-link d-flex align-items-center fw-bold px-2 py-1 " +
      (isActive ? "text-danger" : "text-dark")
    }
    onClick={onClick}
  >
    <span
      style={{
        width: "30px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "12px",
      }}
    >
      {Icon && <Icon size={18} />}
    </span>
    {text}
  </NavLink>
);

const LeftSidebar = ({ isOpen, onClose, states = [] }) => {
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const stateRef = useRef(null); // 'State' NavItem के लिए संदर्भ

  // मोबाइल पर क्लिक के लिए ड्रॉपडाउन टॉगल करें, डेस्कटॉप पर होवर के लिए
  const handleStateClick = (event) => {
    // मोबाइल पर क्लिक व्यवहार (या छोटे स्क्रीन)
    if (window.innerWidth <= 768) { // 768px एक सामान्य मोबाइल ब्रेकपॉइंट है
      event.preventDefault(); // NavLink के डिफ़ॉल्ट व्यवहार को रोकें
      setIsStateDropdownOpen(!isStateDropdownOpen);
    }
  };

  const handleStateMouseEnter = () => {
    if (window.innerWidth > 768) { 
      setIsStateDropdownOpen(true);
    }
  };

  const handleStateMouseLeave = () => {
    if (window.innerWidth > 768) { 
      setIsStateDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        (!stateRef.current || !stateRef.current.contains(event.target)) // यदि ड्रॉपडाउन खुला है, तो उसे बंद न करें
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, isStateDropdownOpen]); // isStateDropdownOpen को निर्भरता के रूप में जोड़ें

  const DropdownContent = ({ isMobile = false }) => (
    <div
      className={isMobile ? "mobile-state-dropdown" : "desktop-state-dropdown"}
      style={{
        backgroundColor: "#c82333",
        color: "#fff",
        padding: "12px",
        borderRadius: "8px",
        zIndex: 999999, // ✅ z-index को और बढ़ाया गया है
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)", // मोबाइल पर स्टैक्ड लेआउट
        gap: "6px 12px",
        ...(isMobile ? { // मोबाइल के लिए विशिष्ट स्टाइलिंग
          position: 'static',
          width: '100%',
          marginTop: '8px',
          gridTemplateColumns: 'repeat(1, 1fr)',
        } : { // डेस्कटॉप के लिए विशिष्ट स्टाइलिंग (यदि पोर्टल का उपयोग कर रहे हैं)
          position: "fixed",
          minWidth: "540px",
          gridTemplateColumns: "repeat(3, 1fr)",
        })
      }}
      onMouseEnter={handleStateMouseEnter} // होवर आउटसाइड के लिए फिर से जोड़ें
      onMouseLeave={handleStateMouseLeave} // होवर आउटसाइड के लिए फिर से जोड़ें
    >
      {states.map((state) => (
        <NavLink
          key={state._id}
          to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
          className="d-block text-white"
          style={{
            padding: "4px 6px",
            fontSize: "14px",
            lineHeight: "1.3",
            borderRadius: "4px",
          }}
          onClick={() => {
            onClose(); // साइडबार बंद करें
            setIsStateDropdownOpen(false); // ड्रॉपडाउन बंद करें
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          {state.name}
        </NavLink>
      ))}
    </div>
  );

  const DropdownMenu = () => {
    const isMobileView = window.innerWidth <= 768;

    if (isMobileView) {
      return ( // मोबाइल पर साइडबार के अंदर सामग्री को इनलाइन रेंडर करें
        <div style={{ paddingLeft: '20px' }}> {/* इंडेंटेशन के लिए कुछ पैडिंग */}
          <DropdownContent isMobile={true} />
        </div>
      );
    } else {
      const portalRoot = document.getElementById("portal-root");
      if (!portalRoot) return null;

      const dropdownTop = stateRef.current ? stateRef.current.offsetTop + stateRef.current.offsetHeight : 0;
      const dropdownLeft = sidebarRef.current ? sidebarRef.current.offsetLeft + sidebarRef.current.offsetWidth : 0;

      // ✅ यहाँ बाहरी पोर्टल div में z-index जोड़ा गया है
      return ReactDOM.createPortal(
        <div
          style={{
            position: "fixed",
            top: dropdownTop,
            left: dropdownLeft,
            zIndex: 999999, // ✅ सुनिश्चित करें कि यह सभी चीज़ों के ऊपर है
          }}
        >
          <DropdownContent />
        </div>,
        portalRoot
      );
    }
  };


  return (
    <div
      ref={sidebarRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "250px",
        backgroundColor: "#fff",
        boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        overflowY: "auto",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
      className="custom-sidebar"
    >
      {/* Logo */}
      <div className="mb-3 d-flex justify-content-center align-items-center">
        <img
          src={logo}
          alt="EMS Logo"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "80px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Nav Items */}
      <div className="flex-grow-1 d-flex flex-column" style={{ gap: "8px" }}>
        <NavItem to="/" Icon={FiHome} text="Home" onClick={onClose} />
        <NavItem to="/india" Icon={FiFlag} text="India" onClick={onClose} />

        {/* State Dropdown */}
        <div
          ref={stateRef}
          onMouseEnter={handleStateMouseEnter}
          onMouseLeave={handleStateMouseLeave}
          onClick={handleStateClick} // मोबाइल पर क्लिक को हैंडल करने के लिए
          className="state-dropdown-wrapper" // स्टाइलिंग हुक के लिए
        >
          <div
            className="nav-link d-flex align-items-center text-dark fw-bold px-2 py-1"
            style={{ cursor: "pointer" }}
          >
            <FaLandmark size={15} style={{ marginRight: "25px", marginLeft: "8px" }} />
            State ▾
          </div>
          {isStateDropdownOpen && <DropdownMenu />}
        </div>

        <NavItem to="/entertainment" Icon={FiFilm} text="Entertainment" onClick={onClose} />
        <NavItem to="/astrology" Icon={FiStar} text="Astrology" onClick={onClose} />
        <NavItem to="/sports" Icon={FiAward} text="Sports" onClick={onClose} />
        <NavItem to="/thoughts" Icon={FiZap} text="Thoughts" onClick={onClose} />
        <NavItem to="/business" Icon={FiBriefcase} text="Business" onClick={onClose} />
        <NavItem to="/youth" Icon={FiUser} text="Youth" onClick={onClose} />
        <NavItem to="/directory" Icon={FiFolder} text="Directory" onClick={onClose} />

        {/* Footer Options */}
        <div className="mt-3">
          <h6 className="fw-bold mb-2">About EMS</h6>
          <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>About Us</a>
          <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Advertise With Us</a>
          <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Contact Us</a>
           {/* <Link 
    to="/contact-us" 
    className="d-block mb-1 text-dark text-decoration-none"
    onClick={onClose} // optional: sidebar close karne ke liye
  >
    Contact Us
  </Link> */}
          <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Careers</a>

          <h6 className="fw-bold mt-3 mb-2">Quick Links</h6>
          <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>• T&C</a>
          <a href="#" className="d-block text-dark text-decoration-none" onClick={onClose}>• Privacy Policy</a>
        </div>
      </div>

      {/* Social + App Download */}
      <div className="pt-2 mt-auto">
        <div className="d-flex justify-content-around mb-2">
          <a href="#"><FaFacebookF size={16} /></a>
          <a href="#"><FaXTwitter size={16} /></a>
          <a href="#"><FaYoutube size={16} /></a>
          <a href="#"><FaInstagram size={16} /></a>
        </div>
        <p className="small text-muted mb-1">Download App from</p>
        <a href="YOUR_PLAY_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block" style={{ marginBottom: "-95px" }}>
          <img src={playStoreImage} alt="Get it on Google Play" style={{ width: "135px", height: "auto", display: "block" }} />
        </a>
        <a href="YOUR_APP_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block">
          <img src={appStoreImage} alt="Download on the App Store" style={{ width: "135px", height: "auto", display: "block" }} />
        </a>
      </div>
    </div>
  );
};

export default LeftSidebar;