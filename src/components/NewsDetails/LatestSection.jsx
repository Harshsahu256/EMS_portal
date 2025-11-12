
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Badge, Spinner, Alert } from "react-bootstrap";
// import { BsFillPersonFill } from "react-icons/bs";
// import { FaFacebookF, FaTwitter, FaLink } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";

// // ✅ Categories to exclude
// const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

// // ✅ Author info component
// const AuthorInfo = ({ name }) => (
//   <div className="d-flex align-items-center text-muted small mt-1">
//     <div className="rounded-circle bg-warning me-1 d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px" }}>
//       <BsFillPersonFill className="text-white" size={12} />
//     </div>
//     <span style={{ fontSize: "0.8rem" }}>By {name || "Unknown"}</span>
//   </div>
// );

// const HindiNewsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await allNews(); // ✅ API: allNews
//         if (res?.success) {
//           const filteredData = res.data.filter((article) => {
//             const cat = article?.category?.name?.toLowerCase();
//             if (!cat) return false;
//             if (
//               cat === "sports" ||
//               cat === "flace" ||
//               cat === "breaking news" ||
//               cat === "business" ||
//               HOROSCOPE_CATEGORY.includes(cat)
//             ) return false;
//             return true;
//           });
//           setNewsData(filteredData);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading) return <div className="text-center my-4"><Spinner animation="border" variant="primary" /><p>Loading News...</p></div>;
//   if (error) return <Alert variant="danger" className="my-4">Error loading news: {error}</Alert>;
//   if (!newsData.length) return null;

//   const leftArticles = newsData.slice(0, 5);
//   const mainArticle = newsData[0] || {};
//   const rightBottomArticles = newsData.slice(5, 8);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const getDate = (date) => date
//     ? new Date(date).toLocaleString("hi-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })
//     : "";

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2"></div>
//           <h5 className="fw-bold m-0">Latest News</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link to="/related-news" state={{ relatedArticles: newsData }} className="text-decoration-none fw-bold small flex-shrink-0" style={{ color: "#2E6E9E" }}>और देखें</Link>
//       </div>

//       {/* Left News Articles */}
//       <Row>
//         <Col xs={12} lg={7} className="border-end-lg pe-lg-4">
//           {leftArticles.map((article) => {
//             const slugOrId = article?.slug_en || article?._id; // ✅ slug_en
//             const title = article?.title_hi || article?.title_en || "Untitled"; // ✅ Hindi fallback
//             const summary = article?.summary_hi || article?.summary_en || "";
//             const imageUrl = article?.media?.[0]?.url || "https://via.placeholder.com/140x100";
//             const authorName = article?.createdBy?.name || "EMS News";

//             return (
//               <Link key={slugOrId} to={`/news/${slugOrId}`} state={{ relatedArticles: newsData }} style={linkStyle}>
//                 <Row className="mb-3 gx-3 align-items-center" style={{ minHeight: "100px" }}>
//                   <Col xs={4} md={3}>
//                     <Image src={imageUrl} fluid rounded style={{ height: "100px", objectFit: "cover", width: "100%" }} />
//                   </Col>
//                   <Col xs={8} md={9}>
//                     <p className="fw-bold mb-1">{title}</p>
//                     <p className="text-muted small m-0">{getDate(article?.createdAt)}</p>
//                     <AuthorInfo name={authorName} />
//                   </Col>
//                 </Row>
//               </Link>
//             );
//           })}
//         </Col>

//         {/* Right News */}
//         <Col xs={12} lg={5} className="ps-lg-4">
//           {mainArticle.slug_en && (
//             <Link to={`/news/${mainArticle.slug_en}`} state={{ relatedArticles: newsData }} style={linkStyle}>
//               <Row className="mb-3 gx-3 align-items-center" style={{ minHeight: "100px" }}>
//                 <Col xs={12} sm={5} className="mb-2 mb-sm-0">
//                   <Image src={mainArticle.media?.[0]?.url || "https://via.placeholder.com/200x150"} fluid rounded style={{ height: "100px", objectFit: "cover", width: "100%" }} />
//                 </Col>
//                 <Col xs={12} sm={7}>
//                   <p className="fw-bold mb-1"><Badge bg="danger" className="me-1">मुख्य खबर</Badge>{mainArticle.title_hi || mainArticle.title_en}</p>
//                   <p className="text-muted small m-0">{getDate(mainArticle?.createdAt)}</p>
//                 </Col>
//               </Row>
//             </Link>
//           )}

//           {/* Bottom Right Articles */}
//           {rightBottomArticles.map((article) => {
//             const slugOrId = article?.slug_en || article?._id;
//             const title = article?.title_hi || article?.title_en || "Untitled";
//             const authorName = article?.createdBy?.name || "EMS News";

//             return (
//               <Link key={slugOrId} to={`/news/${slugOrId}`} state={{ relatedArticles: newsData }} style={linkStyle}>
//                 <Row className="mb-3 gx-3 align-items-center" style={{ minHeight: "100px" }}>
//                   <p className="fw-bold text-danger small mb-1">{article.category?.name || "अन्य"}</p>
//                   <Col xs={4} md={3}>
//                     <Image src={article.media?.[0]?.url || "https://via.placeholder.com/140x100"} fluid rounded />
//                   </Col>
//                   <Col xs={8} md={9}>
//                     <p className="fw-bold mb-1">{title}</p>
//                     <p className="text-muted small m-0">{getDate(article?.createdAt)}</p>
//                     <AuthorInfo name={authorName} />
//                   </Col>
//                 </Row>
//               </Link>
//             );
//           })}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default HindiNewsSection;


// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Badge, Spinner, Alert } from "react-bootstrap";
// import { BsFillPersonFill } from "react-icons/bs";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";

// // Categories to exclude
// const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

// // Author info component
// const AuthorInfo = ({ name }) => (
//   <div className="d-flex align-items-center text-muted small mt-1">
//     <div className="rounded-circle bg-warning me-1 d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px" }}>
//       <BsFillPersonFill className="text-white" size={12} />
//     </div>
//     <span style={{ fontSize: "0.8rem" }}>By {name || "Unknown"}</span>
//   </div>
// );

// const HindiNewsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const filteredData = res.data.filter((article) => {
//             const cat = article?.category?.name?.toLowerCase();
//             if (!cat) return false;
//             // Exclude specific categories
//             if (
//               cat === "sports" ||
//               cat === "flace" ||
//               cat === "breaking news" ||
//               cat === "business" ||
//               HOROSCOPE_CATEGORY.includes(cat)
//             ) return false;
//             return true;
//           });
//           setNewsData(filteredData);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading) return <div className="text-center my-4"><Spinner animation="border" variant="primary" /><p>Loading News...</p></div>;
//   if (error) return <Alert variant="danger" className="my-4">Error loading news: {error}</Alert>;
//   if (!newsData.length) return null;

//   const leftArticles = newsData.slice(0, 5);
//   const mainArticle = newsData[0] || {};
//   const rightBottomArticles = newsData.slice(5, 8);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const getDate = (date) => date
//     ? new Date(date).toLocaleString("hi-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })
//     : "";

//   // --- Styling Constants (can be moved to a CSS file or theme) ---
//   const accentColor = "#C00000";
//   const linkColor = "#2E6E9E";
//   // ----------------------------------------------------------------

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: accentColor }} className="me-2"></div>
//           <h5 className="fw-bold m-0">Latest News</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link to="/related-news" state={{ relatedArticles: newsData }} className="text-decoration-none fw-bold small flex-shrink-0" style={{ color: linkColor }}>और देखें</Link>
//       </div>

//       {/* Left News Articles */}
//       <Row>
//         <Col xs={12} lg={7} className="border-end-lg pe-lg-4">
//           {leftArticles.map((article) => {
//             const slugOrId = article?.slug_en || article?._id;
//             const title = article?.title_hi || article?.title_en || "Untitled";
//             const imageUrl = article?.media?.[0]?.url || "https://via.placeholder.com/140x100";
//             const authorName = article?.createdBy?.name || "EMS News";

//             return (
//               <Link key={slugOrId} to={`/news/${slugOrId}`} state={{ relatedArticles: newsData }} style={linkStyle}>
//                 <Row className="mb-3 gx-3 align-items-center" style={{ minHeight: "100px" }}>
//                   <Col xs={4} md={3}>
//                     <Image src={imageUrl} fluid rounded style={{ height: "100px", objectFit: "cover", width: "100%" }} />
//                   </Col>
//                   <Col xs={8} md={9}>
//                     <p className="fw-bold mb-1 text-wrap">{title}</p>
//                     <p className="text-muted small m-0">{getDate(article?.createdAt)}</p>
//                     <AuthorInfo name={authorName} />
//                   </Col>
//                 </Row>
//               </Link>
//             );
//           })}
//         </Col>

//         {/* Right News */}
//         <Col xs={12} lg={5} className="ps-lg-4">
//           {mainArticle.slug_en && (
//             <Link to={`/news/${mainArticle.slug_en}`} state={{ relatedArticles: newsData }} style={linkStyle}>
//               <Row className="mb-3 gx-3 align-items-center" style={{ minHeight: "100px" }}>
//                 <Col xs={12} sm={5} className="mb-2 mb-sm-0">
//                   <Image src={mainArticle.media?.[0]?.url || "https://via.placeholder.com/200x150"} fluid rounded style={{ height: "100px", objectFit: "cover", width: "100%" }} />
//                 </Col>
//                 <Col xs={12} sm={7}>
//                   {/* CRITICAL FIX for Horizontal Scrollbar: Use d-flex and flex-wrap for badge and title */}
//                   <p className="fw-bold mb-1 d-flex align-items-center flex-wrap">
//                     <Badge bg="danger" className="me-1 flex-shrink-0">मुख्य खबर</Badge>
//                     <span className="flex-grow-1 text-wrap">{mainArticle.title_hi || mainArticle.title_en}</span>
//                   </p>
//                   <p className="text-muted small m-0">{getDate(mainArticle?.createdAt)}</p>
//                 </Col>
//               </Row>
//             </Link>
//           )}

//           {/* Bottom Right Articles */}
//           {rightBottomArticles.map((article) => {
//             const slugOrId = article?.slug_en || article?._id;
//             const title = article?.title_hi || article?.title_en || "Untitled";
//             const authorName = article?.createdBy?.name || "EMS News";

//             return (
//               <Link key={slugOrId} to={`/news/${slugOrId}`} state={{ relatedArticles: newsData }} style={linkStyle}>
//                 <Row className="mb-3 gx-3 align-items-center" style={{ minHeight: "100px" }}>
//                   <p className="fw-bold text-danger small mb-1 text-wrap">{article.category?.name || "अन्य"}</p>
//                   <Col xs={4} md={3}>
//                     <Image src={article.media?.[0]?.url || "https://via.placeholder.com/140x100"} fluid rounded style={{ height: "100px", objectFit: "cover", width: "100%" }} />
//                   </Col>
//                   <Col xs={8} md={9}>
//                     <p className="fw-bold mb-1 text-wrap">{title}</p>
//                     <p className="text-muted small m-0">{getDate(article?.createdAt)}</p>
//                     <AuthorInfo name={authorName} />
//                   </Col>
//                 </Row>
//               </Link>
//             );
//           })}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default HindiNewsSection;



// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { BsFillPersonFill } from "react-icons/bs";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";

// // Categories to exclude
// const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

// const AuthorInfo = ({ name }) => (
//   <div className="d-flex align-items-center text-muted small mt-1">
//     <div
//       className="rounded-circle bg-warning me-1 d-flex align-items-center justify-content-center"
//       style={{ width: "22px", height: "22px" }}
//     >
//       <BsFillPersonFill className="text-white" size={12} />
//     </div>
//     <span style={{ fontSize: "0.8rem" }}>By {name || "Unknown"}</span>
//   </div>
// );

// const HindiNewsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const filteredData = res.data.filter((article) => {
//             const cat = article?.category?.name?.toLowerCase();
//             if (!cat) return false;

//             // Exclude unwanted categories
//             if (
//               cat === "sports" ||
//               cat === "flace" ||
//               cat === "breaking news" ||
//               cat === "business" ||
//               cat === "bentermants" ||
//               cat === "entertainment" ||
//               HOROSCOPE_CATEGORY.includes(cat)
//             )
//               return false;

//             return true;
//           });

//           setNewsData(filteredData);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading News...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <Alert variant="danger" className="my-4">
//         Error loading news: {error}
//       </Alert>
//     );

//   if (!newsData.length) return null;

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

//   const accentColor = "#C00000";
//   const linkColor = "#2E6E9E";

//   // Split news into left and right columns
//   const half = Math.ceil(newsData.length / 2);
//   const leftArticles = newsData.slice(0, half);
//   const rightArticles = newsData.slice(half);

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div
//             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
//             className="me-2"
//           ></div>
//           <h5 className="fw-bold m-0">Latest News</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link
//           to="/related-news"
//           state={{ relatedArticles: newsData }}
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: linkColor }}
//         >
//           और देखें
//         </Link>
//       </div>

//       <Row>
//         {/* LEFT SIDE */}
//         <Col xs={12} lg={6} className="border-end-lg pe-lg-4">
//           {leftArticles.map((article) => {
//             const slugOrId = article?.slug_en || article?._id;
//             const title = article?.title_hi || article?.title_en || "Untitled";
//             const imageUrl =
//               article?.media?.[0]?.url || "https://via.placeholder.com/140x100";
//             const authorName = article?.createdBy?.name || "EMS News";

//             return (
//               <Link
//                 key={slugOrId}
//                 to={`/news/${slugOrId}`}
//                 state={{ relatedArticles: newsData }}
//                 style={linkStyle}
//               >
//                 <Row
//                   className="mb-3 gx-3 align-items-center"
//                   style={{ minHeight: "100px" }}
//                 >
//                   <Col xs={4} md={3}>
//                     <Image
//                       src={imageUrl}
//                       fluid
//                       rounded
//                       style={{
//                         height: "100px",
//                         objectFit: "cover",
//                         width: "100%",
//                       }}
//                     />
//                   </Col>
//                   <Col xs={8} md={9}>
//                     <p className="fw-bold mb-1 text-wrap">{title}</p>
//                     <p className="text-muted small m-0">
//                       {getDate(article?.publishedAt)}
//                     </p>
//                     <AuthorInfo name={authorName} />
//                   </Col>
//                 </Row>
//               </Link>
//             );
//           })}
//         </Col>

//         {/* RIGHT SIDE (same layout as left) */}
//         <Col xs={12} lg={6} className="ps-lg-4">
//           {rightArticles.map((article) => {
//             const slugOrId = article?.slug_en || article?._id;
//             const title = article?.title_hi || article?.title_en || "Untitled";
//             const imageUrl =
//               article?.media?.[0]?.url || "https://via.placeholder.com/140x100";
//             const authorName = article?.createdBy?.name || "EMS News";

//             return (
//               <Link
//                 key={slugOrId}
//                 to={`/news/${slugOrId}`}
//                 state={{ relatedArticles: newsData }}
//                 style={linkStyle}
//               >
//                 <Row
//                   className="mb-3 gx-3 align-items-center"
//                   style={{ minHeight: "100px" }}
//                 >
//                   <Col xs={4} md={3}>
//                     <Image
//                       src={imageUrl}
//                       fluid
//                       rounded
//                       style={{
//                         height: "100px",
//                         objectFit: "cover",
//                         width: "100%",
//                       }}
//                     />
//                   </Col>
//                   <Col xs={8} md={9}>
//                     <p className="fw-bold mb-1 text-wrap">{title}</p>
//                     <p className="text-muted small m-0">
//                       {getDate(article?.publishedAt)}
//                     </p>
//                     <AuthorInfo name={authorName} />
//                   </Col>
//                 </Row>
//               </Link>
//             );
//           })}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default HindiNewsSection;



// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { BsFillPersonFill } from "react-icons/bs";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";

// // Categories to exclude
// const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

// const AuthorInfo = ({ name }) => (
//   <div className="d-flex align-items-center text-muted small mt-1">
//     <div
//       className="rounded-circle bg-warning me-1 d-flex align-items-center justify-content-center"
//       style={{ width: "22px", height: "22px" }}
//     >
//       <BsFillPersonFill className="text-white" size={12} />
//     </div>
//     <span style={{ fontSize: "0.8rem" }}>By {name || "Unknown"}</span>
//   </div>
// );

// const HindiNewsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const filteredData = res.data.filter((article) => {
//             const cat = article?.category?.name?.toLowerCase();
//             if (!cat) return false;

//             // Exclude unwanted categories
//             if (
//               cat === "sports" ||
//               cat === "flace" ||
//               cat === "breaking news" ||
//               cat === "business" ||
//               cat === "bentermants" ||
//               cat === "entertainment" ||
//               HOROSCOPE_CATEGORY.includes(cat)
//             )
//               return false;

//             return true;
//           });

//           setNewsData(filteredData);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading News...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <Alert variant="danger" className="my-4">
//         Error loading news: {error}
//       </Alert>
//     );

//   if (!newsData.length) return null;

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const getDate = (date) =>
//     date
//       ? new Date(date).toLocaleString("hi-IN", {
//           day: "numeric",
//           month: "2-digit",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       : "";

//   const accentColor = "#C00000";
//   const linkColor = "#2E6E9E";

//   // Calculate half for splitting news into pairs for aligned display
//   const half = Math.ceil(newsData.length / 2);

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div
//             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
//             className="me-2"
//           ></div>
//           <h5 className="fw-bold m-0">Latest News</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link
//           to="/related-news"
//           state={{ relatedArticles: newsData }}
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: linkColor }}
//         >
//           और देखें
//         </Link>
//       </div>

//       {/* Render news in two columns, with items aligned side-by-side */}
//       {Array.from({ length: half }).map((_, index) => {
//         const leftArticle = newsData[index];
//         const rightArticle = newsData[index + half]; // Get the corresponding article for the right column

//         return (
//           <Row key={index} className="mb-3"> {/* mb-3 for vertical spacing between article pairs */}
//             {/* Left Column Article */}
//             <Col xs={12} lg={6} className="pe-lg-2"> {/* Reduced padding for border space */}
//               {leftArticle && (
//                 <Link
//                   to={`/news/${leftArticle?.slug_en || leftArticle?._id}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                 >
//                   <Row className="gx-3 align-items-center" style={{ minHeight: "100px" }}>
//                     <Col xs={4} md={3}>
//                       <Image
//                         src={leftArticle?.media?.[0]?.url || "https://via.placeholder.com/140x100"}
//                         fluid
//                         rounded
//                         className="letest-news-img"
//                         style={{
//                           height: "100px",
//                           objectFit: "cover",
//                           width: "100%",
//                         }}
//                       />
//                     </Col>
//                     <Col xs={8} md={9}>
//                       <p
//                         className="fw-bold mb-1"
//                         style={{
//                           whiteSpace: "nowrap", // Ensure title stays on one line
//                           overflow: "hidden", // Hide overflowing text
//                           textOverflow: "ellipsis", // Add ellipsis for truncated text
//                         }}
//                       >
//                         {leftArticle?.title_hi || leftArticle?.title_en || "Untitled"}
//                       </p>
//                       <p className="text-muted small m-0">
//                         {getDate(leftArticle?.publishedAt)}
//                       </p>
//                       <AuthorInfo name={leftArticle?.createdBy?.name || "EMS News"} />
//                     </Col>
//                   </Row>
//                 </Link>
//               )}
//             </Col>

//             {/* Right Column Article (only renders if a corresponding article exists) */}
//             <Col xs={12} lg={6} className="ps-lg-2 mt-3 mt-lg-0 border-start-lg"> {/* Added top margin for mobile stack, border for desktop separator */}
//               {rightArticle && (
//                 <Link
//                   to={`/news/${rightArticle?.slug_en || rightArticle?._id}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                 >
//                   <Row className="gx-3 align-items-center" style={{ minHeight: "100px" }}>
//                     <Col xs={4} md={3}>
//                       <Image
//                         src={rightArticle?.media?.[0]?.url || "https://via.placeholder.com/140x100"}
//                         fluid
//                         rounded
//                         style={{
//                           height: "100px",
//                           objectFit: "cover",
//                           width: "100%",
//                         }}
//                       />
//                     </Col>
//                     <Col xs={8} md={9}>
//                       <p
//                         className="fw-bold mb-1"
//                         style={{
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {rightArticle?.title_hi || rightArticle?.title_en || "Untitled"}
//                       </p>
//                       <p className="text-muted small m-0">
//                         {getDate(rightArticle?.publishedAt)}
//                       </p>
//                       <AuthorInfo name={rightArticle?.createdBy?.name || "EMS News"} />
//                     </Col>
//                   </Row>
//                 </Link>
//               )}
//             </Col>
//           </Row>
//         );
//       })}
//     </Container>
//   );
// };

// export default HindiNewsSection;

// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { BsFillPersonFill } from "react-icons/bs";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";

// // Media Renderer Helper Component (जैसा कि RelatedNews और TopStory में उपयोग किया गया है)
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


// // Categories to exclude
// const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

// const AuthorInfo = ({ name }) => (
//   <div className="d-flex align-items-center text-muted small mt-1">
//     <div
//       className="rounded-circle bg-warning me-1 d-flex align-items-center justify-content-center"
//       style={{ width: "22px", height: "22px" }}
//     >
//       <BsFillPersonFill className="text-white" size={12} />
//     </div>
//     <span style={{ fontSize: "0.8rem" }}>By {name || "Unknown"}</span>
//   </div>
// );

// const HindiNewsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const filteredData = res.data.filter((article) => {
//             const cat = article?.category?.name?.toLowerCase();
//             if (!cat) return false;

//             // Exclude unwanted categories
//             if (
//               cat === "sports" ||
//               cat === "flace" ||
//               cat === "breaking news" ||
//               cat === "business" ||
//               cat === "bentermants" || // spelling correction "entertainment"
//               cat === "entertainment" ||
//               HOROSCOPE_CATEGORY.includes(cat)
//             )
//               return false;

//             return true;
//           });

//           setNewsData(filteredData);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading News...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <Alert variant="danger" className="my-4">
//         Error loading news: {error}
//       </Alert>
//     );

//   if (!newsData.length) return null;

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   // Updated getDate to match formatFullDateTime for consistency (24-hour format)
//   const getDate = (dateString) =>
//     dateString
//       ? new Date(dateString).toLocaleString("hi-IN", {
//           day: "numeric",
//           month: "2-digit",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           hourCycle: 'h23', // Ensure 24-hour format
//         })
//       : "";

//   const accentColor = "#C00000";
//   const linkColor = "#2E6E9E";

//   // Calculate half for splitting news into pairs for aligned display
//   const half = Math.ceil(newsData.length / 2);

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div
//             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
//             className="me-2"
//           ></div>
//           <h5 className="fw-bold m-0">Latest News</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link
//           to="/related-news"
//           state={{ relatedArticles: newsData }}
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: linkColor }}
//         >
//           और देखें
//         </Link>
//       </div>

//       {/* Render news in two columns, with items aligned side-by-side */}
//       {Array.from({ length: half }).map((_, index) => {
//         const leftArticle = newsData[index];
//         const rightArticle = newsData[index + half]; // Get the corresponding article for the right column

//         return (
//           <Row key={index} className="mb-3"> {/* mb-3 for vertical spacing between article pairs */}
//             {/* Left Column Article */}
//             <Col xs={12} lg={6} className="pe-lg-2"> {/* Reduced padding for border space */}
//               {leftArticle && (
//                 <Link
//                   to={`/news/${leftArticle?.slug_en || leftArticle?._id}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                 >
//                   <Row className="gx-3 align-items-center" style={{ minHeight: "90px" }}> {/* minHeight को 90px पर सेट किया गया */}
//                     <Col xs={4} md={3}>
//                       {/* MediaRenderer का उपयोग करें */}
//                       <MediaRenderer
//                         media={leftArticle?.media}
//                         alt={leftArticle?.title_hi || leftArticle?.title_en || "Untitled"}
//                         width="100%"
//                         height="90px" // फिक्स्ड हाइट 90px
//                         objectFit="cover"
//                         borderRadius="8px" // 8px का borderRadius
//                       />
//                     </Col>
//                     <Col xs={8} md={9}>
//                       <p
//                         className="fw-bold mb-1"
//                         style={{
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {leftArticle?.title_hi || leftArticle?.title_en || "Untitled"}
//                       </p>
//                       <p className="text-muted small m-0">
//                         {getDate(leftArticle?.publishedAt)}
//                       </p>
//                       <AuthorInfo name={leftArticle?.createdBy?.name || "EMS News"} />
//                     </Col>
//                   </Row>
//                 </Link>
//               )}
//             </Col>

//             {/* Right Column Article (only renders if a corresponding article exists) */}
//             <Col xs={12} lg={6} className="ps-lg-2 mt-3 mt-lg-0 border-start-lg"> {/* Added top margin for mobile stack, border for desktop separator */}
//               {rightArticle && (
//                 <Link
//                   to={`/news/${rightArticle?.slug_en || rightArticle?._id}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                 >
//                   <Row className="gx-3 align-items-center" style={{ minHeight: "90px" }}> {/* minHeight को 90px पर सेट किया गया */}
//                     <Col xs={4} md={3}>
//                       {/* MediaRenderer का उपयोग करें */}
//                       <MediaRenderer
//                         media={rightArticle?.media}
//                         alt={rightArticle?.title_hi || rightArticle?.title_en || "Untitled"}
//                         width="100%"
//                         height="90px" // फिक्स्ड हाइट 90px
//                         objectFit="cover"
//                         borderRadius="8px" // 8px का borderRadius
//                       />
//                     </Col>
//                     <Col xs={8} md={9}>
//                       <p
//                         className="fw-bold mb-1"
//                         style={{
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {rightArticle?.title_hi || rightArticle?.title_en || "Untitled"}
//                       </p>
//                       <p className="text-muted small m-0">
//                         {getDate(rightArticle?.publishedAt)}
//                       </p>
//                       <AuthorInfo name={rightArticle?.createdBy?.name || "EMS News"} />
//                     </Col>
//                   </Row>
//                 </Link>
//               )}
//             </Col>
//           </Row>
//         );
//       })}
//     </Container>
//   );
// };

// export default HindiNewsSection;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { allNews } from "../../Services/authApi";
import { Link } from "react-router-dom";

// ✅ Media Renderer
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
      <video
        src={mediaUrl}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        style={commonStyles}
      />
    ) : (
      <Image
        src={`https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=VIDEO+MISSING`}
        alt={alt}
        style={commonStyles}
      />
    );
  } else {
    const imageSrc =
      mediaUrl ||
      `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=No+Media`;
    return (
      <Image
        src={imageSrc}
        alt={alt}
        style={commonStyles}
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=Error`;
        }}
      />
    );
  }
};

// ✅ Author Info
const AuthorInfo = ({ name }) => (
  <div className="d-flex align-items-center text-muted small mt-1">
    <div
      className="rounded-circle bg-warning me-1 d-flex align-items-center justify-content-center"
      style={{ width: "22px", height: "22px" }}
    >
      <BsFillPersonFill className="text-white" size={12} />
    </div>
    <span style={{ fontSize: "0.8rem" }}>By {name || "Unknown"}</span>
  </div>
);

const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

const HindiNewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12); // ✅ Show only 12 news (6 left + 6 right)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await allNews();
        if (res?.success) {
          const filteredData = res.data.filter((article) => {
            const cat = article?.category?.name?.toLowerCase();
            if (!cat) return false;
            if (
              cat === "sports" ||
              cat === "flace" ||
              cat === "breaking news" ||
              cat === "business" ||
              cat === "bentermants" ||
              cat === "entertainment" ||
              HOROSCOPE_CATEGORY.includes(cat)
            )
              return false;
            return true;
          });
          setNewsData(filteredData);
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Loading News...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="my-4">
        Error loading news: {error}
      </Alert>
    );

  if (!newsData.length) return null;

  const visibleNews = newsData.slice(0, visibleCount); // ✅ Show only visible count
  const half = Math.ceil(visibleNews.length / 2);
  const linkStyle = { textDecoration: "none", color: "inherit" };

  const getDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleString("hi-IN", {
          day: "numeric",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        })
      : "";

  const accentColor = "#C00000";
  const linkColor = "#2E6E9E";

  return (
    <Container fluid className="mt-4">
      {/* ✅ Section Header */}
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div
            style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
            className="me-2"
          ></div>
          <h5 className="fw-bold m-0">Latest News</h5>
        </div>
        <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
        <Link
          to="/related-news"
          state={{ relatedArticles: newsData }}
          className="text-decoration-none fw-bold small flex-shrink-0"
          style={{ color: linkColor }}
        >
          और देखें
        </Link>
      </div>

      {/* ✅ Two Column Layout */}
      {Array.from({ length: half }).map((_, index) => {
        const leftArticle = visibleNews[index];
        const rightArticle = visibleNews[index + half];

        return (
          <Row
            key={index}
            className="mb-3 pb-2"
            style={{
              borderBottom:
                index !== half - 1 ? "1px solid #d3d3d3" : "none", // ✅ gray line between pairs
            }}
          >
            {/* Left Column */}
            <Col xs={12} lg={6} className="pe-lg-2">
              {leftArticle && (
                <Link
                  to={`/news/${leftArticle?.slug_en || leftArticle?._id}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                >
                  <Row className="gx-3 align-items-center" style={{ minHeight: "90px" }}>
                    <Col xs={4} md={3}>
                      <MediaRenderer
                        media={leftArticle?.media}
                        alt={leftArticle?.title_hi || leftArticle?.title_en || "Untitled"}
                        width="100%"
                        height="90px"
                        objectFit="cover"
                        borderRadius="8px"
                      />
                    </Col>
                    <Col xs={8} md={9}>
                      <p
                        className="fw-bold mb-1"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {leftArticle?.title_hi || leftArticle?.title_en || "Untitled"}
                      </p>
                      <p className="text-muted small m-0">
                        {getDate(leftArticle?.publishedAt)}
                      </p>
                      <AuthorInfo name={leftArticle?.createdBy?.name || "EMS News"} />
                    </Col>
                  </Row>
                </Link>
              )}
            </Col>

            {/* Right Column */}
            <Col xs={12} lg={6} className="ps-lg-2 mt-3 mt-lg-0">
              {rightArticle && (
                <Link
                  to={`/news/${rightArticle?.slug_en || rightArticle?._id}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                >
                  <Row className="gx-3 align-items-center" style={{ minHeight: "90px" }}>
                    <Col xs={4} md={3}>
                      <MediaRenderer
                        media={rightArticle?.media}
                        alt={rightArticle?.title_hi || rightArticle?.title_en || "Untitled"}
                        width="100%"
                        height="90px"
                        objectFit="cover"
                        borderRadius="8px"
                      />
                    </Col>
                    <Col xs={8} md={9}>
                      <p
                        className="fw-bold mb-1"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {rightArticle?.title_hi || rightArticle?.title_en || "Untitled"}
                      </p>
                      <p className="text-muted small m-0">
                        {getDate(rightArticle?.publishedAt)}
                      </p>
                      <AuthorInfo name={rightArticle?.createdBy?.name || "EMS News"} />
                    </Col>
                  </Row>
                </Link>
              )}
            </Col>
          </Row>
        );
      })}

    
    </Container>
  );
};

export default HindiNewsSection;
