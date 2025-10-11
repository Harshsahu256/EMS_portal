

// import React from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Image } from "react-bootstrap";
// import UserAvatar from "./UserAvatar";

// // ✅ Format date to Hindi locale
// const formatFullDateTime = (dateString) => {
//   if (!dateString) return "";
//   const options = {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Date(dateString).toLocaleString("hi-IN", options);
// };

// // ✅ Clean text for showing 2 lines
// const getTwoLinesCleanText = (text) => {
//   if (!text) return "";
//   const cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
//   const lines = cleanText.split(/[\r\n]+/);
//   const twoLines = lines.slice(0, 2).join(" ");
//   return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
// };

// const RelatedNews = ({ articles, currentArticleId }) => {
//   // ✅ Filter out current article
//   const filteredArticles = articles
//     ? articles.filter((article) => article && article._id !== currentArticleId)
//     : [];

//   if (filteredArticles.length === 0) return null;

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   return (
//     <div
//       className="bg-white p-3 p-md-4 shadow-sm mt-4"
//       style={{ border: "1px solid #eee", borderRadius: "8px" }}
//     >
//       <h3 className="fw-bold mb-4 border-bottom pb-2">इस श्रेणी में और भी खबरें</h3>

//       {filteredArticles.map((article) => (
//         <React.Fragment key={article.slug_en || article._id}> {/* ✅ slug fallback to _id */}
//           <Link
//             to={`/news/${article.slug_en || article._id}`} // ✅ Navigation using slug_en
//             state={{ relatedArticles: articles }} // ✅ Passing related articles
//             style={linkStyle}
//           >
//             <Row className="mb-3 g-3 align-items-start">
//               <Col xs={4} sm={3}>
//                 <Image
//                   src={
//                     article.media?.[0]?.url || "https://via.placeholder.com/150x90"
//                   } // ✅ media key updated
//                   alt={article.title_hi || article.title_en || "News"} // ✅ title in Hindi fallback English
//                   fluid
//                   rounded
//                   style={{ width: "100%", maxHeight: "90px", objectFit: "cover" }}
//                 />
//               </Col>

//               <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
//                 <h6 className="fw-bold mb-1" style={{ fontSize: "0.95rem" }}>
//                   {article.title_hi || article.title_en || ""} {/* ✅ title_hi fallback title_en */}
//                 </h6>

//                 <p
//                   className="mb-1 text-muted"
//                   style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
//                 >
//                   {getTwoLinesCleanText(article.content_hi || article.content_en || "")} {/* ✅ content_hi fallback content_en */}
//                 </p>

//                 <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//                   <UserAvatar
//                     user={article.createdBy}
//                     size={25}
//                     src={
//                       article.createdBy?.profileImage || // ✅ profileImage from response
//                       "https://via.placeholder.com/40x40?text=U"
//                     }
//                   />
//                   <small className="text-muted" style={{ fontSize: "0.8rem" }}>
//                     {article.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(article.publishedAt || article.createdAt)} {/* ✅ publishedAt fallback createdAt */}
//                   </small>
//                 </div>
//               </Col>
//             </Row>
//           </Link>
//           <hr className="my-2" />
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default RelatedNews;


// import React from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Image } from "react-bootstrap";
// import UserAvatar from "./UserAvatar";

// // Format date to Hindi locale
// const formatFullDateTime = (dateString) => {
//   if (!dateString) return "";
//   const options = {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Date(dateString).toLocaleString("hi-IN", options);
// };

// // Clean text for showing 2 lines
// const getTwoLinesCleanText = (text) => {
//   if (!text) return "";
//   const cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
//   const lines = cleanText.split(/[\r\n]+/);
//   const twoLines = lines.slice(0, 2).join(" ");
//   return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
// };

// const RelatedNews = ({ articles, currentArticleId }) => {
//   // Filter out current article
//   const filteredArticles = articles
//     ? articles.filter((article) => article && article._id !== currentArticleId)
//     : [];

//   if (filteredArticles.length === 0) return null;

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   return (
//     <div
//       className="bg-white p-3 p-md-4 shadow-sm mt-4"
//       style={{ border: "1px solid #eee", borderRadius: "8px" }}
//     >
//       <h3 className="fw-bold mb-4 border-bottom pb-2">इस श्रेणी में और भी खबरें</h3>

//       {filteredArticles.map((article) => (
//         <React.Fragment key={article.slug_en || article._id}> {/* slug fallback to _id */}
//           <Link
//             to={`/news/${article.slug_en || article._id}`} // Navigation using slug_en
//             state={{ relatedArticles: articles }}
//             style={linkStyle}
//           >
//             <Row className="mb-3 g-3 align-items-start">
//               <Col xs={4} sm={3}>
//                 <Image
//                   src={
//                     article.media?.[0]?.url || "https://via.placeholder.com/150x90"
//                   }
//                   alt={article.title_hi || article.title_en || "News"}
//                   fluid
//                   rounded
//                   style={{ width: "100%", maxHeight: "90px", objectFit: "cover" }}
//                 />
//               </Col>

//               <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
//                 <h6 className="fw-bold mb-1" style={{ fontSize: "0.95rem" }}>
//                   {article.title_hi || article.title_en || ""}
//                 </h6>

//                 <p
//                   className="mb-1 text-muted"
//                   style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
//                 >
//                   {getTwoLinesCleanText(article.content_hi || article.content_en || "")}
//                 </p>

//                 <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//                   <UserAvatar
//                     user={article.createdBy}
//                     size={25}
//                     src={
//                       article.createdBy?.profileImage ||
//                       "https://via.placeholder.com/40x40?text=U"
//                     }
//                   />
//                   <small className="text-muted" style={{ fontSize: "0.8rem" }}>
//                     {article.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(article.publishedAt || article.createdAt)}
//                   </small>
//                 </div>

//                 {/* Optional: Likes & Comments count (from updated schema) */}
               
//               </Col>
//             </Row>
//           </Link>
//           <hr className="my-2" />
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default RelatedNews;


import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import UserAvatar from "./UserAvatar";

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

// Clean text for showing 2 lines (this function is for description, remains unchanged)
const getTwoLinesCleanText = (text) => {
  if (!text) return "";
  const cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const lines = cleanText.split(/[\r\n]+/);
  const twoLines = lines.slice(0, 2).join(" ");
  return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
};

const RelatedNews = ({ articles, currentArticleId }) => {
  // Filter out current article
  const filteredArticles = articles
    ? articles.filter((article) => article && article._id !== currentArticleId)
    : [];

  if (filteredArticles.length === 0) return null;

  const linkStyle = { textDecoration: "none", color: "inherit" };

  return (
    <div
      className="bg-white p-3 p-md-4 shadow-sm mt-4"
      style={{ border: "1px solid #eee", borderRadius: "8px" }}
    >
      {/* Custom styles for 2-line title clamping (universal) */}
      <style>
        {`
        .title-clamp-2-lines {
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Limit to 2 lines for titles */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        /* Description is hidden on extra small screens using Bootstrap's d-none d-sm-block class directly on the element */
        `}
      </style>

      <h3 className="fw-bold mb-4 border-bottom pb-2">इस श्रेणी में और भी खबरें</h3>

      {filteredArticles.map((article) => (
        <React.Fragment key={article.slug_en || article._id}>
          <Link
            to={`/news/${article.slug_en || article._id}`} // Navigation using slug_en
            state={{ relatedArticles: articles }}
            style={linkStyle}
          >
            <Row className="mb-3 g-3 align-items-start">
              <Col xs={4} sm={3}>
                <Image
                  src={
                    article.media?.[0]?.url || "https://via.placeholder.com/150x90"
                  }
                  alt={article.title_hi || article.title_en || "News"}
                  fluid
                  rounded
                  style={{ width: "100%", maxHeight: "90px", objectFit: "cover" }}
                />
              </Col>

              <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
                <h6
                  className="fw-bold mb-1 title-clamp-2-lines" // Apply universal 2-line clamp
                  style={{ fontSize: "0.95rem" }}
                >
                  {article.title_hi || article.title_en || ""}
                </h6>

                {/* Hide description on extra small screens (xs) and show on small (sm) and up */}
                <p
                  className="mb-1 text-muted d-none d-sm-block"
                  style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
                >
                  {getTwoLinesCleanText(article.content_hi || article.content_en || "")}
                </p>

                <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
                  <UserAvatar
                    user={article.createdBy}
                    size={25}
                    src={
                      article.createdBy?.profileImage ||
                      "https://via.placeholder.com/40x40?text=U"
                    }
                  />
                  <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {article.createdBy?.name || "EMS News"} |{" "}
                    {formatFullDateTime(article.publishedAt || article.createdAt)}
                  </small>
                </div>
              </Col>
            </Row>
          </Link>
          <hr className="my-2" />
        </React.Fragment>
      ))}
    </div>
  );
};

export default RelatedNews;