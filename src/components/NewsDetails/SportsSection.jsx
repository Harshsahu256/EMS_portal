
// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi"; // ✅ API key used
// import UserAvatar from "../Main_NewsDetails/UserAvatar";
// import SectionHeader from "../../components/NewsDetails/SectionHeader"; // ✅ Updated SectionHeader import

// const SportsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews(); // ✅ API Key: allNews
//         if (res?.success) {
//           const sportsNews = res.data.filter(item => {
//             const categoryName = item.category?.name?.toLowerCase() || '';
//             const subCategoryName = item.subCategory?.name?.toLowerCase() || '';
//             // ✅ Filter for sports or क्रिकेट subCategory
//             return (
//               categoryName === "sports" ||
//               categoryName === "खेल" ||
//               subCategoryName === "cricket"
//             );
//           });
//           setNewsData(sportsNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching news");
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
//       </div>
//     );
//   if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;
//   if (newsData.length === 0) return null;

//   const mainArticle = newsData[0];
//   const sideArticles = newsData.slice(1, 4);
//   const farRightArticles = newsData.slice(4, 7);
//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const mutedTextStyle = { color: "rgba(0, 0, 0, 0.75)" };

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#ffffffff", color: "#000000ff" }}>
//       <Container fluid className="py-4">
//         {/* ✅ Section Header updated */}
//         <SectionHeader title="खेल" link="/sports" />

//         <Row>
//           {/* Main Article */}
//       {mainArticle && (
//   <Col xs={12} md={5} className="mb-3">
//     <Link
//       to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//       state={{ relatedArticles: newsData }}
//       style={linkStyle}
//       className="text-decoration-none"
//     >
//       {/* Main Image with h-80 */}
//       <div className="rounded overflow-hidden mb-2">
//         <Image
//           src={mainArticle.media?.[0]?.url || "https://via.placeholder.com/400x225"}
//           alt={mainArticle.title_hi || mainArticle.title_en}
//           className="w-100 h-80"
//           style={{ objectFit: "cover" }}
//         />
//       </div>

//       {/* Title */}
//       <h6 className="fw-bold mb-1" style={{ fontSize: "1rem", lineHeight: "1.2" }}>
//         {mainArticle.title_hi || mainArticle.title_en}
//       </h6>

//       {/* Summary - 1.5 lines */}
//       {mainArticle.summary_hi || mainArticle.summary_en ? (
//         <p
//           className="mb-1"
//           style={{
//             fontSize: "0.85rem",
//             lineHeight: "1.3",
//             display: "-webkit-box",
//             WebkitLineClamp: 1.5,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           {mainArticle.summary_hi || mainArticle.summary_en}
//         </p>
//       ) : null}

//       {/* Meta */}
//       <div className="d-flex align-items-center mt-1">
//         <UserAvatar user={mainArticle.createdBy} size={25} />
//         <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
//           {mainArticle.createdBy?.name || "EMS News"} |{" "}
//           {mainArticle.createdAt
//             ? new Date(mainArticle.createdAt).toLocaleDateString("hi-IN")
//             : ""}
//         </small>
//       </div>
//     </Link>
//   </Col>
// )}


//           {/* Side + Far Right Articles */}
//           <Col xs={12} md={7}>
//             <Row>
//               {[...sideArticles, ...farRightArticles].map(article => (
//                 <Col xs={12} sm={6} key={article._id} className="mb-3">
//                   <Link
//                     to={`/news/${article.slug_en || article._id}`} // ✅ slug fallback _id
//                     state={{ relatedArticles: newsData }}
//                     style={linkStyle}
//                   >
//                     <div className="d-flex">
//                       <div className="flex-shrink-0 me-2" style={{ width: "100px", height: "70px" }}>
//                         <Image
//                           src={article.media?.[0]?.url || "https://via.placeholder.com/100x70"}
//                           alt={article.title_hi || article.title_en} // ✅ Updated to title_hi
//                           className="w-100 h-100 rounded"
//                           style={{ objectFit: "cover" }}
//                         />
//                       </div>
//                       <div>
//                         <p className="fw-bold small mb-1">{article.title_hi || article.title_en}</p>
//                         <div className="d-flex align-items-center">
//                           <UserAvatar user={article.createdBy} size={20} />
//                           <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
//                             {article.createdBy?.name || "EMS"} |{" "}
//                             {new Date(article.createdAt).toLocaleDateString("hi-IN")}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SportsSection;



// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi"; // ✅ API key used
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const SportsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews(); // ✅ API call
//         if (res?.success) {
//           const sportsNews = res.data.filter(item => {
//             const categoryName = item.category?.name?.toLowerCase() || '';
//             const subCategoryName = item.subCategory?.name?.toLowerCase() || '';

//             // ✅ Filter for Sports or Cricket
//             return (
//               categoryName === "sports" ||
//               categoryName === "खेल" ||
//               subCategoryName === "cricket"
//             );
//           });
//           setNewsData(sportsNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   // Loading & Error States
//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//       </div>
//     );

//   if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;
//   if (newsData.length === 0) return null;

//   // Splitting News
//   const mainArticle = newsData[0];
//   const sideArticles = newsData.slice(1, 4);
//   const farRightArticles = newsData.slice(4, 7);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const mutedTextStyle = { color: "rgba(0, 0, 0, 0.75)" };

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
//       <Container fluid className="py-4">

//         {/* ==== Section Header Same as EMS TV ==== */}
//         <div className="d-flex align-items-center mb-3">
//           {/* Left Red Vertical Line */}
//           <div
//             style={{
//               width: "5px",
//               height: "28px",
//               backgroundColor: "#A12D2A",
//               marginRight: "10px",
//             }}
//           ></div>

//           {/* Section Title */}
//           <h5 className="fw-bold mb-0 text-black">खेल</h5>

//           {/* Stretch Horizontal Red Line */}
//           <div className="flex-grow-1 mx-2">
//             <hr className="border-2 border-danger opacity-100 my-0" />
//           </div>

//           {/* Aur Dekhein Link */}
//           <Link
//             to="/sports"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें
//           </Link>
//         </div>

//         <Row>
//           {/* ==== Main Article ==== */}
//           {mainArticle && (
//             <Col xs={12} md={5} className="mb-3">
//               <Link
//                 to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//                 state={{ relatedArticles: newsData}}
//                 style={linkStyle}
//                 className="text-decoration-none"
//               >
//                 {/* Main Image */}
//                 <div className="rounded overflow-hidden mb-2">
//                   <Image
//                     src={mainArticle.media?.[0]?.url || "https://via.placeholder.com/400x225"}
//                     alt={mainArticle.title_hi || mainArticle.title_en}
//                     className="w-100 h-80"
//                     style={{ objectFit: "cover" , paddingTop:"10px"}}
//                   />
//                 </div>

//                 {/* Title */}
//                 <h6 className="fw-bold mb-1" style={{ fontSize: "1rem", lineHeight: "1.2" }}>
//                   {mainArticle.title_hi || mainArticle.title_en}
//                 </h6>

//                 {/* Summary */}
//                 {mainArticle.summary_hi || mainArticle.summary_en ? (
//                   <p
//                     className="mb-1"
//                     style={{
//                       fontSize: "0.85rem",
//                       lineHeight: "1.3",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 1.8,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {mainArticle.summary_hi || mainArticle.summary_en}
//                   </p>
//                 ) : null}

//                 {/* Meta */}
//                 <div className="d-flex align-items-center mt-1">
//                   <UserAvatar user={mainArticle.createdBy} size={25} />
//                   <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
//                     {mainArticle.createdBy?.name || "EMS News"} |{" "}
//                     {mainArticle.publishedAt
//                       ? new Date(mainArticle.publishedAt).toLocaleDateString("hi-IN")
//                       : ""}
//                   </small>
//                 </div>
//               </Link>
//             </Col>
//           )}

//           {/* ==== Right Section Articles ==== */}
//           <Col xs={12} md={7} style={{ marginTop: "10px" }}>
//             <Row>
//               {[...sideArticles, ...farRightArticles].map(article => (
//                 <Col xs={12} sm={6} key={article._id} className="mb-3">
//                   <Link
//                     to={`/news/${article.slug_en || article._id}`}
//                     state={{ relatedArticles: newsData }}
//                     style={linkStyle}
//                   >
//                     <div className="d-flex">
//                       <div
//                         className="flex-shrink-0 me-2"
//                         style={{ width: "100px", height: "70px" }}
//                       >
//                         <Image
//                           src={article.media?.[0]?.url || "https://via.placeholder.com/100x70"}
//                           alt={article.title_hi || article.title_en}
//                           className="w-100 h-100 rounded"
//                           style={{ objectFit: "cover" }}
//                         />
//                       </div>
//                       <div>
//                         <p className="fw-bold small mb-1">
//                           {article.title_hi || article.title_en}
//                         </p>
//                         <div className="d-flex align-items-center">
//                           <UserAvatar user={article.createdBy} size={20} />
//                           <small
//                             className="ms-2"
//                             style={{ ...mutedTextStyle, fontSize: "0.75rem" }}
//                           >
//                             {article.createdBy?.name || "EMS"} |{" "}
//                             {new Date(article.publishedAt).toLocaleString("hi-IN", {
//   day: "numeric",
//   month: "short",
//   year: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
// })
// }
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SportsSection;



// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const SportsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const sportsNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
//             return (
//               categoryName === "sports" ||
//               categoryName === "खेल" ||
//               subCategoryName === "cricket"
//             );
//           });
//           setNewsData(sportsNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching news");
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
//       </div>
//     );

//   if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;
//   if (newsData.length === 0) return null;

//   const mainArticle = newsData[0];
//   const sideArticles = newsData.slice(1, 4);
//   const farRightArticles = newsData.slice(4, 7);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const mutedTextStyle = { color: "rgba(0, 0, 0, 0.75)" };

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
//       <Container fluid className="py-4">
//         {/* ==== Section Header ==== */}
//         <div className="d-flex align-items-center mb-3">
//           <div
//             style={{
//               width: "5px",
//               height: "28px",
//               backgroundColor: "#A12D2A",
//               marginRight: "10px",
//             }}
//           ></div>

//           <h5 className="fw-bold mb-0 text-black">खेल</h5>

//           <div className="flex-grow-1 mx-2">
//             <hr className="border-2 border-danger opacity-100 my-0" />
//           </div>

//           <Link
//             to="/sports"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें
//           </Link>
//         </div>

//         <Row>
//           {/* ==== Main Article ==== */}
//           {mainArticle && (
//             <Col xs={12} md={5} className="mb-3">
//               <Link
//                 to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//                 state={{ relatedArticles: newsData }}
//                 style={linkStyle}
//                 className="text-decoration-none"
//               >
//                 <div className="rounded overflow-hidden mb-2">
//                   <Image
//                     src={mainArticle.media?.[0]?.url || "https://via.placeholder.com/400x225"}
//                     alt={mainArticle.title_hi || mainArticle.title_en}
//                     className="w-100 h-80"
//                     style={{ objectFit: "cover", paddingTop: "10px" }}
//                   />
//                 </div>

//                 <h6 className="fw-bold mb-1" style={{ fontSize: "1rem", lineHeight: "1.2" }}>
//                   {mainArticle.title_hi || mainArticle.title_en}
//                 </h6>

//                 {mainArticle.summary_hi || mainArticle.summary_en ? (
//                   <p
//                     className="mb-1"
//                     style={{
//                       fontSize: "0.85rem",
//                       lineHeight: "1.3",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 1.8,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {mainArticle.summary_hi || mainArticle.summary_en}
//                   </p>
//                 ) : null}

//                 <div className="d-flex align-items-center mt-1">
//                   <UserAvatar user={mainArticle.createdBy} size={25} />
//                   <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
//                     {mainArticle.createdBy?.name || "EMS News"} |{" "}
//                     {mainArticle.publishedAt
//                       ? new Date(mainArticle.publishedAt).toLocaleString("hi-IN", {
//                           day: "numeric",
//                           month: "2-digit",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })
//                       : ""}
//                   </small>
//                 </div>
//               </Link>
//             </Col>
//           )}

//           {/* ==== Right Section Articles ==== */}
//           <Col xs={12} md={7} style={{ marginTop: "10px" }}>
//             <Row>
//               {[...sideArticles, ...farRightArticles].map((article) => (
//                 <Col xs={12} sm={6} key={article._id} className="mb-3">
//                   <Link
//                     to={`/news/${article.slug_en || article._id}`}
//                     state={{ relatedArticles: newsData }}
//                     style={linkStyle}
//                   >
//                     <div className="d-flex">
//                       <div
//                         className="flex-shrink-0 me-2"
//                         style={{ width: "100px", height: "70px" }}
//                       >
//                         <Image
//                           src={article.media?.[0]?.url || "https://via.placeholder.com/100x70"}
//                           alt={article.title_hi || article.title_en}
//                           className="w-100 h-100 rounded"
//                           style={{ objectFit: "cover" }}
//                         />
//                       </div>
//                       <div>
//                         <p className="fw-bold small mb-1">
//                           {article.title_hi || article.title_en}
//                         </p>
//                         <div className="d-flex align-items-center">
//                           <UserAvatar user={article.createdBy} size={20} />
//                           <small
//                             className="ms-2"
//                             style={{ ...mutedTextStyle, fontSize: "0.75rem" }}
//                           >
//                             {article.createdBy?.name || "EMS"} |{" "}
//                             {new Date(article.publishedAt).toLocaleString("hi-IN", {
//                               day: "numeric",
//                               month: "2-digit",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SportsSection;


// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
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


// const SportsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const sportsNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
//             return (
//               categoryName === "sports" ||
//               categoryName === "खेल" ||
//               subCategoryName === "cricket"
//             );
//           });
//           setNewsData(sportsNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching news");
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
//       </div>
//     );

//   if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;
//   if (newsData.length === 0) return null;

//   const mainArticle = newsData[0];
//   const sideArticles = newsData.slice(1, 4);
//   const farRightArticles = newsData.slice(4, 7);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const mutedTextStyle = { color: "rgba(0, 0, 0, 0.75)" };

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
//       <Container fluid className="py-4">
//         {/* ==== Section Header ==== */}
//         <div className="d-flex align-items-center mb-3">
//           <div
//             style={{
//               width: "5px",
//               height: "28px",
//               backgroundColor: "#A12D2A",
//               marginRight: "10px",
//             }}
//           ></div>

//           <h5 className="fw-bold mb-0 text-black">खेल</h5>

//           <div className="flex-grow-1 mx-2">
//             <hr className="border-2 border-danger opacity-100 my-0" />
//           </div>

//           <Link
//             to="/sports"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें
//           </Link>
//         </div>

//         <Row>
//           {/* ==== Main Article ==== */}
//           {mainArticle && (
//             <Col xs={12} md={5} className="mb-3">
//               <Link
//                 to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//                 state={{ relatedArticles: newsData }}
//                 style={linkStyle}
//                 className="text-decoration-none"
//               >
//                 <div className="rounded overflow-hidden mb-2">
//                   {/* MediaRenderer for Main Article */}
//                   <MediaRenderer
//                     media={mainArticle.media}
//                     alt={mainArticle.title_hi || mainArticle.title_en || "Sports News"}
//                     width="100%"
//                     height="225px" // 400x225 placeholder के लिए उपयुक्त ऊंचाई
//                     objectFit="cover"
//                     borderRadius="8px"
//                   />
//                 </div>

//                 <h6 className="fw-bold mb-1" style={{ fontSize: "1rem", lineHeight: "1.2" }}>
//                   {mainArticle.title_hi || mainArticle.title_en}
//                 </h6>

//                 {mainArticle.summary_hi || mainArticle.summary_en ? (
//                   <p
//                     className="mb-1"
//                     style={{
//                       fontSize: "0.85rem",
//                       lineHeight: "1.3",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 1.8,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {mainArticle.summary_hi || mainArticle.summary_en}
//                   </p>
//                 ) : null}

//                 <div className="d-flex align-items-center mt-1">
//                   <UserAvatar user={mainArticle.createdBy} size={25} />
//                   <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
//                     {mainArticle.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(mainArticle.publishedAt)}
//                   </small>
//                 </div>
//               </Link>
//             </Col>
//           )}

//           {/* ==== Right Section Articles ==== */}
//           <Col xs={12} md={7} style={{ marginTop: "10px" }}>
//             <Row>
//               {[...sideArticles, ...farRightArticles].map((article) => (
//                 <Col xs={12} sm={6} key={article._id} className="mb-3">
//                   <Link
//                     to={`/news/${article.slug_en || article._id}`}
//                     state={{ relatedArticles: newsData }}
//                     style={linkStyle}
//                   >
//                     <div className="d-flex">
//                       <div
//                         className="flex-shrink-0 me-2"
//                         // Removed fixed width/height div, MediaRenderer will handle it
//                         // style={{ width: "100px", height: "70px" }}
//                       >
//                         {/* MediaRenderer for Side Articles */}
//                         <MediaRenderer
//                           media={article.media}
//                           alt={article.title_hi || article.title_en || "Sports News"}
//                           width="100px" // मीडिया को 100px चौड़ा रखें
//                           height="90px" // RelatedNews के समान ऊंचाई
//                           objectFit="cover"
//                           borderRadius="8px"
//                         />
//                       </div>
//                       <div>
//                         <p className="fw-bold small mb-1">
//                           {article.title_hi || article.title_en}
//                         </p>
//                         <div className="d-flex align-items-center">
//                           <UserAvatar user={article.createdBy} size={20} />
//                           <small
//                             className="ms-2"
//                             style={{ ...mutedTextStyle, fontSize: "0.75rem" }}
//                           >
//                             {article.createdBy?.name || "EMS"} |{" "}
//                             {formatFullDateTime(article.publishedAt)}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SportsSection;



// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
//   const firstMedia = media?.[0];
//   const isVideo = firstMedia && firstMedia.type === 'video';
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
//       <video
//         src={mediaUrl}
//         width={width}
//         height={height}
//         autoPlay
//         muted
//         loop
//         style={commonStyles}
//       />
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

// const SportsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const sportsNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
//             return (
//               categoryName === "sports" ||
//               categoryName === "खेल" ||
//               subCategoryName === "cricket"
//             );
//           });
//           setNewsData(sportsNews);
//         } else setError("Failed to load news");
//       } catch (err) {
//         setError(err.message || "Error fetching news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     const options = {
//       day: "numeric",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hourCycle: 'h23',
//     };
//     return new Date(dateString).toLocaleString("hi-IN", options);
//   };

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//       </div>
//     );

//   if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;
//   if (newsData.length === 0) return null;

//   const mainArticle = newsData[0];
//   const sideArticles = newsData.slice(1, 4);
//   const farRightArticles = newsData.slice(4, 7);
//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const mutedTextStyle = { color: "rgba(0, 0, 0, 0.75)" };

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
//       <Container fluid className="py-4">
//         {/* ==== Section Header ==== */}
//         <div className="d-flex align-items-center mb-3">
//           <div
//             style={{
//               width: "5px",
//               height: "28px",
//               backgroundColor: "#A12D2A",
//               marginRight: "10px",
//             }}
//           ></div>

//           <h5 className="fw-bold mb-0 text-black">खेल</h5>

//           <div className="flex-grow-1 mx-2">
//             <hr className="border-2 border-danger opacity-100 my-0" />
//           </div>

//           <Link
//             to="/sports"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें
//           </Link>
//         </div>

//         <Row>
//           {/* ==== Main Article ==== */}
//           {mainArticle && (
//             <Col xs={12} md={5} className="mb-3">
//               <Link
//                 to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//                 state={{ relatedArticles: newsData }}
//                 style={linkStyle}
//               >
//                 <div className="rounded overflow-hidden mb-2">
//                   <MediaRenderer
//                     media={mainArticle.media}
//                     alt={mainArticle.title_hi || mainArticle.title_en || "Sports News"}
//                     width="100%"
//                     height="280px"
//                     objectFit="cover"
//                     borderRadius="8px"
                    
//                   />
//                 </div>
//                 <h6 className="fw-bold mb-1" style={{ fontSize: "1rem" }}>
//                   {mainArticle.title_hi || mainArticle.title_en}
//                 </h6>
//                 <div className="d-flex align-items-center mt-1">
//                   <UserAvatar user={mainArticle.createdBy} size={25} />
//                   <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
//                     {mainArticle.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(mainArticle.publishedAt)}
//                   </small>
//                 </div>
//               </Link>
//             </Col>
//           )}

//           {/* ==== Right Articles ==== */}
//           <Col xs={12} md={7} style={{ marginTop: "10px" }}>
//             <Row>
//               {[...sideArticles, ...farRightArticles].map((article, index, arr) => (
//                 <Col xs={12} sm={6} key={article._id} className="mb-3">
//                   <Link
//                     to={`/news/${article.slug_en || article._id}`}
//                     state={{ relatedArticles: newsData }}
//                     style={linkStyle}
//                   >
//                     <div className="d-flex">
//                       <div className="flex-shrink-0 me-2">
//                         <MediaRenderer
//                           media={article.media}
//                           alt={article.title_hi || article.title_en || "Sports News"}
//                           width="100px"
//                           height="90px"
//                           objectFit="cover"
//                           borderRadius="8px"
//                         />
//                       </div>
//                       <div>
//                         <p className="fw-bold small mb-1">
//                           {article.title_hi || article.title_en}
//                         </p>
//                         <div className="d-flex align-items-center">
//                           <UserAvatar user={article.createdBy} size={20} />
//                           <small
//                             className="ms-2"
//                             style={{ ...mutedTextStyle, fontSize: "0.75rem" }}
//                           >
//                             {article.createdBy?.name || "EMS"} |{" "}
//                             {formatFullDateTime(article.publishedAt)}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>

//                   {/* ✅ Gray line (but not after last card) */}
//                   {index !== arr.length - 1 && (
//                     <div
//                       style={{
//                         height: "1px",
//                         backgroundColor: "#d3d3d3",
//                         marginTop: "8px",
//                         marginBottom: "8px",
//                       }}
//                     ></div>
//                   )}
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SportsSection;


// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

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
//       <video
//         src={mediaUrl}
//         width={width}
//         height={height}
//         autoPlay
//         muted
//         loop
//         style={commonStyles}
//       />
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

// const SportsSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const sportsNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
//             return (
//               categoryName === "sports" ||
//               categoryName === "खेल" ||
//               subCategoryName === "cricket"
//             );
//           });
//           setNewsData(sportsNews);
//         } else setError("Failed to load news");
//       } catch (err) {
//         setError(err.message || "Error fetching news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     const options = {
//       day: "numeric",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hourCycle: "h23",
//     };
//     return new Date(dateString).toLocaleString("hi-IN", options);
//   };

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//       </div>
//     );

//   if (error)
//     return <Alert variant="danger" className="my-4">{error}</Alert>;
//   if (newsData.length === 0) return null;

//   const mainArticle = newsData[0];
//   const belowMainArticle = newsData[1]; // 👈 new card below main
//   const sideArticles = newsData.slice(2, 5);
//   const farRightArticles = newsData.slice(5, 8);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const mutedTextStyle = { color: "rgba(0, 0, 0, 0.75)" };

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
//       <Container fluid className="py-4">
//         {/* ==== Section Header ==== */}
//         <div className="d-flex align-items-center mb-3">
//           <div
//             style={{
//               width: "5px",
//               height: "28px",
//               backgroundColor: "#A12D2A",
//               marginRight: "10px",
//             }}
//           ></div>

//           <h5 className="fw-bold mb-0 text-black">खेल</h5>

//           <div className="flex-grow-1 mx-2">
//             <hr className="border-2 border-danger opacity-100 my-0" />
//           </div>

//           <Link
//             to="/sports"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें
//           </Link>
//         </div>

//         <Row>
//           {/* ==== Left Side: Main + Below Card ==== */}
//           <Col xs={12} md={5} className="mb-3">
//             {mainArticle && (
//               <Link
//                 to={`/news/${mainArticle.slug_en || mainArticle._id}`}
//                 state={{ relatedArticles: newsData }}
//                 style={linkStyle}
//               >
//                 <div className="rounded overflow-hidden mb-2">
//                   <MediaRenderer
//                     media={mainArticle.media}
//                     alt={mainArticle.title_hi || mainArticle.title_en || "Sports News"}
//                     width="100%"
//                     height="280px"
//                     objectFit="cover"
//                     borderRadius="8px"
//                   />
//                 </div>
//                 <h6 className="fw-bold mb-1" style={{ fontSize: "1rem" }}>
//                   {mainArticle.title_hi || mainArticle.title_en}
//                 </h6>
//                 <div className="d-flex align-items-center mt-1 mb-3">
//                   <UserAvatar user={mainArticle.createdBy} size={25} />
//                   <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
//                     {mainArticle.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(mainArticle.publishedAt)}
//                   </small>
//                 </div>
//               </Link>
//             )}

//             {/* ✅ New card below main (same layout as right side) */}
//             {belowMainArticle && (
//               <div>
//                 <Link
//                   to={`/news/${belowMainArticle.slug_en || belowMainArticle._id}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                 >
//                   <div className="d-flex">
//                     <div className="flex-shrink-0 me-2">
//                       <MediaRenderer
//                         media={belowMainArticle.media}
//                         alt={belowMainArticle.title_hi || belowMainArticle.title_en || "Sports News"}
//                         width="100px"
//                         height="90px"
//                         objectFit="cover"
//                         borderRadius="8px"
//                       />
//                     </div>
//                     <div>
//                       <p className="fw-bold small mb-1">
//                         {belowMainArticle.title_hi || belowMainArticle.title_en}
//                       </p>
//                       <div className="d-flex align-items-center">
//                         <UserAvatar user={belowMainArticle.createdBy} size={20} />
//                         <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
//                           {belowMainArticle.createdBy?.name || "EMS"} |{" "}
//                           {formatFullDateTime(belowMainArticle.publishedAt)}
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>

//                 {/* ✅ Gray line always shown below */}
//                 <div
//                   style={{
//                     height: "1px",
//                     backgroundColor: "#d3d3d3",
//                     marginTop: "8px",
//                     marginBottom: "8px",
//                   }}
//                 ></div>
//               </div>
//             )}
//           </Col>

//           {/* ==== Right Side Articles ==== */}
//           <Col xs={12} md={7} style={{ marginTop: "10px" }}>
//             <Row>
//               {[...sideArticles, ...farRightArticles].map((article) => (
//                 <Col xs={12} sm={6} key={article._id} className="mb-3">
//                   <Link
//                     to={`/news/${article.slug_en || article._id}`}
//                     state={{ relatedArticles: newsData }}
//                     style={linkStyle}
//                   >
//                     <div className="d-flex">
//                       <div className="flex-shrink-0 me-2">
//                         <MediaRenderer
//                           media={article.media}
//                           alt={article.title_hi || article.title_en || "Sports News"}
//                           width="100px"
//                           height="90px"
//                           objectFit="cover"
//                           borderRadius="8px"
//                         />
//                       </div>
//                       <div>
//                         <p className="fw-bold small mb-1">
//                           {article.title_hi || article.title_en}
//                         </p>
//                         <div className="d-flex align-items-center">
//                           <UserAvatar user={article.createdBy} size={20} />
//                           <small
//                             className="ms-2"
//                             style={{ ...mutedTextStyle, fontSize: "0.75rem" }}
//                           >
//                             {article.createdBy?.name || "EMS"} |{" "}
//                             {formatFullDateTime(article.publishedAt)}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>

//                   {/* ✅ Gray line always shown (even after last card) */}
//                   <div
//                     style={{
//                       height: "1px",
//                       backgroundColor: "#d3d3d3",
//                       marginTop: "8px",
//                       marginBottom: "8px",
//                     }}
//                   ></div>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SportsSection;

import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { allNews } from "../../Services/authApi";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

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

const SportsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await allNews();
        if (res?.success) {
          const sportsNews = res.data.filter((item) => {
            const categoryName = item.category?.name?.toLowerCase() || "";
            const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
            return (
              categoryName === "sports" ||
              categoryName === "खेल" ||
              subCategoryName === "cricket"
            );
          });
          setNewsData(sportsNews);
        } else setError("Failed to load news");
      } catch (err) {
        setError(err.message || "Error fetching news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const formatFullDateTime = (dateString) => {
    if (!dateString) return "";
    const options = {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    };
    return new Date(dateString).toLocaleString("hi-IN", options);
  };

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;
  if (newsData.length === 0) return null;

  const mainArticle = newsData[0];
  const belowMainArticle = newsData[1];
  const sideArticles = newsData.slice(2, 5);
  const farRightArticles = newsData.slice(5, 8);

  const linkStyle = { textDecoration: "none", color: "inherit" };
  const mutedTextStyle = { color: "rgba(0, 0, 0, 0.75)" };

  const truncateStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 3, // ✅ Sirf 3 lines tak headline
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const grayLine = (
    <div
      style={{
        height: "1px",
        backgroundColor: "#d3d3d3",
        marginTop: "8px",
        marginBottom: "8px",
      }}
    ></div>
  );

  return (
    <div className="mt-4" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
      <Container fluid className="py-4">
        {/* ==== Section Header ==== */}
        <div className="d-flex align-items-center mb-3">
          <div
            style={{
              width: "5px",
              height: "28px",
              backgroundColor: "#A12D2A",
              marginRight: "10px",
            }}
          ></div>
          <h5 className="fw-bold mb-0 text-black">खेल</h5>
          <div className="flex-grow-1 mx-2">
            <hr className="border-2 border-danger opacity-100 my-0" />
          </div>
          <Link
            to="/sports"
            className="text-decoration-none fw-bold small flex-shrink-0"
            style={{ color: "#2E6E9E" }}
          >
            और देखें
          </Link>
        </div>

        <Row>
          {/* ==== Left Side (main article + below main) ==== */}
          <Col xs={12} md={5} className="mb-3" >
            {mainArticle && (
              <Link
                to={`/news/${mainArticle.slug_en || mainArticle._id}`}
                state={{ relatedArticles: newsData }}
                style={linkStyle}
              >
                <div className="rounded overflow-hidden mb-2" style={{ height: "195px" }}>
                  <MediaRenderer
                    media={mainArticle.media}
                    alt={mainArticle.title_hi || mainArticle.title_en || "Sports News"}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </div>
                <h6 className="fw-bold mb-1" style={{ fontSize: "1rem", ...truncateStyle }}>
                  {mainArticle.title_hi || mainArticle.title_en}
                </h6>
                <div className="d-flex align-items-center mt-1 mb-3">
                  <UserAvatar user={mainArticle.createdBy} size={25} />
                  <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
                    {mainArticle.createdBy?.name || "EMS News"} |{" "}
                    {formatFullDateTime(mainArticle.publishedAt)}
                  </small>
                </div>
              </Link>
            )}

            {belowMainArticle && (
              <div>
                <Link
                  to={`/news/${belowMainArticle.slug_en || belowMainArticle._id}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                >
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-2">
                      <MediaRenderer
                        media={belowMainArticle.media}
                        alt={belowMainArticle.title_hi || belowMainArticle.title_en}
                        width="100px"
                        height="90px"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <p className="fw-bold small mb-1" style={truncateStyle}>
                        {belowMainArticle.title_hi || belowMainArticle.title_en}
                      </p>
                      <div className="d-flex align-items-center">
                        <UserAvatar user={belowMainArticle.createdBy} size={20} />
                        <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
                          {belowMainArticle.createdBy?.name || "EMS"} |{" "}
                          {formatFullDateTime(belowMainArticle.publishedAt)}
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>
                {grayLine}
              </div>
            )}
          </Col>

          {/* ==== Right Side ==== */}
          <Col xs={12} md={7}>
            <Row>
              {[...sideArticles, ...farRightArticles].map((article, index, arr) => (
                <Col xs={12} sm={6} key={article._id} className="mb-3">
                  <Link
                    to={`/news/${article.slug_en || article._id}`}
                    state={{ relatedArticles: newsData }}
                    style={linkStyle}
                  >
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-2">
                        <MediaRenderer
                          media={article.media}
                          alt={article.title_hi || article.title_en}
                          width="100px"
                          height="90px"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <p className="fw-bold small mb-1" style={truncateStyle}>
                          {article.title_hi || article.title_en}
                        </p>
                        <div className="d-flex align-items-center">
                          <UserAvatar user={article.createdBy} size={20} />
                          <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
                            {article.createdBy?.name || "EMS"} |{" "}
                            {formatFullDateTime(article.publishedAt)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {/* ✅ Gray line after every card (including last) */}
                  {grayLine}
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SportsSection;
