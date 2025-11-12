

// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { FaArrowRight } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const Manoranjan = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setLoading(true);
//         const res = await allNews();
//         if (res?.success) {
//           const entertainmentNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(entertainmentNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p className="mt-2">Loading Entertainment News...</p>
//       </div>
//     );
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (!newsData.length) return null;

//   const mainArticle = newsData[0];
//   const bottomArticle = newsData[1];
//   const sideArticles = newsData.slice(2, 6);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const getDate = (date) =>
//     date
//       ? new Date(date).toLocaleString("hi-IN", {
//           day: "numeric",
//           month: "long",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       : "";

//   // --- Styling Constants (can be moved to a CSS file or theme) ---
//   const accentColor = "#A12D2A";
//   const linkColor = "#2E6E9E";
//   const headerUnderlineColor = "#F8D7DA";
//   // ----------------------------------------------------------------

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div style={{ width: "40px", height: "4px", backgroundColor: headerUnderlineColor, marginBottom: "8px" }}></div>
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: accentColor }} className="me-2"></div>
//           <h5 className="fw-bold m-0">मनोरंजन</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link to="/entertainment" className="text-decoration-none fw-bold small flex-shrink-0" style={{ color: linkColor }}>
//           और देखें <FaArrowRight size={12} />
//         </Link>
//       </div>

//       <Row>
//         {/* Left Column */}
//         <Col lg={7} className="mb-4 mb-lg-0 d-lg-flex flex-column">
//           {mainArticle && (
//             <Link
//               to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//               key={mainArticle.slug_en || mainArticle._id}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//               className="d-block position-relative mb-4 flex-grow-1"
//             >
//               <Image
//                 src={mainArticle.media?.[0]?.url || "https://via.placeholder.com/600x400"}
//                 fluid
//                 rounded
//                 className="w-100"
//                 style={{ objectFit: "cover", maxHeight: "400px", height: "300px" }}
//               />
//               <div className="position-absolute bottom-0 start-0 text-white w-100 p-3"
//                 style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent)", borderRadius: "0 0 var(--bs-border-radius) var(--bs-border-radius)" }}
//               >
//                 <h4 className="fw-bold text-wrap">{mainArticle.title_hi || mainArticle.title_en}</h4>
//                 <div className="d-flex align-items-center flex-wrap mt-1">
//                   <UserAvatar user={mainArticle.createdBy} size={30} />
//                   <small className="ms-2 text-wrap">{mainArticle.createdBy?.name || "EMS News"} | {getDate(mainArticle.createdAt)}</small>
//                 </div>
//               </div>
//             </Link>
//           )}

//           {bottomArticle && (
//             <Link to={`/news/${bottomArticle.slug_en || bottomArticle._id}`} key={bottomArticle.slug_en || bottomArticle._id} state={{ relatedArticles: newsData }} style={linkStyle}>
//               <Row className="align-items-center gx-2">
//                 <Col xs={4} md={3}>
//                   <Image
//                     src={bottomArticle.media?.[0]?.url || "https://via.placeholder.com/120x80"}
//                     fluid
//                     rounded
//                     style={{ height: "80px", objectFit: "cover", width: "100%" }}
//                   />
//                 </Col>
//                 <Col xs={8} md={9} className="ps-2">
//                   <p className="fw-bold mb-1 text-wrap">{bottomArticle.title_hi || bottomArticle.title_en}</p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={bottomArticle.createdBy} size={25} />
//                     <small className="ms-2 text-muted text-wrap">{bottomArticle.createdBy?.name || "EMS News"} | {getDate(bottomArticle.createdAt)}</small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//           )}
//         </Col>

//         {/* Right Column */}
//         <Col lg={5}>
//           {sideArticles.map((article) => (
//             <Link to={`/news/${article.slug_en || article._id}`} key={article.slug_en || article._id} state={{ relatedArticles: newsData }} style={linkStyle}>
//               <Row className="align-items-center gx-2 mb-3">
//                 <Col xs={4}>
//                   <Image src={article.media?.[0]?.url || "https://via.placeholder.com/120x80"} fluid rounded style={{ height: "80px", objectFit: "cover", width: "100%" }} />
//                 </Col>
//                 <Col xs={8} className="ps-2">
//                   <p className="fw-bold mb-1 text-wrap" style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>{article.title_hi || article.title_en}</p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={article.createdBy} size={25} />
//                     <small className="text-muted ms-1 text-wrap">{article.createdBy?.name || "EMS News"} | {getDate(article.createdAt)}</small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Manoranjan;

// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { FaArrowRight } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const Manoranjan = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       setError(null); // हर बार नई फेचिंग से पहले एरर को रीसेट करें
//       try {
//         console.log("Fetching all news...");
//         const res = await allNews();
//         console.log("API Response:", res);

//         if (res?.success) {
//           const entertainmentNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(entertainmentNews);
//           console.log("Filtered Entertainment News:", entertainmentNews);
//           if (entertainmentNews.length === 0) {
//             console.log("No entertainment news found after filtering.");
//           }
//         } else {
//           const errorMessage = res?.message || "Failed to load news due to API response issue.";
//           setError(errorMessage);
//           console.error("API call was not successful:", errorMessage);
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred during news fetch.");
//         console.error("Error fetching news:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []); // खाली डिपेंडेंसी एरे का मतलब यह एक बार माउंट पर चलता है

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p className="mt-2">मनोरंजन समाचार लोड हो रहे हैं...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <Alert variant="danger" className="my-4">
//         त्रुटि: {error}
//         <p>कृपया सुनिश्चित करें कि API सही ढंग से चल रहा है और डेटा प्रदान कर रहा है।</p>
//       </Alert>
//     );

//   // यदि कोई मनोरंजन समाचार नहीं मिला है, तो null के बजाय एक संदेश दिखाएं
//   if (newsData.length === 0)
//     return (
//       <Container fluid className="mt-4">
//         <div style={{ width: "40px", height: "4px", backgroundColor: '#F8D7DA', marginBottom: '8px' }}></div>
//         <div className="d-flex align-items-center mb-3 flex-wrap">
//           <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//             <div style={{ width: "5px", height: "24px", backgroundColor: '#A12D2A' }} className="me-2"></div>
//             <h5 className="fw-bold m-0">मनोरंजन</h5>
//           </div>
//           <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//           <Link to="/entertainment" className="text-decoration-none fw-bold small flex-shrink-0" style={{ color: '#2E6E9E' }}>
//             और देखें <FaArrowRight size={12} />
//           </Link>
//         </div>
//         <Alert variant="info" className="my-4">
//           कोई मनोरंजन समाचार उपलब्ध नहीं है।
//         </Alert>
//       </Container>
//     );

//   const mainArticle = newsData[0];
//   const bottomArticle = newsData[1];
//   const sideArticles = newsData.slice(2, 6); // अधिकतम 4 साइड आर्टिकल्स

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   // --- Styling Constants ---
//   const accentColor = "#A12D2A";
//   const linkColor = "#2E6E9E";
//   const headerUnderlineColor = "#F8D7DA";
//   // ----------------------------------------------------------------

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div style={{ width: "40px", height: "4px", backgroundColor: headerUnderlineColor, marginBottom: "8px" }}></div>
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: accentColor }} className="me-2"></div>
//           <h5 className="fw-bold m-0">मनोरंजन</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link to="/entertainment" className="text-decoration-none fw-bold small flex-shrink-0" style={{ color: linkColor }}>
//           और देखें <FaArrowRight size={12} />
//         </Link>
//       </div>

//       <Row>
//         {/* Left Column */}
//         <Col lg={7} className="mb-4 mb-lg-0 d-lg-flex flex-column">
//           {mainArticle && (
//             <Link
//               to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//               key={mainArticle.slug_en || mainArticle._id}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//               className="d-block position-relative mb-4 flex-grow-1"
//             >
//               <Image
//                 src={mainArticle.media?.[0]?.url || "https://via.placeholder.com/600x400"}
//                 fluid
//                 rounded
//                 className="w-100"
//                 style={{ objectFit: "cover", maxHeight: "400px", height: "300px" }}
//               />
//               <div className="position-absolute bottom-0 start-0 text-white w-100 p-3"
//                 style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent)", borderRadius: "0 0 var(--bs-border-radius) var(--bs-border-radius)" }}
//               >
//                 <h4 className="fw-bold text-wrap">{mainArticle.title_hi || mainArticle.title_en}</h4>
//                 <div className="d-flex align-items-center flex-wrap mt-1">
//                   <UserAvatar user={mainArticle.createdBy} size={30} />
//                   <small className="ms-2 text-wrap">{mainArticle.createdBy?.name || "EMS News"} | {new Date(mainArticle.publishedAt).toLocaleDateString("hi-IN")}</small>
//                 </div>
//               </div>
//             </Link>
//           )}

//           {bottomArticle && (
//             <Link to={`/news/${bottomArticle.slug_en || bottomArticle._id}`} key={bottomArticle.slug_en || bottomArticle._id} state={{ relatedArticles: newsData }} style={linkStyle}>
//               <Row className="align-items-center gx-2">
//                 <Col xs={4} md={3}>
//                   <Image
//                     src={bottomArticle.media?.[0]?.url || "https://via.placeholder.com/120x80"}
//                     fluid
//                     rounded
//                     style={{ height: "80px", objectFit: "cover", width: "100%" }}
//                   />
//                 </Col>
//                 <Col xs={8} md={9} className="ps-2">
//                   <p className="fw-bold mb-1 text-wrap">{bottomArticle.title_hi || bottomArticle.title_en}</p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={bottomArticle.createdBy} size={25} />
//                     <small className="ms-2 text-muted text-wrap">{bottomArticle.createdBy?.name || "EMS News"} | {new Date(bottomArticle.publishedAt).toLocaleDateString("hi-IN")}</small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//           )}
//         </Col>

//         {/* Right Column */}
//         <Col lg={5}>
//           {sideArticles.map((article) => (
//             <Link to={`/news/${article.slug_en || article._id}`} key={article.slug_en || article._id} state={{ relatedArticles: newsData }} style={linkStyle}>
//               <Row className="align-items-center gx-2 mb-3">
//                 <Col xs={4}>
//                   <Image src={article.media?.[0]?.url || "https://via.placeholder.com/120x80"} fluid rounded style={{ height: "80px", objectFit: "cover", width: "100%" }} />
//                 </Col>
//                 <Col xs={8} className="ps-2">
//                   <p className="fw-bold mb-1 text-wrap" style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>{article.title_hi || article.title_en}</p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={article.createdBy} size={25} />
//                     <small className="text-muted ms-1 text-wrap">
//                       {article.createdBy?.name || "EMS News"} | {new Date(article.publishedAt).toLocaleString("hi-IN", {
//   day: "numeric",
//   month: "short",
//   year: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
// })
// }
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Manoranjan;

// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { FaArrowRight } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const Manoranjan = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const entertainmentNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(entertainmentNews);
//         } else {
//           setError(res?.message || "Failed to load news.");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching news.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleString("hi-IN", {
//       day: "numeric",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p className="mt-2">मनोरंजन समाचार लोड हो रहे हैं...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <Alert variant="danger" className="my-4">
//         त्रुटि: {error}
//       </Alert>
//     );

//   if (newsData.length === 0)
//     return (
//       <Container fluid className="mt-4">
//         <div style={{ width: "40px", height: "4px", backgroundColor: "#F8D7DA", marginBottom: "8px" }}></div>
//         <div className="d-flex align-items-center mb-3 flex-wrap">
//           <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//             <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }} className="me-2"></div>
//             <h5 className="fw-bold m-0">मनोरंजन</h5>
//           </div>
//           <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//           <Link
//             to="/entertainment"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें <FaArrowRight size={12} />
//           </Link>
//         </div>
//         <Alert variant="info" className="my-4">
//           कोई मनोरंजन समाचार उपलब्ध नहीं है।
//         </Alert>
//       </Container>
//     );

//   const mainArticle = newsData[0];
//   const bottomArticle = newsData[1];
//   const sideArticles = newsData.slice(2, 8);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const accentColor = "#A12D2A";
//   const linkColor = "#2E6E9E";
//   const headerUnderlineColor = "#F8D7DA";

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div
//         style={{
//           width: "40px",
//           height: "4px",
//           backgroundColor: headerUnderlineColor,
//           marginBottom: "8px",
//         }}
//       ></div>
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div
//             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
//             className="me-2"
//           ></div>
//           <h5 className="fw-bold m-0">मनोरंजन</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link
//           to="/entertainment"
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: linkColor }}
//         >
//           और देखें <FaArrowRight size={12} />
//         </Link>
//       </div>

//       <Row>
//         {/* Left Column */}
//         <Col lg={7} className="mb-4 mb-lg-0 d-lg-flex flex-column">
//           {mainArticle && (
//             <Link
//               to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//               key={mainArticle.slug_en || mainArticle._id}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//               className="d-block position-relative mb-4 flex-grow-1"
//             >
//               <Image
//                 src={mainArticle.media?.[0]?.url || "https://via.placeholder.com/600x400"}
//                 fluid
//                 rounded
//                 className="w-100"
//                 style={{ objectFit: "cover", maxHeight: "500px", height: "300px" }}
//               />
//               <div
//                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
//                 style={{
//                   background:
//                     "linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent)",
//                   borderRadius:
//                     "0 0 var(--bs-border-radius) var(--bs-border-radius)",
//                 }}
//               >
//                 <h4 className="fw-bold text-wrap">
//                   {mainArticle.title_hi || mainArticle.title_en}
//                 </h4>
//                 <div className="d-flex align-items-center flex-wrap mt-1">
//                   <UserAvatar user={mainArticle.createdBy} size={30} />
//                   <small className="ms-2 text-wrap">
//                     {mainArticle.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(mainArticle.publishedAt)}
//                   </small>
//                 </div>
//               </div>
//             </Link>
//           )}

//           {bottomArticle && (
//             <Link
//               to={`/news/${bottomArticle.slug_en || bottomArticle._id}`}
//               key={bottomArticle.slug_en || bottomArticle._id}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//             >
//               <Row className="align-items-center gx-2">
//                 <Col xs={4} md={3}>
//                   <Image
//                     src={
//                       bottomArticle.media?.[0]?.url ||
//                       "https://via.placeholder.com/120x80"
//                     }
//                     fluid
//                     rounded
//                     style={{
//                       height: "80px",
//                       objectFit: "cover",
//                       width: "100%",
//                     }}
//                   />
//                 </Col>
//                 <Col xs={8} md={9} className="ps-2">
//                   <p className="fw-bold mb-1 text-wrap">
//                     {bottomArticle.title_hi || bottomArticle.title_en}
//                   </p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={bottomArticle.createdBy} size={25} />
//                     <small className="ms-2 text-muted text-wrap">
//                       {bottomArticle.createdBy?.name || "EMS News"} |{" "}
//                       {formatFullDateTime(bottomArticle.publishedAt)}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//           )}
//         </Col>

//         {/* Right Column */}
//         <Col lg={5}>
//           {sideArticles.map((article) => (
//             <Link
//               to={`/news/${article.slug_en || article._id}`}
//               key={article.slug_en || article._id}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//             >
//               <Row className="align-items-center gx-2 mb-3">
//                 <Col xs={4}>
//                   <Image
//                     src={
//                       article.media?.[0]?.url ||
//                       "https://via.placeholder.com/120x80"
//                     }
//                     fluid
//                     rounded
//                     style={{
//                       height: "80px",
//                       objectFit: "cover",
//                       width: "100%",
//                     }}
//                   />
//                 </Col>
//                 <Col xs={8} className="ps-2">
//                   <p
//                     className="fw-bold mb-1 text-wrap"
//                     style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
//                   >
//                     {article.title_hi || article.title_en}
//                   </p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={article.createdBy} size={25} />
//                     <small className="text-muted ms-1 text-wrap">
//                       {article.createdBy?.name || "EMS News"} |{" "}
//                       {formatFullDateTime(article.publishedAt)}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Manoranjan;



// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { FaArrowRight } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // Media Renderer Helper Component (जैसा कि अन्य कॉम्पोनेन्ट्स में उपयोग किया गया है)
// const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
//   const firstMedia = media?.[0];
//   const isVideo = firstMedia && firstMedia.type === 'video';
//   const mediaUrl = firstMedia?.url;

//   const commonStyles = {
//     width: width,
//     height: height,
//     objectFit: objectFit,
//     borderRadius: borderRadius,
//     backgroundColor: "#e0e0e0", // Empty/error states के लिए consistent background
//     display: "block",
//     position: "relative",
//     zIndex: 0,
//   };

//   if (isVideo) {
//     if (mediaUrl) {
//       return (
//         <video
//           src={mediaUrl}
//           width={width}
//           height={height}
//           controls={false}
//           autoPlay
//           muted
//           loop
//           style={commonStyles}
//         >
//           Your browser does not support the video tag.
//         </video>
//       );
//     } else {
//       const placeholderWidth = parseInt(width) || 150;
//       const placeholderHeight = parseInt(height) || 90;
//       return (
//         <Image
//           src={`https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=VIDEO+URL+MISSING`}
//           alt={alt}
//           style={commonStyles}
//         />
//       );
//     }
//   } else {
//     const imageSrc = mediaUrl || `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=No+Media`;
//     return (
//       <Image
//         src={imageSrc}
//         alt={alt}
//         style={commonStyles}
//         onError={(e) => {
//           const placeholderWidth = parseInt(width) || 150;
//           const placeholderHeight = parseInt(height) || 90;
//           e.target.src = `https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=Error`;
//           console.error("Image failed to load:", e.target.src);
//         }}
//       />
//     );
//   }
// };


// const Manoranjan = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const entertainmentNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(entertainmentNews);
//         } else {
//           setError(res?.message || "Failed to load news.");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching news.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   // Date Formatting Function (Consistent with other components)
//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     const options = {
//       day: "numeric",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hourCycle: 'h23', // Ensure 24-hour format
//     };
//     return new Date(dateString).toLocaleString("hi-IN", options);
//   };

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p className="mt-2">मनोरंजन समाचार लोड हो रहे हैं...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <Alert variant="danger" className="my-4">
//         त्रुटि: {error}
//       </Alert>
//     );

//   if (newsData.length === 0)
//     return (
//       <Container fluid className="mt-4">
//         <div style={{ width: "40px", height: "4px", backgroundColor: "#F8D7DA", marginBottom: "8px" }}></div>
//         <div className="d-flex align-items-center mb-3 flex-wrap">
//           <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//             <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }} className="me-2"></div>
//             <h5 className="fw-bold m-0">मनोरंजन</h5>
//           </div>
//           <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//           <Link
//             to="/entertainment"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें <FaArrowRight size={12} />
//           </Link>
//         </div>
//         <Alert variant="info" className="my-4">
//           कोई मनोरंजन समाचार उपलब्ध नहीं है।
//         </Alert>
//       </Container>
//     );

//   const mainArticle = newsData[0];
//   const bottomArticle = newsData[1];
//   const sideArticles = newsData.slice(2, 8);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const accentColor = "#A12D2A";
//   const linkColor = "#2E6E9E";
//   const headerUnderlineColor = "#F8D7DA";

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div
//         style={{
//           width: "40px",
//           height: "4px",
//           backgroundColor: headerUnderlineColor,
//           marginBottom: "8px",
//         }}
//       ></div>
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div
//           style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
//           className="me-2"
//         ></div>
//         <h5 className="fw-bold m-0">मनोरंजन</h5>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link
//           to="/entertainment"
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: linkColor }}
//         >
//           और देखें <FaArrowRight size={12} />
//         </Link>
//       </div>

//       <Row>
//         {/* Left Column */}
//         <Col lg={7} className="mb-4 mb-lg-0 d-lg-flex flex-column">
//           {mainArticle && (
//             <Link
//               to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//               key={mainArticle.slug_en || mainArticle._id}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//               className="d-block position-relative mb-4 flex-grow-1"
//             >
//               {/* MediaRenderer for Main Article */}
//               <MediaRenderer
//                 media={mainArticle.media}
//                 alt={mainArticle.title_hi || mainArticle.title_en || "मनोरंजन समाचार"}
//                 width="100%"
//                 height="300px" // mainArticle के लिए उपयुक्त ऊंचाई
//                 objectFit="cover"
//                 borderRadius="8px"
//               />
//               <div
//                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
//                 style={{
//                   background:
//                     "linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent)",
//                   borderRadius:
//                     "0 0 var(--bs-border-radius) var(--bs-border-radius)",
//                 }}
//               >
//                 <h4 className="fw-bold text-wrap">
//                   {mainArticle.title_hi || mainArticle.title_en}
//                 </h4>
//                 <div className="d-flex align-items-center flex-wrap mt-1">
//                   <UserAvatar user={mainArticle.createdBy} size={30} />
//                   <small className="ms-2 text-wrap">
//                     {mainArticle.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(mainArticle.publishedAt)}
//                   </small>
//                 </div>
//               </div>
//             </Link>
//           )}

//           {bottomArticle && (
//             <Link
//               to={`/news/${bottomArticle.slug_en || bottomArticle._id}`}
//               key={bottomArticle.slug_en || bottomArticle._id}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//             >
//               <Row className="align-items-center gx-2">
//                 {/* MediaRenderer for Bottom Article */}
//                 {/* Col size changed to xs={4} md={3} as in City component */}
//                 <Col xs={4} md={3}>
//                   <MediaRenderer
//                     media={bottomArticle.media}
//                     alt={bottomArticle.title_hi || bottomArticle.title_en || "मनोरंजन समाचार"}
//                     width="100%"
//                     height="90px" // RelatedNews के समान ऊंचाई
//                     objectFit="cover"
//                     borderRadius="8px"
//                   />
//                 </Col>
//                 {/* Text Col size changed to xs={8} md={9} as in City component */}
//                 <Col xs={8} md={9} className="ps-2">
//                   <p className="fw-bold mb-1 text-wrap">
//                     {bottomArticle.title_hi || bottomArticle.title_en}
//                   </p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={bottomArticle.createdBy} size={25} />
//                     <small className="ms-2 text-muted text-wrap">
//                       {bottomArticle.createdBy?.name || "EMS News"} |{" "}
//                       {formatFullDateTime(bottomArticle.publishedAt)}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//           )}
//         </Col>

//         {/* Right Column */}
//         <Col lg={5}>
//           {sideArticles.map((article) => (
//             <Link
//               to={`/news/${article.slug_en || article._id}`}
//               key={article.slug_en || article._id}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//             >
//               <Row className="align-items-center gx-2 mb-3">
//                 {/* MediaRenderer for Side Articles */}
//                 <Col xs={4}> {/* xs={4} as originally, keeps it responsive */}
//                   <MediaRenderer
//                     media={article.media}
//                     alt={article.title_hi || article.title_en || "मनोरंजन समाचार"}
//                     width="100%"
//                     height="90px" // RelatedNews के समान ऊंचाई
//                     objectFit="cover"
//                     borderRadius="8px"
//                   />
//                 </Col>
//                 <Col xs={8} className="ps-2">
//                   <p
//                     className="fw-bold mb-1 text-wrap"
//                     style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
//                   >
//                     {article.title_hi || article.title_en}
//                   </p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={article.createdBy} size={25} />
//                     <small className="text-muted ms-1 text-wrap">
//                       {article.createdBy?.name || "EMS News"} |{" "}
//                       {formatFullDateTime(article.publishedAt)}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Manoranjan;

// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { FaArrowRight } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // 🖼️ Media Renderer Component
// const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
//   const firstMedia = media?.[0];
//   const isVideo = firstMedia && firstMedia.type === "video";
//   const mediaUrl = firstMedia?.url;

//   const commonStyles = {
//     width,
//     height,
//     objectFit,
//     borderRadius,
//     backgroundColor: "#e0e0e0",
//     display: "block",
//   };

//   if (isVideo) {
//     return mediaUrl ? (
//       <video src={mediaUrl} width={width} height={height} autoPlay muted loop style={commonStyles} />
//     ) : (
//       <Image
//         src={`https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=VIDEO+MISSING`}
//         alt={alt}
//         style={commonStyles}
//       />
//     );
//   } else {
//     const imageSrc =
//       mediaUrl ||
//       `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=No+Media`;
//     return (
//       <Image
//         src={imageSrc}
//         alt={alt}
//         style={commonStyles}
//         onError={(e) => {
//           e.target.src = `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=Error`;
//         }}
//       />
//     );
//   }
// };

// const Manoranjan = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const entertainmentNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(entertainmentNews);
//         } else setError(res?.message || "Failed to load news.");
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching news.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     const options = { day: "numeric", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
//     return new Date(dateString).toLocaleString("hi-IN", options);
//   };

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p>मनोरंजन समाचार लोड हो रहे हैं...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <Alert variant="danger" className="my-4">
//         त्रुटि: {error}
//       </Alert>
//     );

//   if (newsData.length === 0)
//     return (
//       <Container fluid className="mt-4">
//         <Alert variant="info" className="my-4">
//           कोई मनोरंजन समाचार उपलब्ध नहीं है।
//         </Alert>
//       </Container>
//     );

//   // 📰 News Distribution
//   const mainArticle = newsData[0];
//   const bottomArticle = newsData[1];
//   const sideArticles = newsData.slice(2, 6); // ✅ अब सिर्फ 4 कार्ड show होंगे

//   return (
//     <Container fluid className="mt-4">
//       {/* Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }} className="me-2"></div>
//         <h5 className="fw-bold m-0">मनोरंजन</h5>
//         <hr className="flex-grow-1 mx-3 border-danger border-2 opacity-100 my-0" />
//         <Link to="/entertainment" className="text-decoration-none fw-bold small" style={{ color: "#2E6E9E" }}>
//           और देखें <FaArrowRight size={12} />
//         </Link>
//       </div>

//       <Row>
//         {/* LEFT SIDE */}
//         <Col lg={7} className="mb-4">
//           {mainArticle && (
//             <Link
//               to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//               className="d-block position-relative mb-4"
//               style={{ textDecoration: "none", color: "inherit" }}
//             >
//               <MediaRenderer media={mainArticle.media} alt={mainArticle.title_hi} width="100%" height="300px" />
//               <div
//                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
//                 style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent)" }}
//               >
//                 <h4 className="fw-bold">{mainArticle.title_hi}</h4>
//                 <div className="d-flex align-items-center flex-wrap mt-1">
//                   <UserAvatar user={mainArticle.createdBy} size={30} />
//                   <small className="ms-2">{mainArticle.createdBy?.name || "EMS News"} | {formatFullDateTime(mainArticle.publishedAt)}</small>
//                 </div>
//               </div>
//             </Link>
//           )}

//           {bottomArticle && (
//             <Link
//               to={`/news/${bottomArticle.slug_en || bottomArticle._id}`}
//               className="d-block"
//               style={{ textDecoration: "none", color: "inherit" }}
//             >
//               <Row className="align-items-center gx-2">
//                 <Col xs={4} md={3}>
//                   <MediaRenderer media={bottomArticle.media} alt={bottomArticle.title_hi} width="100%" height="90px" />
//                 </Col>
//                 <Col xs={8} md={9}>
//                   <p className="fw-bold mb-1">{bottomArticle.title_hi}</p>
//                   <div className="d-flex align-items-center">
//                     <UserAvatar user={bottomArticle.createdBy} size={25} />
//                     <small className="ms-2 text-muted">
//                       {bottomArticle.createdBy?.name || "EMS News"} | {formatFullDateTime(bottomArticle.publishedAt)}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
            
//           )}
//         </Col>

//         {/* RIGHT SIDE (4 cards + gray line under all) */}
//         <Col lg={5}>
//           {sideArticles.map((article, index) => (
//             <div key={article._id || index}>
//               <Link
//                 to={`/news/${article.slug_en || article._id}`}
//                 className="d-block mb-2"
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <Row className="align-items-center gx-2 mb-2">
//                   <Col xs={4}>
//                     <MediaRenderer media={article.media} alt={article.title_hi} width="100%" height="90px" />
//                   </Col>
//                   <Col xs={8}>
//                     <p className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
//                       {article.title_hi || article.title_en}
//                     </p>
//                     <div className="d-flex align-items-center">
//                       <UserAvatar user={article.createdBy} size={25} />
//                       <small className="text-muted ms-1">
//                         {article.createdBy?.name || "EMS News"} | {formatFullDateTime(article.publishedAt)}
//                       </small>
//                     </div>
//                   </Col>
//                 </Row>
//               </Link>

//               {/* ✅ अब हर card के नीचे gray line दिखेगी */}
//               <div style={{ height: "1px", backgroundColor: "#dcdcdc", marginBottom: "10px" }}></div>
//             </div>
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Manoranjan;


import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { allNews } from "../../Services/authApi";
import { Link } from "react-router-dom";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

// 🖼️ Media Renderer Component
const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
  const firstMedia = media?.[0];
  const isVideo = firstMedia && firstMedia.type === "video";
  const mediaUrl = firstMedia?.url;

  const commonStyles = {
    width,
    height,
    objectFit,
    borderRadius,
    backgroundColor: "#e0e0e0",
    display: "block",
  };

  if (isVideo) {
    return mediaUrl ? (
      <video src={mediaUrl} width={width} height={height} autoPlay muted loop style={commonStyles} />
    ) : (
      <Image
        src={`https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=VIDEO+MISSING`}
        alt={alt}
        style={commonStyles}
      />
    );
  } else {
    const imageSrc =
      mediaUrl ||
      `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=No+Media`;
    return (
      <Image
        src={imageSrc}
        alt={alt}
        style={commonStyles}
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=Error`;
        }}
      />
    );
  }
};

const Manoranjan = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await allNews();
        if (res?.success) {
          const entertainmentNews = res.data.filter((item) => {
            const categoryName = item.category?.name?.toLowerCase() || "";
            return categoryName === "entertainment" || categoryName === "मनोरंजन";
          });
          setNewsData(entertainmentNews);
        } else setError(res?.message || "Failed to load news.");
      } catch (err) {
        setError(err.message || "An error occurred while fetching news.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const formatFullDateTime = (dateString) => {
    if (!dateString) return "";
    const options = { day: "numeric", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
    return new Date(dateString).toLocaleString("hi-IN", options);
  };

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
        <p>मनोरंजन समाचार लोड हो रहे हैं...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="my-4">
        त्रुटि: {error}
      </Alert>
    );

  if (newsData.length === 0)
    return (
      <Container fluid className="mt-4">
        <Alert variant="info" className="my-4">
          कोई मनोरंजन समाचार उपलब्ध नहीं है।
        </Alert>
      </Container>
    );

  // 📰 News Distribution
  const mainArticle = newsData[0];
  const bottomArticle = newsData[1];
  const sideArticles = newsData.slice(2, 6); // ✅ अब सिर्फ 4 कार्ड show होंगे

  return (
    <Container fluid className="mt-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }} className="me-2"></div>
        <h5 className="fw-bold m-0">मनोरंजन</h5>
        <hr className="flex-grow-1 mx-3 border-danger border-2 opacity-100 my-0" />
        <Link to="/entertainment" className="text-decoration-none fw-bold small" style={{ color: "#2E6E9E" }}>
          और देखें <FaArrowRight size={12} />
        </Link>
      </div>

      <Row>
        {/* LEFT SIDE */}
        <Col lg={7} className="mb-4">
          {mainArticle && (
            <Link
              to={`/news/${mainArticle.slug_en || mainArticle._id}`}
              className="d-block position-relative mb-4"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MediaRenderer media={mainArticle.media} alt={mainArticle.title_hi} width="100%" height="300px" />
              <div
                className="position-absolute bottom-0 start-0 text-white w-100 p-3"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent)" }}
              >
                <h4 className="fw-bold">{mainArticle.title_hi}</h4>
                <div className="d-flex align-items-center flex-wrap mt-1">
                  <UserAvatar user={mainArticle.createdBy} size={30} />
                  <small className="ms-2">
                    {mainArticle.createdBy?.name || "EMS News"} | {formatFullDateTime(mainArticle.publishedAt)}
                  </small>
                </div>
              </div>
            </Link>
          )}

          {bottomArticle && (
            <>
              <Link
                to={`/news/${bottomArticle.slug_en || bottomArticle._id}`}
                className="d-block"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Row className="align-items-center gx-2">
                  <Col xs={4} md={3}>
                    <MediaRenderer media={bottomArticle.media} alt={bottomArticle.title_hi} width="100%" height="90px" />
                  </Col>
                  <Col xs={8} md={9}>
                    <p className="fw-bold mb-1">{bottomArticle.title_hi}</p>
                    <div className="d-flex align-items-center">
                      <UserAvatar user={bottomArticle.createdBy} size={25} />
                      <small className="ms-2 text-muted">
                        {bottomArticle.createdBy?.name || "EMS News"} | {formatFullDateTime(bottomArticle.publishedAt)}
                      </small>
                    </div>
                  </Col>
                </Row>
              </Link>

              {/* ✅ नीचे gray line जोड़ी गई */}
              <div style={{ height: "1px", backgroundColor: "#dcdcdc", marginTop: "10px", marginBottom: "10px" }}></div>
            </>
          )}
        </Col>

        {/* RIGHT SIDE (4 cards + gray line under all) */}
        <Col lg={5}>
          {sideArticles.map((article, index) => (
            <div key={article._id || index}>
              <Link
                to={`/news/${article.slug_en || article._id}`}
                className="d-block mb-2"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Row className="align-items-center gx-2 mb-2">
                  <Col xs={4}>
                    <MediaRenderer media={article.media} alt={article.title_hi} width="100%" height="90px" />
                  </Col>
                  <Col xs={8}>
                    <p className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
                      {article.title_hi || article.title_en}
                    </p>
                    <div className="d-flex align-items-center">
                      <UserAvatar user={article.createdBy} size={25} />
                      <small className="text-muted ms-1">
                        {article.createdBy?.name || "EMS News"} | {formatFullDateTime(article.publishedAt)}
                      </small>
                    </div>
                  </Col>
                </Row>
              </Link>

              {/* ✅ हर card के नीचे gray line */}
              <div style={{ height: "1px", backgroundColor: "#dcdcdc", marginBottom: "10px" }}></div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Manoranjan;
