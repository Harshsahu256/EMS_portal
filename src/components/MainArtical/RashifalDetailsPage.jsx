

import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  GiAries,
  GiTaurus,
  GiGemini,
  GiCancer,
  GiLeo,
  GiVirgo,
  GiLibra,
  GiScorpio,
  GiSagittarius,
  GiCapricorn,
  GiAquarius,
  GiPisces,
} from "react-icons/gi";

// Moved outside the component to avoid re-creation on every render
const allZodiacSigns = [
  { name: "Aries", icon: <GiAries /> },
  { name: "Taurus", icon: <GiTaurus /> },
  { name: "Gemini", icon: <GiGemini /> },
  { name: "Cancer", icon: <GiCancer /> },
  { name: "Leo", icon: <GiLeo /> },
  { name: "Virgo", icon: <GiVirgo /> },
  { name: "Libra", icon: <GiLibra /> },
  { name: "Scorpio", icon: <GiScorpio /> },
  { name: "Sagittarius", icon: <GiSagittarius /> },
  { name: "Capricorn", icon: <GiCapricorn /> },
  { name: "Aquarius", icon: <GiAquarius /> },
  { name: "Pisces", icon: <GiPisces /> },
];

const zodiacMap = {
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
  Pisces: "मीन",
};

const API_BASE_URL = "https://newsapp.aasmo.in/api/v1/user";
const HOROSCOPE_CATEGORY = ["astrology", "राशिफल"];

// Colors for the zodiac sign backgrounds - moved outside
const zodiacColors = [
  "#e74c3c", "#f39c12", "#27ae60", "#2980b9", "#8e44ad", "#d35400",
  "#16a085", "#2c3e50", "#c0392b", "#7f8c8d", "#9b59b6", "#34495e"
];

const RashifalDetailsPage = () => {
  const navigate = useNavigate();
  const mainRedColor = "#e74c3c";
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added state for error handling

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${API_BASE_URL}/news`)
      .then(res => {
        const astrologyNews = res.data.data.filter(
          item => item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase())
        );
        setAllNews(astrologyNews);
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setError("खबरें लोड करने में त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।"); // User-friendly error message
      })
      .finally(() => setLoading(false));
  }, []);

  const getRashiSpecificNews = (rashiName) => {
    const hindiRashi = zodiacMap[rashiName].toLowerCase();
    const engRashi = rashiName.toLowerCase();

    return allNews.filter(item => {
      const title = (item.title_hi || item.title_en || "").toLowerCase();
      const summary = (item.summary_hi || item.summary_en || "").toLowerCase();
      const subSub = (item.subSubCategory || "").toLowerCase();
      const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";
      
      return title.includes(hindiRashi) || title.includes(engRashi) ||
             summary.includes(hindiRashi) || summary.includes(engRashi) ||
             subSub.includes(hindiRashi) || subSub.includes(engRashi) ||
             tags.includes(hindiRashi) || tags.includes(engRashi);
    });
  };

  const otherGeneralHoroscopeNews = useMemo(() => {
    if (!allNews.length) return [];
    
    return allNews.filter(item => {
      const isHoroscopeCategory = item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase());
      const hasNullSubSubCategory = !item.subSubCategory || item.subSubCategory.trim() === "";
      return isHoroscopeCategory && hasNullSubSubCategory;
    });
  }, [allNews]);

  const handleRashiClick = (rashi) => {
    const clickedRashiNews = getRashiSpecificNews(rashi);

    if (clickedRashiNews.length === 0) {
      alert(`${rashi} के लिए कोई खबर नहीं मिली।`);
      return;
    }

    const latestClickedRashiNews = clickedRashiNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

    // Collect latest news for all other rashis
    const otherRashisLatestNews = [];
    allZodiacSigns.forEach(otherSign => {
      if (otherSign.name !== rashi) { // Exclude the clicked rashi
        const newsForOtherRashi = getRashiSpecificNews(otherSign.name);
        if (newsForOtherRashi.length > 0) {
          const latestNewsForOtherRashi = newsForOtherRashi.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
          otherRashisLatestNews.push(latestNewsForOtherRashi);
        }
      }
    });

    try {
      navigate(`/news/${latestClickedRashiNews.slug_en}`, { 
        state: { 
          relatedArticles: otherRashisLatestNews 
        } 
      });
    } catch (navError) {
      console.error("Error navigating to news detail page:", navError);
      alert("खबर विवरण पेज पर जाने में त्रुटि हुई।");
    }
  };

  const handleOtherNewsClick = (clickedNewsSlug) => {
    const related = otherGeneralHoroscopeNews.filter(news => news.slug_en !== clickedNewsSlug);
    
    try {
      navigate(`/news/${clickedNewsSlug}`, { 
        state: { 
          relatedArticles: related 
        } 
      });
    } catch (navError) {
      console.error("Error navigating to news detail page:", navError);
      alert("खबर विवरण पेज पर जाने में त्रुटि हुई।");
    }
  };


  return (
    <div className="my-4" style={{ fontFamily: "sans-serif" }}>
      <div className="text-center mb-3">
        <h4 className="fw-bold mb-0" style={{ color: mainRedColor }}>आज का राशिफल</h4>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger fw-bold">{error}</p>}

      {!loading && !error && (
        <div className="row text-center mt-4 g-3">
          {allZodiacSigns.map((sign, index) => {
            const bgColor = zodiacColors[index % zodiacColors.length];
            return (
              <div className="col-4 col-md-2" key={sign.name}>
                <div
                  onClick={() => handleRashiClick(sign.name)}
                  style={{ cursor: "pointer" }}
                  className="d-flex flex-column align-items-center"
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${bgColor}, #fff)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      transition: "transform 0.3s ease",
                    }}
                    className="mb-2 icon-circle"
                  >
                    {React.cloneElement(sign.icon, { size: "28px", color: "#fff" })}
                  </div>
                  <p className="small fw-bold mb-0 text-capitalize">{sign.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-5">
          <div className="d-flex align-items-center mb-3">
            <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginRight: "8px" }}></div>
            <h5 className="fw-bold mb-0" style={{ color: mainRedColor }}>राशिफल की अन्य खबरें</h5>
            <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginLeft: "8px" }}></div>
          </div>

          <div className="row g-3">
            {otherGeneralHoroscopeNews.length === 0 ? (
              <div className="col-12 text-center py-4">
                <p className="lead text-muted">इस समय कोई अन्य राशिफल खबरें उपलब्ध नहीं हैं।</p>
              </div>
            ) : (
              otherGeneralHoroscopeNews.map(news => (
                <div 
                  key={news.slug_en} 
                  className="col-12 col-md-6" 
                  onClick={() => handleOtherNewsClick(news.slug_en)} 
                  style={{ cursor: "pointer" }}
                >
                  <div className="p-3 border rounded shadow-sm h-100 news-card d-flex align-items-center" style={{ transition: "transform 0.2s ease" }}>
                    {/* Updated to use news.media[0]?.url for the image source */}
                    {news.media && news.media.length > 0 && ( 
                      <div className="news-thumbnail-container me-3">
                       <img 
  src={news.media[0]?.url}
  alt={news.title_hi || news.title_en} 
  className="img-fluid rounded" 
  style={{ width: "120px", height: "120px", objectFit: "cover" }} // ✅ बड़ा कर दिया
/>

                      </div>
                    )}
                    <div className="news-content-area flex-grow-1">
                      <h6 className="fw-bold mb-2">{news.title_hi || news.title_en}</h6>
                      <p className="small text-muted mb-0">{(news.summary_hi || news.summary_en)?.slice(0, 80)}...</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <style>{`
        .icon-circle:hover {
          transform: scale(1.15);
        }
        .col-12.col-md-6:hover .news-card {
          transform: translateY(-3px);
        }
        .news-card {
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .news-thumbnail-container {
            flex-shrink: 0;
        }
        .news-content-area {
            flex-grow: 1;
        }
      `}</style>
    </div>
  );
};

export default RashifalDetailsPage;



