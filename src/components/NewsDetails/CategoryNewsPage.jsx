
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLink } from 'react-icons/fa'; 
import { allNews } from '../../Services/authApi';
import UserAvatar from "../Main_NewsDetails/UserAvatar";

const CategoryNewsPage = () => {
  const { categoryName } = useParams(); 
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndFilterNews = async () => {
      setLoading(true);
      try {
        const res = await allNews(); // ✅ API: allNews
        if (res?.success) {
          const targetCategory = categoryName.toLowerCase();
          const filtered = res?.data?.filter(item => {
            // ✅ Keys used: category.name, subCategory.name, title_hi, title_en, slug_en, _id
            const mainCat = item?.category?.name?.toLowerCase() || '';
            const subCat = item?.subCategory?.name?.toLowerCase() || '';

            if (mainCat === targetCategory || subCat === targetCategory) return true;
            // Hindi fallback
            if (targetCategory === 'business' && item?.category?.name === 'बिज़नेस') return true;
            if (targetCategory === 'entertainment' && item?.category?.name === 'मनोरंजन') return true;
            if (targetCategory === 'sports' && item?.category?.name === 'खेल') return true;
            if (targetCategory === 'cricket' && item?.subCategory?.name === 'क्रिकेट') return true;

            return false;
          });
          setFilteredNews(filtered || []);
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchAndFilterNews();
  }, [categoryName]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-4" />;
  if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;

  // ✅ Share links generator using slug or _id
  const getShareLinks = (slugOrId, title) => {
    const url = `${window.location.origin}/news/${slugOrId}`;
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      copy: url
    };
  };

  return (
    <Container className="my-4">
      <h2 className="fw-bold mb-4 border-bottom pb-2 text-capitalize">{categoryName}</h2>
      {filteredNews.length > 0 ? (
        filteredNews.map((article) => {
          const slugOrId = article?.slug_en || article?._id; // ✅ slug or _id
          const title = article?.title_hi || article?.title_en || "No Title"; // ✅ title_hi preferred
          const summary = article?.summary_hi || article?.summary_en || ""; // ✅ summary
          const shareLinks = getShareLinks(slugOrId, title);

          return (
            <div key={slugOrId} className="border-bottom py-3">
              <Row className="g-3">
                <Col xs={12} md={8}>
                  <Link to={`/news/${slugOrId}`} state={{ relatedArticles: filteredNews }} className="text-decoration-none text-dark">
                    <h5 className="fw-bold mb-2">{title}</h5>
                    {summary && <p className="text-muted mb-2">{summary}</p>}
                  </Link>
                  <Badge pill bg="light" text="dark" className="border">
                    {article?.subCategory?.name || article?.category?.name || 'General'}
                  </Badge>
                  <div className="mt-2 text-muted small">
                    {article?.createdBy?.name || "EMS News"} •{" "}
                    {article?.createdAt ? new Date(article.createdAt).toLocaleDateString("hi-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    }) : ""}
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <Link to={`/news/${slugOrId}`} state={{ relatedArticles: filteredNews }}>
                    <Image src={article?.media?.[0]?.url || "https://via.placeholder.com/400x250"} fluid rounded alt={title} style={{ aspectRatio: '16/9', objectFit: 'cover', width: '100%' }} />
                  </Link>
                  <div className="d-flex justify-content-end align-items-center gap-3 mt-2">
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <button className="btn btn-link p-0 text-muted" onClick={() => navigator.clipboard.writeText(shareLinks.copy)}><FaLink /></button>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })
      ) : (
        <Alert variant="info">इस श्रेणी में कोई खबर उपलब्ध नहीं है।</Alert>
      )}
    </Container>
  );
};

export default CategoryNewsPage;
