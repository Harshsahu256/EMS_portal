import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allNews } from '../../Services/authApi';
import { Spinner, Alert } from 'react-bootstrap';
import UserAvatar from '../Main_NewsDetails/UserAvatar';

const HOROSCOPE_CATEGORIES = ['horoscope', 'rashifal', 'astrology'];

const TopNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await allNews();
        console.log("All News API:", response.data);

        const filteredNews = Array.isArray(response?.data)
          ? response.data.filter(item => {
              let category = '';
              if (typeof item.category === 'string') {
                category = item.category.toLowerCase();
              } else if (item.category?.name) {
                category = item.category.name.toLowerCase();
              }
              return category && !HOROSCOPE_CATEGORIES.includes(category);
            })
          : [];

        setNews(filteredNews);
      } catch (err) {
        console.error("News fetch error:", err);
        setError("समाचार लोड करने में विफल।");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('hi-IN', { 
      day: 'numeric', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="text-center my-5">{error}</Alert>;

  return (
    <div className="container my-4">
      <h3 className="fw-bold" style={{ color: '#ff0000' }}>होम- भारत</h3>
      <hr className="mb-3" style={{ borderTop: '2px solid #e0e0e0' }} />

      <div className="container-fluid px-0">
        <div className="row g-3 mb-3">
          {news.slice(0, 2).map((story, idx) => (
            <div className="col-lg-6 col-md-6" key={story._id || story.slug_en || idx}>
              <Link 
                to={`/news/${story.slug_en}`}
                state={{ relatedArticles: news }}
                className="text-decoration-none"
              >
                <div className="card border-0 rounded-0 h-100 overflow-hidden">
                  <div className="position-relative h-100">
                    <img 
                      src={story.media?.[0]?.url || 'https://via.placeholder.com/600x400'} 
                      alt={story.title_hi} 
                      className="w-100 h-100" 
                      style={{ objectFit: "cover" }} 
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                      <h4 className="fw-bold text-white">{story.title_hi}</h4>
                      <div className="d-flex align-items-center">
                        <UserAvatar user={story.createdBy} size={20} />
                        <small className="ms-2 text-light opacity-75">
                          {story.createdBy?.name || "EMS News"} | {formatDateTime(story.publishedAt)}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="row g-3">
          {news.slice(2, 5).map((story, idx) => (
            <div className={`col-lg-4 col-md-${idx===2 ? '12' : '6'}`} key={story._id || story.slug_en || idx}>
              <Link 
                to={`/news/${story.slug_en}`}
                state={{ relatedArticles: news }}
                className="text-decoration-none text-dark"
              >
                <div className="card border-0 rounded-0 h-100 overflow-hidden">
                  <div className="position-relative">
                    <img 
                      src={story.media?.[0]?.url || 'https://via.placeholder.com/400x225'} 
                      alt={story.title_hi} 
                      className="w-100" 
                      style={{ height: "220px", objectFit: "cover" }} 
                    />
                  </div>
                  <div className="card-body px-2 py-3">
                    <p className="card-text fw-bold">{story.title_hi}</p>
                    <div className="d-flex align-items-center">
                      <UserAvatar user={story.createdBy} size={20} />
                      <small className="ms-2 text-muted">
                        {story.createdBy?.name || "EMS News"} | {formatDateTime(story.publishedAt)}
                      </small>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <hr style={{ borderTop: '4px solid red', marginTop: '2rem' }} />
    </div>
  );
};

export default TopNews;
