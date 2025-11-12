

// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Image, Spinner, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { getTrending } from '../../Services/authApi';
// import UserAvatar from '../Main_NewsDetails/UserAvatar';

// const MultiNewsSection = () => {
//   const [newsList, setNewsList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await getTrending();
//         if (res?.success && Array.isArray(res.data)) {
//           const seenTitles = new Set();
//           const uniqueNews = res.data.filter(item => {
//             const titleHi = item.title_hi?.trim();
//             const titleEn = item.title_en?.trim();
//             const primaryTitle = titleHi || titleEn;
//             if (primaryTitle) {
//               if (seenTitles.has(primaryTitle)) return false;
//               seenTitles.add(primaryTitle);
//               return true;
//             }
//             return true;
//           });
//           setNewsList(uniqueNews);
//         } else {
//           setError('No trending news available');
//         }
//       } catch (err) {
//         setError(err.message || 'Failed to fetch news');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   const handleClick = (item) => {
//     const slug = item?.slug || item?.slug_en || item?._id;
//     navigate(`/news/${slug}`, { state: { relatedArticles: newsList } });
//   };

//   if (loading) return <Spinner animation="border" className="my-3" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (!newsList?.length) return <Alert variant="info">No news found</Alert>;

//   const NewsCard = ({ item }) => (
//     <div
//       onClick={() => handleClick(item)}
//       style={{
//         cursor: 'pointer',
//         border: '1px solid #ddd',
//         borderRadius: '6px',
//         padding: '8px',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '260px'
//       }}
//     >
//       {item.media?.[0]?.url && (
//         <Image
//           src={item.media[0].url}
//           alt={item.title_hi || item.title_en || 'news'}
//           style={{
//             width: '100%',
//             height: '140px',
//             objectFit: 'cover',
//             borderRadius: '6px'
//           }}
//           className="mb-2"
//         />
//       )}

//       <p
//         className="fw-bold mb-1"
//         style={{
//           flex: 1,
//           fontSize: '0.9rem',
//           lineHeight: '1.3',
//           overflow: 'hidden'
//         }}
//       >
//         {item.title_hi || item.title_en || 'No Title'}
//       </p>

//       <p className="small text-muted mb-0 d-flex align-items-center">
//         {item.createdBy && (
//           <UserAvatar user={item.createdBy} size={20} className="me-2" />
//         )}
//         {item.createdBy?.name || 'EMS News'} |{' '}
//         {item.createdAt
//           ? new Date(item.createdAt).toLocaleString('hi-IN', {
//               day: '2-digit',
//               month: '2-digit',
//               year: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//               hour12: true
//             })
//           : ''}
//       </p>

//       {(item.summary_hi || item.summary_en) && (
//         <p className="small text-muted mt-1 d-none d-md-block">
//           {(item.summary_hi || item.summary_en).slice(0, 80)}...
//         </p>
//       )}
//     </div>
//   );

//   const rowsPattern = [3, 4, 3, 4];
//   let startIndex = 0;
//   const totalNews = newsList.length;

//   return (
//     <Container className="my-4">
//       {Array.from({ length: Math.ceil(totalNews / Math.min(...rowsPattern)) }).map((_, outerIndex) => {
//         return rowsPattern.map((count, rowIndex) => {
//           if (startIndex >= totalNews) return null;

//           const rowItems = newsList.slice(startIndex, startIndex + count);
//           startIndex += rowItems.length;

//           if (rowItems.length === 0) return null;

//           const colSize = Math.floor(12 / rowItems.length);

//           return (
//             <Row className="mb-4 g-3" key={`${outerIndex}-${rowIndex}`}>
//               {rowItems.map((item) => (
//                 <Col
//                   key={item._id || item.slug || item.slug_en}
//                   xs={12}
//                   md={colSize}
//                   className="d-flex"
//                 >
//                   <NewsCard item={item} />
//                 </Col>
//               ))}
//             </Row>
//           );
//         });
//       })}
//     </Container>
//   );
// };

// export default MultiNewsSection;




// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { getTrending } from "../../Services/authApi";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const MultiNewsSection = () => {
//   const [newsList, setNewsList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // 🔹 Fetch Trending News
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await getTrending();
//         if (res?.success && Array.isArray(res.data)) {
//           const seenTitles = new Set();
//           const uniqueNews = res.data.filter((item) => {
//             const titleHi = item.title_hi?.trim();
//             const titleEn = item.title_en?.trim();
//             const primaryTitle = titleHi || titleEn;
//             if (primaryTitle) {
//               if (seenTitles.has(primaryTitle)) return false;
//               seenTitles.add(primaryTitle);
//               return true;
//             }
//             return true;
//           });
//           setNewsList(uniqueNews);
//         } else {
//           setError("No trending news available");
//         }
//       } catch (err) {
//         setError(err.message || "Failed to fetch news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   const handleClick = (item) => {
//     const slug = item?.slug || item?.slug_en || item?._id;
//     navigate(`/news/${slug}`, { state: { relatedArticles: newsList } });
//   };

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p>Loading...</p>
//       </div>
//     );
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (!newsList?.length) return <Alert variant="info">No news found</Alert>;

//   // 🔹 Card Component (with video autoplay thumbnail)
//   const NewsCard = ({ item }) => {
//     const media = item.media?.[0];
//     const mediaUrl = media?.url || "https://via.placeholder.com/400x225?text=No+Media";
//     const mediaType = media?.type || "image";

//     return (
//       <div
//         onClick={() => handleClick(item)}
//         style={{
//           cursor: "pointer",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           padding: "8px",
//           display: "flex",
//           flexDirection: "column",
//           height: "100%",
//           minHeight: "260px",
//           backgroundColor: "#fff",
//         }}
//       >
//         {/* 🔹 Media Section */}
//         <div
//           style={{
//             width: "100%",
//             height: "140px",
//             borderRadius: "6px",
//             overflow: "hidden",
//             backgroundColor: "#e0e0e0",
//             marginBottom: "8px",
//             position: "relative",
//           }}
//         >
//           {mediaType === "video" ? (
//             <video
//               src={mediaUrl}
//               autoPlay
//               muted
//               loop
//               playsInline
//               preload="metadata"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 display: "block",
//                 borderRadius: "6px",
//               }}
//               onError={(e) => {
//                 e.target.poster =
//                   "https://via.placeholder.com/400x225?text=Video+Error";
//               }}
//             />
//           ) : (
//             <Image
//               src={mediaUrl}
//               alt={item.title_hi || item.title_en || "news"}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 borderRadius: "6px",
//                 display: "block",
//               }}
//               onError={(e) => {
//                 e.target.src =
//                   "https://via.placeholder.com/400x225?text=Image+Error";
//               }}
//             />
//           )}
//         </div>

//         {/* 🔹 Title */}
//         <p
//           className="fw-bold mb-1"
//           style={{
//             flex: 1,
//             fontSize: "0.9rem",
//             lineHeight: "1.3",
//             overflow: "hidden",
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//           }}
//         >
//           {item.title_hi || item.title_en || "No Title"}
//         </p>

//         {/* 🔹 Author & Date */}
//         <p className="small text-muted mb-0 d-flex align-items-center">
//           {item.createdBy && (
//             <UserAvatar user={item.createdBy} size={20} className="me-2" />
//           )}
//           {item.createdBy?.name || "EMS News"} |{" "}
//           {item.createdAt
//             ? new Date(item.createdAt).toLocaleString("hi-IN", {
//                 day: "2-digit",
//                 month: "2-digit",
//                 year: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//               })
//             : ""}
//         </p>

//         {/* 🔹 Summary (2 line limit) */}
//         {(item.summary_hi || item.summary_en) && (
//           <p
//             className="small text-muted mt-1 d-none d-md-block"
//             style={{
//               display: "-webkit-box",
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: "vertical",
//               overflow: "hidden",
//             }}
//           >
//             {(item.summary_hi || item.summary_en).slice(0, 100)}...
//           </p>
//         )}
//       </div>
//     );
//   };

//   // 🔹 Custom layout pattern
//   const rowsPattern = [3, 4, 3, 4];
//   let startIndex = 0;
//   const totalNews = newsList.length;

//   return (
//     <Container className="my-4">
//       {Array.from({
//         length: Math.ceil(totalNews / Math.min(...rowsPattern)),
//       }).map((_, outerIndex) => {
//         return rowsPattern.map((count, rowIndex) => {
//           if (startIndex >= totalNews) return null;
//           const rowItems = newsList.slice(startIndex, startIndex + count);
//           startIndex += rowItems.length;
//           if (rowItems.length === 0) return null;
//           const colSize = Math.floor(12 / rowItems.length);

//           return (
//             <Row className="mb-4 g-3" key={`${outerIndex}-${rowIndex}`}>
//               {rowItems.map((item) => (
//                 <Col
//                   key={item._id || item.slug || item.slug_en}
//                   xs={12}
//                   md={colSize}
//                   className="d-flex"
//                 >
//                   <NewsCard item={item} />
//                 </Col>
//               ))}
//             </Row>
//           );
//         });
//       })}
//     </Container>
//   );
// };

// export default MultiNewsSection;




import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getTrending } from "../../Services/authApi";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

const MultiNewsSection = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getTrending();
        if (res?.success && Array.isArray(res.data)) {
          const seenTitles = new Set();
          const uniqueNews = res.data.filter((item) => {
            const titleHi = item.title_hi?.trim();
            const titleEn = item.title_en?.trim();
            const primaryTitle = titleHi || titleEn;
            if (primaryTitle) {
              if (seenTitles.has(primaryTitle)) return false;
              seenTitles.add(primaryTitle);
              return true;
            }
            return true;
          });
          setNewsList(uniqueNews);
        } else {
          setError("No trending news available");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleClick = (item) => {
    const slug = item?.slug || item?.slug_en || item?._id;
    navigate(`/news/${slug}`, { state: { relatedArticles: newsList } });
  };

  if (loading) return <Spinner animation="border" className="my-3" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!newsList?.length) return <Alert variant="info">No news found</Alert>;

  // 🧱 Single News Card
  const NewsCard = ({ item }) => {
    const mediaUrl = item.media?.[0]?.url || "";
    const isVideo = mediaUrl.endsWith(".mp4") || item.media?.[0]?.type === "video";

    return (
      <div
        onClick={() => handleClick(item)}
        style={{
          cursor: "pointer",
          border: "1px solid #ddd",
          borderRadius: "6px",
          padding: "8px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: "260px",
        }}
      >
        {mediaUrl ? (
          isVideo ? (
            <video
              src={mediaUrl}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              className="mb-2"
            />
          ) : (
            <Image
              src={mediaUrl}
              alt={item.title_hi || item.title_en || "news"}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              className="mb-2"
            />
          )
        ) : (
          <div
            style={{
              width: "100%",
              height: "140px",
              backgroundColor: "#eee",
              borderRadius: "6px",
              marginBottom: "8px",
            }}
          />
        )}

        <p
          className="fw-bold mb-1"
          style={{
            flex: 1,
            fontSize: "0.9rem",
            lineHeight: "1.3",
            overflow: "hidden",
          }}
        >
          {item.title_hi || item.title_en || "No Title"}
        </p>

        <p className="small text-muted mb-0 d-flex align-items-center">
          {item.createdBy && (
            <UserAvatar user={item.createdBy} size={20} className="me-2" />
          )}
          {item.createdBy?.name || "EMS News"} |{" "}
          {item.createdAt
            ? new Date(item.createdAt).toLocaleString("hi-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : ""}
        </p>

        {(item.summary_hi || item.summary_en) && (
          <p className="small text-muted mt-1 d-none d-md-block">
            {(item.summary_hi || item.summary_en).slice(0, 80)}...
          </p>
        )}
      </div>
    );
  };

  // 🧩 Pattern for how many cards per row
  const rowsPattern = [3, 4, 3, 4,];
  let startIndex = 0;
  const totalNews = newsList.length;

  return (
    <Container className="my-4">
      {Array.from({
        length: Math.ceil(totalNews / Math.min(...rowsPattern)),
      }).map((_, outerIndex) =>
        rowsPattern.map((count, rowIndex) => {
          if (startIndex >= totalNews) return null;

          const rowItems = newsList.slice(startIndex, startIndex + count);

          // ⚙️ अगर row पूरी नहीं है (1 या 2 news बची हैं) → skip कर दो
          if (rowItems.length < count) return null;

          startIndex += rowItems.length;
          const colSize = Math.floor(12 / rowItems.length);

          return (
            <Row className="mb-4 g-3" key={`${outerIndex}-${rowIndex}`}>
              {rowItems.map((item) => (
                <Col
                  key={item._id || item.slug || item.slug_en}
                  xs={12}
                  md={colSize}
                  className="d-flex"
                >
                  <NewsCard item={item} />
                </Col>
              ))}
            </Row>
          );
        })
      )}
    </Container>
  );
};

export default MultiNewsSection;
