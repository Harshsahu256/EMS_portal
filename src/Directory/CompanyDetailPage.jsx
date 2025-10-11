// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup } from "react-bootstrap";
// import { 
//   FaCheckCircle, 
//   FaGlobe, 
//   FaMapMarkerAlt, 
//   FaPhone, 
//   FaEnvelope, 
//   FaFacebook, 
//   FaTwitter, 
//   FaInstagram, 
//   FaLinkedin,
//   FaArrowLeft // बैक बटन के लिए
// } from 'react-icons/fa';

// import { getCompanyById } from "../Services/authApi"; // <--- यह महत्वपूर्ण आयात है

// // प्लेसहोल्डर इमेज
// const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP"; 

// const CompanyDetailPage = () => {
//   const { companyId } = useParams(); // URL पैरामीटर से companyId प्राप्त करें
//   const location = useLocation();
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//  useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       setError(null); 
//       setLoading(true);

//       if (location.state && location.state.companyDetails) {
//         console.log("Using company details from location.state.");
//         setCompany(location.state.companyDetails);
//         setLoading(false);
//       } else {
//         console.log("Fetching company details via API for ID:", companyId);
//         try {
//           // getCompanyById अब { success: boolean, message: string, data: companyObject } लौटाएगा
//           const res = await getCompanyById(companyId); 
//           console.log("CompanyDetailPage received from getCompanyById API call:", res);

//           if (res.success && res.data) {
//             setCompany(res.data); // <-- res.data में सीधे कंपनी ऑब्जेक्ट होनी चाहिए
//           } else {
//             setError(res.message || "Failed to fetch company details by ID.");
//             setCompany(null);
//           }
//         } catch (err) {
//           // getCompanyById में त्रुटियों को पहले ही संभाला गया है और एक `{ success: false, message: ... }` लौटाया गया है,
//           // इसलिए यह catch ब्लॉक शायद ही कभी ट्रिगर होगा जब तक कि कोई अप्रत्याशित नेटवर्क समस्या न हो।
//           console.error("An unexpected error occurred in CompanyDetailPage's fetch:", err);
//           setError("An unexpected client-side error occurred.");
//           setCompany(null);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
    
//     fetchCompanyDetails();
//   }, [companyId, location.state]); // companyId या location.state बदलने पर प्रभाव को फिर से चलाएं

//   // स्टार रेटिंग रेंडर करने के लिए हेल्पर फ़ंक्शन
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<span key={i} className="text-warning">&#9733;</span>);
//     }
//     if (rating % 1 !== 0 && rating > 0) {
//       stars.push(<span key="half" className="text-warning">&#9734;</span>);
//     }
//     for (let i = stars.length; i < 5; i++) {
//       stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
//     }
//     return stars;
//   };

//   // 'Get Quote' बटन के लिए शैली
//   const getQuoteButtonStyle = {
//     backgroundColor: '#c00',
//     borderColor: '#c00',
//     color: '#fff',
//     padding: '0.5rem 1.5rem',
//     fontSize: '1rem'
//   };

//   // 'Contact' बटन के लिए शैली
//   const contactButtonStyle = {
//     borderColor: '#c00',
//     color: '#c00',
//     backgroundColor: 'transparent',
//     padding: '0.5rem 1.5rem',
//     fontSize: '1rem'
//   };

//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//         <p className="mt-3">Loading company details...</p>
//       </Container>
//     );
//   }

//   if (error || !company) {
//     return (
//       <Container className="py-5">
//         <Alert variant="danger">
//           <strong>Error:</strong> {error || "Company not found."}
//         </Alert>
//         <div className="text-center mt-4">
//           <Link to="/directory">
//             <Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>
//               Back to Directory
//             </Button>
//           </Link>
//         </div>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-5">
//       <Row className="mb-4">
//         <Col md={12}>
//           <Button variant="link" onClick={() => window.history.back()} className="mb-3 d-flex align-items-center" style={{ color: '#c00' }}>
//             <FaArrowLeft className="me-2" /> Back to Category
//           </Button>
//           <Card className="p-4 shadow-sm">
//             <Row>
//               <Col md={4} className="text-center mb-3 mb-md-0">
//                 <img
//                   src={company.logo || yellowpagesPlaceholder}
//                   alt={company.name}
//                   style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "cover", borderRadius: "8px" }}
//                   onError={(e) => { e.target.onerror = null; e.target.src = yellowpagesPlaceholder; }}
//                   className="img-fluid"
//                 />
//               </Col>
//               <Col md={8}>
//                 <div className="d-flex align-items-center mb-2">
//                   <h2 className="mb-0 me-2">{company.name}</h2>
//                   {company.isApproved && <FaCheckCircle className="text-success fs-4" />}
//                 </div>
//                 {company.category?.name && <p className="text-muted mb-1 small">{company.category.name}</p>}
//                 <div className="d-flex align-items-center mb-2">
//                   {renderStars(company.averageRating || 0)}
//                   <span className="ms-1 fw-bold">{company.averageRating?.toFixed(1) || 0}</span>
//                   <span className="ms-2 text-muted">({company.reviews?.length || 0} Reviews)</span>
//                 </div>
//                 {company.description && <p className="lead mb-3">{company.description}</p>}

//                 <div className="mt-3">
//                   <Button variant="danger" className="me-2" style={getQuoteButtonStyle}>
//                     Get Quote
//                   </Button>
//                   <Button variant="outline-danger" style={contactButtonStyle}>
//                     Contact
//                   </Button>
//                 </div>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={6} className="mb-4">
//           <Card className="p-3 shadow-sm">
//             <Card.Title className="mb-3">Contact Information</Card.Title>
//             <ListGroup variant="flush">
//               {company.phone && (
//                 <ListGroup.Item className="d-flex align-items-center">
//                   <FaPhone className="me-2 text-muted" /> {company.phone}
//                 </ListGroup.Item>
//               )}
//               {company.email && (
//                 <ListGroup.Item className="d-flex align-items-center">
//                   <FaEnvelope className="me-2 text-muted" /> {company.email}
//                 </ListGroup.Item>
//               )}
//               {(company.address || company.city || company.state || company.country) && (
//                 <ListGroup.Item className="d-flex align-items-center">
//                   <FaMapMarkerAlt className="me-2 text-muted" />
//                   {[company.address, company.city, company.state, company.country].filter(Boolean).join(", ")}
//                 </ListGroup.Item>
//               )}
//               {company.website && (
//                 <ListGroup.Item className="d-flex align-items-center">
//                   <FaGlobe className="me-2 text-muted" />
//                   <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
//                 </ListGroup.Item>
//               )}
//               {company.googleMapsLink && (
//                 <ListGroup.Item className="d-flex align-items-center">
//                   <FaMapMarkerAlt className="me-2 text-muted" />
//                   <a href={company.googleMapsLink} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
//                 </ListGroup.Item>
//               )}
//             </ListGroup>
//           </Card>
//         </Col>

//         <Col md={6} className="mb-4">
//           <Card className="p-3 shadow-sm">
//             <Card.Title className="mb-3">Business Details</Card.Title>
//             <ListGroup variant="flush">
//               {company.gstNumber && <ListGroup.Item>GST Number: {company.gstNumber}</ListGroup.Item>}
//               {company.companyType && <ListGroup.Item>Company Type: {company.companyType}</ListGroup.Item>}
//               {company.businessTimings && (
//                 <ListGroup.Item>
//                   <p className="fw-bold mb-1">Business Timings:</p>
//                   {Object.entries(company.businessTimings).map(([day, timings]) => (
//                     timings.open && timings.close && (
//                       <p key={day} className="mb-0 small">
//                         {day.charAt(0).toUpperCase() + day.slice(1)}: {timings.open} - {timings.close}
//                       </p>
//                     )
//                   ))}
//                 </ListGroup.Item>
//               )}
//               {company.keywords && company.keywords.length > 0 && (
//                 <ListGroup.Item>
//                   <p className="fw-bold mb-1">Keywords:</p>
//                   <span>{company.keywords.join(", ")}</span>
//                 </ListGroup.Item>
//               )}
//             </ListGroup>
//           </Card>
//         </Col>

//         {company.socialLinks && company.socialLinks.length > 0 && (
//             <Col md={12} className="mb-4">
//               <Card className="p-3 shadow-sm">
//                 <Card.Title className="mb-3">Social Media</Card.Title>
//                 <div className="d-flex gap-3 flex-wrap">
//                   {company.socialLinks.map((link, index) => {
//                     let iconComponent = <FaGlobe />; // Default icon
//                     try { // URL पार्स करते समय त्रुटियों से बचने के लिए
//                       let domain = new URL(link).hostname;
//                       if (domain.includes('facebook.com')) {
//                         iconComponent = <FaFacebook />;
//                       } else if (domain.includes('twitter.com')) {
//                         iconComponent = <FaTwitter />;
//                       } else if (domain.includes('instagram.com')) {
//                         iconComponent = <FaInstagram />;
//                       } else if (domain.includes('linkedin.com')) {
//                         iconComponent = <FaLinkedin />;
//                       }
//                     } catch (e) {
//                       console.warn("Invalid social link URL:", link, e);
//                     }

//                     return (
//                       <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
//                         <Button variant="outline-primary" className="d-flex align-items-center">
//                           {iconComponent} <span className="ms-2">{link.replace(/(^\w+:|^)\/\//, '').split('/')[0]}</span>
//                         </Button>
//                       </a>
//                     );
//                   })}
//                 </div>
//               </Card>
//             </Col>
//           )}
//       </Row>

//       <div className="text-center mt-5">
//         <Link to="/directory">
//           <Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>
//             Back to Directory
//           </Button>
//         </Link>
//       </div>
//     </Container>
//   );
// };

// export default CompanyDetailPage;


// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup, Image } from "react-bootstrap";
// import { 
//   FaCheckCircle, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowLeft 
// } from 'react-icons/fa';
// import { getCompanyById } from "../Services/authApi";

// const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP"; 

// const CompanyDetailPage = () => {
//   const { companyId } = useParams();
//   const location = useLocation();
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       setError(null); 
//       setLoading(true);

//       if (location.state && location.state.companyDetails) {
//         setCompany(location.state.companyDetails);
//         setLoading(false);
//       } else {
//         try {
//           const res = await getCompanyById(companyId);
//           if (res.success && res.data) setCompany(res.data);
//           else setError(res.message || "Failed to fetch company details.");
//         } catch (err) {
//           setError(err.message || "Unexpected error occurred.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchCompanyDetails();
//   }, [companyId, location.state]);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-warning">&#9733;</span>);
//     if (rating % 1 !== 0 && rating > 0) stars.push(<span key="half" className="text-warning">&#9734;</span>);
//     for (let i = stars.length; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
//     return stars;
//   };

//   if (loading) return <Spinner animation="border" className="my-3" />;
//   if (error || !company) return (
//     <Container className="py-5">
//       <Alert variant="danger">{error || "Company not found."}</Alert>
//       <Link to="/directory"><Button variant="danger">Back to Directory</Button></Link>
//     </Container>
//   );

//   return (
//     <Container className="py-5">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col md={12}>
//           <Button variant="link" onClick={() => window.history.back()} className="mb-3 d-flex align-items-center" style={{ color: '#c00' }}>
//             <FaArrowLeft className="me-2" /> Back
//           </Button>
//           <Card className="p-4 shadow-sm">
//             <Row>
//               <Col md={4} className="text-center mb-3 mb-md-0">
//                 <img
//                   src={company.logo || yellowpagesPlaceholder}
//                   alt={company.name}
//                   style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "cover", borderRadius: "8px" }}
//                   className="img-fluid"
//                 />
//               </Col>
//               <Col md={8}>
//                 <div className="d-flex align-items-center mb-2">
//                   <h2 className="mb-0 me-2">{company.name}</h2>
//                   {company.isApproved && <FaCheckCircle className="text-success fs-4" />}
//                 </div>
//                 {company.category?.name && <p className="text-muted mb-1 small">{company.category.name}</p>}
//                 <div className="d-flex align-items-center mb-2">
//                   {renderStars(company.averageRating || 0)}
//                   <span className="ms-1 fw-bold">{company.averageRating?.toFixed(1) || 0}</span>
//                   <span className="ms-2 text-muted">({company.reviews?.length || 0} Reviews)</span>
//                 </div>
//                 {company.description && <p className="lead mb-3">{company.description}</p>}

//                 <div className="mt-3">
//                   <Button variant="danger" className="me-2">Get Quote</Button>
//                   <Button variant="outline-danger">Contact</Button>
//                 </div>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>

//       {/* Contact & Business Info */}
//       <Row>
//         <Col md={6} className="mb-4">
//           <Card className="p-3 shadow-sm">
//             <Card.Title>Contact Information</Card.Title>
//             <ListGroup variant="flush">
//               {company.phone && <ListGroup.Item><FaPhone /> {company.phone}</ListGroup.Item>}
//               {company.email && <ListGroup.Item><FaEnvelope /> {company.email}</ListGroup.Item>}
//               {(company.address || company.city || company.state || company.country) && 
//                 <ListGroup.Item><FaMapMarkerAlt /> {[company.address, company.city, company.state, company.country].filter(Boolean).join(", ")}</ListGroup.Item>
//               }
//               {company.website && <ListGroup.Item><FaGlobe /> <a href={company.website} target="_blank">{company.website}</a></ListGroup.Item>}
//             </ListGroup>
//           </Card>
//         </Col>

//         <Col md={6} className="mb-4">
//           <Card className="p-3 shadow-sm">
//             <Card.Title>Business Details</Card.Title>
//             <ListGroup variant="flush">
//               {company.gstNumber && <ListGroup.Item>GST Number: {company.gstNumber}</ListGroup.Item>}
//               {company.companyType && <ListGroup.Item>Company Type: {company.companyType}</ListGroup.Item>}
//               {company.businessTimings && (
//                 <ListGroup.Item>
//                   <p className="fw-bold mb-1">Business Timings:</p>
//                   {Object.entries(company.businessTimings).map(([day, t]) => (
//                     <p key={day} className="mb-0 small">{day}: {t.open} - {t.close}</p>
//                   ))}
//                 </ListGroup.Item>
//               )}
//               {company.keywords && company.keywords.length > 0 && <ListGroup.Item>Keywords: {company.keywords.join(", ")}</ListGroup.Item>}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>

//       {/* Banner Images */}
//       <Row>
//         {company.banner?.map((url, idx) => (
//           <Col md={4} key={`banner-${idx}`} className="mb-4">
//             <Card className="p-2 shadow-sm">
//               <Image src={url} alt={`Banner ${idx+1}`} fluid rounded />
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Products */}
//       {company.products?.length > 0 && (
//         <Row className="mb-4">
//           <Col md={12}><h4>Products</h4></Col>
//           {company.products.map(prod => (
//             <Col md={4} key={prod._id} className="mb-3">
//               <Card className="shadow-sm">
//                 {prod.images[0] && <Card.Img variant="top" src={prod.images[0]} />}
//                 <Card.Body>
//                   <Card.Title>{prod.name}</Card.Title>
//                   <Card.Text>{prod.description}</Card.Text>
//                   <Card.Text>Status: {prod.status}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}

//       {/* Back Button */}
//       <div className="text-center mt-5">
//         <Link to="/directory"><Button variant="danger">Back to Directory</Button></Link>
//       </div>
//     </Container>
//   );
// };

// export default CompanyDetailPage;


// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup, Image } from "react-bootstrap";
// import { 
//   FaCheckCircle, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowLeft, FaBoxes // FaBoxes को उत्पादों के लिए जोड़ा गया है
// } from 'react-icons/fa';
// import { getCompanyById } from "../Services/authApi";

// const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP"; 

// const CompanyDetailPage = () => {
//   const { companyId } = useParams();
//   const location = useLocation();
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       setError(null); 
//       setLoading(true);

//       if (location.state && location.state.companyDetails) {
//         setCompany(location.state.companyDetails);
//         setLoading(false);
//       } else {
//         try {
//           const res = await getCompanyById(companyId);
//           if (res.success && res.data) setCompany(res.data);
//           else setError(res.message || "Failed to fetch company details.");
//         } catch (err) {
//           setError(err.message || "Unexpected error occurred.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchCompanyDetails();
//   }, [companyId, location.state]);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-warning">&#9733;</span>);
//     if (rating % 1 !== 0 && rating > 0) stars.push(<span key="half" className="text-warning">&#9734;</span>);
//     for (let i = stars.length; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
//     return stars;
//   };

//   if (loading) return (
//     <Container className="text-center py-5">
//       <Spinner animation="border" className="my-3" />
//       <p className="mt-3">Loading company details...</p>
//     </Container>
//   );
//   if (error || !company) return (
//     <Container className="py-5">
//       <Alert variant="danger">{error || "Company not found."}</Alert>
//       <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//     </Container>
//   );

//   return (
//     <Container className="py-5">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col md={12}>
//           <Button variant="link" onClick={() => window.history.back()} className="mb-3 d-flex align-items-center" style={{ color: '#c00' }}>
//             <FaArrowLeft className="me-2" /> Back
//           </Button>
//           <Card className="p-4 shadow-sm">
//             <Row>
//               <Col md={4} className="text-center mb-3 mb-md-0">
//                 <img
//                   src={company.logo || yellowpagesPlaceholder}
//                   alt={company.name}
//                   style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "cover", borderRadius: "8px" }}
//                   className="img-fluid"
//                 />
//               </Col>
//               <Col md={8}>
//                 <div className="d-flex align-items-center mb-2">
//                   <h2 className="mb-0 me-2">{company.name}</h2>
//                   {company.isApproved && <FaCheckCircle className="text-success fs-4" />}
//                 </div>
//                 {company.category?.name && <p className="text-muted mb-1 small">{company.category.name}</p>}
//                 <div className="d-flex align-items-center mb-2">
//                   {renderStars(company.averageRating || 0)}
//                   <span className="ms-1 fw-bold">{company.averageRating?.toFixed(1) || 0}</span>
//                   <span className="ms-2 text-muted">({company.reviews?.length || 0} Reviews)</span>
//                 </div>
//                 {company.description && <p className="lead mb-3">{company.description}</p>}

//                 <div className="mt-3">
//                   <Button variant="danger" className="me-2" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Get Quote</Button>
//                   <Button variant="outline-danger" style={{ borderColor: '#c00', color: '#c00' }}>Contact</Button>
//                 </div>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>

//       {/* Contact Info and Business Timings */}
//       <Row>
//         <Col md={6} className="mb-4">
//           <Card className="p-3 shadow-sm h-100"> {/* h-100 ताकि कार्ड की ऊंचाई बराबर हो */}
//             <Card.Title>Contact Information</Card.Title>
//             <ListGroup variant="flush">
//               {company.phone && <ListGroup.Item><FaPhone /> {company.phone}</ListGroup.Item>}
//               {company.email && <ListGroup.Item><FaEnvelope /> {company.email}</ListGroup.Item>}
//               {(company.address || company.city || company.state || company.country) && 
//                 <ListGroup.Item><FaMapMarkerAlt /> {[company.address, company.city, company.state, company.country].filter(Boolean).join(", ")}</ListGroup.Item>
//               }
//               {company.website && <ListGroup.Item><FaGlobe /> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></ListGroup.Item>}
              
//               {/* === Business Timings को यहां ले जाया गया है === */}
//               {company.businessTimings && (
//                 <ListGroup.Item className="pt-3"> {/* थोड़ा पैडिंग जोड़ें */}
//                   <p className="fw-bold mb-1">Business Timings:</p>
//                   {Object.entries(company.businessTimings).map(([day, t]) => (
//                     t.open && t.close ? ( // केवल तभी दिखाएं जब open और close टाइम मौजूद हों
//                       <p key={day} className="mb-0 small">{day.charAt(0).toUpperCase() + day.slice(1)}: {t.open} - {t.close}</p>
//                     ) : (
//                       <p key={day} className="mb-0 small">{day.charAt(0).toUpperCase() + day.slice(1)}: Not Specified</p>
//                     )
//                   ))}
//                 </ListGroup.Item>
//               )}
//               {/* ============================================== */}
//             </ListGroup>
//           </Card>
//         </Col>

//         {/* Business Details and Products */}
//              {/* Business Details and Products */}
//         <Col md={6} className="mb-4">
//           <Card className="p-3 shadow-sm h-100">
//             <Card.Title>Business Details</Card.Title>
//             <ListGroup variant="flush">
//               {company.gstNumber && <ListGroup.Item>GST Number: {company.gstNumber}</ListGroup.Item>}
//               {company.companyType && <ListGroup.Item>Company Type: {company.companyType}</ListGroup.Item>}
//               {company.keywords && company.keywords.length > 0 && <ListGroup.Item>Keywords: {company.keywords.join(", ")}</ListGroup.Item>}
              
//               {/* === Products को यहां ले जाया गया है === */}
//               {company.products?.length > 0 && (
//                 <ListGroup.Item className="pt-3">
//                   <h5 className="mb-2"><FaBoxes className="me-2" />Products</h5>
//                   <Row xs={1} md={2} className="g-3">
//                     {/* ✅ prodId के बजाय prod का उपयोग करें क्योंकि यह एक पूरा उत्पाद ऑब्जेक्ट है */}
//                     {company.products.map(prod => ( 
//                       <Col key={prod._id}> {/* ✅ key के लिए prod._id का उपयोग करें */}
//                         <Card className="shadow-sm">
//                           {prod.images && prod.images.length > 0 && prod.images[0] && (
//                             <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} />
//                           )}
//                           <Card.Body className="p-2">
//                             <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title> {/* ✅ prod.name दिखाएं */}
//                             {prod.description && <Card.Text className="small mb-1">{prod.description.substring(0, 50)}...</Card.Text>} {/* ✅ prod.description दिखाएं */}
//                             {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>} {/* ✅ prod.status दिखाएं */}
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 </ListGroup.Item>
//               )}
//               {/* ======================================== */}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>

//       {/* Banner Images (यह अपनी जगह पर रहेगा) */}
//       {company.banner?.length > 0 && (
//         <Row className="mb-4">
//           <Col md={12}><h4>Company Banners</h4></Col>
//           {company.banner.map((url, idx) => (
//             <Col md={4} key={`banner-${idx}`} className="mb-4">
//               <Card className="p-2 shadow-sm">
//                 <Image src={url} alt={`Banner ${idx+1}`} fluid rounded />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}

//       {/* Back Button */}
//       <div className="text-center mt-5">
//         <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//       </div>
//     </Container>
//   );
// };

// export default CompanyDetailPage;

// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup, Image } from "react-bootstrap";
// import { 
//   FaCheckCircle, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowLeft, FaBoxes 
// } from 'react-icons/fa';
// import { getCompanyById } from "../Services/authApi";

// const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP"; 

// const CompanyDetailPage = () => {
//   const { companyId } = useParams();
//   const location = useLocation();
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       setError(null); 
//       setLoading(true);

//       if (location.state && location.state.companyDetails) {
//         setCompany(location.state.companyDetails);
//         setLoading(false);
//       } else {
//         try {
//           const res = await getCompanyById(companyId);
//           if (res.success && res.data) setCompany(res.data);
//           else setError(res.message || "Failed to fetch company details.");
//         } catch (err) {
//           setError(err.message || "Unexpected error occurred.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchCompanyDetails();
//   }, [companyId, location.state]);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-warning">&#9733;</span>);
//     if (rating % 1 !== 0 && rating > 0) stars.push(<span key="half" className="text-warning">&#9734;</span>);
//     for (let i = stars.length; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
//     return stars;
//   };

//   if (loading) return (
//     <Container className="text-center py-5">
//       <Spinner animation="border" className="my-3" />
//       <p className="mt-3">Loading company details...</p>
//     </Container>
//   );
//   if (error || !company) return (
//     <Container className="py-5">
//       <Alert variant="danger">{error || "Company not found."}</Alert>
//       <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//     </Container>
//   );

//   // दिनों के सही क्रम को परिभाषित करें
//   const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//   return (
//     <Container className="py-5">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col md={12}>
//           <Button variant="link" onClick={() => window.history.back()} className="mb-3 d-flex align-items-center" style={{ color: '#c00' }}>
//             <FaArrowLeft className="me-2" /> Back
//           </Button>
//           <Card className="p-4 shadow-sm">
//             <Row>
//               <Col md={4} className="text-center mb-3 mb-md-0">
//                 <img
//                   src={company.logo || yellowpagesPlaceholder}
//                   alt={company.name}
//                   style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "cover", borderRadius: "8px" }}
//                   className="img-fluid"
//                 />
//               </Col>
//               <Col md={8}>
//                 <div className="d-flex align-items-center mb-2">
//                   <h2 className="mb-0 me-2">{company.name}</h2>
//                   {company.isApproved && <FaCheckCircle className="text-success fs-4" />}
//                 </div>
//                 {company.category?.name && <p className="text-muted mb-1 small">{company.category.name}</p>}
//                 <div className="d-flex align-items-center mb-2">
//                   {renderStars(company.averageRating || 0)}
//                   <span className="ms-1 fw-bold">{company.averageRating?.toFixed(1) || 0}</span>
//                   <span className="ms-2 text-muted">({company.reviews?.length || 0} Reviews)</span>
//                 </div>
//                 {company.description && <p className="lead mb-3">{company.description}</p>}

//                 <div className="mt-3">
//                   <Button variant="danger" className="me-2" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Get Quote</Button>
//                   <Button variant="outline-danger" style={{ borderColor: '#c00', color: '#c00' }}>Contact</Button>
//                 </div>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>

//       {/* Contact Info and Business Timings */}
//       <Row>
//         <Col md={6} className="mb-4">
//           <Card className="p-3 shadow-sm h-100"> {/* h-100 ताकि कार्ड की ऊंचाई बराबर हो */}
//             <Card.Title>Contact Information</Card.Title>
//             <ListGroup variant="flush">
//               {company.phone && <ListGroup.Item><FaPhone /> {company.phone}</ListGroup.Item>}
//               {company.email && <ListGroup.Item><FaEnvelope /> {company.email}</ListGroup.Item>}
//               {(company.address || company.city || company.state || company.country) && 
//                 <ListGroup.Item><FaMapMarkerAlt /> {[company.address, company.city, company.state, company.country].filter(Boolean).join(", ")}</ListGroup.Item>
//               }
//               {company.website && <ListGroup.Item><FaGlobe /> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></ListGroup.Item>}
              
//               {/* === Business Timings को यहां ले जाया गया है === */}
//               {company.businessTimings && (
//                 <ListGroup.Item className="pt-3"> {/* थोड़ा पैडिंग जोड़ें */}
//                   <p className="fw-bold mb-2">Business Timings</p> {/* Yellowpages इमेज से मेल खाने के लिए mb-1 को mb-2 में बदल दिया */}
//                   <ul className="list-unstyled"> {/* Yellowpages इमेज की तरह लिस्ट दिखाने के लिए ul/li का उपयोग करें */}
//                     {daysOrder.map(day => {
//                       const t = company.businessTimings[day]; // विशिष्ट दिन के लिए टाइमिंग प्राप्त करें
//                       const dayName = day.charAt(0).toUpperCase() + day.slice(1);
//                       const isOpen = t && t.open && t.close; // जांचें कि टाइमिंग निर्दिष्ट हैं या नहीं
//                       const timeRange = isOpen ? `${t.open} - ${t.close}` : 'Not Specified';
//                       const status = isOpen ? 'Open' : 'Closed'; // इमेज में सभी 'Open' हैं, आप डेटा के आधार पर बदल सकते हैं

//                       return (
//                         <li key={day} className="d-flex justify-content-between align-items-center mb-1 small">
//                           <span>{dayName}</span>
//                           <div>
//                             <span>{timeRange}</span>
//                             <span className={`fw-bold ms-2 ${isOpen ? 'text-success' : 'text-danger'}`}>{status}</span>
//                           </div>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </ListGroup.Item>
//               )}
//               {/* ============================================== */}
//             </ListGroup>
//           </Card>
//         </Col>

//         {/* Business Details and Products */}
//         <Col md={6} className="mb-4">
//           <Card className="p-3 shadow-sm h-100"> {/* h-100 ताकि कार्ड की ऊंचाई बराबर हो */}
//             <Card.Title>Business Details</Card.Title>
//             <ListGroup variant="flush">
//               {company.gstNumber && <ListGroup.Item>GST Number: {company.gstNumber}</ListGroup.Item>}
//               {company.companyType && <ListGroup.Item>Company Type: {company.companyType}</ListGroup.Item>}
//               {company.keywords && company.keywords.length > 0 && <ListGroup.Item>Keywords: {company.keywords.join(", ")}</ListGroup.Item>}
              
//               {/* === Products को यहां ले जाया गया है === */}
//               {company.products?.length > 0 && (
//                 <ListGroup.Item className="pt-3"> {/* थोड़ा पैडिंग जोड़ें */}
//                   <h5 className="mb-2"><FaBoxes className="me-2" />Products</h5>
//                   <Row xs={1} md={2} className="g-3"> {/* प्रोडक्ट्स को ग्रिड में दिखाएं */}
//                     {company.products.map(prod => ( // आपके JSON में केवल ID है
//                       <Col key={prod._id}>
//                         <Card className="shadow-sm">
//                           {prod.images && prod.images.length > 0 && prod.images[0] && (
//                             <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} />
//                           )}
//                           <Card.Body className="p-2">
//                             <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
//                             {prod.description && <Card.Text className="small mb-1">{prod.description.substring(0, 50)}...</Card.Text>}
//                             {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 </ListGroup.Item>
//               )}
//               {/* ======================================== */}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>

//       {/* Banner Images (यह अपनी जगह पर रहेगा) */}
//       {company.banner?.length > 0 && (
//         <Row className="mb-4">
//           <Col md={12}><h4>Company Banners</h4></Col>
//           {company.banner.map((url, idx) => (
//             <Col md={4} key={`banner-${idx}`} className="mb-4">
//               <Card className="p-2 shadow-sm">
//                 <Image src={url} alt={`Banner ${idx+1}`} fluid rounded />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}

//       {/* Back Button */}
//       <div className="text-center mt-5">
//         <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//       </div>
//     </Container>
//   );
// };

// export default CompanyDetailPage;



// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup, Image, Nav } from "react-bootstrap";
// import {
//   FaCheckCircle, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowLeft, FaBoxes
// } from 'react-icons/fa'; // Removed FaShareAlt, FaHeart as they are no longer needed in the top-right
// import { getCompanyById } from "../Services/authApi";

// const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP"; // Placeholder for generic images

// const CompanyDetailPage = () => {
//   const { companyId } = useParams();
//   const location = useLocation();
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview'); // State for active tab

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       setError(null);
//       setLoading(true);

//       if (location.state && location.state.companyDetails) {
//         setCompany(location.state.companyDetails);
//         setLoading(false);
//       } else {
//         try {
//           const res = await getCompanyById(companyId);
//           if (res.success && res.data) setCompany(res.data);
//           else setError(res.message || "Failed to fetch company details.");
//         } catch (err) {
//           setError(err.message || "Unexpected error occurred.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchCompanyDetails();
//   }, [companyId, location.state]);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-warning">&#9733;</span>);
//     if (rating % 1 !== 0 && rating > 0) stars.push(<span key="half" className="text-warning">&#9734;</span>);
//     for (let i = stars.length; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
//     return stars;
//   };

//   if (loading) return (
//     <Container className="text-center py-5">
//       <Spinner animation="border" className="my-3" />
//       <p className="mt-3">Loading company details...</p>
//     </Container>
//   );
//   if (error || !company) return (
//     <Container className="py-5">
//       <Alert variant="danger">{error || "Company not found."}</Alert>
//       <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//     </Container>
//   );

//   const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//   const mainBackgroundImage = company.banner && company.banner.length > 0
//     ? company.banner[0]
//     : 'https://via.placeholder.com/1500x350?text=Company+Storefront+Image'; // Increased placeholder height

//   // Collect all images for the "Photos" tab
//   const allImages = [];
//   if (company.banner && company.banner.length > 0) {
//     allImages.push(...company.banner);
//   }
//   if (company.products && company.products.length > 0) {
//     company.products.forEach(product => {
//       if (product.images && product.images.length > 0) {
//         allImages.push(...product.images);
//       }
//     });
//   }

//   return (
//     <Container fluid className="p-0">
//       {/* Top section with background image and overlaid details */}
//       <div
//         className="position-relative"
//         style={{
//           backgroundImage: `url(${mainBackgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           minHeight: '350px', // Adjusted minHeight to make the image more visible
//           paddingTop: '60px', // Add padding to push content down from the very top
//           paddingBottom: '20px',
//         }}
//       >
//         {/* Top-right action buttons removed */}

//         <Container className="h-100">
//           <Row className="h-100">
//             <Col xs={12} md={6} lg={5} className="d-flex align-items-end ps-3 pt-3">
//               <div
//                 className="p-4 w-100"
//                 style={{
//                   color: 'white',
//                   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
//                 }}
//               >
//                 <h2 className="mb-2" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{company.name}</h2>

//                 <div className="d-flex align-items-center mb-2">
//                   {renderStars(company.averageRating || 0)}
//                   <span className="ms-1">({company.reviews?.length || 0} reviews)</span>
//                 </div>

//                 {company.address && <p className="mb-0" style={{ fontSize: '0.95rem' }}>{company.address}</p>}
//                 {(company.city || company.pincode) &&
//                   <p className="mb-2" style={{ fontSize: '0.95rem' }}>
//                     {[company.city, company.pincode].filter(Boolean).join(" - ")}
//                   </p>
//                 }

//                 {company.phone && <h3 className="fw-bold" style={{ fontSize: '1.7rem' }}>{company.phone}</h3>}
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Navigation Tabs (Overview, Product, Photo) */}
//       <Container className="mt-3">
//         <Nav variant="underline" defaultActiveKey="overview" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
//           <Nav.Item>
//             <Nav.Link eventKey="overview" className={activeTab === 'overview' ? 'text-danger fw-bold' : 'text-secondary'}>Overview</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="product" className={activeTab === 'product' ? 'text-danger fw-bold' : 'text-secondary'}>Product</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="photo" className={activeTab === 'photo' ? 'text-danger fw-bold' : 'text-secondary'}>Photo</Nav.Link>
//           </Nav.Item>
//         </Nav>
//         <hr className="mb-4 mt-0" /> {/* Separator line */}
//       </Container>


//       {/* Content based on active tab */}
//       <Container className="py-2"> {/* Reduced padding-top to bring content closer to tabs */}
//         {/* Back Button (Moved here, outside the dynamic tab content) */}
//         <Button variant="link" onClick={() => window.history.back()} className="mb-3 d-flex align-items-center" style={{ color: '#c00' }}>
//           <FaArrowLeft className="me-2" /> Back
//         </Button>

//         {activeTab === 'overview' && (
//           <>
//             {/* Contact Info and Business Timings */}
//             <Row>
//               <Col md={6} className="mb-4">
//                 <Card className="p-3 shadow-sm h-100">
//                   <Card.Title>Contact Information</Card.Title>
//                   <ListGroup variant="flush">
//                     {company.phone && <ListGroup.Item><FaPhone /> {company.phone}</ListGroup.Item>}
//                     {company.email && <ListGroup.Item><FaEnvelope /> {company.email}</ListGroup.Item>}
//                     {(company.address || company.city || company.state || company.country) &&
//                       <ListGroup.Item><FaMapMarkerAlt /> {[company.address, company.city, company.state, company.country].filter(Boolean).join(", ")}</ListGroup.Item>
//                     }
//                     {company.website && <ListGroup.Item><FaGlobe /> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></ListGroup.Item>}

//                     {company.businessTimings && (
//                       <ListGroup.Item className="pt-3">
//                         <p className="fw-bold mb-2">Business Timings</p>
//                         <ul className="list-unstyled">
//                           {daysOrder.map(day => {
//                             const t = company.businessTimings[day];
//                             const dayName = day.charAt(0).toUpperCase() + day.slice(1);
//                             const isOpen = t && t.open && t.close;
//                             const timeRange = isOpen ? `${t.open} - ${t.close}` : 'Not Specified';
//                             const status = isOpen ? 'Open' : 'Closed';

//                             return (
//                               <li key={day} className="d-flex justify-content-between align-items-center mb-1 small">
//                                 <span>{dayName}</span>
//                                 <div>
//                                   <span>{timeRange}</span>
//                                   <span className={`fw-bold ms-2 ${isOpen ? 'text-success' : 'text-danger'}`}>{status}</span>
//                                 </div>
//                               </li>
//                             );
//                           })}
//                         </ul>
//                       </ListGroup.Item>
//                     )}
//                   </ListGroup>
//                 </Card>
//               </Col>

//               {/* Business Details */}
//               <Col md={6} className="mb-4">
//                 <Card className="p-3 shadow-sm h-100">
//                   <Card.Title>Business Details</Card.Title>
//                   <ListGroup variant="flush">
//                     {company.gstNumber && <ListGroup.Item>GST Number: {company.gstNumber}</ListGroup.Item>}
//                     {company.companyType && <ListGroup.Item>Company Type: {company.companyType}</ListGroup.Item>}
//                     {company.keywords && company.keywords.length > 0 && <ListGroup.Item>Keywords: {company.keywords.join(", ")}</ListGroup.Item>}
//                   </ListGroup>
//                 </Card>
//               </Col>
//             </Row>

//             {/* Products (as part of Overview, but also separately in Product tab) */}
//             {company.products?.length > 0 && (
//               <Row className="mb-4">
//                 <Col md={12}>
//                   <Card className="p-3 shadow-sm">
//                     <h5 className="mb-3"><FaBoxes className="me-2" />Products</h5>
//                     <Row xs={1} md={2} lg={3} className="g-3">
//                       {company.products.map(prod => (
//                         <Col key={prod._id}>
//                           <Card className="shadow-sm h-100">
//                             {prod.images && prod.images.length > 0 && prod.images[0] ? (
//                               <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '150px', objectFit: 'cover' }} />
//                             ) : (
//                               <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '150px', objectFit: 'cover' }} />
//                             )}
//                             <Card.Body className="p-2">
//                               <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
//                               {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 50)}{prod.description.length > 50 ? '...' : ''}</Card.Text>}
//                               {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
//                             </Card.Body>
//                           </Card>
//                         </Col>
//                       ))}
//                     </Row>
//                   </Card>
//                 </Col>
//               </Row>
//             )}

//             {/* Other Company Banners (as part of Overview) */}
//             {company.banner?.length > 1 && (
//               <Row className="mb-4">
//                 <Col md={12}>
//                   <Card className="p-3 shadow-sm">
//                     <h4>Other Company Banners</h4>
//                     <Row xs={1} md={2} lg={3} className="g-3">
//                       {company.banner.slice(1).map((url, idx) => (
//                         <Col key={`banner-${idx}`}>
//                           <Image src={url} alt={`Banner ${idx+2}`} fluid rounded style={{ height: '180px', objectFit: 'cover', width: '100%' }} />
//                         </Col>
//                       ))}
//                     </Row>
//                   </Card>
//                 </Col>
//               </Row>
//             )}
//           </>
//         )}

//         {activeTab === 'product' && (
//           <Row className="mb-4">
//             <Col md={12}>
//               <Card className="p-3 shadow-sm">
//                 <h4 className="mb-3"><FaBoxes className="me-2" />All Products</h4>
//                 {company.products?.length > 0 ? (
//                   <Row xs={1} md={2} lg={3} className="g-3">
//                     {company.products.map(prod => (
//                       <Col key={prod._id}>
//                         <Card className="shadow-sm h-100">
//                           {prod.images && prod.images.length > 0 && prod.images[0] ? (
//                             <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '180px', objectFit: 'cover' }} />
//                           ) : (
//                             <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '180px', objectFit: 'cover' }} />
//                           )}
//                           <Card.Body className="p-2">
//                             <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
//                             {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 80)}{prod.description.length > 80 ? '...' : ''}</Card.Text>}
//                             {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 ) : (
//                   <Alert variant="info">No products available for this company.</Alert>
//                 )}
//               </Card>
//             </Col>
//           </Row>
//         )}

//         {activeTab === 'photo' && (
//           <Row className="mb-4">
//             <Col md={12}>
//               <Card className="p-3 shadow-sm">
//                 <h4 className="mb-3">Photos Gallery</h4>
//                 {allImages.length > 0 ? (
//                   <Row xs={1} sm={2} md={3} lg={4} className="g-3">
//                     {allImages.map((url, idx) => (
//                       <Col key={`all-image-${idx}`}>
//                         <Image src={url} alt={`Gallery Image ${idx+1}`} fluid rounded style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
//                       </Col>
//                     ))}
//                   </Row>
//                 ) : (
//                   <Alert variant="info">No photos available for this company.</Alert>
//                 )}
//               </Card>
//             </Col>
//           </Row>
//         )}

//         {/* Back Button (This one is outside the tab content and at the very bottom) */}
//         <div className="text-center mt-5">
//           <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//         </div>
//       </Container>
//     </Container>
//   );
// };

// export default CompanyDetailPage;


// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup, Image, Nav } from "react-bootstrap";
// import {
//   FaCheckCircle, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowLeft, FaBoxes
// } from 'react-icons/fa';
// import { getCompanyById } from "../Services/authApi";

// const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP"; // Placeholder for generic images

// const CompanyDetailPage = () => {
//   const { companyId } = useParams();
//   const location = useLocation();
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview'); // State for active tab

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       setError(null);
//       setLoading(true);

//       if (location.state && location.state.companyDetails) {
//         setCompany(location.state.companyDetails);
//         setLoading(false);
//       } else {
//         try {
//           const res = await getCompanyById(companyId);
//           if (res.success && res.data) setCompany(res.data);
//           else setError(res.message || "Failed to fetch company details.");
//         } catch (err) {
//           setError(err.message || "Unexpected error occurred.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchCompanyDetails();
//   }, [companyId, location.state]);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-warning">&#9733;</span>);
//     if (rating % 1 !== 0 && rating > 0) stars.push(<span key="half" className="text-warning">&#9734;</span>);
//     for (let i = stars.length; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
//     return stars;
//   };

//   if (loading) return (
//     <Container className="text-center py-5">
//       <Spinner animation="border" className="my-3" />
//       <p className="mt-3">Loading company details...</p>
//     </Container>
//   );
//   if (error || !company) return (
//     <Container className="py-5">
//       <Alert variant="danger">{error || "Company not found."}</Alert>
//       <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//     </Container>
//   );

//   const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//   const mainBackgroundImage = company.banner && company.banner.length > 0
//     ? company.banner[0]
//     : 'https://via.placeholder.com/1500x350?text=Company+Storefront+Image'; // Increased placeholder height

//   // Collect all images for the "Photos" tab
//   const allImages = [];
//   if (company.banner && company.banner.length > 0) {
//     allImages.push(...company.banner);
//   }
//   if (company.products && company.products.length > 0) {
//     company.products.forEach(product => {
//       if (product.images && product.images.length > 0) {
//         allImages.push(...product.images);
//       }
//     });
//   }

//   return (
//     <Container fluid className="p-0">
//       {/* Top section with background image and overlaid details */}
//       <div
//         className="position-relative"
//         style={{
//           backgroundImage: `url(${mainBackgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           minHeight: '350px', // Adjusted minHeight to make the image more visible
//           paddingTop: '60px', // Add padding to push content down from the very top
//           paddingBottom: '20px',
//         }}
//       >
//         {/* Top-right action buttons removed */}

//         <Container className="h-100">
//           <Row className="h-100">
//             <Col xs={12} md={6} lg={5} className="d-flex align-items-end ps-3 pt-3">
//               <div
//                 className="p-4 w-100"
//                 style={{
//                   color: 'white',
//                   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
//                 }}
//               >
//                 <h2 className="mb-2" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{company.name}</h2>

//                 <div className="d-flex align-items-center mb-2">
//                   {renderStars(company.averageRating || 0)}
//                   <span className="ms-1">({company.reviews?.length || 0} reviews)</span>
//                 </div>

//                 {company.address && <p className="mb-0" style={{ fontSize: '0.95rem' }}>{company.address}</p>}
//                 {(company.city || company.pincode) &&
//                   <p className="mb-2" style={{ fontSize: '0.95rem' }}>
//                     {[company.city, company.pincode].filter(Boolean).join(" - ")}
//                   </p>
//                 }

//                 {company.phone && <h3 className="fw-bold" style={{ fontSize: '1.7rem' }}>{company.phone}</h3>}
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Navigation Tabs (Overview, Product, Photo) - Improved Styling */}
//       <Container className="mt-3">
//         {/* Removed variant="tabs" to allow for custom underline */}
//         <Nav defaultActiveKey="overview" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
//           <Nav.Item>
//             <Nav.Link
//               eventKey="overview"
//               // Adjusted text color and added bold for active tab, muted for inactive
//               className={`py-2 px-3 me-2 ${activeTab === 'overview' ? 'text-dark fw-bold' : 'text-muted'}`}
//               style={{
//                 fontSize: '1.2rem', // Increased font size
//                 borderBottom: activeTab === 'overview' ? '3px solid #c00' : '3px solid transparent', // Red underline for active tab
//                 paddingBottom: '8px', // Adjust padding to make room for the border
//                 transition: 'border-bottom 0.2s ease-in-out', // Smooth transition for the underline
//               }}
//             >
//               Overview
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link
//               eventKey="product"
//               className={`py-2 px-3 me-2 ${activeTab === 'product' ? 'text-dark fw-bold' : 'text-muted'}`}
//               style={{
//                 fontSize: '1.2rem', // Increased font size
//                 borderBottom: activeTab === 'product' ? '3px solid #c00' : '3px solid transparent', // Red underline for active tab
//                 paddingBottom: '8px',
//                 transition: 'border-bottom 0.2s ease-in-out',
//               }}
//             >
//               Product
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link
//               eventKey="photo"
//               className={`py-2 px-3 me-2 ${activeTab === 'photo' ? 'text-dark fw-bold' : 'text-muted'}`}
//               style={{
//                 fontSize: '1.2rem', // Increased font size
//                 borderBottom: activeTab === 'photo' ? '3px solid #c00' : '3px solid transparent', // Red underline for active tab
//                 paddingBottom: '8px',
//                 transition: 'border-bottom 0.2s ease-in-out',
//               }}
//             >
//               Photo
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//         {/* Removed <hr /> as Nav variant="tabs" provides its own bottom border */}
//       </Container>


//       {/* Content based on active tab */}
//       <Container className="py-2">
//         {/* Back Button (Moved here, outside the dynamic tab content) */}
//         <Button variant="link" onClick={() => window.history.back()} className="mb-3 d-flex align-items-center" style={{ color: '#c00' }}>
//           <FaArrowLeft className="me-2" /> Back
//         </Button>

//         {activeTab === 'overview' && (
//           <>
//             {/* Contact Info and Business Timings */}
//             <Row>
//               <Col md={6} className="mb-4">
//                 <Card className="p-3 shadow-sm h-100">
//                   <Card.Title>Contact Information</Card.Title>
//                   <ListGroup variant="flush">
//                     {company.phone && <ListGroup.Item><FaPhone /> {company.phone}</ListGroup.Item>}
//                     {company.email && <ListGroup.Item><FaEnvelope /> {company.email}</ListGroup.Item>}
//                     {(company.address || company.city || company.state || company.country) &&
//                       <ListGroup.Item><FaMapMarkerAlt /> {[company.address, company.city, company.state, company.country].filter(Boolean).join(", ")}</ListGroup.Item>
//                     }
//                     {company.website && <ListGroup.Item><FaGlobe /> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></ListGroup.Item>}

//                     {company.businessTimings && (
//                       <ListGroup.Item className="pt-3">
//                         <p className="fw-bold mb-2">Business Timings</p>
//                         <ul className="list-unstyled">
//                           {daysOrder.map(day => {
//                             const t = company.businessTimings[day];
//                             const dayName = day.charAt(0).toUpperCase() + day.slice(1);
//                             const isOpen = t && t.open && t.close;
//                             const timeRange = isOpen ? `${t.open} - ${t.close}` : 'Not Specified';
//                             const status = isOpen ? 'Open' : 'Closed';

//                             return (
//                               <li key={day} className="d-flex justify-content-between align-items-center mb-1 small">
//                                 <span>{dayName}</span>
//                                 <div>
//                                   <span>{timeRange}</span>
//                                   <span className={`fw-bold ms-2 ${isOpen ? 'text-success' : 'text-danger'}`}>{status}</span>
//                                 </div>
//                               </li>
//                             );
//                           })}
//                         </ul>
//                       </ListGroup.Item>
//                     )}
//                   </ListGroup>
//                 </Card>
//               </Col>

//               {/* Business Details */}
//               <Col md={6} className="mb-4">
//                 <Card className="p-3 shadow-sm h-100">
//                   <Card.Title>Business Details</Card.Title>
//                   <ListGroup variant="flush">
//                     {company.gstNumber && <ListGroup.Item>GST Number: {company.gstNumber}</ListGroup.Item>}
//                     {company.companyType && <ListGroup.Item>Company Type: {company.companyType}</ListGroup.Item>}
//                     {company.keywords && company.keywords.length > 0 && <ListGroup.Item>Keywords: {company.keywords.join(", ")}</ListGroup.Item>}
//                   </ListGroup>
//                 </Card>
//               </Col>
//             </Row>

//             {/* Products (as part of Overview, but also separately in Product tab) */}
//             {company.products?.length > 0 && (
//               <Row className="mb-4">
//                 <Col md={12}>
//                   <Card className="p-3 shadow-sm">
//                     <h5 className="mb-3"><FaBoxes className="me-2" />Products</h5>
//                     <Row xs={1} md={2} lg={3} className="g-3">
//                       {company.products.map(prod => (
//                         <Col key={prod._id}>
//                           <Card className="shadow-sm h-100">
//                             {prod.images && prod.images.length > 0 && prod.images[0] ? (
//                               <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '150px', objectFit: 'cover' }} />
//                             ) : (
//                               <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '150px', objectFit: 'cover' }} />
//                             )}
//                             <Card.Body className="p-2">
//                               <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
//                               {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 50)}{prod.description.length > 50 ? '...' : ''}</Card.Text>}
//                               {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
//                             </Card.Body>
//                           </Card>
//                         </Col>
//                       ))}
//                     </Row>
//                   </Card>
//                 </Col>
//               </Row>
//             )}

//             {/* Other Company Banners (as part of Overview) */}
//             {company.banner?.length > 1 && (
//               <Row className="mb-4">
//                 <Col md={12}>
//                   <Card className="p-3 shadow-sm">
//                     <h4>Other Company Banners</h4>
//                     <Row xs={1} md={2} lg={3} className="g-3">
//                       {company.banner.slice(1).map((url, idx) => (
//                         <Col key={`banner-${idx}`}>
//                           <Image src={url} alt={`Banner ${idx+2}`} fluid rounded style={{ height: '180px', objectFit: 'cover', width: '100%' }} />
//                         </Col>
//                       ))}
//                     </Row>
//                   </Card>
//                 </Col>
//               </Row>
//             )}
//           </>
//         )}

//         {activeTab === 'product' && (
//           <Row className="mb-4">
//             <Col md={12}>
//               <Card className="p-3 shadow-sm">
//                 <h4 className="mb-3"><FaBoxes className="me-2" />All Products</h4>
//                 {company.products?.length > 0 ? (
//                   <Row xs={1} md={2} lg={3} className="g-3">
//                     {company.products.map(prod => (
//                       <Col key={prod._id}>
//                         <Card className="shadow-sm h-100">
//                           {prod.images && prod.images.length > 0 && prod.images[0] ? (
//                             <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '180px', objectFit: 'cover' }} />
//                           ) : (
//                             <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '180px', objectFit: 'cover' }} />
//                           )}
//                           <Card.Body className="p-2">
//                             <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
//                             {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 80)}{prod.description.length > 80 ? '...' : ''}</Card.Text>}
//                             {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 ) : (
//                   <Alert variant="info">No products available for this company.</Alert>
//                 )}
//               </Card>
//             </Col>
//           </Row>
//         )}

//         {activeTab === 'photo' && (
//           <Row className="mb-4">
//             <Col md={12}>
//               <Card className="p-3 shadow-sm">
//                 <h4 className="mb-3">Photos Gallery</h4>
//                 {allImages.length > 0 ? (
//                   <Row xs={1} sm={2} md={3} lg={4} className="g-3">
//                     {allImages.map((url, idx) => (
//                       <Col key={`all-image-${idx}`}>
//                         <Image src={url} alt={`Gallery Image ${idx+1}`} fluid rounded style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
//                       </Col>
//                     ))}
//                   </Row>
//                 ) : (
//                   <Alert variant="info">No photos available for this company.</Alert>
//                 )}
//               </Card>
//             </Col>
//           </Row>
//         )}

//         {/* Back Button (This one is outside the tab content and at the very bottom) */}
//         <div className="text-center mt-5">
//           <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//         </div>
//       </Container>
//     </Container>
//   );
// };

// export default CompanyDetailPage;

import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup, Image, Nav } from "react-bootstrap";
import {
  FaCheckCircle, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowLeft, FaBoxes
} from 'react-icons/fa';
import { getCompanyById } from "../Services/authApi";

const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP"; // Placeholder for generic images

const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const location = useLocation();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // State for active tab

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setError(null);
      setLoading(true);

      if (location.state && location.state.companyDetails) {
        setCompany(location.state.companyDetails);
        setLoading(false);
      } else {
        try {
          const res = await getCompanyById(companyId);
          if (res.success && res.data) setCompany(res.data);
          else setError(res.message || "Failed to fetch company details.");
        } catch (err) {
          setError(err.message || "Unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCompanyDetails();
  }, [companyId, location.state]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-warning">&#9733;</span>);
    if (rating % 1 !== 0 && rating > 0) stars.push(<span key="half" className="text-warning">&#9734;</span>);
    for (let i = stars.length; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
    return stars;
  };

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" className="my-3" />
      <p className="mt-3">Loading company details...</p>
    </Container>
  );
  if (error || !company) return (
    <Container className="py-5">
      <Alert variant="danger">{error || "Company not found."}</Alert>
      <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
    </Container>
  );

  const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const mainBackgroundImage = company.banner && company.banner.length > 0
    ? company.banner[0]
    : 'https://via.placeholder.com/1500x350?text=Company+Storefront+Image'; // Increased placeholder height

  // Collect all images for the "Photos" tab
  const allImages = [];
  if (company.banner && company.banner.length > 0) {
    allImages.push(...company.banner);
  }
  if (company.products && company.products.length > 0) {
    company.products.forEach(product => {
      if (product.images && product.images.length > 0) {
        allImages.push(...product.images);
      }
    });
  }

  return (
    <Container fluid className="p-0">
      {/* Top section with background image and overlaid details */}
      <div
        className="position-relative"
        style={{
          backgroundImage: `url(${mainBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '350px', // Adjusted minHeight to make the image more visible
          paddingTop: '60px', // Add padding to push content down from the very top
          paddingBottom: '20px',
        }}
      >
        {/* Top-right action buttons removed */}

        <Container className="h-100">
          <Row className="h-100">
            <Col xs={12} md={6} lg={5} className="d-flex align-items-end ps-3 pt-3">
              <div
                className="p-4 w-100"
                style={{
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                }}
              >
                <h2 className="mb-2" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{company.name}</h2>

                <div className="d-flex align-items-center mb-2">
                  {renderStars(company.averageRating || 0)}
                  <span className="ms-1">({company.reviews?.length || 0} reviews)</span>
                </div>

                {company.address && <p className="mb-0" style={{ fontSize: '0.95rem' }}>{company.address}</p>}
                {(company.city || company.pincode) &&
                  <p className="mb-2" style={{ fontSize: '0.95rem' }}>
                    {[company.city, company.pincode].filter(Boolean).join(" - ")}
                  </p>
                }

                {company.phone && <h3 className="fw-bold" style={{ fontSize: '1.7rem' }}>{company.phone}</h3>}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Navigation Tabs (Overview, Product, Photo) and Back Button - Improved Styling */}
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center"> {/* Added flex container */}
          <Nav defaultActiveKey="overview" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
            <Nav.Item>
              <Nav.Link
                eventKey="overview"
                // Adjusted text color and added bold for active tab, muted for inactive
                className={`py-2 px-3 me-2 ${activeTab === 'overview' ? 'text-dark fw-bold' : 'text-muted'}`}
                style={{
                  fontSize: '1.2rem', // Increased font size
                  borderBottom: activeTab === 'overview' ? '3px solid #c00' : '3px solid transparent', // Red underline for active tab
                  paddingBottom: '8px', // Adjust padding to make room for the border
                  transition: 'border-bottom 0.2s ease-in-out', // Smooth transition for the underline
                }}
              >
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="product"
                className={`py-2 px-3 me-2 ${activeTab === 'product' ? 'text-dark fw-bold' : 'text-muted'}`}
                style={{
                  fontSize: '1.2rem', // Increased font size
                  borderBottom: activeTab === 'product' ? '3px solid #c00' : '3px solid transparent', // Red underline for active tab
                  paddingBottom: '8px',
                  transition: 'border-bottom 0.2s ease-in-out',
                }}
              >
                Product
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="photo"
                className={`py-2 px-3 me-2 ${activeTab === 'photo' ? 'text-dark fw-bold' : 'text-muted'}`}
                style={{
                  fontSize: '1.2rem', // Increased font size
                  borderBottom: activeTab === 'photo' ? '3px solid #c00' : '3px solid transparent', // Red underline for active tab
                  paddingBottom: '8px',
                  transition: 'border-bottom 0.2s ease-in-out',
                }}
              >
                Photo
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Back Button (Moved here, styled as requested) */}
          <Button
            onClick={() => window.history.back()}
            className="d-flex align-items-center"
            style={{
              backgroundColor: '#c00', // Red background
              borderColor: '#c00',    // Red border
              color: 'white',        // White text
              padding: '8px 15px',   // Adjust padding for a box look
              borderRadius: '5px',   // Slightly rounded corners
              textDecoration: 'none', // Remove underline if it's a link-like button
            }}
          >
            <FaArrowLeft className="me-2" /> Back
          </Button>
        </div>
      </Container>


      {/* Content based on active tab */}
      <Container className="py-2">
        {/* Old Back Button removed from here */}

        {activeTab === 'overview' && (
          <>
            {/* Contact Info and Business Timings */}
            <Row>
              <Col md={6} className="mb-4">
                <Card className="p-3 shadow-sm h-100">
                  <Card.Title>Contact Information</Card.Title>
                  <ListGroup variant="flush">
                    {company.phone && <ListGroup.Item><FaPhone /> {company.phone}</ListGroup.Item>}
                    {company.email && <ListGroup.Item><FaEnvelope /> {company.email}</ListGroup.Item>}
                    {(company.address || company.city || company.state || company.country) &&
                      <ListGroup.Item><FaMapMarkerAlt /> {[company.address, company.city, company.state, company.country].filter(Boolean).join(", ")}</ListGroup.Item>
                    }
                    {company.website && <ListGroup.Item><FaGlobe /> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></ListGroup.Item>}

                    {company.businessTimings && (
                      <ListGroup.Item className="pt-3">
                        <p className="fw-bold mb-2">Business Timings</p>
                        <ul className="list-unstyled">
                          {daysOrder.map(day => {
                            const t = company.businessTimings[day];
                            const dayName = day.charAt(0).toUpperCase() + day.slice(1);
                            const isOpen = t && t.open && t.close;
                            const timeRange = isOpen ? `${t.open} - ${t.close}` : 'Not Specified';
                            const status = isOpen ? 'Open' : 'Closed';

                            return (
                              <li key={day} className="d-flex justify-content-between align-items-center mb-1 small">
                                <span>{dayName}</span>
                                <div>
                                  <span>{timeRange}</span>
                                  <span className={`fw-bold ms-2 ${isOpen ? 'text-success' : 'text-danger'}`}>{status}</span>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              </Col>

              {/* Business Details */}
              <Col md={6} className="mb-4">
                <Card className="p-3 shadow-sm h-100">
                  <Card.Title>Business Details</Card.Title>
                  <ListGroup variant="flush">
                    {company.gstNumber && <ListGroup.Item>GST Number: {company.gstNumber}</ListGroup.Item>}
                    {company.companyType && <ListGroup.Item>Company Type: {company.companyType}</ListGroup.Item>}
                    {company.keywords && company.keywords.length > 0 && <ListGroup.Item>Keywords: {company.keywords.join(", ")}</ListGroup.Item>}
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            {/* Products (as part of Overview, but also separately in Product tab) */}
            {company.products?.length > 0 && (
              <Row className="mb-4">
                <Col md={12}>
                  <Card className="p-3 shadow-sm">
                    <h5 className="mb-3"><FaBoxes className="me-2" />Products</h5>
                    <Row xs={1} md={2} lg={3} className="g-3">
                      {company.products.map(prod => (
                        <Col key={prod._id}>
                          <Card className="shadow-sm h-100">
                            {prod.images && prod.images.length > 0 && prod.images[0] ? (
                              <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '150px', objectFit: 'cover' }} />
                            ) : (
                              <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '150px', objectFit: 'cover' }} />
                            )}
                            <Card.Body className="p-2">
                              <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
                              {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 50)}{prod.description.length > 50 ? '...' : ''}</Card.Text>}
                              {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>
              </Row>
            )}

            {/* Other Company Banners (as part of Overview) */}
            {company.banner?.length > 1 && (
              <Row className="mb-4">
                <Col md={12}>
                  <Card className="p-3 shadow-sm">
                    <h4>Other Company Banners</h4>
                    <Row xs={1} md={2} lg={3} className="g-3">
                      {company.banner.slice(1).map((url, idx) => (
                        <Col key={`banner-${idx}`}>
                          <Image src={url} alt={`Banner ${idx+2}`} fluid rounded style={{ height: '180px', objectFit: 'cover', width: '100%' }} />
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>
              </Row>
            )}
          </>
        )}

        {activeTab === 'product' && (
          <Row className="mb-4">
            <Col md={12}>
              <Card className="p-3 shadow-sm">
                <h4 className="mb-3"><FaBoxes className="me-2" />All Products</h4>
                {company.products?.length > 0 ? (
                  <Row xs={1} md={2} lg={3} className="g-3">
                    {company.products.map(prod => (
                      <Col key={prod._id}>
                        <Card className="shadow-sm h-100">
                          {prod.images && prod.images.length > 0 && prod.images[0] ? (
                            <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '180px', objectFit: 'cover' }} />
                          ) : (
                            <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '180px', objectFit: 'cover' }} />
                          )}
                          <Card.Body className="p-2">
                            <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
                            {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 80)}{prod.description.length > 80 ? '...' : ''}</Card.Text>}
                            {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Alert variant="info">No products available for this company.</Alert>
                )}
              </Card>
            </Col>
          </Row>
        )}

        {activeTab === 'photo' && (
          <Row className="mb-4">
            <Col md={12}>
              <Card className="p-3 shadow-sm">
                <h4 className="mb-3">Photos Gallery</h4>
                {allImages.length > 0 ? (
                  <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                    {allImages.map((url, idx) => (
                      <Col key={`all-image-${idx}`}>
                        <Image src={url} alt={`Gallery Image ${idx+1}`} fluid rounded style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Alert variant="info">No photos available for this company.</Alert>
                )}
              </Card>
            </Col>
          </Row>
        )}

        {/* Back Button (This one is outside the tab content and at the very bottom) */}
        <div className="text-center mt-5">
          <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
        </div>
      </Container>
    </Container>
  );
};

export default CompanyDetailPage;
 
