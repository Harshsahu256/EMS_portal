
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
// import { FaLandmarkDome, FaChevronDown, FaChevronUp, FaChevronRight } from "react-icons/fa6";
// import { allNews, getStatesByCountry, getCitiesByState } from "../../Services/authApi";
//  import { Link } from "react-router-dom";
// const City = () => {
//   const [activeState, setActiveState] = useState(null);
//   const [activeCity, setActiveCity] = useState(null);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
 
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
 
//   const [expandedNews, setExpandedNews] = useState({});
//   const [showAllStates, setShowAllStates] = useState(false);
//   const [showAllCities, setShowAllCities] = useState(false);
 
//   // ✅ News Fetch Function
//   const fetchNews = async (stateId = null, cityId = null) => {
//     setLoading(true);
//     try {
//       const res = await allNews();
//       if (res?.success) {
//         let filteredNews = res.data;
//         if (stateId) filteredNews = filteredNews.filter((item) => item.state?._id === stateId);
//         if (cityId) filteredNews = filteredNews.filter((item) => item.city?._id === cityId);
//         setNews(filteredNews);
//       } else {
//         setNews([]);
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setNews([]);
//     }
//     setLoading(false);
//   };
 

//   const linkStyle = { textDecoration: 'none', color: 'inherit' };
//   // ✅ State Select
//   const handleStateClick = async (state) => {
//     setActiveState(state);
//     setActiveCity(null);
//     fetchNews(state._id, null);
 
//     try {
//       const citiesRes = await getCitiesByState(state._id);
//       setCities(citiesRes.data || []);
//       setShowAllCities(false); // ✅ collapse city dropdown
//       setShowAllStates(false); // ✅ collapse state dropdown
//     } catch (error) {
//       console.error("Failed to fetch cities:", error);
//     }
//   };
 
//   // ✅ City Select
//   const handleCityClick = (city) => {
//     setActiveCity(city);
//     fetchNews(activeState?._id, city._id);
//     setShowAllCities(false); // ✅ collapse city dropdown
//   };
 
//   // ✅ Load States on Mount
//   useEffect(() => {
//     fetchNews();
//     getStatesByCountry("687a1e2185f0230715032380").then((res) => {
//       setStates(res.data || []);
//     });
//   }, []);
 
//   // ✅ Toggle Read More for News
//   const toggleReadMore = (id) => {
//     setExpandedNews((prev) => ({ ...prev, [id]: !prev[id] }));
//   };
 
//   return (
//     <Container fluid className="mt-4">
//       {/* Header */}
//       <div className="d-flex align-items-center mb-3">
//         <div className="d-flex align-items-center flex-shrink-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}></div>
//           <h5 className="fw-bold m-0 ms-2">अपना शहर चुनें</h5>
//         </div>
//         <hr className="flex-grow-1 mx-3 border-danger border-2 opacity-100" />
//       </div>
 
//       {/* ✅ States Selector */}
//       {!showAllStates ? (
//         <Row className="g-0 border-bottom flex-nowrap overflow-x-auto">
//           {states.slice(0, 7).map((state) => (
//             <Col
//               xs="auto"
//               key={state._id}
//               className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded-top" : ""}`}
//               onClick={() => handleStateClick(state)}
//               style={{ cursor: "pointer", minWidth: "90px" }}
//             >
//               <div style={{ height: "28px" }} className="d-flex justify-content-center align-items-center">
//                 <FaLandmarkDome size={20} />
//               </div>
//               <p className="small fw-bold m-0 mt-1">{state.name}</p>
//             </Col>
//           ))}
 
//           {/* 👉 More button right side inline */}
//           {states.length > 5 && (
//             <Col xs="auto" className="d-flex align-items-center">
//               <Button
//                 variant="outline-danger"
//                 size="sm"
//                 onClick={() => setShowAllStates(true)}
//               >
//                 <FaChevronRight />
//               </Button>
//             </Col>
//           )}
//         </Row>
//       ) : (
//         <Row className="g-2 border-bottom">
//           {states.map((state) => (
//             <Col
//               xs={6} sm={4} md={3} lg={2}
//               key={state._id}
//               className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded" : ""}`}
//               onClick={() => handleStateClick(state)}
//               style={{ cursor: "pointer" }}
//             >
//               <div style={{ height: "28px" }} className="d-flex justify-content-center align-items-center">
//                 <FaLandmarkDome size={20} />
//               </div>
//               <p className="small fw-bold m-0 mt-1">{state.name}</p>
//             </Col>
//           ))}
 
//           {/* 👇 Collapse (Up) button */}
//           {states.length > 5 && (
//             <div className="text-center my-2 w-100">
//               <Button
//                 variant="outline-danger"
//                 size="sm"
//                 onClick={() => setShowAllStates(false)}
//               >
//                 <FaChevronUp />
//               </Button>
//             </div>
//           )}
//         </Row>
//       )}
 
//       {/* ✅ Cities Selector */}
//       {cities.length > 0 && (
//         <>
//           {!showAllCities ? (
//             <Row className="g-2 bg-dark text-white p-2 flex-nowrap overflow-x-auto hide-scrollbar">
//               {cities.slice(0, 13).map((city) => (
//                 <Col xs="auto" key={city._id}>
//                   <Button
//                     variant={activeCity?._id === city._id ? "warning" : "outline-light"}
//                     size="sm"
//                     className="d-flex align-items-center justify-content-between w-100"
//                     onClick={() => handleCityClick(city)}
//                   >
//                     <span>{city.name}</span>
//                   </Button>
//                 </Col>
//               ))}
 
//               {cities.length > 7 && (
//                 <Col xs="auto">
//                   <Button
//                     variant="outline-light"
//                     size="sm"
//                     onClick={() => setShowAllCities(true)}
//                   >
//                     <FaChevronRight />
//                   </Button>
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <div className="bg-dark text-white p-2">
//               <Row className="g-2">
//                 {cities.map((city) => (
//                   <Col xs={6} sm={4} md={3} lg={2} key={city._id}>
//                     <Button
//                       variant={activeCity?._id === city._id ? "warning" : "outline-light"}
//                       size="sm"
//                       className="d-flex align-items-center justify-content-between w-100"
//                       onClick={() => handleCityClick(city)}
//                     >
//                       <span>{city.name}</span>
//                     </Button>
//                   </Col>
//                 ))}
//               </Row>
 
//               {cities.length > 5 && (
//                 <div className="text-center my-2">
//                   <Button
//                     variant="outline-light"
//                     size="sm"
//                     onClick={() => setShowAllCities(false)}
//                   >
//                     <FaChevronUp />
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}
 
//       {/* ✅ News Section */}
//       <div className="mt-4">
//   {loading ? (
//     <div className="text-center"><Spinner animation="border" /></div>
//   ) : news.length === 0 ? (
//     <p  className="text-center fw-bold my-4"></p>
//   ) : (
//     news.map((item) => {
//       const isExpanded = expandedNews[item._id];
//       const summary = item.summary || "";
//       const shortText = summary.length > 100 ? summary.slice(0, 100) + "..." : summary;

//       return (
//         <Link
//           to={`/news/${item._id}`}
//           key={item._id}
//           state={{ relatedArticles: news }}
//           style={linkStyle}
//           className="d-block"
//         >
//           <Row className="mb-3 border-bottom pb-2 g-0 align-items-center">
//   {/* IMAGE */}
//   <Col xs={12} md={3} className="pe-2">
//     <Image
//       src={item.media?.[0]?.url || "https://via.placeholder.com/150"}
//       fluid
//       style={{
//         height: "120px",   // 👈 chhota kiya
//         width: "150px",    // 👈 thoda kam width
//         objectFit: "cover",
//         borderRadius: "12px",
//       }}
//     />
//   </Col>

//   {/* TEXT */}
//   <Col xs={12} md={9} className="ps-2">
//     <h6 className="fw-bold mb-1">{item.title}</h6>
//     <p className="text-muted small mb-1">
//       {item.createdAtDate} | {item.createdBy?.name}
//     </p>
//     <p
//       className="text-muted mb-0"
//       style={{
//         display: "-webkit-box",
//         WebkitLineClamp: 2,   // 👈 sirf 2 line summary
//         WebkitBoxOrient: "vertical",
//         overflow: "hidden",
//       }}
//     >
//       {item.summary}
//     </p>
//   </Col>
// </Row>

//         </Link>
//       );
//     })
//   )}
// </div>

//     </Container>
//   );
// };
 
// export default City;
 


// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Spinner, Button } from "react-bootstrap";
// import { FaLandmarkDome, FaChevronRight, FaChevronUp } from "react-icons/fa6";
// import { allNews, getStatesByCountry, getCitiesByState } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar"; // ✅ Avatar component

// const City = () => {
//   const [activeState, setActiveState] = useState(null);
//   const [activeCity, setActiveCity] = useState(null);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [expandedNews, setExpandedNews] = useState({});
//   const [showAllStates, setShowAllStates] = useState(false);
//   const [showAllCities, setShowAllCities] = useState(false);

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   const fetchNews = async (stateId = null, cityId = null) => {
//     setLoading(true);
//     try {
//       const res = await allNews();
//       if (res?.success) {
//         let filteredNews = res.data;
//         if (stateId) filteredNews = filteredNews.filter((item) => item.state?._id === stateId);
//         if (cityId) filteredNews = filteredNews.filter((item) => item.city?._id === cityId);
//         setNews(filteredNews);
//       } else {
//         setNews([]);
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setNews([]);
//     }
//     setLoading(false);
//   };

//   const handleStateClick = async (state) => {
//     setActiveState(state);
//     setActiveCity(null);
//     fetchNews(state._id, null);

//     try {
//       const citiesRes = await getCitiesByState(state._id);
//       setCities(citiesRes.data || []);
//       setShowAllCities(false);
//       setShowAllStates(false);
//     } catch (error) {
//       console.error("Failed to fetch cities:", error);
//     }
//   };

//   const handleCityClick = (city) => {
//     setActiveCity(city);
//     fetchNews(activeState?._id, city._id);
//     setShowAllCities(false);
//   };

// useEffect(() => {
//   fetchNews();
//   getStatesByCountry("687a1e2185f0230715032380").then((res) => {
//     if (res.data) {
//       let statesList = res.data;

//       // ✅ Priority order define karo
//       const priority = ["Madhya Pradesh", "Chandigarh", "Delhi", "Rajasthan"];

//       // ✅ Sorting logic
//       statesList.sort((a, b) => {
//         const indexA = priority.indexOf(a.name);
//         const indexB = priority.indexOf(b.name);

//         if (indexA !== -1 && indexB !== -1) {
//           return indexA - indexB; // dono priority me hain
//         }
//         if (indexA !== -1) return -1; // a priority me hai
//         if (indexB !== -1) return 1; // b priority me hai
//         return a.name.localeCompare(b.name); // baki alphabetical
//       });

//       setStates(statesList);

//       // ✅ Default select Madhya Pradesh
//       const mpState = statesList.find((s) => s.name === "Madhya Pradesh");
//       if (mpState) {
//         setActiveState(mpState);
//         fetchNews(mpState._id, null);

//         getCitiesByState(mpState._id).then((citiesRes) => {
//           setCities(citiesRes.data || []);
//         });
//       }
//     }
//   });
// }, []);


//   const toggleReadMore = (id) => {
//     setExpandedNews((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <Container fluid className="mt-4">
//       {/* Header */}
//       <div className="d-flex align-items-center mb-3">
//         <div className="d-flex align-items-center flex-shrink-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}></div>
//           <h5 className="fw-bold m-0 ms-2">अपना शहर चुनें</h5>
//         </div>
//         <hr className="flex-grow-1 mx-3 border-danger border-2 opacity-100" />
//       </div>

//       {/* States Selector */}
//       {!showAllStates ? (
//         <Row className="g-0 border-bottom flex-nowrap overflow-x-auto">
//           {states.slice(0, 7).map((state) => (
//             <Col
//               xs="auto"
//               key={state._id}
//               className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded-top" : ""}`}
//               onClick={() => handleStateClick(state)}
//               style={{ cursor: "pointer", minWidth: "90px" }}
//             >
//               <div className="d-flex justify-content-center align-items-center" style={{ height: "28px" }}>
//                 <FaLandmarkDome size={20} />
//               </div>
//               <p className="small fw-bold m-0 mt-1">{state.name}</p>
//             </Col>
//           ))}
//           {states.length > 5 && (
//             <Col xs="auto" className="d-flex align-items-center">
//               <Button variant="outline-danger" size="sm" onClick={() => setShowAllStates(true)}>
//                 <FaChevronRight />
//               </Button>
//             </Col>
//           )}
//         </Row>
//       ) : (
//         <Row className="g-2 border-bottom">
//           {states.map((state) => (
//             <Col
//               xs={6} sm={4} md={3} lg={2}
//               key={state._id}
//               className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded" : ""}`}
//               onClick={() => handleStateClick(state)}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="d-flex justify-content-center align-items-center" style={{ height: "28px" }}>
//                 <FaLandmarkDome size={20} />
//               </div>
//               <p className="small fw-bold m-0 mt-1">{state.name}</p>
//             </Col>
//           ))}
//           {states.length > 5 && (
//             <div className="text-center my-2 w-100">
//               <Button variant="outline-danger" size="sm" onClick={() => setShowAllStates(false)}>
//                 <FaChevronUp />
//               </Button>
//             </div>
//           )}
//         </Row>
//       )}

//       {/* Cities Selector */}
//       {cities.length > 0 && (
//         <>
//           {!showAllCities ? (
//             <Row className="g-2 bg-dark text-white p-2 flex-nowrap overflow-x-auto hide-scrollbar">
//               {cities.slice(0, 13).map((city) => (
//                 <Col xs="auto" key={city._id}>
//                   <Button
//                     variant={activeCity?._id === city._id ? "warning" : "outline-light"}
//                     size="sm"
//                     onClick={() => handleCityClick(city)}
//                   >
//                     {city.name}
//                   </Button>
//                 </Col>
//               ))}
//               {cities.length > 7 && (
//                 <Col xs="auto">
//                   <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(true)}>
//                     <FaChevronRight />
//                   </Button>
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <div className="bg-dark text-white p-2">
//               <Row className="g-2">
//                 {cities.map((city) => (
//                   <Col xs={6} sm={4} md={3} lg={2} key={city._id}>
//                     <Button
//                       variant={activeCity?._id === city._id ? "warning" : "outline-light"}
//                       size="sm"
//                       onClick={() => handleCityClick(city)}
//                     >
//                       {city.name}
//                     </Button>
//                   </Col>
//                 ))}
//               </Row>
//               {cities.length > 5 && (
//                 <div className="text-center my-2">
//                   <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(false)}>
//                     <FaChevronUp />
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}

//       {/* News Section */}
//   {/* News Section */}
// <div className="mt-4">
//   {loading ? (
//     <div className="text-center"><Spinner animation="border" /></div>
//   ) : news.length === 0 ? (
//     <p className="text-center fw-bold my-4">No news found</p>
//   ) : (
//     <Row className="g-3">
//       {news.map((item) => (
//         <Col md={6} key={item._id}>
//           <Link
//             to={`/news/${item._id}`}
//             state={{ relatedArticles: news }}
//             style={linkStyle}
//             className="d-block"
//           >
//             <Row className="border-bottom pb-2 g-0 align-items-center">
//               {/* IMAGE */}
//               <Col xs={12} sm={4} className="pe-2">
//                 <Image
//                   src={item.media?.[0]?.url || "https://via.placeholder.com/150"}
//                   fluid
//                   style={{
//                     height: "120px",
//                     width: "100%",
//                     objectFit: "cover",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </Col>

//               {/* TEXT + AVATAR */}
//               <Col xs={12} sm={8} className="ps-2">
//                 <h6 className="fw-bold mb-1">{item.title}</h6>
//                 <div className="d-flex align-items-center mb-1">
//                   <UserAvatar user={item.createdBy} size={30} />
//                   <small className="text-muted ms-1">
//                     {item.createdBy?.name || "EMS News"} |{" "}
//                     {new Date(item.createdAt).toLocaleString("hi-IN", {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </small>
//                 </div>
//                 <p
//                   className="text-muted mb-0"
//                   style={{
//                     display: "-webkit-box",
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: "vertical",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {item.summary}
//                 </p>
//               </Col>
//             </Row>
//           </Link>
//         </Col>
//       ))}
//     </Row>
//   )}
// </div>

//     </Container>
//   );
// };

// export default City;



// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Spinner, Button } from "react-bootstrap";
// import { FaLandmarkDome, FaChevronRight, FaChevronUp } from "react-icons/fa6";
// import { allNews, getStatesByCountry, getCitiesByState } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const City = () => {
//   const [activeState, setActiveState] = useState(null);
//   const [activeCity, setActiveCity] = useState(null);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [showAllStates, setShowAllStates] = useState(false);
//   const [showAllCities, setShowAllCities] = useState(false);

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   const fetchNews = async (stateId = null, cityId = null) => {
//   setLoading(true);
//   try {
//     const res = await allNews();
//     if (res?.success) {
//       let filteredNews = res.data;

//       // ✅ Default filter: sirf wahi news jisme state ka id match kare
//       if (stateId) {
//         filteredNews = filteredNews.filter(
//           (item) => item?.state?._id === stateId
//         );
//       }

//       if (cityId) {
//         filteredNews = filteredNews.filter(
//           (item) => item?.city?._id === cityId
//         );
//       }

//       setNews(filteredNews);
//     } else {
//       setNews([]);
//     }
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     setNews([]);
//   }
//   setLoading(false);
// };


//   const handleStateClick = async (state) => {
//     setActiveState(state);
//     setActiveCity(null);
//     fetchNews(state._id, null);

//     try {
//       const citiesRes = await getCitiesByState(state._id);
//       setCities(citiesRes.data || []);
//       setShowAllCities(false);
//       setShowAllStates(false);
//     } catch (error) {
//       console.error("Failed to fetch cities:", error);
//     }
//   };

//   const handleCityClick = (city) => {
//     setActiveCity(city);
//     fetchNews(activeState?._id, city._id);
//     setShowAllCities(false);
//   };

//  useEffect(() => {
//   getStatesByCountry("687a1e2185f0230715032380").then((res) => {
//     if (res.data) {
//       let statesList = res.data;

//       const priority = ["Madhya Pradesh", "Chhattisgarh", "Delhi", "Rajasthan"];
//       statesList.sort((a, b) => {
//         const indexA = priority.indexOf(a.name);
//         const indexB = priority.indexOf(b.name);
//         if (indexA !== -1 && indexB !== -1) return indexA - indexB;
//         if (indexA !== -1) return -1;
//         if (indexB !== -1) return 1;
//         return a.name.localeCompare(b.name);
//       });

//       setStates(statesList);

//       // ✅ Default: Madhya Pradesh
//       const mpState = statesList.find((s) => s.name === "Madhya Pradesh");
//       if (mpState) {
//         setActiveState(mpState);

//         // ✅ Sirf MP ki news fetch hogi
//         fetchNews(mpState._id, null);

//         // ✅ MP ke cities bhi load ho jayenge
//         getCitiesByState(mpState._id).then((citiesRes) =>
//           setCities(citiesRes.data || [])
//         );
//       }
//     }
//   });
// }, []);


//   return (
//     <Container fluid className="mt-4">
//       {/* Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}></div>
//           <h5 className="fw-bold m-0 ms-2">अपना राज्य चुनें</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//       </div>

//       {/* States Selector */}
//       {!showAllStates ? (
//         <Row className="g-0 border-bottom flex-nowrap overflow-x-auto mb-2">
//           {states.slice(0, 7).map((state) => (
//             <Col
//               xs="auto"
//               key={state._id}
//               className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded-top" : ""}`}
//               onClick={() => handleStateClick(state)}
//               style={{ cursor: "pointer", minWidth: "90px" }}
//             >
//               <div className="d-flex justify-content-center align-items-center" style={{ height: "28px" }}>
//                 <FaLandmarkDome size={20} />
//               </div>
//               <p className="small fw-bold m-0 mt-1">{state.name}</p>
//             </Col>
//           ))}
//           {states.length > 5 && (
//             <Col xs="auto" className="d-flex align-items-center">
//               <Button variant="outline-danger" size="sm" onClick={() => setShowAllStates(true)}>
//                 <FaChevronRight />
//               </Button>
//             </Col>
//           )}
//         </Row>
//       ) : (
//         <Row className="g-2 border-bottom mb-2">
//           {states.map((state) => (
//             <Col xs={6} sm={4} md={3} lg={2} key={state._id}>
//               <div
//                 className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded" : ""}`}
//                 onClick={() => handleStateClick(state)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="d-flex justify-content-center align-items-center mb-1" style={{ height: "28px" }}>
//                   <FaLandmarkDome size={20} />
//                 </div>
//                 <p className="small fw-bold m-0">{state.name}</p>
//               </div>
//             </Col>
//           ))}
//           {states.length > 5 && (
//             <div className="text-center my-2 w-100">
//               <Button variant="outline-danger" size="sm" onClick={() => setShowAllStates(false)}>
//                 <FaChevronUp />
//               </Button>
//             </div>
//           )}
//         </Row>
//       )}

//       {/* Cities Selector */}
//       {cities.length > 0 && (
//         <>
//           {!showAllCities ? (
//             <Row className="g-2 bg-dark text-white p-2 flex-nowrap overflow-x-auto mb-2">
//               {cities.slice(0, 13).map((city) => (
//                 <Col xs="auto" key={city._id}>
//                   <Button
//                     variant={activeCity?._id === city._id ? "warning" : "outline-light"}
//                     size="sm"
//                     onClick={() => handleCityClick(city)}
//                   >
//                     {city.name}
//                   </Button>
//                 </Col>
//               ))}
//               {cities.length > 7 && (
//                 <Col xs="auto">
//                   <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(true)}>
//                     <FaChevronRight />
//                   </Button>
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <div className="bg-dark text-white p-2 mb-2">
//               <Row className="g-2">
//                 {cities.map((city) => (
//                   <Col xs={6} sm={4} md={3} lg={2} key={city._id}>
//                     <Button
//                       variant={activeCity?._id === city._id ? "warning" : "outline-light"}
//                       size="sm"
//                       onClick={() => handleCityClick(city)}
//                       className="w-100"
//                     >
//                       {city.name}
//                     </Button>
//                   </Col>
//                 ))}
//               </Row>
//               {cities.length > 5 && (
//                 <div className="text-center my-2">
//                   <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(false)}>
//                     <FaChevronUp />
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}

//       {/* News Section */}
//       <div className="mt-4">
//         {loading ? (
//           <div className="text-center"><Spinner animation="border" /></div>
//         ) : news.length === 0 ? (
//           <p className="text-center fw-bold my-4">No news found</p>
//         ) : (
//           <Row className="g-3">
//             {news.map((item) => (
//               <Col xs={12} md={6} key={item._id}>
//                 <Link
//                   to={`/news/${item._id}`}
//                   state={{ relatedArticles: news }}
//                   style={linkStyle}
//                   className="d-block"
//                 >
//                   <Row className="border-bottom pb-2 g-2 align-items-center">
//                     {/* IMAGE */}
//                     <Col xs={12} sm={4}>
//                       <Image
//                         src={item.media?.[0]?.url || "https://via.placeholder.com/150"}
//                         fluid
//                         className="rounded w-100"
//                         style={{ height: "120px", objectFit: "cover" }}
//                       />
//                     </Col>

//                     {/* TEXT + AVATAR */}
//                     <Col xs={12} sm={8}>
//                       <h6 className="fw-bold mb-1">{item.title}</h6>
//                       <div className="d-flex align-items-center mb-1">
//                         <UserAvatar user={item.createdBy} size={30} />
//                         <small className="text-muted ms-1">
//                           {item.createdBy?.name || "EMS News"} |{" "}
//                           {new Date(item.createdAt).toLocaleString("hi-IN", {
//                             day: "numeric",
//                             month: "long",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </small>
//                       </div>
//                       <p
//                         className="text-muted mb-0"
//                         style={{
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {item.summary}
//                       </p>
//                     </Col>
//                   </Row>
//                 </Link>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default City;



// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Spinner, Button } from "react-bootstrap";
// import { FaLandmarkDome, FaChevronRight, FaChevronUp } from "react-icons/fa6";
// import {
//   allNews,
//   getStatesByCountry,
//   getCitiesByState,
// } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const City = () => {
//   const [activeState, setActiveState] = useState(null);
//   const [activeCity, setActiveCity] = useState(null);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [showAllStates, setShowAllStates] = useState(false);
//   const [showAllCities, setShowAllCities] = useState(false);

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   // ✅ News fetcher
//   const fetchNews = async (stateId = null, cityId = null) => {
//     setLoading(true);
//     try {
//       const res = await allNews();
//       if (res?.success) {
//         let filteredNews = res.data;

//         if (stateId) {
//           filteredNews = filteredNews.filter(
//             (item) => item?.state?._id === stateId
//           );
//         }

//         if (cityId) {
//           filteredNews = filteredNews.filter(
//             (item) => item?.city?._id === cityId
//           );
//         }

//         setNews(filteredNews);
//       } else {
//         setNews([]);
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setNews([]);
//     }
//     setLoading(false);
//   };

//   // ✅ State select
//   const handleStateClick = async (state) => {
//     setActiveState(state);
//     setActiveCity(null);
//     fetchNews(state._id, null);

//     try {
//       const citiesRes = await getCitiesByState(state._id);
//       setCities(citiesRes.data || []);
//       setShowAllCities(false);
//       setShowAllStates(false);
//     } catch (error) {
//       console.error("Failed to fetch cities:", error);
//     }
//   };

//   // ✅ City select
//   const handleCityClick = (city) => {
//     setActiveCity(city);
//     fetchNews(activeState?._id, city._id);
//     setShowAllCities(false);
//   };

//   // ✅ Load States on mount
//   useEffect(() => {
//     getStatesByCountry("687a1e2185f0230715032380").then((res) => {
//       if (res.data) {
//         let statesList = res.data;

//         // Priority states ko top pe lao
//         const priority = ["Madhya Pradesh", "Chhattisgarh", "Delhi", "Rajasthan"];
//         statesList.sort((a, b) => {
//           const indexA = priority.indexOf(a.name);
//           const indexB = priority.indexOf(b.name);
//           if (indexA !== -1 && indexB !== -1) return indexA - indexB;
//           if (indexA !== -1) return -1;
//           if (indexB !== -1) return 1;
//           return a.name.localeCompare(b.name);
//         });

//         setStates(statesList);

//         // Default: Madhya Pradesh
//         const mpState = statesList.find((s) => s.name === "Madhya Pradesh");
//         if (mpState) {
//           setActiveState(mpState);
//           fetchNews(mpState._id, null);
//           getCitiesByState(mpState._id).then((citiesRes) =>
//             setCities(citiesRes.data || [])
//           );
//         }
//       }
//     });
//   }, []);

//   return (
//     <Container fluid className="mt-4">
//       {/* Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div
//             style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}
//           ></div>
//           <h5 className="fw-bold m-0 ms-2">अपना राज्य चुनें</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//       </div>

//       {/* States Selector */}
//       {!showAllStates ? (
//         <Row className="g-0 border-bottom flex-nowrap overflow-x-auto mb-2">
//           {states.slice(0, 7).map((state) => (
//             <Col
//               xs="auto"
//               key={state._id}
//               className={`text-center py-2 px-3 ${
//                 activeState?._id === state._id
//                   ? "bg-dark text-white rounded-top"
//                   : ""
//               }`}
//               onClick={() => handleStateClick(state)}
//               style={{ cursor: "pointer", minWidth: "90px" }}
//             >
//               <div
//                 className="d-flex justify-content-center align-items-center"
//                 style={{ height: "28px" }}
//               >
//                 <FaLandmarkDome size={20} />
//               </div>
//               <p className="small fw-bold m-0 mt-1">{state.name}</p>
//             </Col>
//           ))}
//           {states.length > 5 && (
//             <Col xs="auto" className="d-flex align-items-center">
//               <Button
//                 variant="outline-danger"
//                 size="sm"
//                 onClick={() => setShowAllStates(true)}
//               >
//                 <FaChevronRight />
//               </Button>
//             </Col>
//           )}
//         </Row>
//       ) : (
//         <Row className="g-2 border-bottom mb-2">
//           {states.map((state) => (
//             <Col xs={6} sm={4} md={3} lg={2} key={state._id}>
//               <div
//                 className={`text-center py-2 px-3 ${
//                   activeState?._id === state._id
//                     ? "bg-dark text-white rounded"
//                     : ""
//                 }`}
//                 onClick={() => handleStateClick(state)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div
//                   className="d-flex justify-content-center align-items-center mb-1"
//                   style={{ height: "28px" }}
//                 >
//                   <FaLandmarkDome size={20} />
//                 </div>
//                 <p className="small fw-bold m-0">{state.name}</p>
//               </div>
//             </Col>
//           ))}
//           {states.length > 5 && (
//             <div className="text-center my-2 w-100">
//               <Button
//                 variant="outline-danger"
//                 size="sm"
//                 onClick={() => setShowAllStates(false)}
//               >
//                 <FaChevronUp />
//               </Button>
//             </div>
//           )}
//         </Row>
//       )}

//       {/* Cities Selector */}
//       {cities.length > 0 && (
//         <>
//           {!showAllCities ? (
//             <Row className="g-2 bg-dark text-white p-2 flex-nowrap overflow-x-auto mb-2">
//               {cities.slice(0, 13).map((city) => (
//                 <Col xs="auto" key={city._id}>
//                   <Button
//                     variant={
//                       activeCity?._id === city._id ? "warning" : "outline-light"
//                     }
//                     size="sm"
//                     onClick={() => handleCityClick(city)}
//                   >
//                     {city.name}
//                   </Button>
//                 </Col>
//               ))}
//               {cities.length > 7 && (
//                 <Col xs="auto">
//                   <Button
//                     variant="outline-light"
//                     size="sm"
//                     onClick={() => setShowAllCities(true)}
//                   >
//                     <FaChevronRight />
//                   </Button>
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <div className="bg-dark text-white p-2 mb-2">
//               <Row className="g-2">
//                 {cities.map((city) => (
//                   <Col xs={6} sm={4} md={3} lg={2} key={city._id}>
//                     <Button
//                       variant={
//                         activeCity?._id === city._id ? "warning" : "outline-light"
//                       }
//                       size="sm"
//                       onClick={() => handleCityClick(city)}
//                       className="w-100"
//                     >
//                       {city.name}
//                     </Button>
//                   </Col>
//                 ))}
//               </Row>
//               {cities.length > 5 && (
//                 <div className="text-center my-2">
//                   <Button
//                     variant="outline-light"
//                     size="sm"
//                     onClick={() => setShowAllCities(false)}
//                   >
//                     <FaChevronUp />
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}

//       {/* News Section */}
//       <div className="mt-4">
//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" />
//           </div>
//         ) : news.length === 0 ? (
//           <p className="text-center fw-bold my-4">No news found</p>
//         ) : (
//           <Row className="g-3">
//             {news.map((item) => (
//               <Col xs={12} md={6} key={item._id}>
//                 <Link
//                   to={`/news/${item.slug_en || item._id}`} // ✅ Slug preferred, fallback id
//                   state={{ relatedArticles: news }}
//                   style={linkStyle}
//                   className="d-block"
//                 >
//                   <Row className="border-bottom pb-2 g-2 align-items-center">
//                     {/* IMAGE */}
//                     <Col xs={12} sm={4}>
//                       <Image
//                         src={
//                           item.media?.[0]?.url ||
//                           "https://via.placeholder.com/150"
//                         }
//                         fluid
//                         className="rounded w-100"
//                         style={{ height: "120px", objectFit: "cover" }}
//                       />
//                     </Col>

//                     {/* TEXT + AVATAR */}
//                     <Col xs={12} sm={8}>
//                       <h6 className="fw-bold mb-1">{item.title}</h6>
//                       <div className="d-flex align-items-center mb-1">
//                         <UserAvatar user={item.createdBy} size={30} />
//                         <small className="text-muted ms-1">
//                           {item.createdBy?.name || "EMS News"} |{" "}
//                           {new Date(item.createdAt).toLocaleString("hi-IN", {
//                             day: "numeric",
//                             month: "long",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </small>
//                       </div>
//                       <p
//                         className="text-muted mb-0"
//                         style={{
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {item.summary}
//                       </p>
//                     </Col>
//                   </Row>
//                 </Link>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default City;




// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Spinner, Button } from "react-bootstrap";
// import { FaLandmarkDome, FaChevronRight, FaChevronUp } from "react-icons/fa6";
// import {
//   allNews,            // 🔹 API: fetch all news
//   getStatesByCountry,  // 🔹 API: fetch states by country
//   getCitiesByState     // 🔹 API: fetch cities by state
// } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const City = () => {
//   // 🔹 State variables
//   const [activeState, setActiveState] = useState(null);
//   const [activeCity, setActiveCity] = useState(null);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [showAllStates, setShowAllStates] = useState(false);
//   const [showAllCities, setShowAllCities] = useState(false);

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   // 🔹 News fetcher: filtered by stateId and cityId
//   const fetchNews = async (stateId = null, cityId = null) => {
//     setLoading(true);
//     try {
//       const res = await allNews(); // 🔹 Fetch all news
//       if (res?.success) {
//         let filteredNews = res.data;

//         // 🔹 Filter by state
//         if (stateId) filteredNews = filteredNews.filter(item => item?.state?._id === stateId);

//         // 🔹 Filter by city
//         if (cityId) filteredNews = filteredNews.filter(item => item?.city?._id === cityId);

//         setNews(filteredNews);
//       } else {
//         setNews([]);
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setNews([]);
//     }
//     setLoading(false);
//   };

//   // 🔹 When user clicks on a state
//   const handleStateClick = async (state) => {
//     setActiveState(state);
//     setActiveCity(null);
//     fetchNews(state._id, null); // fetch news by state

//     try {
//       const citiesRes = await getCitiesByState(state._id); // 🔹 Fetch cities for selected state
//       setCities(citiesRes.data || []);
//       setShowAllCities(false);
//       setShowAllStates(false);
//     } catch (error) {
//       console.error("Failed to fetch cities:", error);
//     }
//   };

//   // 🔹 When user clicks on a city
//   const handleCityClick = (city) => {
//     setActiveCity(city);
//     fetchNews(activeState?._id, city._id); // fetch news by state + city
//     setShowAllCities(false);
//   };

//   // 🔹 Load states on component mount
//   useEffect(() => {
//     getStatesByCountry("687a1e2185f0230715032380") // 🔹 Country ID API key
//       .then((res) => {
//         if (res.data) {
//           let statesList = res.data;

//           // 🔹 Prioritize some states
//           const priority = ["Madhya Pradesh", "Chhattisgarh", "Delhi", "Rajasthan"];
//           statesList.sort((a, b) => {
//             const indexA = priority.indexOf(a.name);
//             const indexB = priority.indexOf(b.name);
//             if (indexA !== -1 && indexB !== -1) return indexA - indexB;
//             if (indexA !== -1) return -1;
//             if (indexB !== -1) return 1;
//             return a.name.localeCompare(b.name);
//           });

//           setStates(statesList);

//           // 🔹 Default: Madhya Pradesh
//           const mpState = statesList.find((s) => s.name === "Madhya Pradesh");
//           if (mpState) {
//             setActiveState(mpState);
//             fetchNews(mpState._id, null); // fetch news for default state
//             getCitiesByState(mpState._id).then((citiesRes) =>
//               setCities(citiesRes.data || [])
//             );
//           }
//         }
//       });
//   }, []);

//   return (
//     <Container fluid className="mt-4">
//       {/* Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}></div>
//           <h5 className="fw-bold m-0 ms-2">अपना राज्य चुनें</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//       </div>

//       {/* States Selector */}
//       {!showAllStates ? (
//         <Row className="g-0 border-bottom flex-nowrap overflow-x-auto mb-2">
//           {states.slice(0, 7).map((state) => (
//             <Col
//               xs="auto"
//               key={state._id}
//               className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded-top" : ""}`}
//               onClick={() => handleStateClick(state)}
//               style={{ cursor: "pointer", minWidth: "90px" }}
//             >
//               <div className="d-flex justify-content-center align-items-center" style={{ height: "28px" }}>
//                 <FaLandmarkDome size={20} />
//               </div>
//               <p className="small fw-bold m-0 mt-1">{state.name}</p>
//             </Col>
//           ))}
//           {states.length > 5 && (
//             <Col xs="auto" className="d-flex align-items-center">
//               <Button variant="outline-danger" size="sm" onClick={() => setShowAllStates(true)}>
//                 <FaChevronRight />
//               </Button>
//             </Col>
//           )}
//         </Row>
//       ) : (
//         <Row className="g-2 border-bottom mb-2">
//           {states.map((state) => (
//             <Col xs={6} sm={4} md={3} lg={2} key={state._id}>
//               <div
//                 className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded" : ""}`}
//                 onClick={() => handleStateClick(state)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="d-flex justify-content-center align-items-center mb-1" style={{ height: "28px" }}>
//                   <FaLandmarkDome size={20} />
//                 </div>
//                 <p className="small fw-bold m-0">{state.name}</p>
//               </div>
//             </Col>
//           ))}
//           {states.length > 5 && (
//             <div className="text-center my-2 w-100">
//               <Button variant="outline-danger" size="sm" onClick={() => setShowAllStates(false)}>
//                 <FaChevronUp />
//               </Button>
//             </div>
//           )}
//         </Row>
//       )}

//       {/* Cities Selector */}
//       {cities.length > 0 && (
//         <>
//           {!showAllCities ? (
//             <Row className="g-2 bg-dark text-white p-2 flex-nowrap overflow-x-auto mb-2">
//               {cities.slice(0, 13).map((city) => (
//                 <Col xs="auto" key={city._id}>
//                   <Button
//                     variant={activeCity?._id === city._id ? "warning" : "outline-light"}
//                     size="sm"
//                     onClick={() => handleCityClick(city)}
//                   >
//                     {city.name}
//                   </Button>
//                 </Col>
//               ))}
//               {cities.length > 7 && (
//                 <Col xs="auto">
//                   <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(true)}>
//                     <FaChevronRight />
//                   </Button>
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <div className="bg-dark text-white p-2 mb-2">
//               <Row className="g-2">
//                 {cities.map((city) => (
//                   <Col xs={6} sm={4} md={3} lg={2} key={city._id}>
//                     <Button
//                       variant={activeCity?._id === city._id ? "warning" : "outline-light"}
//                       size="sm"
//                       onClick={() => handleCityClick(city)}
//                       className="w-100"
//                     >
//                       {city.name}
//                     </Button>
//                   </Col>
//                 ))}
//               </Row>
//               {cities.length > 5 && (
//                 <div className="text-center my-2">
//                   <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(false)}>
//                     <FaChevronUp />
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}

//       {/* News Section */}
//       <div className="mt-4">
//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" />
//           </div>
//         ) : news.length === 0 ? (
//           <p className="text-center fw-bold my-4">No news found</p>
//         ) : (
//           <Row className="g-3">
//             {news.map((item) => (
//               <Col xs={12} md={6} key={item._id}>
//                 <Link
//                   to={`/news/${item.slug_en || item._id}`} // 🔹 Slug preferred, fallback to _id
//                   state={{ relatedArticles: news }}
//                   style={linkStyle}
//                   className="d-block"
//                 >
//                   <Row className="border-bottom pb-2 g-2 align-items-center">
//                     {/* IMAGE */}
//                     <Col xs={12} sm={4}>
//                       <Image
//                         src={item.media?.[0]?.url || "https://via.placeholder.com/150"}
//                         fluid
//                         className="rounded w-100"
//                         style={{ height: "120px", objectFit: "cover" }}
//                       />
//                     </Col>

//                     {/* TEXT + AVATAR */}
//                     <Col xs={12} sm={8}>
//                       <h6 className="fw-bold mb-1">{item.title_hi || item.title_en}</h6> {/* 🔹 Hindi fallback */}
//                       <div className="d-flex align-items-center mb-1">
//                         <UserAvatar user={item.createdBy} size={30} />
//                         <small className="text-muted ms-1">
//                           {item.createdBy?.name || "EMS News"} |{" "}
//                           {new Date(item.createdAt).toLocaleString("hi-IN", {
//                             day: "numeric",
//                             month: "long",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </small>
//                       </div>
//                       <p
//                         className="text-muted mb-0"
//                         style={{
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {item.summary_hi || item.summary_en} {/* 🔹 Summary Hindi fallback */}
//                       </p>
//                     </Col>
//                   </Row>
//                 </Link>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default City;


import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Spinner, Button, Alert } from "react-bootstrap";
import { FaLandmarkDome, FaChevronRight, FaChevronUp } from "react-icons/fa6";
import {
  allNews,
  getStatesByCountry,
  getCitiesByState
} from "../../Services/authApi";
import { Link } from "react-router-dom";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

const City = () => {
  const [activeState, setActiveState] = useState(null);
  const [activeCity, setActiveCity] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showAllStates, setShowAllStates] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);
  const [statesError, setStatesError] = useState(null);
  const [citiesError, setCitiesError] = useState(null);
  const [newsError, setNewsError] = useState(null);

  const linkStyle = { textDecoration: "none", color: "inherit" };
  const INDIA_COUNTRY_ID = "687a1e2185f0230715032380"; // Country ID as a constant

  const fetchNews = async (stateId = null, cityId = null) => {
    setLoading(true);
    setNewsError(null);
    try {
      const res = await allNews();
      if (res?.success) {
        let filteredNews = res.data;

        if (stateId) filteredNews = filteredNews.filter(item => item?.state?._id === stateId);
        if (cityId) filteredNews = filteredNews.filter(item => item?.city?._id === cityId);

        setNews(filteredNews);
      } else {
        setNews([]);
        setNewsError("Failed to load news for selected region.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
      setNewsError(error.message || "Error fetching news.");
    }
    setLoading(false);
  };

  const handleStateClick = async (state) => {
    setActiveState(state);
    setActiveCity(null);
    fetchNews(state._id, null);

    setCitiesError(null);
    try {
      const citiesRes = await getCitiesByState(state._id);
      if (citiesRes.data) {
        setCities(citiesRes.data);
      } else {
        setCities([]);
        setCitiesError("No cities found for this state.");
      }
      setShowAllCities(false);
      setShowAllStates(false);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      setCities([]);
      setCitiesError(error.message || "Failed to fetch cities.");
    }
  };

  const handleCityClick = (city) => {
    setActiveCity(city);
    fetchNews(activeState?._id, city._id);
    setShowAllCities(false);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setStatesError(null);
      try {
        const res = await getStatesByCountry(INDIA_COUNTRY_ID);
        if (res.data) {
          let statesList = res.data;

          const priority = ["Madhya Pradesh", "Chhattisgarh", "Delhi", "Rajasthan"];
          statesList.sort((a, b) => {
            const indexA = priority.indexOf(a.name);
            const indexB = priority.indexOf(b.name);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.name.localeCompare(b.name);
          });

          setStates(statesList);

          const mpState = statesList.find((s) => s.name === "Madhya Pradesh");
          if (mpState) {
            setActiveState(mpState);
            fetchNews(mpState._id, null);
            setCitiesError(null);
            try {
              const citiesRes = await getCitiesByState(mpState._id);
              if (citiesRes.data) {
                setCities(citiesRes.data);
              } else {
                setCities([]);
                setCitiesError("No cities found for Madhya Pradesh.");
              }
            } catch (error) {
              console.error("Failed to fetch cities for MP:", error);
              setCities([]);
              setCitiesError(error.message || "Failed to fetch cities for Madhya Pradesh.");
            }
          }
        } else {
          setStates([]);
          setStatesError("Failed to load states.");
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]);
        setStatesError(error.message || "Error fetching states.");
      }
    };
    loadInitialData();
  }, []);

  return (
    <Container fluid className="mt-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}></div>
          <h5 className="fw-bold m-0 ms-2">अपना राज्य चुनें</h5>
        </div>
        <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
      </div>

      {statesError && <Alert variant="danger" className="my-2">{statesError}</Alert>}

      {/* States Selector */}
      {!showAllStates ? (
        <Row className="g-0 border-bottom flex-nowrap overflow-x-auto mb-2" style={{ WebkitOverflowScrolling: "touch" }}>
          {states.slice(0, 7).map((state) => (
            <Col
              xs="auto"
              key={state._id}
              className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded-top" : ""}`}
              onClick={() => handleStateClick(state)}
              style={{ cursor: "pointer", minWidth: "90px" }}
            >
              <div className="d-flex justify-content-center align-items-center" style={{ height: "28px" }}>
                <FaLandmarkDome size={20} />
              </div>
              <p className="small fw-bold m-0 mt-1 text-nowrap">{state.name}</p>
            </Col>
          ))}
          {states.length > 7 && (
            <Col xs="auto" className="d-flex align-items-center">
              <Button variant="outline-danger" size="sm" onClick={() => setShowAllStates(true)}>
                <FaChevronRight />
              </Button>
            </Col>
          )}
        </Row>
      ) : (
        <Row className="g-2 border-bottom mb-2">
          {states.map((state) => (
            <Col xs={6} sm={4} md={3} lg={2} key={state._id}>
              <div
                className={`text-center py-2 px-3 ${activeState?._id === state._id ? "bg-dark text-white rounded" : ""}`}
                onClick={() => handleStateClick(state)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex justify-content-center align-items-center mb-1" style={{ height: "28px" }}>
                  <FaLandmarkDome size={20} />
                </div>
                <p className="small fw-bold m-0">{state.name}</p>
              </div>
            </Col>
          ))}
          {states.length > 7 && (
            <div className="text-center my-2 w-100">
              <Button variant="outline-danger" size="sm" onClick={() => setShowAllStates(false)}>
                <FaChevronUp />
              </Button>
            </div>
          )}
        </Row>
      )}

      {citiesError && <Alert variant="danger" className="my-2">{citiesError}</Alert>}

      {/* Cities Selector */}
      {cities.length > 0 && (
        <>
          {!showAllCities ? (
            <Row className="g-2 bg-dark text-white p-2 flex-nowrap overflow-x-auto mb-2" style={{ WebkitOverflowScrolling: "touch" }}>
              {cities.slice(0, 13).map((city) => (
                <Col xs="auto" key={city._id}>
                  <Button
                    variant={activeCity?._id === city._id ? "warning" : "outline-light"}
                    size="sm"
                    onClick={() => handleCityClick(city)}
                    className="text-nowrap"
                  >
                    {city.name}
                  </Button>
                </Col>
              ))}
              {cities.length > 13 && (
                <Col xs="auto">
                  <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(true)}>
                    <FaChevronRight />
                  </Button>
                </Col>
              )}
            </Row>
          ) : (
            <div className="bg-dark text-white p-2 mb-2">
              <Row className="g-2">
                {cities.map((city) => (
                  <Col xs={6} sm={4} md={3} lg={2} key={city._id}>
                    <Button
                      variant={activeCity?._id === city._id ? "warning" : "outline-light"}
                      size="sm"
                      onClick={() => handleCityClick(city)}
                      className="w-100"
                    >
                      {city.name}
                    </Button>
                  </Col>
                ))}
              </Row>
              {cities.length > 13 && (
                <div className="text-center my-2">
                  <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(false)}>
                    <FaChevronUp />
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* News Section */}
      <div className="mt-4">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p className="mt-2">Loading news...</p>
          </div>
        ) : newsError ? (
          <Alert variant="danger" className="my-4">{newsError}</Alert>
        ) : news.length === 0 ? (
          <p className="text-center fw-bold my-4">No news found for the selected region.</p>
        ) : (
          <Row className="g-3">
            {news.map((item) => (
              <Col xs={12} md={6} key={item._id}>
                <Link
                  to={`/news/${item.slug_en || item._id}`}
                  state={{ relatedArticles: news }}
                  style={linkStyle}
                  className="d-block"
                >
                  <Row className="border-bottom pb-2 g-2 align-items-center">
                    {/* IMAGE */}
                    <Col xs={12} sm={4}>
                      <Image
                        src={item.media?.[0]?.url || "https://via.placeholder.com/150"}
                        fluid
                        className="rounded w-100"
                        style={{ height: "120px", objectFit: "cover" }}
                      />
                    </Col>

                    {/* TEXT + AVATAR */}
                    <Col xs={12} sm={8}>
                      <h6 className="fw-bold mb-1 text-wrap">{item.title_hi || item.title_en}</h6>
                      <div className="d-flex align-items-center mb-1 flex-wrap">
                        <UserAvatar user={item.createdBy} size={30} />
                        <small className="text-muted ms-1 text-wrap">
                          {item.createdBy?.name || "EMS News"} |{" "}
                          {new Date(item.publishedAt).toLocaleString("hi-IN", {
                            day: "numeric",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </small>
                      </div>
                      <p
                        className="text-muted mb-0 text-wrap"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.summary_hi || item.summary_en}
                      </p>
                    </Col>
                  </Row>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
};

export default City;