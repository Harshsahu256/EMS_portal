

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaBolt } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Spinner, Alert, Row, Col, Image, Container } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const TrendingSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [allLatestNews, setAllLatestNews] = useState([]);

//   useEffect(() => {
//     const fetchLatestNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           setAllLatestNews(res.data);
//           setNewsData(res.data.slice(0, 6));
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

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading latest news...</p>
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

//   return (
//     <Container fluid className="mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 style={{ color: "#C00000" }} className="fw-bold m-0">
//           लेटेस्ट न्यूज़
//         </h5>
//         <Link
//           to="/category/Latest"
//           className="text-decoration-none fw-bold small text-primary"
//         >
//           और देखें
//         </Link>
//       </div>

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
//             className={`mb-3 ${index % 2 === 0 ? "pe-md-3" : "ps-md-3"}`}
//           >
//             <Link
//               to={`/news/${news._id}`}
//               state={{ relatedArticles: allLatestNews }}
//               style={linkStyle}
//               className="d-block h-100 position-relative"
//             >
//               <Row className="gx-3">
//                 <Col xs={4}>
//                   <Image
//                     src={news.media?.[0]?.url || "https://via.placeholder.com/120x80"}
//                     fluid
//                     rounded
//                     alt={news.title}
//                   />
//                 </Col>
//                 <Col xs={8}>
//                   <p className="text-danger small fw-bold mb-1">
//                     {news.category?.name || "General"}
//                   </p>
//                   <p className="fw-bold mb-1">{news.title}</p>
//                   <div className="d-flex align-items-center">
//                     <UserAvatar user={news.createdBy} size={30} />
//                     <small className="text-muted">
//                       {news.createdBy?.name || "EMS News"} |{" "}
//                       {new Date(news.createdAt).toLocaleString("hi-IN", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
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
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaBolt } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Spinner, Alert, Row, Col, Image, Container } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const TrendingSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [allLatestNews, setAllLatestNews] = useState([]);

//   useEffect(() => {
//     const fetchLatestNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           setAllLatestNews(res.data);
//           setNewsData(res.data.slice(0, 6));
//         } else setError("Failed to load news");
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLatestNews();
//   }, []);

//   if (loading) return <Spinner animation="border" className="my-4 d-block mx-auto" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (!newsData.length) return null;

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div className="d-flex align-items-center mb-3">
//         <div className="d-flex align-items-center flex-shrink-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2"></div>
//           <h5 className="fw-bold m-0">लेटेस्ट न्यूज़</h5>
//         </div>
//         <hr className="flex-grow-1 mx-3" style={{ borderTop: "2px solid #C00000", opacity: 1 }} />
//         <Link to="/category/Latest" className="text-decoration-none fw-bold small flex-shrink-0" style={{ color: "#2E6E9E" }}>
//           और देखें
//         </Link>
//       </div>

//       <div style={{ minHeight: "90px", backgroundColor: "#e9ecef" }} className="mb-3 rounded d-flex align-items-center justify-content-center text-muted">
//         Advertisement
//       </div>

//       <Row>
//         {newsData.map((news, index) => (
//           <Col key={news._id} xs={12} md={6} className={`mb-3 ${index % 2 === 0 ? "pe-md-3" : "ps-md-3"}`}>
//             <Link to={`/news/${news._id}`} state={{ relatedArticles: allLatestNews }} style={linkStyle} className="d-block h-100 position-relative">
//               <Row className="gx-3">
//                 <Col xs={4}>
//                   <Image src={news.media?.[0]?.url || "https://via.placeholder.com/120x80"} fluid rounded alt={news.title} />
//                 </Col>
//                 <Col xs={8}>
//                   <p className="text-danger small fw-bold mb-1">{news.category?.name || "General"}</p>
//                   <p className="fw-bold mb-1">{news.title}</p>
//                   <div className="d-flex align-items-center">
//                     <UserAvatar user={news.createdBy} size={30} />
//                     <small className="text-muted">
//                       {news.createdBy?.name || "EMS News"} |{" "}
//                       {new Date(news.createdAt).toLocaleString("hi-IN", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//               <span style={{ position: "absolute", top: "0.5rem", right: "0.5rem", color: "#C00000" }}><FaBolt /></span>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default TrendingSection;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaBolt } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Spinner, Alert, Row, Col, Image, Container } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const TrendingSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [allLatestNews, setAllLatestNews] = useState([]);

//   useEffect(() => {
//     const fetchLatestNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           setAllLatestNews(res.data);
//           setNewsData(res.data.slice(0, 6));
//         } else setError("Failed to load news");
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLatestNews();
//   }, []);

//   if (loading) return <Spinner animation="border" className="my-4 d-block mx-auto" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (!newsData.length) return null;

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   return (
//     <Container fluid className="mt-4">
//       {/* Section Header */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2"></div>
//           <h5 className="fw-bold m-0"> Trending News</h5>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//         <Link to="/category/Latest" className="text-decoration-none fw-bold small flex-shrink-0" style={{ color: "#2E6E9E" }}>
//           और देखें
//         </Link>
//       </div>

//       {/* Advertisement Placeholder */}
//       <div style={{ minHeight: "90px", backgroundColor: "#e9ecef" }} className="mb-3 rounded d-flex align-items-center justify-content-center text-muted">
//         Advertisement
//       </div>

//       <Row>
//         {newsData.map((news, index) => (
//           <Col key={news._id} xs={12} md={6} className={`mb-3 ${index % 2 === 0 ? "pe-md-2" : "ps-md-2"}`}>
//             <Link to={`/news/${news._id}`} state={{ relatedArticles: allLatestNews }} style={linkStyle} className="d-block h-100 position-relative">
//               <Row className="gx-2 gx-md-3 align-items-center">
//                 <Col xs={4} md={3}>
//                   <Image
//                     src={news.media?.[0]?.url || "https://via.placeholder.com/120x80"}
//                     fluid
//                     rounded
//                     alt={news.title}
//                   />
//                 </Col>
//                 <Col xs={8} md={9}>
//                   <p className="text-danger small fw-bold mb-1">{news.category?.name || "General"}</p>
//                   <p className="fw-bold mb-1">{news.title}</p>
//                   <div className="d-flex align-items-center flex-wrap">
//                     <UserAvatar user={news.createdBy} size={30} />
//                     <small className="text-muted ms-1">
//                       {news.createdBy?.name || "EMS News"} |{" "}
//                       {new Date(news.createdAt).toLocaleString("hi-IN", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//               <span style={{ position: "absolute", top: "0.5rem", right: "0.5rem", color: "#C00000" }}><FaBolt /></span>
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
import { allNews } from "../../Services/authApi"; // ✅ API function to fetch all news
import { Spinner, Alert, Row, Col, Image, Container } from "react-bootstrap";
import UserAvatar from "../Main_NewsDetails/UserAvatar"; // ✅ User avatar component

const TrendingSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allLatestNews, setAllLatestNews] = useState([]);

  // ✅ Unwanted categories to exclude (Horoscope etc.)
  const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await allNews(); // ✅ API call
        if (res?.success) {
          // ✅ Filter for only Breaking News & exclude unwanted categories
          const filteredData = res.data.filter((article) => {
            const cat = article?.category?.name?.toLowerCase();
            if (!cat) return false;
            if (HOROSCOPE_CATEGORY.includes(cat)) return false;
            return cat === "breaking news"; // ✅ Only Breaking News
          });

          setAllLatestNews(filteredData);
          setNewsData(filteredData.slice(0, 6)); // ✅ Top 6 news only
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

  // ✅ Loading state
  if (loading)
    return <Spinner animation="border" className="my-4 d-block mx-auto" />;

  // ✅ Error state
  if (error) return <Alert variant="danger">{error}</Alert>;

  // ✅ Empty news state
  if (!newsData.length) return null;

  const linkStyle = { textDecoration: "none", color: "inherit" };

  return (
    <Container fluid className="mt-4">
      {/* Section Header */}
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
          to="/related-news" // ✅ Route for "see more"
          state={{ relatedArticles: newsData }} // ✅ Passing current section news
          className="text-decoration-none fw-bold small flex-shrink-0"
          style={{ color: "#2E6E9E" }}
        >
          और देखें
        </Link>
      </div>

      {/* Advertisement Placeholder */}
      <div
        style={{ minHeight: "90px", backgroundColor: "#e9ecef" }}
        className="mb-3 rounded d-flex align-items-center justify-content-center text-muted"
      >
        Advertisement
      </div>

      <Row>
        {newsData.map((news, index) => (
          <Col
            key={news._id} // ✅ Using unique _id as fallback
            xs={12}
            md={6}
            className={`mb-3 ${index % 2 === 0 ? "pe-md-2" : "ps-md-2"}`}
          >
            <Link
              to={`/news/${news.slug_en || news._id}`} // ✅ Using slug_en if available, fallback _id
              state={{ relatedArticles: allLatestNews }} // ✅ Pass all latest news
              style={linkStyle}
              className="d-block h-100 position-relative"
            >
              <Row className="gx-2 gx-md-3 align-items-center">
                {/* News Image */}
                <Col xs={4} md={3}>
                  <Image
                    src={
                      news.media?.[0]?.url ||
                      "https://via.placeholder.com/120x80"
                    } // ✅ Updated media key according to response
                    fluid
                    rounded
                    alt={news.title_hi || news.title || ""}
                    style={{ height: "80px", objectFit: "cover", width: "100%" }}
                  />
                </Col>

                {/* News Details */}
                <Col xs={8} md={9}>
                  <p className="text-danger small fw-bold mb-1">
                    {news.category?.name || "General"} {/* ✅ category key updated */}
                  </p>
                  <p className="fw-bold mb-1">
                    {news.title_hi || news.title || ""} {/* ✅ title_hi key used */}
                  </p>
                  <div className="d-flex align-items-center flex-wrap">
                    <UserAvatar user={news.createdBy} size={30} /> {/* ✅ createdBy updated */}
                    <small className="text-muted ms-1">
                      {news.createdBy?.name || "EMS News"} |{" "}
                      {new Date(news.publishedAt).toLocaleString("hi-IN", {
                        day: "numeric",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      {/* ✅ createdAt updated */}
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
