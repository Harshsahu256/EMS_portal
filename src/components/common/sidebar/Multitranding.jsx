

// import React, { useState, useEffect } from 'react';
// import { Image, Spinner } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { getTrending } from '../../../Services/authApi';

// const Multitranding = () => {
//     const [headlines, setHeadlines] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const navigate = useNavigate();

//     useEffect(() => {
//         getTrending()
//             .then(response => {
//                 if (response?.success) {
//                     setHeadlines(response.data);
//                 }
//             })
//             .catch(err => console.error("Failed to load news", err))
//             .finally(() => setIsLoading(false));
//     }, []);

//     if (isLoading) {
//         return <div className="text-center my-4"><Spinner animation="border" size="sm" /></div>;
//     }

//     return (
//         <div className="mb-4">
//             {headlines.map((item) => (
//                 <div 
//                     key={item._id} 
//                     className="mb-3"
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => navigate(`/news/${item._id}`, { state: { relatedArticles: headlines } })}
//                 >
//                     <p className="text-danger small fw-bold mb-2">
//                         {item.category?.name}
//                     </p>

//                     <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
//                         {item.media?.length > 0 && (
//                             <Image 
//                                 src={item.media[0].url} 
//                                 className="mb-2 mb-md-0 me-md-3"
//                                 style={{
//                                     width: '100%',
//                                     maxWidth: '120px',
//                                     height: 'auto',
//                                     objectFit: 'cover',
//                                     borderRadius: '5px'
//                                 }} 
//                             />
//                         )}
//                         <p className="fw-bold m-0" style={{fontSize: '0.9rem', lineHeight: '1.4'}}>
//                             {item.title}
//                         </p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
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

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  // 🔹 Safe navigation with slug
  const handleClick = (item) => {
    const finalSlug = item?.slug || item?.slug_en || item?._id;
    navigate(`/news/${finalSlug}`, {
      state: { relatedArticles: headlines },
    });
  };

  return (
    <div className="mb-4">
      {headlines.map((item) => (
        <div
          key={item._id}
          className="mb-3"
          style={{ cursor: 'pointer' }}
          onClick={() => handleClick(item)}
        >
          {/* ✅ Category */}
          <p className="text-danger small fw-bold mb-2">
            {item.category?.name || 'General'}
          </p>

          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
            {/* ✅ News Image */}
            {item.media?.length > 0 && item.media[0]?.url && (
              <Image
                src={item.media[0].url}
                alt={item.title_hi || item.title_en || 'news'}
                className="mb-2 mb-md-0 me-md-3"
                style={{
                  width: '100%',
                  maxWidth: '120px',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
            )}

            {/* ✅ News Title */}
            <div style={{ flex: 1 }}>
              <p
                className="fw-bold m-0"
                style={{ fontSize: '0.9rem', lineHeight: '1.4' }}
              >
                {item.title_hi || item.title_en || 'No title available'}
              </p>

              {/* ✅ News Summary */}
              {item.summary_hi || item.summary_en ? (
                <p className="small text-muted mb-0">
                  {(item.summary_hi || item.summary_en).slice(0, 80)}...
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Multitranding;
