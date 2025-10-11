// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const TopStory = ({ data }) => {
//   // We receive all news in 'data' prop
//   const topStories = data.slice(0, 5);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     if (topStories.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % topStories.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [topStories.length]);
  
//   // ✅ 1. तारीख और समय को फॉर्मेट करने के लिए हेल्पर फंक्शन
//   const formatFullDateTime = (dateString) => {
//       if (!dateString) return '';
//       // options में hour और minute जोड़ना ज़रूरी है
//       const options = {
//           day: 'numeric',
//           month: 'long',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//       };
//       return new Date(dateString).toLocaleString("hi-IN", options);
//   };

//   if (topStories.length === 0) {
//     return <div>Loading Top Stories...</div>;
//   }

//   return (
//     <>
//       <div
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           height: "380px",
//           width: "550px",
//           borderRadius: "8px",
//           marginBottom: "1rem",
//         }}
//       >
//         {topStories.map((news, index) => (
//           <Link
//             key={news._id}
//             to={`/news/${news._id}`}
//             state={{ relatedArticles: data }}
//             style={{
//               position: "absolute",
//               top: 0,
//               left:
//                 index > currentSlide
//                   ? "100%"
//                   : index < currentSlide
//                   ? "-100%"
//                   : "0",
//               width: "100%",
//               height: "100%",
//               opacity: index === currentSlide ? 1 : 0,
//               transition: "all 0.8s ease-in-out",
//               zIndex: index === currentSlide ? 2 : 1,
//               cursor: "pointer",
//               textDecoration: "none",
//               color: "inherit",
//             }}
//           >
//             <div className="position-relative h-100">
//               <img
//                 src={news?.media?.[0]?.url || ""}
//                 className="img-fluid w-100 h-100"
//                 alt="Top Story"
//                 style={{
//                   objectFit: "cover",
//                 }}
//               />
//               <div
//                 className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
//                 style={{
//                   background:
//                     "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
//                 }}
//               >
//                 <h2 className="fs-5 fs-md-4 fw-bold m-0">
//                   {news?.title || ""}
//                 </h2>
                
//                 {/* ✅ 2. लेखक, तारीख और समय यहाँ जोड़ा गया */}
//                 <p className="small mb-0 opacity-75 mt-1" style={{ fontSize: '0.8rem' }}>
//                     By {news.createdBy?.name || "EMS News"} | {formatFullDateTime(news.createdAt)}
//                 </p>

//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// };

// export default TopStory;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBolt } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const TopStory = ({ data }) => {
//   // Slider data (Top 5 news)
//   const topStories = data.slice(0, 5);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Latest 3 news for right side
//   const [latestNews, setLatestNews] = useState([]);
//   const [loadingNews, setLoadingNews] = useState(true);
//   const [errorNews, setErrorNews] = useState(null);

//   useEffect(() => {
//     // Slider auto play
//     if (topStories.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % topStories.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [topStories.length]);

//   // Fetch latest news (for right side)
//   useEffect(() => {
//     const fetchLatestNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           setLatestNews(res.data.slice(0,4)); // 3 news
//         } else {
//           setErrorNews("Failed to load news");
//         }
//       } catch (err) {
//         setErrorNews(err.message || "An error occurred");
//       } finally {
//         setLoadingNews(false);
//       }
//     };
//     fetchLatestNews();
//   }, []);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     const options = {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString("hi-IN", options);
//   };

//   if (topStories.length === 0) {
//     return <div>Loading Top Stories...</div>;
//   }

//   return (
//     <Row className="g-3">
//       {/* Left: Top Story Slider */}
//       <Col md={7}>
//         <div
//           style={{
//             position: "relative",
//             overflow: "hidden",
//             height: "375px",
//             width: "100%",
//             borderRadius: "8px",
//             marginBottom: "1rem",
//           }}
//         >
//           {topStories.map((news, index) => (
//             <Link
//               key={news._id}
//               to={`/news/${news._id}`}
//               state={{ relatedArticles: data }}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left:
//                   index > currentSlide
//                     ? "100%"
//                     : index < currentSlide
//                     ? "-100%"
//                     : "0",
//                 width: "100%",
//                 height: "100%",
//                 opacity: index === currentSlide ? 1 : 0,
//                 transition: "all 0.8s ease-in-out",
//                 zIndex: index === currentSlide ? 2 : 1,
//                 cursor: "pointer",
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               <div className="position-relative h-100">
//                 <img
//                   src={news?.media?.[0]?.url || ""}
//                   className="img-fluid w-100 h-100"
//                   alt="Top Story"
//                   style={{ objectFit: "cover" }}
//                 />
//                 <div
//                   className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
//                   style={{
//                     background:
//                       "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
//                   }}
//                 >
//                   <h2 className="fs-5 fs-md-4 fw-bold m-0">
//                     {news?.title || ""}
//                   </h2>
//                   <p
//                     className="small mb-0 opacity-75 mt-1"
//                     style={{ fontSize: "0.8rem" }}
//                   >
//                     By {news.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(news.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </Col>

//       {/* Right: Latest 3 news */}
//       <Col md={5}>
       

//         {loadingNews && (
//           <div className="text-center my-4">
//             <Spinner animation="border" variant="primary" />
//             <p>Loading latest news...</p>
//           </div>
//         )}

//         {errorNews && (
//           <Alert variant="danger" className="my-4">
//             Error loading news: {errorNews}
//           </Alert>
//         )}

      
//         <Row>
//   {latestNews.map((news) => (
//     <Col key={news._id} xs={12} className="mb-3">
//       <Link
//         to={`/news/${news._id}`}
//         state={{ relatedArticles: latestNews }}
//         style={{ textDecoration: "none", color: "inherit" }}
//         className="d-block h-100 position-relative"
//       >
//         <Row className="gx-2">
//           <Col xs={4}>
//             {/* Image container with fixed height */}
//             <div
//               style={{
//                 width: "100%",
//                 height: "80px", // FIXED HEIGHT for all cards
//                 overflow: "hidden",
//                 borderRadius: "6px",
//               }}
//             >
//               <Image
//                 src={news.media?.[0]?.url || "https://via.placeholder.com/120x80"}
//                 alt={news.title}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover", // crop and fit
//                   display: "block",
//                 }}
//               />
//             </div>
//           </Col>
//           <Col xs={8}>
//             <p className="fw-bold small mb-1">{news.title}</p>
//             <small className="text-muted d-block">
//               {news.createdBy?.name || "EMS News"} |{" "}
//               {new Date(news.createdAt).toLocaleString("hi-IN", {
//                 day: "numeric",
//                 month: "short",
//                 year: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </small>
//           </Col>
//         </Row>
//         {/* ⚡ Icon was removed here */}
//       </Link>
//     </Col>
//   ))}
// </Row>

//       </Col>
//     </Row>
//   );
// };

// export default TopStory;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";

// const TopStory = ({ data }) => {
//   const topStories = data.slice(0, 5);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [latestNews, setLatestNews] = useState([]);
//   const [loadingNews, setLoadingNews] = useState(true);
//   const [errorNews, setErrorNews] = useState(null);

//   useEffect(() => {
//     if (topStories.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % topStories.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [topStories.length]);

//   useEffect(() => {
//     const fetchLatestNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) setLatestNews(res.data.slice(0, 4));
//         else setErrorNews("Failed to load news");
//       } catch (err) {
//         setErrorNews(err.message || "An error occurred");
//       } finally {
//         setLoadingNews(false);
//       }
//     };
//     fetchLatestNews();
//   }, []);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleString("hi-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (topStories.length === 0) return <div>Loading Top Stories...</div>;

//   return (
//     <Row className="g-3">
//       {/* 🟢 Main Slider - First in Mobile */}
//       <Col xs={12} md={7} className="order-1 order-md-1">
//         <div
//           style={{
//             position: "relative",
//             overflow: "hidden",
//             height: "clamp(200px, 50vw, 375px)", // responsive height
//             width: "100%",
//             borderRadius: "8px",
//             marginBottom: "1rem",
//           }}
//         >
//           {topStories.map((news, index) => (
//             <Link
//               key={news._id}
//               to={`/news/${news._id}`}
//               state={{ relatedArticles: data }}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left:
//                   index > currentSlide
//                     ? "100%"
//                     : index < currentSlide
//                     ? "-100%"
//                     : "0",
//                 width: "100%",
//                 height: "100%",
//                 opacity: index === currentSlide ? 1 : 0,
//                 transition: "all 0.8s ease-in-out",
//                 zIndex: index === currentSlide ? 2 : 1,
//                 cursor: "pointer",
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               <div className="position-relative h-100">
//                 <img
//                   src={news?.media?.[0]?.url || ""}
//                   className="img-fluid w-100 h-100"
//                   alt="Top Story"
//                   style={{ objectFit: "cover" }}
//                 />
//                 <div
//                   className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
//                   style={{
//                     background:
//                       "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
//                   }}
//                 >
//                   <h2
//                     className="fw-bold m-0"
//                     style={{
//                       fontSize: "clamp(1rem, 3.5vw, 1.4rem)",
//                       lineHeight: 1.3,
//                     }}
//                   >
//                     {news?.title || ""}
//                   </h2>
//                   <p
//                     className="small mb-0 opacity-75 mt-1"
//                     style={{ fontSize: "0.75rem" }}
//                   >
//                     By {news.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(news.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </Col>

//       {/* 🟢 Latest News - Second in Mobile */}
//       <Col xs={12} md={5} className="order-2 order-md-2">
//         {loadingNews && (
//           <div className="text-center my-4">
//             <Spinner animation="border" variant="primary" />
//             <p>Loading latest news...</p>
//           </div>
//         )}

//         {errorNews && (
//           <Alert variant="danger" className="my-4">
//             Error loading news: {errorNews}
//           </Alert>
//         )}

//         <Row>
//           {latestNews.map((news) => (
//             <Col key={news._id} xs={12} className="mb-3">
//               <Link
//                 to={`/news/${news._id}`}
//                 state={{ relatedArticles: latestNews }}
//                 style={{ textDecoration: "none", color: "inherit" }}
//                 className="d-block h-100"
//               >
//                 <Row className="gx-2">
//                   <Col xs={4}>
//                     <div
//                       style={{
//                         width: "100%",
//                         height: "80px",
//                         overflow: "hidden",
//                         borderRadius: "6px",
//                       }}
//                     >
//                       <Image
//                         src={
//                           news.media?.[0]?.url ||
//                           "https://via.placeholder.com/120x80"
//                         }
//                         alt={news.title}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </div>
//                   </Col>
//                   <Col xs={8}>
//                     <p className="fw-bold small mb-1">{news.title}</p>
//                     <small className="text-muted d-block">
//                       {news.createdBy?.name || "EMS News"} |{" "}
//                       {new Date(news.createdAt).toLocaleString("hi-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </small>
//                   </Col>
//                 </Row>
//               </Link>
//             </Col>
//           ))}
//         </Row>
//       </Col>
//     </Row>
//   );
// };

// export default TopStory;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";

// const TopStory = ({ data }) => {
//   const topStories = data.slice(0, 5);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [latestNews, setLatestNews] = useState([]);
//   const [loadingNews, setLoadingNews] = useState(true);
//   const [errorNews, setErrorNews] = useState(null);

//   // Slider auto change
//   useEffect(() => {
//     if (topStories.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % topStories.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [topStories.length]);

//   // Fetch latest news
//   useEffect(() => {
//     const fetchLatestNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) setLatestNews(res.data.slice(0, 4));
//         else setErrorNews("Failed to load news");
//       } catch (err) {
//         setErrorNews(err.message || "An error occurred");
//       } finally {
//         setLoadingNews(false);
//       }
//     };
//     fetchLatestNews();
//   }, []);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleString("hi-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (topStories.length === 0)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading Top Stories...</p>
//       </div>
//     );

//   return (
//     <Row className="g-3">
//       {/* 🟢 Main Slider */}
//       <Col xs={12} md={7}>
//         <div
//           style={{
//             position: "relative",
//             overflow: "hidden",
//             height: "clamp(200px, 50vw, 375px)", // responsive height
//             width: "100%",
//             borderRadius: "8px",
//             marginBottom: "1rem",
//           }}
//         >
//           {topStories.map((news, index) => (
//             <Link
//               key={news._id}
//               to={`/news/${news._id}`}
//               state={{ relatedArticles: data }}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left:
//                   index > currentSlide
//                     ? "100%"
//                     : index < currentSlide
//                     ? "-100%"
//                     : "0",
//                 width: "100%",
//                 height: "100%",
//                 opacity: index === currentSlide ? 1 : 0,
//                 transition: "all 0.8s ease-in-out",
//                 zIndex: index === currentSlide ? 2 : 1,
//                 cursor: "pointer",
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               <div className="position-relative h-100">
//                 <img
//                   src={news?.media?.[0]?.url || ""}
//                   className="img-fluid w-100 h-100"
//                   alt="Top Story"
//                   style={{ objectFit: "cover" }}
//                 />
//                 <div
//                   className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
//                   style={{
//                     background:
//                       "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
//                   }}
//                 >
//                   <h2
//                     className="fw-bold m-0"
//                     style={{
//                       fontSize: "clamp(1rem, 3.5vw, 1.4rem)",
//                       lineHeight: 1.3,
//                     }}
//                   >
//                     {news?.title || ""}
//                   </h2>
//                   <p
//                     className="small mb-0 opacity-75 mt-1"
//                     style={{ fontSize: "0.75rem" }}
//                   >
//                     By {news.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(news.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </Col>

//       {/* 🟢 Latest News - Hidden on mobile */}
//       <Col xs={12} md={5} className="d-none d-md-block">
//         {loadingNews && (
//           <div className="text-center my-4">
//             <Spinner animation="border" variant="primary" />
//             <p>Loading latest news...</p>
//           </div>
//         )}

//         {errorNews && (
//           <Alert variant="danger" className="my-4">
//             Error loading news: {errorNews}
//           </Alert>
//         )}

//         <Row>
//           {latestNews.map((news) => (
//             <Col key={news._id} xs={12} className="mb-3">
//               <Link
//                 to={`/news/${news._id}`}
//                 state={{ relatedArticles: latestNews }}
//                 style={{ textDecoration: "none", color: "inherit" }}
//                 className="d-block h-100"
//               >
//                 <Row className="gx-2">
//                   <Col xs={4}>
//                     <div
//                       style={{
//                         width: "100%",
//                         height: "80px",
//                         overflow: "hidden",
//                         borderRadius: "6px",
//                       }}
//                     >
//                       <Image
//                         src={
//                           news.media?.[0]?.url ||
//                           "https://via.placeholder.com/120x80"
//                         }
//                         alt={news.title}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </div>
//                   </Col>
//                   <Col xs={8}>
//                     <p className="fw-bold small mb-1">{news.title}</p>
//                     <small className="text-muted d-block">
//                       {news.createdBy?.name || "EMS News"} |{" "}
//                       {new Date(news.createdAt).toLocaleString("hi-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </small>
//                   </Col>
//                 </Row>
//               </Link>
//             </Col>
//           ))}
//         </Row>
//       </Col>
//     </Row>
//   );
// };

// export default TopStory;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar"; // Profile Icon Component

// const TopStory = () => {
//   const categoryName = "Flace"; // Sirf Flace category ke liye filter
//   const [flaceNews, setFlaceNews] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [errorNews, setErrorNews] = useState(null);

//   // Fetch only Flace category news
//   useEffect(() => {
//     const fetchFlaceNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success && Array.isArray(res.data)) {
//           // Filter news by category name "Flace"
//           const filtered = res.data.filter(
//             (news) =>
//               news.category &&
//               (typeof news.category === "string"
//                 ? news.category.toLowerCase() === categoryName.toLowerCase()
//                 : news.category.name?.toLowerCase() === categoryName.toLowerCase())
//           );
//           setFlaceNews(filtered);
//         } else {
//           setErrorNews("Failed to load Flace news");
//         }
//       } catch (err) {
//         setErrorNews(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFlaceNews();
//   }, []);

//   // Auto slider
//   useEffect(() => {
//     if (flaceNews.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % Math.min(5, flaceNews.length));
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [flaceNews.length]);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleString("hi-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading {categoryName} News...</p>
//       </div>
//     );
//   }

//   if (errorNews) {
//     return (
//       <Alert variant="danger" className="my-4">
//         {errorNews}
//       </Alert>
//     );
//   }

//   if (flaceNews.length === 0) {
//     return (
//       <div className="text-center p-4">
//         No {categoryName} news available.
//       </div>
//     );
//   }

//   // Slider ke liye top 5 Flace news
//   const sliderNews = flaceNews.slice(0, 5);
//   // Right side ke liye next 4 Flace news
//   const rightSideNews = flaceNews.slice(0, 4);

//   return (
//     <Row className="g-3">
//       {/* 🟢 Left: Slider */}
//      <Col md={7}>
//   <div
//     style={{
//       position: "relative",
//       overflow: "hidden",
//       height: "375px",
//       width: "100%",
//       borderRadius: "8px",
//       marginBottom: "1rem",
//     }}
//   >
//     {sliderNews.map((news, index) => (
//       <Link
//         key={news._id}
//         to={`/news/${news._id}`}
//         state={{ relatedArticles: flaceNews }}
//         style={{
//           position: "absolute",
//           top: 0,
//           left:
//             index > currentSlide
//               ? "100%"
//               : index < currentSlide
//               ? "-100%"
//               : "0",
//           width: "100%",
//           height: "100%",
//           opacity: index === currentSlide ? 1 : 0,
//           transition: "all 0.8s ease-in-out",
//           zIndex: index === currentSlide ? 2 : 1,
//           cursor: "pointer",
//           textDecoration: "none",
//           color: "inherit",
//         }}
//       >
//         <div className="position-relative h-100">
//           <img
//             src={news?.media?.[0]?.url || ""}
//             className="img-fluid w-100 h-100"
//             alt="Top Story"
//             style={{ objectFit: "cover" }}
//           />
//           <div
//             className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
//             style={{
//               background:
//                 "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
//             }}
//           >
//             <h2 className="fs-5 fs-md-4 fw-bold m-0">{news?.title || ""}</h2>

//             {/* ✅ Slider Profile Icon */}
//             <div className="d-flex align-items-center gap-2 mt-1">
//               <UserAvatar
//                 src={
//                   news.createdBy?.profilePic ||
//                   "https://via.placeholder.com/40x40?text=U"
//                 }
//                 alt={news.createdBy?.name || "EMS News"}
//                 size={24}
//               />
//               <small>{news.createdBy?.name || "EMS News"}</small>
//             </div>

//             <p
//               className="small mb-0 opacity-75 mt-1"
//               style={{ fontSize: "0.8rem" }}
//             >
//               {formatFullDateTime(news.createdAt)}
//             </p>
//           </div>
//         </div>
//       </Link>
//     ))}
//   </div>
// </Col>

//       {/* 🟢 Right: Additional Flace News Cards */}
//       <Col md={5}>
//         <Row>
//           {rightSideNews.length === 0 ? (
//             <div className="text-center p-4">
//               No more {categoryName} news available.
//             </div>
//           ) : (
//             rightSideNews.map((news) => (
//               <Col key={news._id} xs={12} className="mb-3">
//                 <Link
//                   to={`/news/${news._id}`}
//                   state={{ relatedArticles: flaceNews }}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                   className="d-block h-100 position-relative"
//                 >
//                   <Row className="gx-2 align-items-center">
//                     {/* Thumbnail */}
//                     <Col xs={4}>
//                       <div
//                         style={{
//                           width: "100%",
//                           height: "80px",
//                           overflow: "hidden",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         <Image
//                           src={
//                             news.media?.[0]?.url ||
//                             "https://via.placeholder.com/120x80"
//                           }
//                           alt={news.title}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </div>
//                     </Col>

//                     {/* Content + Profile */}
//                     <Col xs={8}>
//                       <p className="fw-bold small mb-1">{news.title}</p>
//                       {/* Profile Icon + Name + Date */}
//                       <div className="d-flex align-items-center gap-2">
//                         <UserAvatar
//                           src={
//                             news.createdBy?.profilePic ||
//                             "https://via.placeholder.com/40x40?text=U"
//                           }
//                           alt={news.createdBy?.name || "User"}
//                           size={24}
//                         />
//                         <small className="text-muted">
//                           {news.createdBy?.name || "EMS News"} |{" "}
//                           {new Date(news.createdAt).toLocaleString("hi-IN", {
//                             day: "numeric",
//                             month: "short",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </small>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Link>
//               </Col>
//             ))
//           )}
//         </Row>
//       </Col>
//     </Row>
//   );
// };

// export default TopStory;





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar"; // Profile Icon Component

// const TopStory = () => {
//   const categoryName = "Flace"; // Sirf Flace category ke liye filter
//   const [flaceNews, setFlaceNews] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [errorNews, setErrorNews] = useState(null);

//   // Fetch only Flace category news
//   useEffect(() => {
//     const fetchFlaceNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success && Array.isArray(res.data)) {
//           // Filter news by category name "Flace"
//           const filtered = res.data.filter(
//             (news) =>
//               news.category &&
//               (typeof news.category === "string"
//                 ? news.category.toLowerCase() === categoryName.toLowerCase()
//                 : news.category.name?.toLowerCase() === categoryName.toLowerCase())
//           );
//           setFlaceNews(filtered);
//         } else {
//           setErrorNews("Failed to load Flace news");
//         }
//       } catch (err) {
//         setErrorNews(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFlaceNews();
//   }, []);

//   // Auto slider
//   useEffect(() => {
//     if (flaceNews.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % Math.min(5, flaceNews.length));
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [flaceNews.length]);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleString("hi-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading {categoryName} News...</p>
//       </div>
//     );
//   }

//   if (errorNews) {
//     return (
//       <Alert variant="danger" className="my-4">
//         {errorNews}
//       </Alert>
//     );
//   }

//   if (flaceNews.length === 0) {
//     return (
//       <div className="text-center p-4">
//         No {categoryName} news available.
//       </div>
//     );
//   }

//   // Slider ke liye top 5 Flace news
//   const sliderNews = flaceNews.slice(0, 5);
//   // Right side ke liye next 4 Flace news
//   const rightSideNews = flaceNews.slice(0, 4);

//   return (
//     <Row className="g-3">
//       {/* 🟢 Left: Slider */}
//      <Col md={7}>
//   <div
//     style={{
//       position: "relative",
//       overflow: "hidden",
//       height: "375px",
//       width: "100%",
//       borderRadius: "8px",
//       marginBottom: "1rem",
//     }}
//   >
//     {sliderNews.map((news, index) => (
//       <Link
//         key={news._id}
//         to={`/news/${news._id}`}
//         state={{ relatedArticles: flaceNews }}
//         style={{
//           position: "absolute",
//           top: 0,
//           left:
//             index > currentSlide
//               ? "100%"
//               : index < currentSlide
//               ? "-100%"
//               : "0",
//           width: "100%",
//           height: "100%",
//           opacity: index === currentSlide ? 1 : 0,
//           transition: "all 0.8s ease-in-out",
//           zIndex: index === currentSlide ? 2 : 1,
//           cursor: "pointer",
//           textDecoration: "none",
//           color: "inherit",
//         }}
//       >
//         <div className="position-relative h-100">
//           <img
//             src={news?.media?.[0]?.url || ""}
//             className="img-fluid w-100 h-100"
//             alt="Top Story"
//             style={{ objectFit: "cover" }}
//           />
//           <div
//             className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
//             style={{
//               background:
//                 "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
//             }}
//           >
//             <h2 className="fs-5 fs-md-4 fw-bold m-0">{news?.title || ""}</h2>

//             {/* ✅ Slider Profile Icon */}
//             <div className="d-flex align-items-center gap-2 mt-1">
//               <UserAvatar
//                 src={
//                   news.createdBy?.profilePic ||
//                   "https://via.placeholder.com/40x40?text=U"
//                 }
//                 alt={news.createdBy?.name || "EMS News"}
//                 size={24}
//               />
//               <small>{news.createdBy?.name || "EMS News"}</small>
//             </div>

//             <p
//               className="small mb-0 opacity-75 mt-1"
//               style={{ fontSize: "0.8rem" }}
//             >
//               {formatFullDateTime(news.createdAt)}
//             </p>
//           </div>
//         </div>
//       </Link>
//     ))}
//   </div>
// </Col>

//       {/* 🟢 Right: Additional Flace News Cards */}
//       <Col md={5}>
//         <Row>
//           {rightSideNews.length === 0 ? (
//             <div className="text-center p-4">
//               No more {categoryName} news available.
//             </div>
//           ) : (
//             rightSideNews.map((news) => (
//               <Col key={news._id} xs={12} className="mb-3">
//                 <Link
//                   to={`/news/${news._id}`}
//                   state={{ relatedArticles: flaceNews }}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                   className="d-block h-100 position-relative"
//                 >
//                   <Row className="gx-2 align-items-center">
//                     {/* Thumbnail */}
//                     <Col xs={4}>
//                       <div
//                         style={{
//                           width: "100%",
//                           height: "80px",
//                           overflow: "hidden",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         <Image
//                           src={
//                             news.media?.[0]?.url ||
//                             "https://via.placeholder.com/120x80"
//                           }
//                           alt={news.title}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </div>
//                     </Col>

//                     {/* Content + Profile */}
//                     <Col xs={8}>
//                       <p className="fw-bold small mb-1">{news.title}</p>
//                       {/* Profile Icon + Name + Date */}
//                       <div className="d-flex align-items-center gap-2">
//                         <UserAvatar
//                           src={
//                             news.createdBy?.profilePic ||
//                             "https://via.placeholder.com/40x40?text=U"
//                           }
//                           alt={news.createdBy?.name || "User"}
//                           size={24}
//                         />
//                         <small className="text-muted">
//                           {news.createdBy?.name || "EMS News"} |{" "}
//                           {new Date(news.createdAt).toLocaleString("hi-IN", {
//                             day: "numeric",
//                             month: "short",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </small>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Link>
//               </Col>
//             ))
//           )}
//         </Row>
//       </Col>
//     </Row>
//   );
// };

// export default TopStory;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar"; // Profile Icon Component

// const TopStory = () => {
//   const categoryName = "Flace"; // Sirf Flace category ke liye filter
//   const [flaceNews, setFlaceNews] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [errorNews, setErrorNews] = useState(null);

//   // Fetch only Flace category news
//   useEffect(() => {
//     const fetchFlaceNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success && Array.isArray(res.data)) {
//           const filtered = res.data.filter(
//             (news) =>
//               news.category &&
//               (typeof news.category === "string"
//                 ? news.category.toLowerCase() === categoryName.toLowerCase()
//                 : news.category.name?.toLowerCase() === categoryName.toLowerCase())
//           );
//           setFlaceNews(filtered);
//         } else {
//           setErrorNews("Failed to load Flace news");
//         }
//       } catch (err) {
//         setErrorNews(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFlaceNews();
//   }, []);

//   // Auto slider
//   useEffect(() => {
//     if (flaceNews.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % Math.min(5, flaceNews.length));
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [flaceNews.length]);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleString("hi-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading {categoryName} News...</p>
//       </div>
//     );
//   }

//   if (errorNews) {
//     return (
//       <Alert variant="danger" className="my-4">
//         {errorNews}
//       </Alert>
//     );
//   }

//   if (flaceNews.length === 0) {
//     return (
//       <div className="text-center p-4">
//         No {categoryName} news available.
//       </div>
//     );
//   }

//   const sliderNews = flaceNews.slice(0, 5);
//   const rightSideNews = flaceNews.slice(0, 4);

//   return (
//     <Row className="g-3">
//       {/* 🟢 Left: Slider */}
//       <Col md={7}>
//         <div
//           style={{
//             position: "relative",
//             overflow: "hidden",
//             height: "375px",
//             width: "100%",
//             borderRadius: "8px",
//             marginBottom: "1rem",
//           }}
//         >
//           {sliderNews.map((news, index) => (
//             <Link
//               key={news._id}
//               to={`/news/${news.slug_en || news._id}`}
//               state={{ relatedArticles: flaceNews }}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left:
//                   index > currentSlide
//                     ? "100%"
//                     : index < currentSlide
//                     ? "-100%"
//                     : "0",
//                 width: "100%",
//                 height: "100%",
//                 opacity: index === currentSlide ? 1 : 0,
//                 transition: "all 0.8s ease-in-out",
//                 zIndex: index === currentSlide ? 2 : 1,
//                 cursor: "pointer",
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               <div className="position-relative h-100">
//                 <img
//                   src={news?.media?.[0]?.url || ""}
//                   className="img-fluid w-100 h-100"
//                   alt="Top Story"
//                   style={{ objectFit: "cover" }}
//                 />
//                 <div
//                   className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
//                   style={{
//                     background:
//                       "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
//                   }}
//                 >
//                   <h2 className="fs-5 fs-md-4 fw-bold m-0">{news?.title || ""}</h2>

//                   {/* ✅ Slider Profile Icon */}
//                   <div className="d-flex align-items-center gap-2 mt-1">
//                     <UserAvatar
//                       src={
//                         news.createdBy?.profilePic ||
//                         "https://via.placeholder.com/40x40?text=U"
//                       }
//                       alt={news.createdBy?.name || "EMS News"}
//                       size={24}
//                     />
//                     <small>{news.createdBy?.name || "EMS News"}</small>
//                   </div>

//                   <p
//                     className="small mb-0 opacity-75 mt-1"
//                     style={{ fontSize: "0.8rem" }}
//                   >
//                     {formatFullDateTime(news.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </Col>

//       {/* 🟢 Right: Additional Flace News Cards */}
//       <Col md={5}>
//         <Row>
//           {rightSideNews.length === 0 ? (
//             <div className="text-center p-4">
//               No more {categoryName} news available.
//             </div>
//           ) : (
//             rightSideNews.map((news) => (
//               <Col key={news._id} xs={12} className="mb-3">
//                 <Link
//                   to={`/news/${news.slug_en || news._id}`}
//                   state={{ relatedArticles: flaceNews }}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                   className="d-block h-100 position-relative"
//                 >
//                   <Row className="gx-2 align-items-center">
//                     <Col xs={4}>
//                       <div
//                         style={{
//                           width: "100%",
//                           height: "80px",
//                           overflow: "hidden",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         <Image
//                           src={
//                             news.media?.[0]?.url ||
//                             "https://via.placeholder.com/120x80"
//                           }
//                           alt={news.title}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </div>
//                     </Col>

//                     <Col xs={8}>
//                       <p className="fw-bold small mb-1">{news.title}</p>
//                       <div className="d-flex align-items-center gap-2">
//                         <UserAvatar
//                           src={
//                             news.createdBy?.profilePic ||
//                             "https://via.placeholder.com/40x40?text=U"
//                           }
//                           alt={news.createdBy?.name || "User"}
//                           size={24}
//                         />
//                         <small className="text-muted">
//                           {news.createdBy?.name || "EMS News"} |{" "}
//                           {new Date(news.createdAt).toLocaleString("hi-IN", {
//                             day: "numeric",
//                             month: "short",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </small>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Link>
//               </Col>
//             ))
//           )}
//         </Row>
//       </Col>
//     </Row>
//   );
// };

// export default TopStory;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar"; // Profile Icon Component

// const TopStory = () => {
//   const categoryName = "Flace"; // Sirf Flace category ke liye filter
//   const [flaceNews, setFlaceNews] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [errorNews, setErrorNews] = useState(null);

//   // Fetch only Flace category news
//   useEffect(() => {
//     const fetchFlaceNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success && Array.isArray(res.data)) {
//           const filtered = res.data.filter(
//             (news) =>
//               news.category &&
//               (typeof news.category === "string"
//                 ? news.category.toLowerCase() === categoryName.toLowerCase()
//                 : news.category.name?.toLowerCase() === categoryName.toLowerCase())
//           );
//           setFlaceNews(filtered);
//         } else {
//           setErrorNews("Failed to load Flace news");
//         }
//       } catch (err) {
//         setErrorNews(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFlaceNews();
//   }, []);

//   // Auto slider
//   useEffect(() => {
//     if (flaceNews.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % Math.min(5, flaceNews.length));
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [flaceNews.length]);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleString("hi-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading {categoryName} News...</p>
//       </div>
//     );
//   }

//   if (errorNews) {
//     return (
//       <Alert variant="danger" className="my-4">
//         {errorNews}
//       </Alert>
//     );
//   }

//   if (flaceNews.length === 0) {
//     return (
//       <div className="text-center p-4">
//         No {categoryName} news available.
//       </div>
//     );
//   }

//   const sliderNews = flaceNews.slice(0, 5);
//   const rightSideNews = flaceNews.slice(0, 4);

//   return (
//     <Row className="g-3">
//       {/* 🟢 Left: Slider */}
//       <Col md={7}>
//         <div
//           style={{
//             position: "relative",
//             overflow: "hidden",
//             height: "375px",
//             width: "100%",
//             borderRadius: "8px",
//             marginBottom: "1rem",
//           }}
//         >
//           {sliderNews.map((news, index) => (
//             <Link
//               key={news.slug_en || news._id}
//               to={`/news/${news.slug_en || news._id}`}
//               state={{ relatedArticles: flaceNews }}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left:
//                   index > currentSlide
//                     ? "100%"
//                     : index < currentSlide
//                     ? "-100%"
//                     : "0",
//                 width: "100%",
//                 height: "100%",
//                 opacity: index === currentSlide ? 1 : 0,
//                 transition: "all 0.8s ease-in-out",
//                 zIndex: index === currentSlide ? 2 : 1,
//                 cursor: "pointer",
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               <div className="position-relative h-100">
//                 <img
//                   src={news?.media?.[0]?.url || ""}
//                   className="img-fluid w-100 h-100"
//                   alt={news?.title || "Top Story"}
//                   style={{ objectFit: "cover" }}
//                 />
//                 <div
//                   className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
//                   style={{
//                     background:
//                       "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
//                   }}
//                 >
//                   <h2 className="fs-5 fs-md-4 fw-bold m-0">{news?.title_hi || ""}</h2>

//                   {/* ✅ Slider Profile Icon */}
//                   <div className="d-flex align-items-center gap-2 mt-1">
//                     <UserAvatar
//                       src={
//                         news.createdBy?.profilePic ||
//                         "https://via.placeholder.com/40x40?text=U"
//                       }
//                       alt={news.createdBy?.name || "EMS News"}
//                       size={24}
//                     />
//                     <small>{news.createdBy?.name || "EMS News"}</small>
//                   </div>

//                   <p
//                     className="small mb-0 opacity-75 mt-1"
//                     style={{ fontSize: "0.8rem" }}
//                   >
//                     {formatFullDateTime(news.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </Col>

//       {/* 🟢 Right: Additional Flace News Cards */}
//       <Col md={5}>
//         <Row>
//           {rightSideNews.length === 0 ? (
//             <div className="text-center p-4">
//               No more {categoryName} news available.
//             </div>
//           ) : (
//             rightSideNews.map((news) => (
//               <Col key={news.slug_en || news._id} xs={12} className="mb-3">
//                 <Link
//                   to={`/news/${news.slug_en || news._id}`}
//                   state={{ relatedArticles: flaceNews }}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                   className="d-block h-100 position-relative"
//                 >
//                   <Row className="gx-2 align-items-center">
//                     <Col xs={4}>
//                       <div
//                         style={{
//                           width: "100%",
//                           height: "80px",
//                           overflow: "hidden",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         <Image
//                           src={
//                             news.media?.[0]?.url ||
//                             "https://via.placeholder.com/120x80"
//                           }
//                           alt={news?.title || ""}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </div>
//                     </Col>

//                     <Col xs={8}>
//                       <p className="fw-bold small mb-1">{news?.title_hi|| ""}</p>
//                       <div className="d-flex align-items-center gap-2">
//                         <UserAvatar
//                           src={
//                             news.createdBy?.profilePic ||
//                             "https://via.placeholder.com/40x40?text=U"
//                           }
//                           alt={news.createdBy?.name || "User"}
//                           size={24}
//                         />
//                         <small className="text-muted">
//                           {news.createdBy?.name || "EMS News"} |{" "}
//                           {new Date(news.createdAt).toLocaleString("hi-IN", {
//                             day: "numeric",
//                             month: "short",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </small>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Link>
//               </Col>
//             ))
//           )}
//         </Row>
//       </Col>
//     </Row>
//   );
// };

// export default TopStory;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allNews } from "../../Services/authApi";
import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

const TopStory = () => {
  const categoryName = "Flace";
  const [flaceNews, setFlaceNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorNews, setErrorNews] = useState(null);

  useEffect(() => {
    const fetchFlaceNews = async () => {
      try {
        const res = await allNews();
        if (res?.success && Array.isArray(res.data)) {
          const filtered = res.data.filter(
            (news) =>
              news.category &&
              (typeof news.category === "string"
                ? news.category.toLowerCase() === categoryName.toLowerCase()
                : news.category.name?.toLowerCase() === categoryName.toLowerCase())
          );
          setFlaceNews(filtered);
        } else {
          setErrorNews("Failed to load Flace news");
        }
      } catch (err) {
        setErrorNews(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchFlaceNews();
  }, []);

  useEffect(() => {
    if (flaceNews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(5, flaceNews.length));
    }, 4000);
    return () => clearInterval(interval);
  }, [flaceNews.length]);

  const formatFullDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("hi-IN", {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Loading {categoryName} News...</p>
      </div>
    );
  }

  if (errorNews) {
    return (
      <Alert variant="danger" className="my-4">
        {errorNews}
      </Alert>
    );
  }

  if (flaceNews.length === 0) {
    return (
      <div className="text-center p-4">
        No {categoryName} news available.
      </div>
    );
  }

  const sliderNews = flaceNews.slice(0, 5);
  const rightSideNews = flaceNews.slice(0, 4);

  return (
    <Row className="g-3">
      {/* 🟢 Left: Slider */}
      <Col md={7}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "375px",
            width: "100%",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          {sliderNews.map((news, index) => (
            <Link
              key={news.slug_en || news._id}
              to={`/news/${news.slug_en || news._id}`}
              state={{ relatedArticles: flaceNews }}
              style={{
                position: "absolute",
                top: 0,
                left:
                  index > currentSlide
                    ? "100%"
                    : index < currentSlide
                    ? "-100%"
                    : "0",
                width: "100%",
                height: "100%",
                opacity: index === currentSlide ? 1 : 0,
                transition: "all 0.8s ease-in-out",
                zIndex: index === currentSlide ? 2 : 1,
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="position-relative h-100">
                <img
                  src={news?.media?.[0]?.url || "https://via.placeholder.com/600x375?text=Flace+News"}
                  className="img-fluid w-100 h-100 "
                  alt={news?.title || "Top Story"}
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
                  }}
                >
                  <h2 className="fs-5 fs-md-4 fw-bold m-0 text-wrap">{news?.title_hi || news?.title_en || ""}</h2>

                  {/* Slider Profile Icon */}
                  <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                    <UserAvatar
                      src={
                        news.createdBy?.profilePic ||
                        "https://via.placeholder.com/40x40?text=U"
                      }
                      alt={news.createdBy?.name || "EMS News"}
                      size={24}
                    />
                    <small className="text-wrap">{news.createdBy?.name || "EMS News"}</small>
                  </div>

                  <p
                    className="small mb-0 opacity-75 mt-1 text-wrap"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {formatFullDateTime(news.publishedAt  )}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Col>

      {/* 🟢 Right: Additional Flace News Cards */}
      <Col md={5}>
        <Row>
          {rightSideNews.length === 0 ? (
            <div className="text-center p-4">
              No more {categoryName} news available.
            </div>
          ) : (
            rightSideNews.map((news) => (
              <Col key={news.slug_en || news._id} xs={12} className="mb-3">
                <Link
                  to={`/news/${news.slug_en || news._id}`}
                  state={{ relatedArticles: flaceNews }}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="d-block h-100 position-relative"
                >
                  <Row className="gx-2 align-items-center">
                    <Col xs={4}>
                      <div
                        style={{
                          width: "100%",
                          height: "80px",
                          overflow: "hidden",
                          borderRadius: "6px",
                        }}
                      >
                        <Image
                          src={
                            news.media?.[0]?.url ||
                            "https://via.placeholder.com/120x80?text=Flace+News"
                          }
                          alt={news?.title || ""}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Col>

                    <Col xs={8}>
                      <p className="fw-bold small mb-1 text-wrap">{news?.title_hi || news?.title_en || ""}</p>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <UserAvatar
                          src={
                            news.createdBy?.profilePic ||
                            "https://via.placeholder.com/40x40?text=U"
                          }
                          alt={news.createdBy?.name || "User"}
                          size={24}
                        />
                        <small className="text-muted text-wrap">
                          {news.createdBy?.name || "EMS News"} |{" "}
                          {new Date(news.publishedAt).toLocaleString("hi-IN", {
                            day: "numeric",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </small>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default TopStory;
