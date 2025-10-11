import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Spinner, Alert, Badge } from 'react-bootstrap';
import { allNews } from '../../Services/authApi';

const StateNewsPage = () => {
  const { stateName, stateId } = useParams(); 
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState(stateName.replace(/-/g, ' '));

  useEffect(() => {
    if (!stateId) return;

    const fetchAndFilterNews = async () => {
      setLoading(true);
      setError(null);
      setPageTitle(stateName.replace(/-/g, ' '));
      try {
        const res = await allNews();
        if (res?.success) {
          const stateSpecificNews = res.data.filter(
            (item) => item.state?._id === stateId
          );
          setFilteredNews(stateSpecificNews);
        } else {
          setError('Failed to load news');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchAndFilterNews();
  }, [stateId, stateName]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading news...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="fw-bold mb-4 border-bottom pb-2 text-capitalize">
        {pageTitle} की खबरें
      </h2>

      {filteredNews.length > 0 ? (
        <div>
          {filteredNews.map((article) => (
            <div key={article._id} className="border-bottom py-3">
              <Link
                to={`/news/${article.slug_en}`}
                state={{ relatedArticles: filteredNews }}
                className="text-decoration-none text-dark"
              >
                <Row className="g-3">
                  <Col xs={12} md={8}>
                    <h5 className="fw-bold mb-2">{article.title_hi}</h5>
                    <p className="text-muted mb-2">{article.summary_hi}</p>
                    <Badge pill bg="light" text="dark" className="border me-2">
                      {article.state?.name || 'State'}
                    </Badge>
                    {article.city && (
                      <Badge pill bg="secondary" text="white">
                        {article.city?.name}
                      </Badge>
                    )}
                  </Col>
                  <Col xs={12} md={4}>
                    <Image
                      src={
                        article.media?.[0]?.url ||
                        'https://via.placeholder.com/400x250'
                      }
                      fluid
                      rounded
                      alt={article.title_hi}
                      style={{
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                        width: '100%',
                      }}
                    />
                  </Col>
                </Row>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Alert variant="info">
          इस राज्य में कोई खबर उपलब्ध नहीं है।
        </Alert>
      )}
    </Container>
  );
};

export default StateNewsPage;
