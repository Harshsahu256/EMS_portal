

// import React, { useState, useEffect } from 'react';
// import { Image, Spinner } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { getTrending } from '../../../Services/authApi';

// const Multitranding = () => {
//   const [headlines, setHeadlines] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     getTrending()
//       .then((response) => {
//         if (response?.success && Array.isArray(response.data)) {
//           setHeadlines(response.data);
//         }
//       })
//       .catch((err) => console.error("Failed to load trending news", err))
//       .finally(() => setIsLoading(false));
//   }, []);

//   // ✅ Image/Video box style for consistency
//   const mediaBoxStyle = {
//     width: '120px', // Fixed width for consistent size
//     height: '80px', // Fixed height for consistent size (adjust as needed, e.g., 90px from related news)
//     objectFit: 'cover', // Ensures media fills the space without distortion
//     borderRadius: '5px',
//     backgroundColor: '#e9ecef', // Placeholder background color
//     display: 'block' // Ensure block-level display
//   };

//   if (isLoading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" size="sm" />
//       </div>
//     );
//   }

//   // 🔹 Safe navigation with slug
//   const handleClick = (item) => {
//     const finalSlug = item?.slug_en || item?.slug || item?._id; // Prioritize slug_en
//     navigate(`/news/${finalSlug}`, {
//       state: { relatedArticles: headlines },
//     });
//   };

//   return (
//     <div className="mb-4">
//       {headlines.map((item) => {
//         // Extract media information for video/image
//         const firstMedia = item.media?.[0];
//         const isVideo = firstMedia && firstMedia.type === 'video';
//         const mediaUrl = firstMedia?.url || 'https://via.placeholder.com/120x80?text=No+Media'; // Placeholder for image/video

//         return (
//           <div
//             key={item._id}
//             className="mb-3"
//             style={{ cursor: 'pointer' }}
//             onClick={() => handleClick(item)}
//           >
//             {/* ✅ Category */}
//             <p className="text-danger small fw-bold mb-2">
//               {item.category?.name || 'General'}
//             </p>

//             <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
//               {/* ✅ News Image/Video Conditional Rendering */}
//               {isVideo ? (
//                 <video
//                   src={mediaUrl}
//                   alt={item.title_hi || item.title_en || 'news video'}
//                   className="mb-2 mb-md-0 me-md-3"
//                   controls={false}
//                   autoPlay
//                   muted
//                   loop
//                   style={mediaBoxStyle}
//                 />
//               ) : (
//                 <Image
//                   src={mediaUrl}
//                   alt={item.title_hi || item.title_en || 'news image'}
//                   className="mb-2 mb-md-0 me-md-3"
//                   style={mediaBoxStyle}
//                   onError={(e) => { e.target.src = "https://via.placeholder.com/120x80?text=Error"; console.error("Image failed to load:", e.target.src); }}
//                 />
//               )}

//               {/* ✅ News Title & Summary */}
//               <div style={{ flex: 1 }}>
//                 <p
//                   className="fw-bold m-0"
//                   style={{ fontSize: '0.9rem', lineHeight: '1.4' }}
//                 >
//                   {item.title_hi || item.title_en || 'No title available'}
//                 </p>

//                 {/* ✅ News Summary */}
             
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Multitranding;

import React, { useState, useEffect } from 'react';
import { Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getTrending } from '../../../Services/authApi';

const Multitranding = () => {
  const [headlines, setHeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getTrending()
      .then((response) => {
        if (response?.success && Array.isArray(response.data)) {
          setHeadlines(response.data);
        }
      })
      .catch((err) => console.error("Failed to load trending news", err))
      .finally(() => setIsLoading(false));
  }, []);

  const mediaBoxStyle = {
    width: '120px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '5px',
    backgroundColor: '#e9ecef',
    display: 'block'
  };

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  const handleClick = (item) => {
    const finalSlug = item?.slug_en || item?.slug || item?._id;
    navigate(`/news/${finalSlug}`, {
      state: { relatedArticles: headlines },
    });
  };

  return (
    <div className="mb-4">
      {headlines.map((item, index) => {
        const firstMedia = item.media?.[0];
        const isVideo = firstMedia && firstMedia.type === 'video';
        const mediaUrl = firstMedia?.url || 'https://via.placeholder.com/120x80?text=No+Media';

        return (
          <div
            key={item._id}
            className="mb-3 pb-3"
            style={{
              cursor: 'pointer',
              borderBottom:
                index !== headlines.length - 1
                  ? '1px solid #d3d3d3' // ✅ gray line after every card except last
                  : 'none'
            }}
            onClick={() => handleClick(item)}
          >
            {/* ✅ Category */}
            <p className="text-danger small fw-bold mb-2">
              {item.category?.name || 'General'}
            </p>

            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
              {/* ✅ News Image/Video */}
              {isVideo ? (
                <video
                  src={mediaUrl}
                  alt={item.title_hi || item.title_en || 'news video'}
                  className="mb-2 mb-md-0 me-md-3"
                  controls={false}
                  autoPlay
                  muted
                  loop
                  style={mediaBoxStyle}
                />
              ) : (
                <Image
                  src={mediaUrl}
                  alt={item.title_hi || item.title_en || 'news image'}
                  className="mb-2 mb-md-0 me-md-3"
                  style={mediaBoxStyle}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/120x80?text=Error";
                    console.error("Image failed to load:", e.target.src);
                  }}
                />
              )}

              {/* ✅ News Title */}
              <div style={{ flex: 1 }}>
                <p
                  className="fw-bold m-0"
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // ✅ 3 line limit for title
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.title_hi || item.title_en || 'No title available'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Multitranding;
