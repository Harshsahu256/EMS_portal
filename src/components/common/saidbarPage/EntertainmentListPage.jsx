// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { allNews } from "../../../Services/authApi";
// import UserAvatar from "../../Main_NewsDetails/UserAvatar";

// const EntertainmentListPage = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Scroll to top on page load
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const entertainmentNews = res.data.filter((item) => {
//             const categoryName =
//               typeof item.category === "string"
//                 ? item.category.toLowerCase()
//                 : item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(entertainmentNews);
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
//         <p>Loading...</p>
//       </div>
//     );
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (newsData.length === 0)
//     return <Alert variant="warning">कोई खबर उपलब्ध नहीं है।</Alert>;

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   return (
//     <Container className="my-4">
//       <h2 className="fw-bold border-bottom pb-2 mb-4">मनोरंजन</h2>

//       {newsData.map((article) => {
//         const tags = [];
//         if (article.category?.name && !["entertainment", "मनोरंजन"].includes(article.category.name.toLowerCase())) {
//           tags.push(article.category.name);
//         }
//         if (article.subCategory?.name) tags.push(article.subCategory.name);

//         // ✅ Fallback summary logic (like Sports)
//         const summaryText =
//           article.summary_hi ||
//           article.summary_en ||
//           article.description ||
//           article.content ||
//           "";

//         return (
//           <React.Fragment key={article._id || article.slug_en}>
//             <Row className="mb-3 g-3">
//               {/* Left Image */}
//               <Col xs={12} md={4} lg={3}>
//                 <Link
//                   to={`/news/${article.slug_en}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                 >
//                   <Image
//                     src={article.media?.[0]?.url || "https://via.placeholder.com/300x170"}
//                     alt={article.title_hi || article.title}
//                     fluid
//                     rounded
//                     style={{ width: "100%", height: "170px", objectFit: "cover" }}
//                   />
//                 </Link>
//               </Col>

//               {/* Right Content */}
//               <Col xs={12} md={8} lg={9} className="d-flex flex-column">
//                 <Link
//                   to={`/news/${article.slug_en}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                   className="flex-grow-1"
//                 >
//                   {/* Title */}
//                   <h5
//                     className="fw-bold mb-2"
//                     style={{
//                       fontSize: "clamp(14px, 3vw, 18px)",
//                       lineHeight: "1.5",
//                       fontFamily: "'Noto Sans Devanagari','Mangal',sans-serif",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {article.title_hi || article.title}
//                   </h5>

//                   {/* ✅ Summary (2 lines) */}
//                   <p
//                     className="text-muted mb-2"
//                     style={{
//                       fontSize: "0.9rem",
//                       lineHeight: "1.4",
//                       fontFamily: "'Noto Sans Devanagari','Mangal',sans-serif",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       color: "#555",
//                     }}
//                   >
//                     {summaryText}
//                   </p>
//                 </Link>

//                 {/* Author + Date */}
//                 <div className="d-flex align-items-center mb-2">
//                   <UserAvatar user={article.createdBy} size={25} />
//                   <small className="ms-2 text-muted">
//                     {article.createdBy?.name || "EMS News"} |{" "}
//                     {new Date(article.publishedAt).toLocaleString("hi-IN", {
//   day: "numeric",
//   month: "2-digit",
//   year: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
// })
// }
//                   </small>
//                 </div>

//                 {/* Tags */}
//                 {tags.length > 0 && (
//                   <div className="d-flex flex-wrap gap-2 mt-auto">
//                     {tags.map((tagName, index) => (
//                       <Link key={tagName + index} to={`/category/${tagName.toLowerCase()}`}>
//                         <Button
//                           variant="light"
//                           size="sm"
//                           className="py-0 px-2 border text-muted"
//                           style={{ fontSize: "0.75rem" }}
//                         >
//                           {tagName} &gt;
//                         </Button>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </Col>
//             </Row>
//             <hr className="my-3" />
//           </React.Fragment>
//         );
//       })}
//     </Container>
//   );
// };

// export default EntertainmentListPage;



// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { allNews } from "../../../Services/authApi";
// import UserAvatar from "../../Main_NewsDetails/UserAvatar";

// // Re-using the formatFullDateTime from RelatedNews for consistency
// // Format date to dd/mm/yyyy hh:mm (24-hour format)
// const formatFullDateTime = (dateString) => {
//   if (!dateString) return "";
//   const options = {
//     day: "2-digit",
//     month: "2-digit", // Numeric month (e.g., 01 for January, 10 for October)
//     year: "numeric",
//     hour: "2-digit",   // Include hour
//     minute: "2-digit", // Include minute
//     hourCycle: 'h23', // Ensure 24-hour format
//   };
//   // Using "hi-IN" locale, which typically formats as DD/MM/YYYY HH:MM
//   return new Date(dateString).toLocaleString("hi-IN", options);
// };


// const EntertainmentListPage = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Scroll to top on page load
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const entertainmentNews = res.data.filter((item) => {
//             const categoryName =
//               typeof item.category === "string"
//                 ? item.category.toLowerCase()
//                 : item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(entertainmentNews);
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
//         <p>Loading...</p>
//       </div>
//     );
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (newsData.length === 0)
//     return <Alert variant="warning">कोई खबर उपलब्ध नहीं है।</Alert>;

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   return (
//     <Container className="my-4">
//       <h2 className="fw-bold border-bottom pb-2 mb-4">मनोरंजन</h2>

//       {newsData.map((article) => {
//         const tags = [];
//         if (article.category?.name && !["entertainment", "मनोरंजन"].includes(article.category.name.toLowerCase())) {
//           tags.push(article.category.name);
//         }
//         if (article.subCategory?.name) tags.push(article.subCategory.name);

//         const summaryText =
//           article.summary_hi ||
//           article.summary_en ||
//           article.description ||
//           article.content ||
//           "";

//         // Extract media information
//         const firstMedia = article.media?.[0];
//         const isVideo = firstMedia && firstMedia.type === 'video';
//         const mediaUrl = firstMedia?.url || "https://via.placeholder.com/300x170?text=No+Media"; // Placeholder for image/video

//         return (
//           <React.Fragment key={article._id || article.slug_en}>
//             <Row className="mb-3 g-3">
//               {/* Left Image/Video */}
//               <Col xs={12} md={4} lg={3}>
//                 <Link
//                   to={`/news/${article.slug_en}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                 >
//                   {isVideo ? (
//                     <video
//                       src={mediaUrl}
//                       width="100%"
//                       height="170px" // Using the existing height for this component
//                       controls={false}
//                       autoPlay
//                       muted
//                       loop
//                       style={{
//                         borderRadius: "8px", // Added border radius
//                         objectFit: "cover",
//                         backgroundColor: "#e0e0e0", // Added background color
//                         display: "block"
//                       }}
//                     />
//                   ) : (
//                     <Image
//                       src={mediaUrl}
//                       alt={article.title_hi || article.title || "News"}
//                       fluid
//                       rounded
//                       style={{
//                         width: "100%",
//                         height: "170px", // Ensured fixed height for image
//                         objectFit: "cover",
//                         display: "block",
//                         backgroundColor: "#e0e0e0" // Added background color
//                       }}
//                       onError={(e) => { e.target.src = "https://via.placeholder.com/300x170?text=Error"; console.error("Image failed to load:", e.target.src); }}
//                     />
//                   )}
//                 </Link>
//               </Col>

//               {/* Right Content */}
//               <Col xs={12} md={8} lg={9} className="d-flex flex-column">
//                 <Link
//                   to={`/news/${article.slug_en}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                   className="flex-grow-1"
//                 >
//                   {/* Title */}
//                   <h5
//                     className="fw-bold mb-2"
//                     style={{
//                       fontSize: "clamp(14px, 3vw, 18px)",
//                       lineHeight: "1.5",
//                       fontFamily: "'Noto Sans Devanagari','Mangal',sans-serif",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {article.title_hi || article.title}
//                   </h5>

//                   {/* Summary (2 lines) */}
//                   <p
//                     className="text-muted mb-2"
//                     style={{
//                       fontSize: "0.9rem",
//                       lineHeight: "1.4",
//                       fontFamily: "'Noto Sans Devanagari','Mangal',sans-serif",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       color: "#555",
//                     }}
//                   >
//                     {summaryText}
//                   </p>
//                 </Link>

//                 {/* Author + Date */}
//                 <div className="d-flex align-items-center mb-2">
//                   <UserAvatar user={article.createdBy} size={25} />
//                   <small className="ms-2 text-muted">
//                     {article.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(article.publishedAt)} {/* Using the helper function */}
//                   </small>
//                 </div>

//                 {/* Tags */}
//                 {tags.length > 0 && (
//                   <div className="d-flex flex-wrap gap-2 mt-auto">
//                     {tags.map((tagName, index) => (
//                       <Link key={tagName + index} to={`/category/${tagName.toLowerCase()}`}>
//                         <Button
//                           variant="light"
//                           size="sm"
//                           className="py-0 px-2 border text-muted"
//                           style={{ fontSize: "0.75rem" }}
//                         >
//                           {tagName} &gt;
//                         </Button>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </Col>
//             </Row>
//             <hr className="my-3" />
//           </React.Fragment>
//         );
//       })}
//     </Container>
//   );
// };

// export default EntertainmentListPage;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { allNews } from "../../../Services/authApi";
import UserAvatar from "../../Main_NewsDetails/UserAvatar";

// Re-using the formatFullDateTime from RelatedNews for consistency
// Format date to dd/mm/yyyy hh:mm (24-hour format)
const formatFullDateTime = (dateString) => {
  if (!dateString) return "";
  const options = {
    day: "2-digit",
    month: "2-digit", // Numeric month (e.g., 01 for January, 10 for October)
    year: "numeric",
    hour: "2-digit",   // Include hour
    minute: "2-digit", // Include minute
    hourCycle: 'h23', // Ensure 24-hour format
  };
  // Using "hi-IN" locale, which typically formats as DD/MM/YYYY HH:MM
  return new Date(dateString).toLocaleString("hi-IN", options);
};


const EntertainmentListPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await allNews();
        if (res?.success) {
          const entertainmentNews = res.data.filter((item) => {
            const categoryName =
              typeof item.category === "string"
                ? item.category.toLowerCase()
                : item.category?.name?.toLowerCase() || "";
            return categoryName === "entertainment" || categoryName === "मनोरंजन";
          });
          setNewsData(entertainmentNews);
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        setError(err.message || "Error fetching news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (newsData.length === 0)
    return <Alert variant="warning">कोई खबर उपलब्ध नहीं है।</Alert>;

  const linkStyle = { textDecoration: "none", color: "inherit" };

  return (
    <Container className="my-4">
      <h2 className="fw-bold border-bottom pb-2 mb-4">मनोरंजन</h2>

      {newsData.map((article) => {
        const tags = [];
        if (article.category?.name && !["entertainment", "मनोरंजन"].includes(article.category.name.toLowerCase())) {
          tags.push(article.category.name);
        }
        if (article.subCategory?.name) tags.push(article.subCategory.name);

        const summaryText =
          article.summary_hi ||
          article.summary_en ||
          article.description ||
          article.content ||
          "";

        // Extract media information
        const firstMedia = article.media?.[0];
        const isVideo = firstMedia && firstMedia.type === 'video';
        const mediaUrl = firstMedia?.url || "https://via.placeholder.com/300x170?text=No+Media"; // Placeholder for image/video

        return (
          <React.Fragment key={article._id || article.slug_en}>
            <Row className="mb-3 g-3">
              {/* Left Image/Video */}
              <Col xs={12} md={4} lg={3}>
                <Link
                  to={`/news/${article.slug_en}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                >
                  {/* यहां बदलाव किया गया: सीधे इमेज/वीडियो पर स्टाइल लागू की गई है */}
                  {isVideo ? (
                    <video
                      src={mediaUrl}
                      width="100%"
                      height="170px" // निश्चित ऊंचाई
                      controls={false}
                      autoPlay
                      muted
                      loop
                      style={{
                        borderRadius: "8px", // RelatedNews के समान
                        objectFit: "cover", // पूरी तरह से भरने के लिए
                        backgroundColor: "#e0e0e0", // RelatedNews के समान
                        display: "block" // ब्लॉक-लेवल एलिमेंट के लिए
                      }}
                    />
                  ) : (
                    <Image
                      src={mediaUrl}
                      alt={article.title_hi || article.title || "News"}
                      // fluid prop हटा दिया गया है
                      rounded
                      style={{
                        width: "100%",
                        height: "170px", // निश्चित ऊंचाई
                        objectFit: "cover", // पूरी तरह से भरने के लिए
                        display: "block", // ब्लॉक-लेवल एलिमेंट के लिए
                        backgroundColor: "#e0e0e0" // RelatedNews के समान
                      }}
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300x170?text=Error"; console.error("Image failed to load:", e.target.src); }}
                    />
                  )}
                </Link>
              </Col>

              {/* Right Content */}
              <Col xs={12} md={8} lg={9} className="d-flex flex-column">
                <Link
                  to={`/news/${article.slug_en}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                  className="flex-grow-1"
                >
                  {/* Title */}
                  <h5
                    className="fw-bold mb-2"
                    style={{
                      fontSize: "clamp(14px, 3vw, 18px)",
                      lineHeight: "1.5",
                      fontFamily: "'Noto Sans Devanagari','Mangal',sans-serif",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.title_hi || article.title}
                  </h5>

                  {/* Summary (2 lines) */}
                  <p
                    className="text-muted mb-2"
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      fontFamily: "'Noto Sans Devanagari','Mangal',sans-serif",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#555",
                    }}
                  >
                    {summaryText}
                  </p>
                </Link>

                {/* Author + Date */}
                <div className="d-flex align-items-center mb-2">
                  <UserAvatar user={article.createdBy} size={25} />
                  <small className="ms-2 text-muted">
                    {article.createdBy?.name || "EMS News"} |{" "}
                    {formatFullDateTime(article.publishedAt)} {/* Helper फ़ंक्शन का उपयोग किया गया */}
                  </small>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-auto">
                    {tags.map((tagName, index) => (
                      <Link key={tagName + index} to={`/category/${tagName.toLowerCase()}`}>
                        <Button
                          variant="light"
                          size="sm"
                          className="py-0 px-2 border text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {tagName} &gt;
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
            <hr className="my-3" />
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default EntertainmentListPage;