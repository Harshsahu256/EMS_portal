



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaBolt } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Spinner, Alert, Row, Col, Image, Container } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // Media Renderer Helper Component (जैसा कि RelatedNews, TopStory और HindiNewsSection में उपयोग किया गया है)
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


// const TrendingSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [allLatestNews, setAllLatestNews] = useState([]);

//   // ✅ Unwanted categories to exclude (Horoscope etc.)
//   const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

//   useEffect(() => {
//     const fetchLatestNews = async () => {
//       try {
//         const res = await allNews(); // ✅ API call
//         if (res?.success) {
//           // ✅ Filter for only Breaking News & exclude unwanted categories
//           const filteredData = res.data.filter((article) => {
//             const cat = article?.category?.name?.toLowerCase();
//             if (!cat) return false;
//             if (HOROSCOPE_CATEGORY.includes(cat)) return false;
//             return cat === "breaking news"; // ✅ Only Breaking News
//           });

//           setAllLatestNews(filteredData);
//           setNewsData(filteredData.slice(0, 6)); // ✅ Top 6 news only
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLatestNews();
//   }, []);

//   // ✅ Loading state
//   if (loading)
//     return <Spinner animation="border" className="my-4 d-block mx-auto" />;

//   // ✅ Error state
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   // ✅ Empty news state
//   if (!newsData.length) return null;

//   const linkStyle = { textDecoration: "none", color: "inherit" };

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

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div
//             style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }}
//             className="me-2"
//           ></div>
//           <h5 className="fw-bold m-0">Trending News</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link
//           to="/related-news"
//           state={{ relatedArticles: newsData }}
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: "#2E6E9E" }}
//         >
//           और देखें
//         </Link>
//       </div>

//       {/* Advertisement Placeholder */}
//       <div
//         style={{ minHeight: "90px", backgroundColor: "#e9ecef" }}
//         className="mb-3 rounded d-flex align-items-center justify-content-center text-muted"
//       >
//         Advertisement
//       </div>

//       <Row>
//         {newsData.map((news, index) => (
//           <Col
//             key={news._id}
//             xs={12}
//             md={6}
//             className={`mb-3 ${index % 2 === 0 ? "pe-md-2" : "ps-md-2"}`}
//           >
//             <Link
//               to={`/news/${news.slug_en || news._id}`}
//               state={{ relatedArticles: allLatestNews }}
//               style={linkStyle}
//               className="d-block h-100 position-relative"
//             >
//               <Row className="gx-2 gx-md-3 align-items-center">
//                 {/* News Media (Image or Video) */}
//                 <Col xs={4} md={3}>
//                   <MediaRenderer
//                     media={news.media}
//                     alt={news.title_hi || news.title || ""}
//                     width="100%"
//                     height="90px" // फिक्स्ड हाइट 90px
//                     objectFit="cover" // कंटेनर को पूरी तरह भरें
//                     borderRadius="8px" // 8px का borderRadius
//                   />
//                 </Col>

//                 {/* News Details */}
//                 <Col xs={8} md={9}>
//                   <p className="text-danger small fw-bold mb-1">
//                     {news.category?.name || "General"}
//                   </p>
//                   <p className="fw-bold mb-1">
//                     {news.title_hi || news.title || ""}
//                   </p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={news.createdBy} size={30} />
//                     <small className="text-muted ms-1">
//                       {news.createdBy?.name || "EMS News"} |{" "}
//                       {formatFullDateTime(news.publishedAt)}{" "} {/* Updated to use formatFullDateTime */}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>

//               {/* Trending Icon */}
//               <span
//                 style={{
//                   position: "absolute",
//                   top: "0.5rem",
//                   right: "0.5rem",
//                   color: "#C00000",
//                 }}
//               >
//                 <FaBolt />
//               </span>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default TrendingSection;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBolt } from "react-icons/fa";
import { allNews } from "../../Services/authApi";
import { Spinner, Alert, Row, Col, Image, Container } from "react-bootstrap";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

// ✅ Media Renderer Component
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

const TrendingSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allLatestNews, setAllLatestNews] = useState([]);

  const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await allNews();
        if (res?.success) {
          const filteredData = res.data.filter((article) => {
            const cat = article?.category?.name?.toLowerCase();
            if (!cat) return false;
            if (HOROSCOPE_CATEGORY.includes(cat)) return false;
            return cat === "breaking news";
          });

          setAllLatestNews(filteredData);
          setNewsData(filteredData.slice(0, 6));
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestNews();
  }, []);

  if (loading)
    return <Spinner animation="border" className="my-4 d-block mx-auto" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!newsData.length) return null;

  const linkStyle = { textDecoration: "none", color: "inherit" };

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

  return (
    <Container fluid className="mt-4">
      {/* ✅ Section Header */}
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div
            style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }}
            className="me-2"
          ></div>
          <h5 className="fw-bold m-0">Trending News</h5>
        </div>
        <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
        <Link
          to="/related-news"
          state={{ relatedArticles: newsData }}
          className="text-decoration-none fw-bold small flex-shrink-0"
          style={{ color: "#2E6E9E" }}
        >
          और देखें
        </Link>
      </div>

      {/* ✅ Advertisement Placeholder */}
      <div
        style={{ minHeight: "90px", backgroundColor: "#e9ecef" }}
        className="mb-3 rounded d-flex align-items-center justify-content-center text-muted"
      >
        Advertisement
      </div>

      {/* ✅ News Cards with Conditional Gray Divider */}
      <Row>
        {newsData.map((news, index) => (
          <Col
            key={news._id}
            xs={12}
            md={6}
            className={`${index % 2 === 0 ? "pe-md-2" : "ps-md-2"} mb-3`}
            style={{
              paddingBottom: "12px",
              borderBottom:
                index !== newsData.length - 1 ? "1px solid #d3d3d3" : "none", // ✅ last ke baad line nahi
            }}
          >
            <Link
              to={`/news/${news.slug_en || news._id}`}
              state={{ relatedArticles: allLatestNews }}
              style={linkStyle}
              className="d-block h-100 position-relative"
            >
              <Row className="gx-2 gx-md-3 align-items-center">
                {/* Media */}
                <Col xs={4} md={3}>
                  <MediaRenderer
                    media={news.media}
                    alt={news.title_hi || news.title || ""}
                    width="100%"
                    height="90px"
                    objectFit="cover"
                    borderRadius="8px"
                  />
                </Col>

                {/* Details */}
                <Col xs={8} md={9}>
                  <p className="text-danger small fw-bold mb-1">
                    {news.category?.name || "General"}
                  </p>
                  <p className="fw-bold mb-1">
                    {news.title_hi || news.title || ""}
                  </p>
                  <div className="d-flex align-items-center flex-wrap">
                    <UserAvatar user={news.createdBy} size={30} />
                    <small className="text-muted ms-1">
                      {news.createdBy?.name || "EMS News"} |{" "}
                      {formatFullDateTime(news.publishedAt)}
                    </small>
                  </div>
                </Col>
              </Row>

              {/* Trending Icon */}
              <span
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  color: "#C00000",
                }}
              >
                <FaBolt />
              </span>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TrendingSection;
