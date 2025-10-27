
// import React from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Row, Col, Image } from "react-bootstrap";

// const VideoDetail = () => {
//   const { slug } = useParams(); // ✅ URL se slug le rahe hain
//   const location = useLocation();
//   const navigate = useNavigate();

//   const videos = location.state?.videos || [];
//   const currentVideo =
//     location.state?.currentVideo || videos.find((v) => v.slug === slug);

//   const getEmbedUrl = (url) => {
//     if (!url) return "";
//     let videoId = "";
//     if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
//     else if (url.includes("youtube.com/watch"))
//       videoId = new URL(url).searchParams.get("v");
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   const getThumbnailUrl = (url) => {
//     if (!url) return "";
//     let videoId = "";
//     if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
//     else if (url.includes("youtube.com/watch"))
//       videoId = new URL(url).searchParams.get("v");
//     return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//   };

//   if (!currentVideo) return <div>Video not found</div>;

//   return (
//     <div className="mb-4">
//       {/* Current Video */}
//       <div className="mb-4 text-start b">
//         <h2 className="mb-3 fw-bold text-danger text-left">{currentVideo.title}</h2>
//         <iframe
//           width="100%"
//           height="400"
//           src={getEmbedUrl(currentVideo.videoUrl)}
//           title={currentVideo.title}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         />
//       </div>

//       {/* Other Videos */}
//       <h5>Other Videos</h5>
//       <Row>
//         {videos
//           .filter((v) => v.slug !== currentVideo.slug) // ✅ slug ke sath filter
//           .map((video) => (
//             <Col key={video.slug} xs={12} md={4} className="mb-3">
//               <div
//                 onClick={() => {
//                   navigate(`/video/${video.slug}`, {
//                     state: { videos, currentVideo: video },
//                   });
//                   window.scrollTo({ top: 0, behavior: "smooth" });
//                 }}
//                 style={{ cursor: "pointer" }}
//               >
//                 <Image
//                   src={getThumbnailUrl(video.videoUrl)}
//                   fluid
//                   style={{
//                     width: "100%",
//                     height: "150px",
//                     objectFit: "cover",
//                     borderRadius: "5px",
//                   }}
//                 />
//                <p
//   className="mt-2 mb-0 fw-bold text-truncate text-center"
//   style={{
//     color: "red",
//     fontSize: "0.95rem",

//     paddingBottom: "2px", // thodi spacing underline aur text ke beech
//   }}
//   title={video.title} // hover pe full title
// >
//   {video.title}
// </p>

//               </div>
//             </Col>
//           ))}
//       </Row>
//     </div>
//   );
// };

// export default VideoDetail;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, Button, Modal, Form, Spinner, Alert, InputGroup, Container } from "react-bootstrap";
import { FaThumbsUp, FaCommentDots, FaShareAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { likeVideo, addCommentToVideo } from "../../Services/authApi"; // सुनिश्चित करें कि यह पाथ सही है

const VideoDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const videos = location.state?.videos || [];
  const initialVideo = location.state?.currentVideo || videos.find((v) => v._id === slug);

  const [currentVideo, setCurrentVideo] = useState(initialVideo);
  const [isLiked, setIsLiked] = useState(false);
  
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const newVideo = location.state?.currentVideo || videos.find((v) => v._id === slug);
    setCurrentVideo(newVideo);
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id && newVideo?.likes.includes(user._id)) {
        setIsLiked(true);
    } else {
        setIsLiked(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, location.state, videos]);

  const handleLike = async () => {
    if (!currentVideo) return;
    try {
      const response = await likeVideo(currentVideo._id);
      setCurrentVideo(prev => ({ ...prev, likes: Array(response.totalLikes).fill(null) }));
      setIsLiked(prev => !prev);
    } catch (err) {
      if (String(err).includes("401") || String(err).includes("403")) {
        alert("Please log in to like this video.");
        navigate('/login');
      } else {
        alert("Failed to like the video.");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentVideo) return;
    setIsSubmittingComment(true);
    setCommentError("");
    try {
      const response = await addCommentToVideo(currentVideo._id, { text: commentText });
      setCurrentVideo(prev => ({ ...prev, comments: response.comments }));
      setCommentText("");
    } catch (err) {
      setCommentError("Failed to add comment. Please log in and try again.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShare = async () => {
    if (!currentVideo) return;
    const fullShareUrl = `${window.location.origin}/video/${currentVideo._id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: currentVideo.title, text: `Check out this video!`, url: fullShareUrl });
      } catch (error) { console.error('Error sharing:', error); }
    } else {
      alert(`Please copy this link to share: ${fullShareUrl}`);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
    else if (url.includes("youtube.com/watch")) videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const getThumbnailUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
    else if (url.includes("youtube.com/watch")) videoId = new URL(url).searchParams.get("v");
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  if (!currentVideo) return <div className="text-center my-5"><h2>Video not found</h2></div>;

  return (
    <Container className="my-4">
      {/* Current Video */}
      <div className="mb-3">
        <h2 className="mb-3 fw-bold text-danger">{currentVideo.title}</h2>
        <div className="video-responsive mb-3">
            <iframe
            width="100%"
            height="500"
            src={getEmbedUrl(currentVideo.videoUrl)}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            />
        </div>

        {/* ✅ यहाँ बदलाव किया गया है: आपके बताए अनुसार नया लेआउट */}
        <div className="d-flex justify-content-start align-items-center gap-4 py-2 border-bottom">
            {/* Like Button: Icon + Count */}
            <Button variant="link" className="text-dark p-0 text-decoration-none d-flex align-items-center" onClick={handleLike}>
                <FaThumbsUp size={20} style={{ color: isLiked ? 'red' : 'inherit' }} />
                <span className="fw-bold ms-2">{currentVideo.likes?.length || 0}</span>
            </Button>
            
            {/* Comment Button: Text + Count + Icon */}
            <Button variant="link" className="text-dark p-0 text-decoration-none d-flex align-items-center" onClick={() => setShowCommentModal(true)}>
                <span className="fw-bold me-2">Comments {currentVideo.comments?.length || 0}</span>
                <FaCommentDots size={20} />
            </Button>
            
            {/* Share Button (कोई बदलाव नहीं) */}
            <Button variant="link" className="text-dark p-0 text-decoration-none d-flex align-items-center" onClick={handleShare}>
                <span className="fw-bold me-2">Share</span>
                <FaShareAlt size={18} style={{ color: '#007bff' }} />
            </Button>
        </div>
      </div>

      {/* Other Videos */}
      <h4 className="mt-5 mb-3">Other Videos</h4>
      <Row>
        {videos
          .filter((v) => v._id !== currentVideo._id)
          .map((video) => (
            <Col key={video._id} xs={12} sm={6} md={4} className="mb-3">
              <div
                onClick={() => {
                  navigate(`/video/${video._id}`, {
                    state: { videos, currentVideo: video },
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={getThumbnailUrl(video.videoUrl)}
                  fluid
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
                />
               <p className="mt-2 mb-0 fw-bold text-truncate" style={{ color: "red", fontSize: "0.95rem" }} title={video.title}>
                  {video.title}
                </p>
              </div>
            </Col>
          ))}
      </Row>

      {/* Comment Modal (कोई बदलाव नहीं) */}
      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {currentVideo.comments?.length > 0 ? (
              currentVideo.comments.map(comment => (
                <div key={comment._id} className="mb-3 d-flex align-items-start">
                    <div>
                        <p className="mb-0"><strong>{comment.user?.username || 'User'}</strong></p>
                        <p className="mb-0 text-muted">{comment.text}</p>
                    </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center my-4">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </Modal.Body>
        <div className="p-2 border-top">
            {commentError && <Alert variant="danger" size="sm" className="mx-2">{commentError}</Alert>}
            <Form onSubmit={handleCommentSubmit}>
                <InputGroup>
                    <Form.Control
                        as="textarea"
                        rows={1}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        required
                        className="border-0"
                        style={{ resize: 'none' }}
                    />
                    <Button variant="link" type="submit" disabled={isSubmittingComment} className="p-2">
                        {isSubmittingComment 
                            ? <Spinner animation="border" size="sm" /> 
                            : <IoSend size={24} color="#007bff" />
                        }
                    </Button>
                </InputGroup>
            </Form>
        </div>
      </Modal>

    </Container>
  );
};

export default VideoDetail;