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
//           // Remove duplicates using _id or slug
//           const seen = new Set();
//           const uniqueNews = res.data.filter(item => {
//             const id = item._id || item.slug || item.slug_en;
//             if (seen.has(id)) return false;
//             seen.add(id);
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
//   if (error) return <Alert variant="danger" className="my-3">{error}</Alert>;
//   if (!newsList?.length) return <Alert variant="info" className="my-3">No news found</Alert>;

//   const NewsCard = ({ item }) => (
//     <div
//       onClick={() => handleClick(item)}
//       style={{
//         cursor: 'pointer',
//         border: '1px solid #ddd', 
//         borderRadius: '5px',
//         padding: '8px',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       {item.media?.[0]?.url && (
//         <Image
//           src={item.media[0].url}
//           alt={item.title_hi || item.title_en || 'news'}
//           style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
//           className="mb-2"
//         />
//       )}
//       <p className="fw-bold mb-1" style={{ flex: 1 }}>{item.title_hi || item.title_en || 'No Title'}</p>
//       <p className="small text-muted mb-0 d-flex align-items-center">
//         {item.createdBy && <UserAvatar user={item.createdBy} size={20} className="me-2" />}
//         {item.createdBy?.name || 'EMS News'} |{' '}
//         {item.createdAt ? new Date(item.createdAt).toLocaleDateString('hi-IN') : ''}
//       </p>
//       {item.summary_hi || item.summary_en ? (
//         <p className="small text-muted mt-1">{(item.summary_hi || item.summary_en).slice(0, 80)}...</p>
//       ) : null}
//     </div>
//   );

//   // Row pattern repeatable
//   const rowsPattern = [2, 3, 4, 3, 2];
//   let startIndex = 0;
//   const totalNews = newsList.length;

//   return (
//     <Container className="my-4">
//       <h5 className="mb-3 fw-bold">Trending News</h5>

//       {Array.from({ length: Math.ceil(totalNews / Math.min(...rowsPattern)) }).map((_, outerIndex) => {
//         return rowsPattern.map((count, rowIndex) => {
//           if (startIndex >= totalNews) return null;

//           const rowItems = newsList.slice(startIndex, startIndex + count);
//           startIndex += rowItems.length;

//           const colSize = Math.floor(12 / rowItems.length);

//           return (
//             <Row className="mb-4" key={`${outerIndex}-${rowIndex}`}>
//               {rowItems.map((item) => (
//                 <Col key={item._id || item.slug || item.slug_en} xs={12} md={colSize} className="d-flex">
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





import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getTrending } from '../../Services/authApi';
import UserAvatar from '../Main_NewsDetails/UserAvatar';

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
          // ==========================================================
          // डुप्लिकेट हटाने के लिए अपडेटेड लॉजिक (शीर्षक के आधार पर)
          const seenTitles = new Set();
          const uniqueNews = res.data.filter(item => {
            const titleHi = item.title_hi?.trim();
            const titleEn = item.title_en?.trim();

            // प्राथमिकता: हिंदी शीर्षक, फिर अंग्रेजी शीर्षक
            const primaryTitle = titleHi || titleEn;

            if (primaryTitle) {
              if (seenTitles.has(primaryTitle)) {
                return false; // यह शीर्षक पहले ही देखा जा चुका है, इसे हटा दें
              }
              seenTitles.add(primaryTitle);
              return true; // यह एक अद्वितीय शीर्षक है
            }
            // यदि कोई शीर्षक नहीं है, तो उसे अद्वितीय मान लें (यह आदर्श नहीं है, लेकिन फ़िल्टरिंग से बचने के लिए)
            // आप चाहें तो बिना शीर्षक वाले आइटम को भी फ़िल्टर कर सकते हैं
            return true;
          });
          setNewsList(uniqueNews);
          // ==========================================================
        } else {
          setError('No trending news available');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch news');
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
  if (error) return <Alert variant="danger" className="my-3">{error}</Alert>;
  if (!newsList?.length) return <Alert variant="info" className="my-3">No news found</Alert>;

  const NewsCard = ({ item }) => (
    <div
      onClick={() => handleClick(item)}
      style={{
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {item.media?.[0]?.url && (
        <Image
          src={item.media[0].url}
          alt={item.title_hi || item.title_en || 'news'}
          style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
          className="mb-2"
        />
      )}
      <p className="fw-bold mb-1" style={{ flex: 1 }}>{item.title_hi || item.title_en || 'No Title'}</p>
    <p className="small text-muted mb-0 d-flex align-items-center">
  {item.createdBy && (
    <UserAvatar user={item.createdBy} size={20} className="me-2" />
  )}
  {item.createdBy?.name || 'EMS News'} |{' '}
  {item.createdAt
    ? new Date(item.createdAt).toLocaleString('hi-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : ''}
</p>

      {item.summary_hi || item.summary_en ? (
        <p className="small text-muted mt-1">{(item.summary_hi || item.summary_en).slice(0, 80)}...</p>
      ) : null}
    </div>
  );

  // Row pattern repeatable
  const rowsPattern = [2, 3, 4, 3, 2];
  let startIndex = 0;
  const totalNews = newsList.length;

  return (
    <Container className="my-4">
      <h5 className="mb-3 fw-bold">Trending News</h5>

      {Array.from({ length: Math.ceil(totalNews / Math.min(...rowsPattern)) }).map((_, outerIndex) => {
        return rowsPattern.map((count, rowIndex) => {
          if (startIndex >= totalNews) return null;

          const rowItems = newsList.slice(startIndex, startIndex + count);
          startIndex += rowItems.length;

          // यदि rowItems.length 0 है, तो इस पंक्ति को रेंडर न करें
          if (rowItems.length === 0) return null;

          const colSize = Math.floor(12 / rowItems.length); // सुनिश्चित करें कि rowItems.length 0 न हो

          return (
            <Row className="mb-4" key={`${outerIndex}-${rowIndex}`}>
              {rowItems.map((item) => (
                <Col key={item._id || item.slug || item.slug_en} xs={12} md={colSize} className="d-flex">
                  <NewsCard item={item} />
                </Col>
              ))}
            </Row>
          );
        });
      })}
    </Container>
  );
};

export default MultiNewsSection;