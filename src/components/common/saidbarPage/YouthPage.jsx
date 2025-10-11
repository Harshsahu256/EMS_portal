

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { allNews } from "../../../Services/authApi";
import UserAvatar from "../../Main_NewsDetails/UserAvatar";

const YouthListPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ Fetch Youth news from API
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await allNews();
        if (res?.success) {
          const youthNews = res.data.filter(item => {
            const categoryName =
              typeof item.category === "string"
                ? item.category.toLowerCase()
                : item.category?.name?.toLowerCase() || "";
            return categoryName === "youth" || categoryName === "युवा";
          });
          setNewsData(youthNews);
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        setError(err.message || "Error fetching news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (newsData.length === 0) return <Alert variant="warning">कोई Youth खबर उपलब्ध नहीं है।</Alert>;

  const linkStyle = { textDecoration: "none", color: "inherit" };

  return (
    <Container className="my-4">
      <h2 className="fw-bold border-bottom pb-2 mb-4">Youth</h2>

      {newsData.map(article => {
        const tags = [];
        // ✅ Exclude main category from tags
        if (article.category?.name && !["youth", "युवा"].includes(article.category.name.toLowerCase()))
          tags.push(article.category.name);
        if (article.subCategory?.name) tags.push(article.subCategory.name);

        // ✅ Fallback logic for summary
        const summaryText =
          article.summary_hi ||
          article.summary_en ||
          article.description ||
          article.content ||
          "";

        // ✅ Final slug value with fallback
        const finalSlug = article.slug || article.slug_en || article._id;

        return (
          <React.Fragment key={article._id || finalSlug}>
            <Row className="mb-3 g-3">
              {/* Left Image */}
              <Col xs={12} md={4} lg={3}>
                <Link
                  to={`/news/${finalSlug}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                >
                  <Image
                    src={article.media?.[0]?.url || "https://via.placeholder.com/300x170"}
                    alt={article.title_hi || article.title_en || "News Image"}
                    fluid
                    rounded
                    style={{ width: "100%", height: "170px", objectFit: "cover" }}
                  />
                </Link>
              </Col>

              {/* Right Content */}
              <Col xs={12} md={8} lg={9} className="d-flex flex-column">
                <Link
                  to={`/news/${finalSlug}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                  className="flex-grow-1"
                >
                  {/* Title */}
                  <h5
                    className="fw-bold mb-2"
                    style={{
                      fontSize: "clamp(14px, 3vw, 18px)",
                      lineHeight: "1.5",
                      fontFamily: "'Noto Sans Devanagari','Mangal',sans-serif",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.title_hi || article.title_en}
                  </h5>

                  {/* ✅ Summary Show Below Title */}
                  <p
                    className="text-muted mb-2"
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      fontFamily: "'Noto Sans Devanagari','Mangal',sans-serif",
                      display: "-webkit-box",
                      WebkitLineClamp: 2, // ✅ Only two lines
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#555",
                    }}
                  >
                    {summaryText}
                  </p>
                </Link>

                {/* Author + Date */}
                <div className="d-flex align-items-center mb-2">
                  <UserAvatar user={article.createdBy} size={25} />
                  <small className="ms-2 text-muted">
                    {article.createdBy?.name || "EMS News"} |{" "}
                    {new Date(article.publishedAt).toLocaleString("hi-IN", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})
}
                  </small>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-auto">
                    {tags.map((tagName, index) => (
                      <Link key={tagName + index} to={`/category/${tagName.toLowerCase()}`}>
                        <Button
                          variant="light"
                          size="sm"
                          className="py-0 px-2 border text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {tagName} &gt;
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
            <hr className="my-3" />
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default YouthListPage;
