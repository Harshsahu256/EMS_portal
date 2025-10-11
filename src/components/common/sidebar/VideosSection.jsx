

import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { getVideo } from "../../../Services/authApi";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ thumbnail, onClick }) => (
  <div
    className="position-relative mb-3 shadow-sm"
    onClick={onClick}
    style={{
      cursor: "pointer",
      borderRadius: "10px",
      overflow: "hidden",
      transition: "transform 0.2s ease-in-out",
    }}
  >
    <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(85%)",
        }}
      />
      <FaPlayCircle
        color="#ffffff"
        size={36}
        className="position-absolute top-50 start-50 translate-middle"
        style={{
          opacity: 0.9,
          filter: "drop-shadow(0px 0px 6px rgba(0,0,0,0.6))",
        }}
      />
    </div>
  </div>
);

const VideosSection = ({ showHeader = true }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getVideo()
      .then((res) => {
        if (res.success) {
          setVideos(res.data || []);
        }
      })
      .catch((err) => {
        setError("Failed to load videos");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getThumbnailUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
    else if (url.includes("youtube.com/watch"))
      videoId = new URL(url).searchParams.get("v");
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  };

  if (isLoading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" size="sm" />
      </div>
    );
  if (error) return <div className="text-center text-danger my-4">{error}</div>;

  return (
    <div className="mb-4">
      {showHeader && (
        <div className="d-flex align-items-center mb-3">
          <div
            style={{
              width: "3px",
              height: "16px",
              backgroundColor: "#C00000",
              marginRight: "8px",
            }}
          />
          <h4
            className="fw-bold m-0"
            style={{ fontSize: "22px", lineHeight: "1.3", color: "#000" }}
          >
            Videos
          </h4>
          <div
            style={{
              flex: 1,
              height: "2px",
              backgroundColor: "#C00000",
              marginLeft: "12px",
            }}
          />
        </div>
      )}

      <Row className="g-3">
        {videos.slice(0, 4).map((video) => (
          <Col key={video._id} xs={12} sm={6}>
            <VideoCard
              thumbnail={getThumbnailUrl(video.videoUrl)}
              onClick={() => {
                // अगर slug available है तो slug use करो
                const slugToNavigate = video.slug ? video.slug : video._id;
                navigate(`/video/${slugToNavigate}`, {
                  state: { videos, currentVideo: video },
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VideosSection;
