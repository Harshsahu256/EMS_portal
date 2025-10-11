// import React, { useState, useEffect } from 'react';
// import { Dropdown, Spinner, Alert } from 'react-bootstrap';
// import { 
//   GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo, 
//   GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces 
// } from 'react-icons/gi';
// import { allNews } from '../../../Services/authApi';

// // ✅ All 12 Signs
// const signs = [
//   'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
//   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
// ];

// // ✅ English → Hindi Mapping
// const signMapping = {
//   Aries: "मेष",
//   Taurus: "वृष",
//   Gemini: "मिथुन",
//   Cancer: "कर्क",
//   Leo: "सिंह",
//   Virgo: "कन्या",
//   Libra: "तुला",
//   Scorpio: "वृश्चिक",
//   Sagittarius: "धनु",
//   Capricorn: "मकर",
//   Aquarius: "कुंभ",
//   Pisces: "मीन"
// };

// // ✅ Sign Icons
// const signIcons = { 
//   Aries: <GiAries size={28} />, Taurus: <GiTaurus size={28} />, Gemini: <GiGemini size={28} />,
//   Cancer: <GiCancer size={28} />, Leo: <GiLeo size={28} />, Virgo: <GiVirgo size={28} />,
//   Libra: <GiLibra size={28} />, Scorpio: <GiScorpio size={28} />, Sagittarius: <GiSagittarius size={28} />,
//   Capricorn: <GiCapricorn size={28} />, Aquarius: <GiAquarius size={28} />, Pisces: <GiPisces size={28} />,
// };

// // ✅ Category Names
// const HOROSCOPE_CATEGORY = ["astrology", "राशिफल"];

// const HoroscopeSection = () => {
//   const [selectedSign, setSelectedSign] = useState('Aries');
//   const [latestNews, setLatestNews] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setIsLoading(true);
//     setError(null);

//     allNews()
//       .then(res => {
//         if (res.success && res.data) {
//           // ✅ Filter only astrology category news
//           const astrologyNews = res.data.filter(item =>
//             item.category?.name &&
//             HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase())
//           );

//           const hindiRashi = signMapping[selectedSign];
//           const lowerEnglishSign = selectedSign.toLowerCase();
//           const lowerHindiSign = hindiRashi.toLowerCase();

//           // ✅ Filter news by rashi name or subcategory/tags
//           const filtered = astrologyNews.filter(item => {
//             const title = (item.title_hi || item.title_en || "").toLowerCase();
//             const summary = (item.summary_hi || item.summary_en || "").toLowerCase();
//             const subSubCategory = (item.subSubCategory || "").toLowerCase();
//             const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";

//             return (
//               title.includes(lowerHindiSign) ||
//               title.includes(lowerEnglishSign) ||
//               summary.includes(lowerHindiSign) ||
//               summary.includes(lowerEnglishSign) ||
//               subSubCategory.includes(lowerEnglishSign) ||
//               subSubCategory.includes(lowerHindiSign) ||
//               tags.includes(lowerEnglishSign) ||
//               tags.includes(lowerHindiSign)
//             );
//           });

//           console.log("Selected Sign:", selectedSign, "Hindi:", hindiRashi);
//           console.log("Filtered News:", filtered);

//           // ✅ Sort by publishedAt (latest first)
//           const sorted = filtered.sort(
//             (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
//           );

//           setLatestNews(sorted[0] || null);
//         } else {
//           setLatestNews(null);
//         }
//       })
//       .catch(err => {
//         console.error("Error fetching news:", err);
//         setError("News fetch failed. कृपया बाद में प्रयास करें।");
//       })
//       .finally(() => setIsLoading(false));
//   }, [selectedSign]);

//   // ✅ Icon wrapper
//   const getIconWrapper = (icon) => (
//     <div 
//       className="d-flex justify-content-center align-items-center rounded-circle me-3 flex-shrink-0" 
//       style={{ width: '50px', height: '50px', backgroundColor: '#f0f2f5' }}
//     >
//       {icon}
//     </div>
//   );

//   // ✅ Truncate text for summary
//   const truncateText = (text, maxLines = 4) => {
//     if (!text) return '';
//     const lines = text.split('\n').slice(0, maxLines);
//     return lines.join(' ').slice(0, 200) + (lines.join(' ').length > 200 ? "..." : "");
//   };

//   return (
//     <div className="mb-4">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="fw-bold m-0 text-danger">Today's Horoscope</h5> 
//         <Dropdown onSelect={(eventKey) => setSelectedSign(eventKey)}>
//           <Dropdown.Toggle 
//             variant="link" 
//             id="dropdown-basic" 
//             className="text-dark text-decoration-none fw-bold p-0"
//           >
//             {selectedSign}
//           </Dropdown.Toggle> 
//           <Dropdown.Menu>
//             {signs.map(sign => (
//               <Dropdown.Item key={sign} eventKey={sign}>{sign}</Dropdown.Item>
//             ))}
//           </Dropdown.Menu> 
//         </Dropdown> 
//       </div>

//       {/* Loading & Error */}
//       {isLoading && <Spinner animation="border" size="sm" />}
//       {error && <Alert variant="danger">{error}</Alert>}

//       {/* No news case */}
//       {!isLoading && !error && !latestNews && (
//         <Alert variant="warning">इस राशि के लिए कोई समाचार नहीं मिला।</Alert>
//       )}

//       {/* Latest News */}
//       {!isLoading && !error && latestNews && (
//         <div 
//           className="mb-3 p-3 border rounded d-flex flex-column justify-content-between"
//           style={{ cursor: 'pointer', minHeight: '120px', position: 'relative' }}
//           onClick={() => {
//             const newsSlug = latestNews.slug || latestNews.slug_en || latestNews._id;
//             window.location.href = `/news/${latestNews._id}/${newsSlug}`;
//           }}
//         >
//           <div className="d-flex align-items-start mb-2">
//             {getIconWrapper(signIcons[selectedSign])}
//             <div>
//               <h6 className="fw-bold">
//                 {latestNews.title_hi || latestNews.title_en}
//               </h6>
//               <p className="small text-muted mb-0">{latestNews.category?.name}</p>
//             </div>
//           </div>

//           <p className="text-secondary mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
//             {truncateText(latestNews.summary_hi || latestNews.summary_en)}
//           </p>

//           {/* Read More */}
//           <div 
//             className="text-end fw-bold mt-2" 
//             style={{ fontSize: '0.85rem', color: '#FFD700', cursor: 'pointer' }}
//           >
//             और पढ़ें →
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HoroscopeSection;

import React, { useState, useEffect } from 'react';
import { Dropdown, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo, 
  GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces 
} from 'react-icons/gi';
import { allNews } from '../../../Services/authApi';

// ✅ All 12 Signs
const signs = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// ✅ English → Hindi Mapping
const signMapping = {
  Aries: "मेष",
  Taurus: "वृष",
  Gemini: "मिथुन",
  Cancer: "कर्क",
  Leo: "सिंह",
  Virgo: "कन्या",
  Libra: "तुला",
  Scorpio: "वृश्चिक",
  Sagittarius: "धनु",
  Capricorn: "मकर",
  Aquarius: "कुंभ",
  Pisces: "मीन"
};

// ✅ Sign Icons
const signIcons = { 
  Aries: <GiAries size={28} />, Taurus: <GiTaurus size={28} />, Gemini: <GiGemini size={28} />,
  Cancer: <GiCancer size={28} />, Leo: <GiLeo size={28} />, Virgo: <GiVirgo size={28} />,
  Libra: <GiLibra size={28} />, Scorpio: <GiScorpio size={28} />, Sagittarius: <GiSagittarius size={28} />,
  Capricorn: <GiCapricorn size={28} />, Aquarius: <GiAquarius size={28} />, Pisces: <GiPisces size={28} />,
};

// ✅ Category Names
const HOROSCOPE_CATEGORY = ["astrology", "राशिफल"];

const HoroscopeSection = () => {
  const navigate = useNavigate();
  const [selectedSign, setSelectedSign] = useState('Aries');
  const [latestNews, setLatestNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch news
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    allNews()
      .then(res => {
        if (res.success && res.data) {
          // Filter astrology news
          const astrologyNews = res.data.filter(item =>
            item.category?.name &&
            HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase())
          );

          const hindiRashi = signMapping[selectedSign];
          const lowerEnglishSign = selectedSign.toLowerCase();
          const lowerHindiSign = hindiRashi.toLowerCase();

          // Filter news by rashi & subcategory/tags
          const filtered = astrologyNews.filter(item => {
            const title = (item.title_hi || item.title_en || "").toLowerCase();
            const summary = (item.summary_hi || item.summary_en || "").toLowerCase();
            const subSubCategory = (item.subSubCategory || "").toLowerCase();
            const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";

            return (
              title.includes(lowerHindiSign) ||
              title.includes(lowerEnglishSign) ||
              summary.includes(lowerHindiSign) ||
              summary.includes(lowerEnglishSign) ||
              subSubCategory.includes(lowerHindiSign) ||
              subSubCategory.includes(lowerEnglishSign) ||
              tags.includes(lowerHindiSign) ||
              tags.includes(lowerEnglishSign)
            );
          });

          // Sort latest first
          const sorted = filtered.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );

          setLatestNews(sorted[0] || null);
        } else {
          setLatestNews(null);
        }
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setError("News fetch failed. कृपया बाद में प्रयास करें।");
      })
      .finally(() => setIsLoading(false));
  }, [selectedSign]);

  // ✅ Icon wrapper
  const getIconWrapper = (icon) => (
    <div 
      className="d-flex justify-content-center align-items-center rounded-circle me-3 flex-shrink-0" 
      style={{ width: '50px', height: '50px', backgroundColor: '#f0f2f5' }}
    >
      {icon}
    </div>
  );

  // ✅ Truncate text
  const truncateText = (text, maxLines = 4) => {
    if (!text) return '';
    const lines = text.split('\n').slice(0, maxLines);
    return lines.join(' ').slice(0, 200) + (lines.join(' ').length > 200 ? "..." : "");
  };

  // ✅ Handle click to open news detail page using slug only
  const handleNewsClick = (news) => {
    const newsSlug = news.slug_en || news.slug;
    if (!newsSlug) return;
    navigate(`/news/${newsSlug}`);
  };

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0 text-danger">Today's Horoscope</h5> 
        <Dropdown onSelect={(eventKey) => setSelectedSign(eventKey)}>
          <Dropdown.Toggle 
            variant="link" 
            id="dropdown-basic" 
            className="text-dark text-decoration-none fw-bold p-0"
          >
            {selectedSign}
          </Dropdown.Toggle> 
          <Dropdown.Menu>
            {signs.map(sign => (
              <Dropdown.Item key={sign} eventKey={sign}>{sign}</Dropdown.Item>
            ))}
          </Dropdown.Menu> 
        </Dropdown> 
      </div>

      {/* Loading & Error */}
      {isLoading && <Spinner animation="border" size="sm" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* No news case */}
      {!isLoading && !error && !latestNews && (
        <Alert variant="warning">इस राशि के लिए कोई समाचार नहीं मिला।</Alert>
      )}

      {/* Latest News */}
      {!isLoading && !error && latestNews && (
        <div 
          className="mb-3 p-3 border rounded d-flex flex-column justify-content-between"
          style={{ cursor: 'pointer', minHeight: '120px', position: 'relative' }}
          onClick={() => handleNewsClick(latestNews)}
        >
          <div className="d-flex align-items-start mb-2">
            {getIconWrapper(signIcons[selectedSign])}
            <div>
              <h6 className="fw-bold">{latestNews.title_hi || latestNews.title_en}</h6>
              <p className="small text-muted mb-0">{latestNews.category?.name}</p>
            </div>
          </div>

          <p className="text-secondary mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
            {truncateText(latestNews.summary_hi || latestNews.summary_en)}
          </p>

          {/* Read More */}
          <div 
            className="text-end fw-bold mt-2" 
            style={{ fontSize: '0.85rem', color: '#ff9900ff', cursor: 'pointer' }}
          >
            और पढ़ें →
          </div>
        </div>
      )}
    </div>
  );
};

export default HoroscopeSection;
