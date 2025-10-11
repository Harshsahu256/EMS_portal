// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Row, Col, Image } from 'react-bootstrap';
// import UserAvatar from '../Main_NewsDetails/UserAvatar';

// const formatFullDateTime = (dateString) => {
//   if (!dateString) return '';
//   const options = {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   };
//   return new Date(dateString).toLocaleString("hi-IN", options);
// };

// const getTwoLines = (text) => {
//   if (!text) return '';
//   const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
//   return clean.length > 150 ? clean.substring(0,147) + '...' : clean;
// };

// const RelatedNewsList = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const allArticles = location.state?.relatedArticles || [];

//   useEffect(() => { 
//     window.scrollTo({ top: 0, behavior: 'smooth' }); 
//   }, []);

//   if (!allArticles.length) 
//     return <p className="text-center mt-4">कोई समाचार उपलब्ध नहीं है।</p>;

//   return (
//     <div className="container my-4">
//       <h3 className="fw-bold mb-4 border-bottom pb-2">इस श्रेणी में और भी खबरें</h3>

//       {allArticles.map(article => {
//         const related = allArticles.filter(a => a._id !== article._id);

//         return (
//           <div key={article._id} className="mb-4">
            
//             {/* Main News Card */}
//             <Row 
//               className="mb-3 g-3 align-items-start"
//               style={{ cursor: 'pointer' }}
//               onClick={() => navigate(`/news/${article._id}`, { state: { relatedArticles: related } })}
//             >
//               <Col xs={4} sm={3}>
//                 <Image
//                   src={article.media?.[0]?.url || 'https://via.placeholder.com/150x90'}
//                   alt={article.title}
//                   fluid
//                   rounded
//                   style={{ width: '100%', maxHeight: '90px', objectFit: 'cover' }}
//                 />
//               </Col>

//               <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
//                 <h6 className="fw-bold mb-1">{article.title}</h6>
//                 <p className="mb-1 text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.3rem' }}>
//                   {getTwoLines(article.content || article.headlineText)}
//                 </p>
//                 <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//                   <UserAvatar user={article.createdBy} size={25} />
//                   <small className="text-muted" style={{ fontSize: '0.8rem' }}>
//                     {article.createdBy?.name || "EMS News"} | {formatFullDateTime(article.createdAt)}
//                   </small>
//                 </div>
//               </Col>
//             </Row>

//             {/* Related News (same layout as main) */}
//             {related.length > 0 && (
//               <div className="ms-3 mt-2">
//                 {related.map(r => (
//                   <Row 
//                     key={r._id} 
//                     className="mb-2 g-2 align-items-start"
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => navigate(`/news/${r._id}`, { state: { relatedArticles: related } })}
//                   >
//                     <Col xs={4} sm={3}>
//                       <Image
//                         src={r.media?.[0]?.url || 'https://via.placeholder.com/150x90'}
//                         alt={r.title}
//                         fluid
//                         rounded
//                         style={{ width: '100%', maxHeight: '90px', objectFit: 'cover' }}
//                       />
//                     </Col>
//                     <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
//                       <h6 className="fw-bold mb-1">{r.title}</h6>
//                       <p className="mb-1 text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.3rem' }}>
//                         {getTwoLines(r.content || r.headlineText)}
//                       </p>
//                       <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//                         <UserAvatar user={r.createdBy} size={22} />
//                         <small className="text-muted" style={{ fontSize: '0.75rem' }}>
//                           {r.createdBy?.name || "EMS News"} | {formatFullDateTime(r.createdAt)}
//                         </small>
//                       </div>
//                     </Col>
//                   </Row>
//                 ))}
//               </div>
//             )}

//             <hr />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default RelatedNewsList;


// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Row, Col, Image } from 'react-bootstrap';
// import UserAvatar from '../Main_NewsDetails/UserAvatar';

// const formatFullDateTime = (dateString) => {
//   if (!dateString) return '';
//   const options = {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   };
//   return new Date(dateString).toLocaleString("hi-IN", options);
// };

// const getTwoLines = (text) => {
//   if (!text) return '';
//   const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
//   return clean.length > 150 ? clean.substring(0, 147) + '...' : clean;
// };

// const RelatedNewsList = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const allArticles = location.state?.relatedArticles || [];

//   useEffect(() => { 
//     window.scrollTo({ top: 0, behavior: 'smooth' }); 
//   }, []);

//   if (!allArticles.length) 
//     return <p className="text-center mt-4">कोई समाचार उपलब्ध नहीं है।</p>;

//   return (
//     <div className="container my-4">
//       <h3 className="fw-bold mb-4 border-bottom pb-2">
//         इस श्रेणी में और भी खबरें
//       </h3>

//       {allArticles.map(article => (
//         <Row 
//           key={article._id}
//           className="mb-4 g-3 align-items-start"
//           style={{ cursor: 'pointer' }}
//           onClick={() => navigate(`/news/${article._id}`, { state: { relatedArticles: allArticles } })}
//         >
//           <Col xs={4} sm={3}>
//             <Image
//               src={article.media?.[0]?.url || 'https://via.placeholder.com/150x90'}
//               alt={article.title}
//               fluid
//               rounded
//               style={{ width: '100%', maxHeight: '90px', objectFit: 'cover' }}
//             />
//           </Col>

//           <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
//             <h6 className="fw-bold mb-1">{article.title}</h6>
//             <p className="mb-1 text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.3rem' }}>
//               {getTwoLines(article.content || article.headlineText)}
//             </p>
//             <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//               <UserAvatar user={article.createdBy} size={25} />
//               <small className="text-muted" style={{ fontSize: '0.8rem' }}>
//                 {article.createdBy?.name || "EMS News"} | {formatFullDateTime(article.createdAt)}
//               </small>
//             </div>
//           </Col>
//           <hr className="mt-3" />
//         </Row>
//       ))}
//     </div>
//   );
// };

// export default RelatedNewsList;



// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Row, Col, Image } from 'react-bootstrap';
// import UserAvatar from '../Main_NewsDetails/UserAvatar';

// // ✅ Format date in Hindi
// const formatFullDateTime = (dateString) => {
//   if (!dateString) return '';
//   const options = {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   };
//   return new Date(dateString).toLocaleString("hi-IN", options); // ✅ API key: createdAt
// };

// // ✅ Limit text to 2 lines (~150 chars)
// const getTwoLines = (text) => {
//   if (!text) return '';
//   const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
//   return clean.length > 150 ? clean.substring(0, 147) + '...' : clean;
// };

// const RelatedNewsList = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const allArticles = location.state?.relatedArticles || [];

//   useEffect(() => { 
//     window.scrollTo({ top: 0, behavior: 'smooth' }); 
//   }, []);

//   if (!allArticles.length) 
//     return <p className="text-center mt-4">कोई समाचार उपलब्ध नहीं है।</p>;

//   return (
//     <div className="container my-4">
//       <h3 className="fw-bold mb-4 border-bottom pb-2">
//         इस श्रेणी में और भी खबरें
//       </h3>

//       {allArticles.map(article => (
//         <Row 
//           key={article._id} // ✅ API key: _id fallback
//           className="mb-4 g-3 align-items-start"
//           style={{ cursor: 'pointer' }}
//           // ✅ Slug navigation with fallback
//           onClick={() =>
//             navigate(`/news/${article.slug_en || article._id}`, {
//               state: { relatedArticles: allArticles }
//             })
//           }
//         >
//           <Col xs={4} sm={3}>
//             <Image
//               src={
//                 article.media?.[0]?.url || 'https://via.placeholder.com/150x90' // ✅ API key: media[0].url with fallback
//               }
//               alt={article.title_hi || article.title_en} // ✅ API key: title_hi fallback title_en
//               fluid
//               rounded
//               style={{ width: '100%', maxHeight: '90px', objectFit: 'cover' }}
//             />
//           </Col>

//           <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
//             <h6 className="fw-bold mb-1">
//               {article.title_hi || article.title_en} {/* ✅ API key: title_hi fallback title_en */}
//             </h6>
//             <p className="mb-1 text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.3rem' }}>
//               {getTwoLines(article.summary_hi || article.summary_en || article.content_hi || article.content_en)} 
//               {/* ✅ API key: summary_hi fallback summary_en, content_hi, content_en */}
//             </p>
//             <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//               <UserAvatar user={article.createdBy} size={25} /> {/* ✅ API key: createdBy */}
//               <small className="text-muted" style={{ fontSize: '0.8rem' }}>
//                 {article.createdBy?.name || "EMS News"} | {formatFullDateTime(article.createdAt)} {/* ✅ API key: createdAt */}
//               </small>
//             </div>
//           </Col>
//           <hr className="mt-3" />
//         </Row>
//       ))}
//     </div>
//   );
// };

// export default RelatedNewsList;




// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Row, Col, Image } from 'react-bootstrap';
// import UserAvatar from '../Main_NewsDetails/UserAvatar';

// // Format date in Hindi
// const formatFullDateTime = (dateString) => {
//   if (!dateString) return '';
//   const options = {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   };
//   return new Date(dateString).toLocaleString("hi-IN", options);
// };

// // Limit text to ~150 chars
// const getTwoLines = (text) => {
//   if (!text) return '';
//   const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
//   return clean.length > 150 ? clean.substring(0, 147) + '...' : clean;
// };

// const RelatedNewsList = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const allArticles = location.state?.relatedArticles || [];

//   useEffect(() => { 
//     window.scrollTo({ top: 0, behavior: 'smooth' }); 
//   }, []);

//   if (!allArticles.length) 
//     return <p className="text-center mt-4">कोई समाचार उपलब्ध नहीं है।</p>;

//   return (
//     <div className="container my-4">
//       <h3 className="fw-bold mb-4 border-bottom pb-2">
//         इस श्रेणी में और भी खबरें
//       </h3>

//       {allArticles.map(article => (
//         <Row 
//           key={article._id} // ✅ _id
//           className="mb-4 g-3 align-items-start"
//           style={{ cursor: 'pointer' }}
//           onClick={() =>
//             navigate(`/news/${article.slug_en || article._id}`, {
//               state: { relatedArticles: allArticles }
//             })
//           }
//         >
//           <Col xs={4} sm={3}>
//             <Image
//               src={article.media?.[0]?.url || 'https://via.placeholder.com/150x90'} // ✅ media[0].url
//               alt={article.title_hi || article.title_en} // ✅ title_hi fallback title_en
//               fluid
//               rounded
//               style={{ width: '100%', maxHeight: '90px', objectFit: 'cover' }}
//             />
//           </Col>

//           <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
//             <h6 className="fw-bold mb-1">
//               {article.title_hi || article.title_en} {/* ✅ title_hi fallback title_en */}
//             </h6>
//             <p className="mb-1 text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.3rem' }}>
//               {getTwoLines(
//                 article.summary_hi || article.summary_en || article.content_hi || article.content_en
//               )} 
//             </p>
//             <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//               <UserAvatar 
//                 user={article.createdBy} 
//                 size={25} 
//                 src={article.createdBy?.profileImage || 'https://via.placeholder.com/40x40?text=U'} 
//               /> 
//               <small className="text-muted" style={{ fontSize: '0.8rem' }}>
//                 {article.createdBy?.name || "EMS News"} | {formatFullDateTime(article.publishedAt || article.createdAt)}
//               </small>
//             </div>
//           </Col>
//           <hr className="mt-3" />
//         </Row>
//       ))}
//     </div>
//   );
// };

// export default RelatedNewsList;
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import UserAvatar from '../Main_NewsDetails/UserAvatar';

// Format date in Hindi
const formatFullDateTime = (dateString) => {
  if (!dateString) return '';
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleString("hi-IN", options);
};

// Limit text to ~150 chars
const getTwoLines = (text) => {
  if (!text) return '';
  const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return clean.length > 150 ? clean.substring(0, 147) + '...' : clean;
};

const RelatedNewsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const allArticles = location.state?.relatedArticles || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!allArticles.length)
    return <p className="text-center mt-4">कोई समाचार उपलब्ध नहीं है।</p>;

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-4 border-bottom pb-2">
        इस श्रेणी में और भी खबरें
      </h3>

      {allArticles.map(article => (
        <Row
          key={article._id}
          className="mb-4 g-3 align-items-start"
          style={{ cursor: 'pointer' }}
          onClick={() =>
            navigate(`/news/${article.slug_en || article._id}`, {
              state: { relatedArticles: allArticles }
            })
          }
        >
          <Col xs={4} sm={3}>
            <Image
              src={article.media?.[0]?.url || 'https://via.placeholder.com/150x90'}
              alt={article.title_hi || article.title_en}
              fluid
              rounded
              style={{ width: '100%', maxHeight: '90px', objectFit: 'cover' }}
            />
          </Col>

          <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
            <h6 className="fw-bold mb-1 text-wrap">
              {article.title_hi || article.title_en}
            </h6>
            <p className="mb-1 text-muted text-wrap" style={{ fontSize: '0.85rem', lineHeight: '1.3rem' }}>
              {getTwoLines(
                article.summary_hi || article.summary_en || article.content_hi || article.content_en
              )}
            </p>
            <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
              <UserAvatar
                user={article.createdBy}
                size={25}
                src={article.createdBy?.profileImage || 'https://via.placeholder.com/40x40?text=U'}
              />
              <small className="text-muted text-wrap" style={{ fontSize: '0.8rem' }}>
                {article.createdBy?.name || "EMS News"} | {formatFullDateTime(article.publishedAt || article.createdAt)}
              </small>
            </div>
          </Col>
          <hr className="mt-3" />
        </Row>
      ))}
    </div>
  );
};

export default RelatedNewsList;