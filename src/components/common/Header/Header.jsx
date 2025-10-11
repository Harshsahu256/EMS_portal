// import React, { useEffect, useState, useRef } from "react";
// import { Container, Button, Nav } from "react-bootstrap";
// import { Link, NavLink } from "react-router-dom";

// // Assets
// import logoT from "../../../assets/logoT.png";
// import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// import searchIcon from "../../../assets/icons/search-icon.svg";
// import emstvIcon from "../../../assets/icons/emstvIcon.png";
// import directoryIcon from "../../../assets/icons/directory-icon.svg";
// import loginIcon from "../../../assets/icons/login-icon.svg";

// // Google Translate
// import GoogleTranslateWidget, {
//   useGoogleTranslate,
// } from "../../GoogleTranslateWidget";

// // Icons
// import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
// import { FaXTwitter, FaBars } from "react-icons/fa6";
// import { MdOutlineSubscriptions } from "react-icons/md";

// // Sidebar
// import LeftSidebar from "../LeftSidebar";

// // API
// import { headline, getStatesByCountry } from "../../../Services/authApi"; // headline अब 'lang' पैरामीटर लेगा

// const sidebarOptions = [
//   { name: "Home", path: "/" },
//   { name: "India", path: "/india" },
//   { name: "State", path: "/state", isDropdown: true },
//   { name: "Entertainment", path: "/entertainment" },
//   { name: "Astrology", path: "/astrology" },
//   { name: "Sports", path: "/sports" },
//   { name: "Thoughts", path: "/thoughts" },
//   { name: "Business", path: "/business" },
//   { name: "Youth", path: "/youth" },
// ];

// const HeaderActionIcon = ({
//   icon,
//   text,
//   link,
//   isReactIcon = false,
//   size = 28,
// }) => {
//   const renderedIcon = isReactIcon ? (
//     React.cloneElement(icon, { size })
//   ) : (
//     <img src={icon} alt={text} height={size} width={size} />
//   );

//   return (
//     <Link
//       to={link}
//       className="d-flex flex-column align-items-center text-decoration-none text-center"
//       style={{ color: "#000" }}
//     >
//       {renderedIcon}
//       <span
//         style={{
//           fontSize: "11px",
//           marginTop: "4px",
//           fontWeight: 700,
//           lineHeight: 1.1,
//         }}
//       >
//         {text}
//       </span>
//     </Link>
//   );
// };

// const Header = () => {
//   const { changeLanguage: googleTranslateChangeLanguage } =
//     useGoogleTranslate(); // Renamed to avoid conflict

//   // Get language preference from localStorage, default to 'en'
//   const [currentLanguage, setCurrentLanguage] = useState(
//     localStorage.getItem("userLanguage") || "en"
//   );

//   const [headlineData, setHeadlineData] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const stateDropdownRef = useRef(null);

//   // Function to change app language
//   const changeAppLanguage = (lang) => {
//     setCurrentLanguage(lang);
//     localStorage.setItem("userLanguage", lang); // Persist language choice
//     window.location.reload();
//   };

//   // Scroll listener for header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 80);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Fetch headlines based on currentLanguage
//   useEffect(() => {
//     const fetchHeadline = async () => {
//       try {
//         const response = await headline();
//         const dataArray = response?.data || [];
//         const allHeadlines = dataArray
//           .filter((item) => item.headlineText && item.newsId?.slug_en)
//           .map((item) => ({
//             id: item.newsId?._id,
//             slug: item.newsId?.slug_en,
//             text: item.headlineText.trim(),
//           }));
//         setHeadlineData(
//           allHeadlines.length
//             ? allHeadlines
//             : [{ id: "0", slug: "", text: "कोई हेडलाइन उपलब्ध नहीं है" }]
//         );
//       } catch {
//         setHeadlineData([
//           { id: "0", slug: "", text: "हेडलाइन लोड करने में त्रुटि" },
//         ]);
//       }
//     };
//     fetchHeadline();
//   }, []);

//   // Fetch states
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const res = await getStatesByCountry("687a1e2185f0230715032380"); // Assuming this is for India
//         if (res?.success) setAllStates(res.data);
//       } catch {}
//     };
//     fetchStates();
//   }, []);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   // Close state dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         stateDropdownRef.current &&
//         !stateDropdownRef.current.contains(event.target)
//       ) {
//         setIsStateDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <GoogleTranslateWidget />

//       {/* ================= Blue Header ================= */}
//       <div
//         style={{
//           backgroundColor: "#0d2d62",
//           color: "white",
//           height: "40px",
//           position: "fixed", // ✅ fixed at top
//           top: 5,
//           left: 0,
//           right: 0,
//           zIndex: 2000, // ऊपर रहे white header से
//           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
//           transition: "transform 0.4s ease-in-out",
//         }}
//       >
//         <Container
//           fluid
//           className="d-flex justify-content-between align-items-center py-1 px-3"
//         >
//           {/* Left - Language */}
//           <div
//             className="d-flex align-items-center"
//             style={{ marginLeft: "70px" }}
//           >
//             {/* Call changeAppLanguage */}
//             <Button
//               variant="link"
//               className="text-white fw-bold p-0 me-3"
//               onClick={() => changeAppLanguage("hi")}
//               style={{
//                 textDecoration: currentLanguage === "hi" ? "underline" : "none",
//               }} // Highlight active language
//             >
//               हिन्दी
//             </Button>
//             <Button
//               variant="link"
//               className="text-white fw-bold p-0"
//               onClick={() => changeAppLanguage("en")}
//               style={{
//                 textDecoration: currentLanguage === "en" ? "underline" : "none",
//               }} // Highlight active language
//             >
//               English
//             </Button>
//           </div>

//           {/* Right Desktop - Social + Login */}
//           <div className="d-none d-md-flex align-items-center">
//             <a href="#" className="text-white mx-2">
//               <FaFacebookF size={16} />
//             </a>
//             <a href="#" className="text-white mx-2">
//               <FaXTwitter size={16} />
//             </a>
//             <a href="#" className="text-white mx-2">
//               <FaYoutube size={16} />
//             </a>
//             <a href="#" className="text-white mx-2">
//               <FaInstagram size={16} />
//             </a>
//             <Link
//               to="/login"
//               className="d-flex align-items-center text-decoration-none text-white fw-bold me-3"
//             >
//               <img src={loginIcon} alt="Login" height="28" className="me-1" />
//               <span>Login</span>
//             </Link>
//           </div>

//           {/* Right Mobile */}
//           <div className="d-flex d-md-none align-items-center">
//             <Link to="/login" className="text-white">
//               <img src={loginIcon} alt="Login" height="28" />
//             </Link>
//           </div>
//         </Container>
//       </div>

//       {/* ================= White Header ================= */}
//       <div
//         style={{
//           marginTop: "40px", // ✅ blue header की जगह reserve
//         }}
//       >
//         {/* आपका white header content */}
//       </div>
//       {/* ================= White Header ================= */}
//       <div
//         className="bg-white border-bottom"
//         style={{ transition: "all 0.5s ease-in-out" }}
//       >
//         <Container
//           fluid
//           className="d-flex justify-content-between align-items-center py-2 px-3"
//         >
//           {/* Logo */}
//           <Link
//             to="/"
//             className="d-flex flex-column align-items-center text-decoration-none"
//             style={{ zIndex: 2100 }}
//           >
//             {/* GIF Logo */}
//             <video
//               src="/logogif.mp4"
//               autoPlay
//               loop
//               muted
//               style={{
//                 width: "60px",
//                 marginRight: "3px",
//                 zIndex: 2100,
//                 transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
//                 transition: "transform 0.5s ease-in-out",
//               }}
//             />

//             {/* Image below GIF */}
//             <img
//               src={logoT}
//               alt="EMS Tagline"
//               style={{
//                 height: "5px",
//                 transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
//                 transition: "transform 0.5s ease-in-out",
//               }}
//             />
//           </Link>
//           {/* Center Menu - Desktop only */}
//           <Nav
//             className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold"
//             style={{ gap: "45px" }}
//           >
//             {sidebarOptions.map((opt, index) =>
//               opt.isDropdown ? (
//                 <div
//                   key={index}
//                   ref={stateDropdownRef}
//                   className="position-relative"
//                   style={{ cursor: "pointer", color: "black" }}
//                 >
//                   <span
//                     onClick={() => setIsStateDropdownOpen((prev) => !prev)}
//                     style={{ fontWeight: 600 }}
//                   >
//                     State ▾
//                   </span>
//                   {isStateDropdownOpen && (
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "100%",
//                         left: 0,
//                         backgroundColor: "#c82333",
//                         color: "white",
//                         padding: "6px",
//                         minWidth: "540px",
//                         display: "grid",
//                         gridTemplateColumns: "repeat(3, 1fr)",
//                         gap: "4px",
//                         zIndex: 999,
//                       }}
//                     >
//                       {allStates.map((state) => (
//                         <NavLink
//                           key={state._id}
//                           to={`/state/${state.name
//                             .toLowerCase()
//                             .replace(/\s+/g, "-")}/${state._id}`}
//                           className="text-white text-decoration-none"
//                           style={{
//                             padding: "6px 8px",
//                             fontSize: "14px",
//                             lineHeight: "1.3",
//                             borderRadius: "4px",
//                             display: "block",
//                           }}
//                           onClick={() => setIsStateDropdownOpen(false)}
//                           onMouseEnter={(e) =>
//                             (e.currentTarget.style.backgroundColor =
//                               "rgba(255,255,255,0.2)")
//                           }
//                           onMouseLeave={(e) =>
//                             (e.currentTarget.style.backgroundColor =
//                               "transparent")
//                           }
//                         >
//                           {state.name}
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <NavLink
//                   key={index}
//                   to={opt.path}
//                   className="text-decoration-none text-black"
//                   style={{ fontWeight: 600 }}
//                 >
//                   {opt.name}
//                 </NavLink>
//               )
//             )}
//           </Nav>

//           {/* Right Icons - Desktop */}
//           <Nav className="d-none d-md-flex flex-row align-items-center gap-3 gap-md-4">
//             <HeaderActionIcon
//               icon={epaperIcon}
//               text="E-Paper"
//               link="http://www.jabalpurexpress.com/"
//             />
//             <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
//             <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
//             <HeaderActionIcon
//               icon={directoryIcon}
//               text="डायरेक्टरी"
//               link="/directory"
//             />
//             <HeaderActionIcon
//               icon={<MdOutlineSubscriptions color="#c41229ff" />}
//               text="Subscriber"
//               link="https://services.emsindia.com/public/authentication/admin_login"
//               isReactIcon
//               size={28}
//             />
//           </Nav>

//           {/* Right Icons - Mobile */}
//           <Nav className="d-flex d-md-none flex-row align-items-center gap-3">
//             <HeaderActionIcon icon={epaperIcon} text="E-Paper" link="/epaper" />
//             <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
//             <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
//             <HeaderActionIcon
//               icon={directoryIcon}
//               text="डायरेक्टरी"
//               link="/directory"
//             />
//           </Nav>
//         </Container>
//       </div>

//       {/* ================= Live News ================= */}
//       <div className="bg-white border-top border-bottom">
//         <Container fluid className="d-flex align-items-center p-0">
//           <div
//             className="d-flex align-items-center px-2 py-1"
//             style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}
//           >
//             <Button
//               variant="link"
//               className="text-white me-2 p-0"
//               onClick={toggleSidebar}
//               style={{ fontSize: "20px" }}
//             >
//               <FaBars />
//             </Button>
//             <span
//               className="text-white fw-bold px-2 py-0"
//               style={{ minWidth: "120px", fontSize: "14px" }}
//             >
//               Live News
//             </span>
//           </div>

//           <marquee
//             behavior="scroll"
//             direction="left"
//             className="fw-bold py-1"
//             style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
//           >
//             {headlineData.map((headline) => (
//               <Link
//                 key={headline.id}
//                 to={headline.slug ? `/news/${headline.slug}` : "#"}
//                 className="text-decoration-none text-dark me-4"
//                 style={{ whiteSpace: "nowrap" }}
//               >
//                 {headline.text}
//               </Link>
//             ))}
//           </marquee>
//         </Container>
//       </div>

//       {/* Left Sidebar */}
//       <LeftSidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//         states={allStates}
//       />
//     </>
//   );
// };

// export default Header;

// import React, { useEffect, useState, useRef } from "react";
// import { Container, Button, Nav } from "react-bootstrap";
// import { Link, NavLink, useNavigate } from "react-router-dom"; // ✅ useNavigate added

// // Assets
// import logoT from "../../../assets/logoT.png";
// import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// import searchIcon from "../../../assets/icons/search-icon.svg";
// import emstvIcon from "../../../assets/icons/emstvIcon.png";
// import directoryIcon from "../../../assets/icons/directory-icon.svg";
// import loginIcon from "../../../assets/icons/login-icon.svg";

// // Google Translate
// import GoogleTranslateWidget, {
//   useGoogleTranslate,
// } from "../../GoogleTranslateWidget";

// // Icons
// import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
// import { FaXTwitter, FaBars } from "react-icons/fa6";
// import { MdOutlineSubscriptions } from "react-icons/md";

// // Sidebar
// import LeftSidebar from "../LeftSidebar";

// // API
// import { headline, getStatesByCountry } from "../../../Services/authApi"; // headline अब 'lang' पैरामीटर लेगा

// const sidebarOptions = [
//   { name: "Home", path: "/" },
//   { name: "India", path: "/india" },
//   { name: "State", path: "/state", isDropdown: true },
//   { name: "Entertainment", path: "/entertainment" },
//   { name: "Astrology", path: "/astrology" },
//   { name: "Sports", path: "/sports" },
//   { name: "Thoughts", path: "/thoughts" },
//   { name: "Business", path: "/business" },
//   { name: "Youth", path: "/youth" },
// ];

// const HeaderActionIcon = ({
//   icon,
//   text,
//   link,
//   isReactIcon = false,
//   size = 28,
// }) => {
//   const renderedIcon = isReactIcon ? (
//     React.cloneElement(icon, { size })
//   ) : (
//     <img src={icon} alt={text} height={size} width={size} />
//   );

//   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");

//   if (isExternalLink) {
//     // अगर यह एक बाहरी लिंक है, तो एक साधारण <a> टैग का उपयोग करें
//     // **यहाँ से 'target="_blank"' और 'rel="noopener noreferrer"' हटा दिए गए हैं**
//     return (
//       <a
//         href={link} // सीधे बाहरी URL पर इंगित करें
//         className="d-flex flex-column align-items-center text-decoration-none text-center"
//         style={{ color: "#000" }}
//       >
//         {renderedIcon}
//         <span
//           className="header-action-text"
//           style={{
//             fontSize: "11px",
//             marginTop: "4px",
//             fontWeight: 700,
//             lineHeight: 1.1,
//           }}
//         >
//           {text}
//         </span>
//       </a>
//     );
//   } else {
//     // यदि यह एक आंतरिक लिंक है, तो React Router के <Link> कंपोनेंट का उपयोग करें
//     return (
//       <Link
//         to={link}
//         className="d-flex flex-column align-items-center text-decoration-none text-center"
//         style={{ color: "#000" }}
//       >
//         {renderedIcon}
//         <span
//           className="header-action-text"
//           style={{
//             fontSize: "11px",
//             marginTop: "4px",
//             fontWeight: 700,
//             lineHeight: 1.1,
//           }}
//         >
//           {text}
//         </span>
//       </Link>
//     );
//   }
// };

// const Header = () => {
//   const navigate = useNavigate(); // ✅ useNavigate hook
//   const { changeLanguage: googleTranslateChangeLanguage } =
//     useGoogleTranslate(); // Renamed to avoid conflict

//   // Get language preference from localStorage, default to 'en'
//   const [currentLanguage, setCurrentLanguage] = useState(
//     localStorage.getItem("userLanguage") || "en"
//   );

//   const [headlineData, setHeadlineData] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const stateDropdownRef = useRef(null);

//   // Function to change app language
//   const changeAppLanguage = (lang) => {
//     setCurrentLanguage(lang);
//     localStorage.setItem("userLanguage", lang); // Persist language choice

//     // ✅ First navigate to homepage
//     navigate("/");

//     // ✅ Then reload to apply language globally
//     window.location.reload();
//   };

//   // Scroll listener for header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 80);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Fetch headlines based on currentLanguage
//   useEffect(() => {
//     const fetchHeadline = async () => {
//       try {
//         const response = await headline();
//         const dataArray = response?.data || [];
//         const allHeadlines = dataArray
//           .filter((item) => item.headlineText && item.newsId?.slug_en)
//           .map((item) => ({
//             id: item.newsId?._id,
//             slug: item.newsId?.slug_en,
//             text: item.headlineText.trim(),
//           }));
//         setHeadlineData(
//           allHeadlines.length
//             ? allHeadlines
//             : [{ id: "0", slug: "", text: "कोई हेडलाइन उपलब्ध नहीं है" }]
//         );
//       } catch {
//         setHeadlineData([
//           { id: "0", slug: "", text: "हेडलाइन लोड करने में त्रुटि" },
//         ]);
//       }
//     };
//     fetchHeadline();
//   }, [currentLanguage]); // ✅ headline ko language ke sath reload karega

//   // Fetch states
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const res = await getStatesByCountry("687a1e2185f0230715032380"); // Assuming this is for India
//         if (res?.success) setAllStates(res.data);
//       } catch {}
//     };
//     fetchStates();
//   }, []);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   // Close state dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         stateDropdownRef.current &&
//         !stateDropdownRef.current.contains(event.target)
//       ) {
//         setIsStateDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <GoogleTranslateWidget />

//       {/* ================= Blue Header ================= */}
//       <div
//         style={{
//           backgroundColor: "#0d2d62",
//           color: "white",
//           height: "40px",
//           position: "fixed", // ✅ fixed at top
//           top: 5,
//           left: 0,
//           right: 0,
//           zIndex: 2000, // ऊपर रहे white header से
//           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
//           transition: "transform 0.4s ease-in-out",
//         }}
//       >
//         <Container
//           fluid
//           className="d-flex justify-content-between align-items-center py-1 px-3"
//         >
//           {/* Left - Language */}
//           <div
//             className="d-flex align-items-center"
//             style={{ marginLeft: "70px" }}
//           >
//             {/* Call changeAppLanguage */}
//             <Button
//               variant="link"
//               className="text-white fw-bold p-0 me-3"
//               onClick={() => changeAppLanguage("hi")}
//               style={{
//                 textDecoration: currentLanguage === "hi" ? "underline" : "none",
//               }} // Highlight active language
//             >
//               हिन्दी
//             </Button>
//             <Button
//               variant="link"
//               className="text-white fw-bold p-0"
//               onClick={() => changeAppLanguage("en")}
//               style={{
//                 textDecoration: currentLanguage === "en" ? "underline" : "none",
//               }} // Highlight active language
//             >
//               English
//             </Button>
//           </div>

//           {/* Right Desktop - Social + Login */}
//           <div className="d-none d-md-flex align-items-center">
//             <a href="#" className="text-white mx-2">
//               <FaFacebookF size={16} />
//             </a>
//             <a href="#" className="text-white mx-2">
//               <FaXTwitter size={16} />
//             </a>
//             <a href="#" className="text-white mx-2">
//               <FaYoutube size={16} />
//             </a>
//             <a href="#" className="text-white mx-2">
//               <FaInstagram size={16} />
//             </a>
//             <Link
//               to="/login"
//               className="d-flex align-items-center text-decoration-none text-white fw-bold me-3"
//             >
//               <img src={loginIcon} alt="Login" height="28" className="me-1" />
//               <span>Login</span>
//             </Link>
//           </div>

//           {/* Right Mobile */}
//           <div className="d-flex d-md-none align-items-center">
//             <Link to="/login" className="text-white">
//               <img src={loginIcon} alt="Login" height="28" />
//             </Link>
//           </div>
//         </Container>
//       </div>

//       {/* ================= White Header ================= */}
//       <div style={{ marginTop: "40px" }}>
//         {/* Reserved space for white header */}
//       </div>

//       <div
//         className="bg-white border-bottom"
//         style={{ transition: "all 0.5s ease-in-out" }}
//       >
//         <Container
//           fluid
//           className="d-flex justify-content-between align-items-center py-2 px-3"
//         >
//           {/* Logo */}
//           <Link
//             to="/"
//             className="d-flex flex-column align-items-center text-decoration-none"
//             style={{ zIndex: 2100 }}
//           >
//             <video
//               src="/logogif.mp4"
//               autoPlay
//               loop
//               muted
//               style={{
//                 width: "60px",
//                 marginRight: "3px",
//                 zIndex: 2100,
//                 transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
//                 transition: "transform 0.5s ease-in-out",
//               }}
//             />
//             <img
//               src={logoT}
//               alt="EMS Tagline"
//               style={{
//                 height: "5px",
//                 transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
//                 transition: "transform 0.5s ease-in-out",
//               }}
//             />
//           </Link>

//           {/* Center Menu - Desktop only */}
//           <Nav
//             className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold"
//             style={{ gap: "45px" }}
//           >
//             {sidebarOptions.map((opt, index) =>
//               opt.isDropdown ? (
//                 <div
//                   key={index}
//                   ref={stateDropdownRef}
//                   className="position-relative"
//                   style={{ cursor: "pointer", color: "black" }}
//                 >
//                   <span
//                     onClick={() => setIsStateDropdownOpen((prev) => !prev)}
//                     style={{ fontWeight: 600 }}
//                   >
//                     State ▾
//                   </span>
//                   {isStateDropdownOpen && (
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "100%",
//                         left: 0,
//                         backgroundColor: "#c82333",
//                         color: "white",
//                         padding: "6px",
//                         minWidth: "540px",
//                         display: "grid",
//                         gridTemplateColumns: "repeat(3, 1fr)",
//                         gap: "4px",
//                         zIndex: 999,
//                       }}
//                     >
//                       {allStates.map((state) => (
//                         <NavLink
//                           key={state._id}
//                           to={`/state/${state.name
//                             .toLowerCase()
//                             .replace(/\s+/g, "-")}/${state._id}`}
//                           className="text-white text-decoration-none"
//                           style={{
//                             padding: "6px 8px",
//                             fontSize: "14px",
//                             lineHeight: "1.3",
//                             borderRadius: "4px",
//                             display: "block",
//                           }}
//                           onClick={() => setIsStateDropdownOpen(false)}
//                           onMouseEnter={(e) =>
//                             (e.currentTarget.style.backgroundColor =
//                               "rgba(255,255,255,0.2)")
//                           }
//                           onMouseLeave={(e) =>
//                             (e.currentTarget.style.backgroundColor =
//                               "transparent")
//                           }
//                         >
//                           {state.name}
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <NavLink
//                   key={index}
//                   to={opt.path}
//                   className="text-decoration-none text-black"
//                   style={{ fontWeight: 600 }}
//                 >
//                   {opt.name}
//                 </NavLink>
//               )
//             )}
//           </Nav>

//           {/* Right Icons - Desktop */}
//           <Nav className="d-none d-md-flex flex-row align-items-center gap-3 gap-md-4">
//             <HeaderActionIcon
//               icon={epaperIcon}
//               text="E-Paper"
//               link="http://www.jabalpurexpress.com/"
//             />
//             <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
//             <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
//             <HeaderActionIcon
//               icon={directoryIcon}
//               text="डायरेक्टरी"
//               link="/directory"
//             />
//             <HeaderActionIcon
//               icon={<MdOutlineSubscriptions color="#c41229ff" />}
//               text="Subscriber"
//               link="https://services.emsindia.com/public/authentication/admin_login"
//               isReactIcon
//               size={28}
//             />
//           </Nav>

//           {/* Right Icons - Mobile */}
//           <Nav className="d-flex d-md-none flex-row align-items-center gap-3">
//             <HeaderActionIcon icon={epaperIcon} text="E-Paper" link="/epaper" />
//             <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
//             <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
//             <HeaderActionIcon
//               icon={directoryIcon}
//               text="डायरेक्टरी"
//               link="/directory"
//             />
//           </Nav>
//         </Container>
//       </div>

//       {/* ================= Live News ================= */}
//       <div className="bg-white border-top border-bottom">
//         <Container fluid className="d-flex align-items-center p-0">
//           <div
//             className="d-flex align-items-center px-2 py-1"
//             style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}
//           >
//             <Button
//               variant="link"
//               className="text-white me-2 p-0"
//               onClick={toggleSidebar}
//               style={{ fontSize: "20px" }}
//             >
//               <FaBars />
//             </Button>
//             <span
//               className="text-white fw-bold px-2 py-0"
//               style={{ minWidth: "120px", fontSize: "14px" }}
//             >
//               Live News
//             </span>
//           </div>

//           <marquee
//             behavior="scroll"
//             direction="left"
//             className="fw-bold py-1"
//             style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
//           >
//             {headlineData.map((headline) => (
//               <Link
//                 key={headline.id}
//                 to={headline.slug ? `/news/${headline.slug}` : "#"}
//                 className="text-decoration-none text-dark me-4"
//                 style={{ whiteSpace: "nowrap" }}
//               >
//                 {headline.text}
//               </Link>
//             ))}
//           </marquee>
//         </Container>
//       </div>
//       {/* Left Sidebar */}
//       <LeftSidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//         states={allStates}
//       />
//     </>
//   );
// };

// export default Header;


import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

// Assets
import logoT from "../../../assets/logoT.png";
import epaperIcon from "../../../assets/icons/epaper-icon.svg";
import searchIcon from "../../../assets/icons/search-icon.svg";
import emstvIcon from "../../../assets/icons/emstvIcon.png";
import directoryIcon from "../../../assets/icons/directory-icon.svg";
import loginIcon from "../../../assets/icons/login-icon.svg";

// Google Translate
import GoogleTranslateWidget, {
  useGoogleTranslate,
} from "../../GoogleTranslateWidget";

// Icons
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaBars } from "react-icons/fa6";
import { MdOutlineSubscriptions } from "react-icons/md";

// Sidebar
import LeftSidebar from "../LeftSidebar";

// API
import { headline, getStatesByCountry } from "../../../Services/authApi";

const sidebarOptions = [
  { name: "Home", path: "/" },
  { name: "India", path: "/india" },
  { name: "State", path: "/state", isDropdown: true },
  { name: "Entertainment", path: "/entertainment" },
  { name: "Astrology", "path": "/astrology" },
  { name: "Sports", path: "/sports" },
  { name: "Thoughts", path: "/thoughts" },
  { name: "Business", path: "/business" },
  { name: "Youth", path: "/youth" },
];

const HeaderActionIcon = ({
  icon,
  text,
  link,
  isReactIcon = false,
  size = 28,
}) => {
  const renderedIcon = isReactIcon ? (
    React.cloneElement(icon, { size })
  ) : (
    <img src={icon} alt={text} height={size} width={size} />
  );

  const isExternalLink = link.startsWith("http://") || link.startsWith("https://");

  const handleExternalLinkClick = (event) => {
    if (isExternalLink) {
      event.preventDefault(); // a टैग के डिफ़ॉल्ट व्यवहार को रोकता है
      // **यहाँ window.open(link, "_self") का उपयोग किया गया है**
      window.open(link, "_self"); // स्पष्ट रूप से वर्तमान टैब में खोलें
    }
  };

  if (isExternalLink) {
    return (
      <a
        href={link} // अभी भी href प्रदान करते हैं (फ़ॉलबैक और एक्सेसिबिलिटी के लिए)
        onClick={handleExternalLinkClick} // हमारा कस्टम क्लिक हैंडलर
        className="d-flex flex-column align-items-center text-decoration-none text-center"
        style={{ color: "#000" }}
      >
        {renderedIcon}
        <span
          className="header-action-text"
          style={{
            fontSize: "11px",
            marginTop: "4px",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {text}
        </span>
      </a>
    );
  } else {
    return (
      <Link
        to={link}
        className="d-flex flex-column align-items-center text-decoration-none text-center"
        style={{ color: "#000" }}
      >
        {renderedIcon}
        <span
          className="header-action-text"
          style={{
            fontSize: "11px",
            marginTop: "4px",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {text}
        </span>
      </Link>
    );
  }
};

const Header = () => {
  const navigate = useNavigate();
  const { changeLanguage: googleTranslateChangeLanguage } =
    useGoogleTranslate();

  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("userLanguage") || "en"
  );

  const [headlineData, setHeadlineData] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const stateDropdownRef = useRef(null);

  const changeAppLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("userLanguage", lang);

    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchHeadline = async () => {
      try {
        const response = await headline();
        const dataArray = response?.data || [];
        const allHeadlines = dataArray
          .filter((item) => item.headlineText && item.newsId?.slug_en)
          .map((item) => ({
            id: item.newsId?._id,
            slug: item.newsId?.slug_en,
            text: item.headlineText.trim(),
          }));
        setHeadlineData(
          allHeadlines.length
            ? allHeadlines
            : [{ id: "0", slug: "", text: "कोई हेडलाइन उपलब्ध नहीं है" }]
        );
      } catch {
        setHeadlineData([
          { id: "0", slug: "", text: "हेडलाइन लोड करने में त्रुटि" },
        ]);
      }
    };
    fetchHeadline();
  }, [currentLanguage]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getStatesByCountry("687a1e2185f0230715032380");
        if (res?.success) setAllStates(res.data);
      } catch {}
    };
    fetchStates();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target)
      ) {
        setIsStateDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <GoogleTranslateWidget />

      {/* ================= Blue Header ================= */}
      <div
        style={{
          backgroundColor: "#0d2d62",
          color: "white",
          height: "40px",
          position: "fixed",
          top: 5,
          left: 0,
          right: 0,
          zIndex: 2000,
          transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.4s ease-in-out",
        }}
      >
        <Container
          fluid
          className="d-flex justify-content-between align-items-center py-1 px-3"
        >
          {/* Left - Language */}
          <div
            className="d-flex align-items-center"
            style={{ marginLeft: "70px" }}
          >
            <Button
              variant="link"
              className="text-white fw-bold p-0 me-3"
              onClick={() => changeAppLanguage("hi")}
              style={{
                textDecoration: currentLanguage === "hi" ? "underline" : "none",
              }}
            >
              हिन्दी
            </Button>
            <Button
              variant="link"
              className="text-white fw-bold p-0"
              onClick={() => changeAppLanguage("en")}
              style={{
                textDecoration: currentLanguage === "en" ? "underline" : "none",
              }}
            >
              English
            </Button>
          </div>

          {/* Right Desktop - Social + Login */}
          <div className="d-none d-md-flex align-items-center">
            <a href="#" className="text-white mx-2">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="text-white mx-2">
              <FaXTwitter size={16} />
            </a>
            <a href="#" className="text-white mx-2">
              <FaYoutube size={16} />
            </a>
            <a href="#" className="text-white mx-2">
              <FaInstagram size={16} />
            </a>
            <Link
              to="/login"
              className="d-flex align-items-center text-decoration-none text-white fw-bold me-3"
            >
              <img src={loginIcon} alt="Login" height="28" className="me-1" />
              <span>Login</span>
            </Link>
          </div>

          {/* Right Mobile */}
          <div className="d-flex d-md-none align-items-center">
            <Link to="/login" className="text-white">
              <img src={loginIcon} alt="Login" height="28" />
            </Link>
          </div>
        </Container>
      </div>

      {/* ================= White Header ================= */}
      <div style={{ marginTop: "40px" }}>
        {/* Reserved space for white header */}
      </div>

      <div
        className="bg-white border-bottom"
        style={{ transition: "all 0.5s ease-in-out" }}
      >
        <Container
          fluid
          className="d-flex justify-content-between align-items-center py-2 px-3"
        >
          {/* Logo */}
          <Link
            to="/"
            className="d-flex flex-column align-items-center text-decoration-none"
            style={{ zIndex: 2100 }}
          >
            <video
              src="/logogif.mp4"
              autoPlay
              loop
              muted
              style={{
                width: "60px",
                marginRight: "3px",
                zIndex: 2100,
                transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
                transition: "transform 0.5s ease-in-out",
              }}
            />
            <img
              src={logoT}
              alt="EMS Tagline"
              style={{
                height: "5px",
                transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </Link>

          {/* Center Menu - Desktop only */}
          <Nav
            className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold"
            style={{ gap: "45px" }}
          >
            {sidebarOptions.map((opt, index) =>
              opt.isDropdown ? (
                <div
                  key={index}
                  ref={stateDropdownRef}
                  className="position-relative"
                  style={{ cursor: "pointer", color: "black" }}
                >
                  <span
                    onClick={() => setIsStateDropdownOpen((prev) => !prev)}
                    style={{ fontWeight: 600 }}
                  >
                    State ▾
                  </span>
                  {isStateDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "#c82333",
                        color: "white",
                        padding: "6px",
                        minWidth: "540px",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "4px",
                        zIndex: 999,
                      }}
                    >
                      {allStates.map((state) => (
                        <NavLink
                          key={state._id}
                          to={`/state/${state.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}/${state._id}`}
                          className="text-white text-decoration-none"
                          style={{
                            padding: "6px 8px",
                            fontSize: "14px",
                            lineHeight: "1.3",
                            borderRadius: "4px",
                            display: "block",
                          }}
                          onClick={() => setIsStateDropdownOpen(false)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "rgba(255,255,255,0.2)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          {state.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={index}
                  to={opt.path}
                  className="text-decoration-none text-black"
                  style={{ fontWeight: 600 }}
                >
                  {opt.name}
                </NavLink>
              )
            )}
          </Nav>

          {/* Right Icons - Desktop */}
          <Nav className="d-none d-md-flex flex-row align-items-center gap-3 gap-md-4">
            {/* <HeaderActionIcon
              icon={epaperIcon}
              text="E-Paper"
              link="http://www.jabalpurexpress.com/"
            /> */}
            <HeaderActionIcon icon={epaperIcon} text="E-Paper" link="/#" />
            <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
            <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
            <HeaderActionIcon
              icon={directoryIcon}
              text="डायरेक्टरी"
              link="/directory"
            />
            <HeaderActionIcon
  icon={<MdOutlineSubscriptions color="#c41229ff" />}
  text="Subscriber"
  link="#"
  isReactIcon
  size={28}
/>

            {/* <HeaderActionIcon
              icon={<MdOutlineSubscriptions color="#c41229ff" />}
              text="Subscriber"
              link="https://services.emsindia.com/public/authentication/admin_login"
              isReactIcon
              size={28}
            /> */}
          </Nav>

          {/* Right Icons - Mobile */}
          <Nav className="d-flex d-md-none flex-row align-items-center gap-3">
             {/* <HeaderActionIcon
              icon={epaperIcon}
              text="E-Paper"
              link="http://www.jabalpurexpress.com/"
            /> */}
            <HeaderActionIcon icon={epaperIcon} text="E-Paper" link="/#" />
            <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
            <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
            <HeaderActionIcon
              icon={directoryIcon}
              text="डायरेक्टरी"
              link="/directory"
            />
             {/* <HeaderActionIcon
              icon={<MdOutlineSubscriptions color="#c41229ff" />}
              text="Subscriber"
              link="https://services.emsindia.com/public/authentication/admin_login"
              isReactIcon
              size={28}
            /> */}
            <HeaderActionIcon
  icon={<MdOutlineSubscriptions color="#c41229ff" />}
  text="Subscriber"
  link="#"
  isReactIcon
  size={28}
/>

          </Nav>
        </Container>
      </div>

      {/* ================= Live News ================= */}
      <div className="bg-white border-top border-bottom">
        <Container fluid className="d-flex align-items-center p-0">
          <div
            className="d-flex align-items-center px-2 py-1"
            style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}
          >
            <Button
              variant="link"
              className="text-white me-2 p-0"
              onClick={toggleSidebar}
              style={{ fontSize: "20px" }}
            >
              <FaBars />
            </Button>
            <span
              className="text-white fw-bold px-2 py-0"
              style={{ minWidth: "120px", fontSize: "14px" }}
            >
              Live News
            </span>
          </div>

          <marquee
            behavior="scroll"
            direction="left"
            className="fw-bold py-1"
            style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
          >
            {headlineData.map((headline) => (
              <Link
                key={headline.id}
                to={headline.slug ? `/news/${headline.slug}` : "#"}
                className="text-decoration-none text-dark me-4"
                style={{ whiteSpace: "nowrap", fontWeight: "bold"}}
              >
                {headline.text}
              </Link>
            ))}
          </marquee>
        </Container>
      </div>
      {/* Left Sidebar */}
      <LeftSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        states={allStates}
      />
    </>
  );
};

export default Header;