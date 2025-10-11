
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";

const VideoDetail = () => {
  const { slug } = useParams(); // ✅ URL se slug le rahe hain
  const location = useLocation();
  const navigate = useNavigate();

  const videos = location.state?.videos || [];
  const currentVideo =
    location.state?.currentVideo || videos.find((v) => v.slug === slug);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
    else if (url.includes("youtube.com/watch"))
      videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getThumbnailUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
    else if (url.includes("youtube.com/watch"))
      videoId = new URL(url).searchParams.get("v");
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  if (!currentVideo) return <div>Video not found</div>;

  return (
    <div className="mb-4">
      {/* Current Video */}
      <div className="mb-4 text-start b">
        <h2 className="mb-3 fw-bold text-danger text-center">{currentVideo.title}</h2>
        <iframe
          width="100%"
          height="400"
          src={getEmbedUrl(currentVideo.videoUrl)}
          title={currentVideo.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Other Videos */}
      <h5>Other Videos</h5>
      <Row>
        {videos
          .filter((v) => v.slug !== currentVideo.slug) // ✅ slug ke sath filter
          .map((video) => (
            <Col key={video.slug} xs={12} md={4} className="mb-3">
              <div
                onClick={() => {
                  navigate(`/video/${video.slug}`, {
                    state: { videos, currentVideo: video },
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={getThumbnailUrl(video.videoUrl)}
                  fluid
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
               <p
  className="mt-2 mb-0 fw-bold text-truncate text-center"
  style={{
    color: "red",
    fontSize: "0.95rem",

    paddingBottom: "2px", // thodi spacing underline aur text ke beech
  }}
  title={video.title} // hover pe full title
>
  {video.title}
</p>

              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default VideoDetail;
