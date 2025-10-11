

// import React, { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { getWebStroy } from "../Services/authApi";
// import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
// import { Link } from "react-router-dom";
// import {  useNavigate } from "react-router-dom";



// const WebStorySection = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();


//   const [selectedStory, setSelectedStory] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [duration, setDuration] = useState(5000);
//   const [isPaused, setIsPaused] = useState(false);

//   const videoRef = useRef(null);
//   const [progress, setProgress] = useState(0);
//   const progressRef = useRef(null);
//   const [elapsedTime, setElapsedTime] = useState(0);

//   // Inject Keyframes
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       @keyframes zoomOut {
//         0% { transform: scale(1.2); opacity: 0.8; }
//         100% { transform: scale(1); opacity: 1; }
//       }
//       @keyframes slideInRight {
//         from { transform: translateX(100%); opacity: 0; }
//         to { transform: translateX(0); opacity: 1; }
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);



//   // Fetch stories
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const fetchStories = async () => {
//       try {
//         const response = await getWebStroy();
//         if (response.success && response.data) {
//           const latestFour = response.data.slice(0, 4);
//           setStories(latestFour);
//         } else {
//           setError("Failed to load stories.");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching stories.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStories();
//   }, []);

//   // Video play/pause
//   useEffect(() => {
//     if (videoRef.current) {
//       if (isPaused) videoRef.current.pause();
//       else videoRef.current.play().catch(() => {});
//     }
//   }, [isPaused, currentSlide]);

//   // Progress Control
//   useEffect(() => {
//     if (!selectedStory || isPaused) return;

//     const slide = selectedStory.slides[currentSlide];
//     if (!slide) return;

//     let dur = 5000;
//     if (slide.mediaType === "video") {
//       dur =
//         (videoRef.current && videoRef.current.duration
//           ? videoRef.current.duration
//           : 5) * 1000;
//     }
//     setDuration(dur);

//     let start = Date.now() - elapsedTime;
//     setProgress((elapsedTime / dur) * 100);

//     const tick = () => {
//       const elapsed = Date.now() - start;
//       if (elapsed >= dur) {
//         setProgress(100);
//         setElapsedTime(0);
//         nextSlide();
//         return;
//       }
//       setProgress((elapsed / dur) * 100);
//       progressRef.current = requestAnimationFrame(tick);
//     };

//     progressRef.current = requestAnimationFrame(tick);

//     return () => cancelAnimationFrame(progressRef.current);
//   }, [selectedStory, currentSlide, isPaused]);

//   useEffect(() => {
//     if (isPaused) setElapsedTime((progress / 100) * duration);
//   }, [isPaused]);

//   const nextSlide = () => {
//     if (!selectedStory) return;
//     if (currentSlide < selectedStory.slides.length - 1) setCurrentSlide(prev => prev + 1);
//     else closeOverlay();
//   };

//   const prevSlide = () => {
//     if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
//   };

//   // URL update helpers
//   const updateURLWithSlug = (slug) => {
//     if (window && window.history) {
//       window.history.replaceState(null, "", `/web-stories/${slug}`);
//     }
//   };

//   const openOverlay = (story) => {
//     setSelectedStory(story);
//     setCurrentSlide(0);
//     setIsPaused(false);
//     updateURLWithSlug(story.slug);
//   };

 
//  const closeOverlay = () => {
//   setSelectedStory(null);
//   setCurrentSlide(0);
//   setIsPaused(false);
//   navigate("/"); // ✅ यह हमेशा homepage पर redirect करेगा
// };

//   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <Container className="mt-4">
//    <div className="d-flex align-items-center mb-3 flex-wrap">
//   <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//     <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
//     <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
//   </div>

//   {/* Horizontal red line */}
//   <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />

//   {/* और देखें Button */}
//   <Link
//     to="/all-webstories"
//     state={{ allWebStories: stories }}
//     className="text-decoration-none fw-bold small flex-shrink-0"
//     style={{ color: "#2E6E9E" }}
//   >
//     और देखें
//   </Link>
// </div>


//       <Row>
//         {stories.map((story) => {
//           const firstSlide = story.slides?.[0];
//           return (
//             <Col
//               key={story._id}
//               xs={12} sm={6} md={4} lg={3}
//               className="mb-3"
//               onClick={() => openOverlay(story)}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="position-relative overflow-hidden rounded" style={{ height: "300px", backgroundColor: "#000" }}>
//                 {firstSlide?.mediaType === "video" ? (
//                   <video src={firstSlide.mediaUrl} muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
//                 ) : (
//                   <img src={firstSlide?.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"} alt={story.title} className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
//                 )}
//                 <div className="position-absolute bottom-0 start-0 w-100 p-2 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))" }}>
//                   <h6 className="mb-0">{story.title}</h6>
//                 </div>
//               </div>
//             </Col>
//           );
//         })}
//       </Row>

//       {selectedStory && (
//         <div className="position-fixed top-0 start-0 w-100 h-100 bg-black d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
//           <div className="position-relative" style={{ height: "100vh", width: "500px", maxWidth: "95%" }}>
//             {/* Progress Bar */}
//             <div className="d-flex position-absolute top-0 start-0 w-100 p-2 gap-1" style={{ zIndex: 2000 }}>
//               {selectedStory.slides.map((_, i) => (
//                 <div key={i} className="flex-grow-1 bg-dark rounded overflow-hidden" style={{ height: "5px" }}>
//                   <div className="h-100" style={{
//                     backgroundColor: "red",
//                     width: i < currentSlide ? "100%" : i === currentSlide ? `${progress}%` : "0%"
//                   }} />
//                 </div>
//               ))}
//             </div>

//             {/* Controls */}
//             <div className="d-flex position-absolute top-0 end-0 p-2 gap-3" style={{ marginTop: "10px", zIndex: 2100 }}>
//               {isPaused ? (
//                 <HiOutlinePlay onClick={() => setIsPaused(false)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
//               ) : (
//                 <HiOutlinePause onClick={() => setIsPaused(true)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
//               )}
//             </div>

//             {/* Slide Navigation */}
//             <div className="w-100 h-100 position-relative" style={{ overflow: "hidden" }} onClick={(e) => {
//               const { clientX, currentTarget } = e;
//               const { width, left } = currentTarget.getBoundingClientRect();
//               const clickX = clientX - left;
//               if (clickX < width / 2) prevSlide();
//               else nextSlide();
//             }}>
//               {selectedStory.slides[currentSlide]?.mediaType === "video" ? (
//                 <video key={currentSlide} ref={videoRef} src={selectedStory.slides[currentSlide].mediaUrl} autoPlay muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
//               ) : (
//                 <img key={currentSlide} src={selectedStory.slides[currentSlide]?.mediaUrl} alt="" className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
//               )}
//             </div>

//             {/* Caption */}
//             <div key={currentSlide} className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", animation: "slideInRight 0.6s ease-out" }}>
//               <h5 style={{ color: "#ff4d4d", fontWeight: "bold" }}>{selectedStory.title}</h5>
//               <p className="small">{selectedStory.slides[currentSlide]?.caption}</p>
//             </div>

//             {/* Prev / Next */}
//             <button onClick={prevSlide} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, left: "-60px" }}>‹</button>
//             <button onClick={nextSlide} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, right: "-60px" }}>›</button>

//             {/* Close */}
//             <button onClick={closeOverlay} className="btn btn-dark position-absolute top-0 start-0 m-2">✕</button>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default WebStorySection;

import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { getWebStroy } from "../Services/authApi";
import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const WebStorySection = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [selectedStory, setSelectedStory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [duration, setDuration] = useState(5000); // Default duration for image slides
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const progressAnimRef = useRef(null); // Renamed from progressRef to avoid confusion with DOM ref
  const [elapsedTime, setElapsedTime] = useState(0);

  // Inject Keyframes
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes zoomOut {
        0% { transform: scale(1.2); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Fetch stories
  useEffect(() => {
    window.scrollTo(0, 0); // यह लाइन वेब स्टोरी सेक्शन को प्रभावित कर सकती है, अगर यह होमपेज पर है तो विचार करें
    const fetchStories = async () => {
      try {
        const response = await getWebStroy();
        if (response.success && response.data) {
          const latestFour = response.data.slice(0, 4);
          setStories(latestFour);
        } else {
          setError("Failed to load stories.");
        }
      } catch (err) {
        setError(err.message || "Error fetching stories.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  // Video control (play/pause)
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
    }
  }, [isPaused, currentSlide, selectedStory]);

  // Progress animation (for both image and video)
  useEffect(() => {
    if (!selectedStory || isPaused || !selectedStory.slides[currentSlide]) {
      cancelAnimationFrame(progressAnimRef.current);
      return;
    }

    const slide = selectedStory.slides[currentSlide];
    let currentSlideDuration = duration; // Use the current state duration

    // If it's a video and videoRef is ready, use actual video duration
    if (slide.mediaType === "video" && videoRef.current && videoRef.current.duration) {
        currentSlideDuration = videoRef.current.duration * 1000;
        setDuration(currentSlideDuration); // Update duration state
    }
    
    // Set initial progress based on elapsedTime (if coming from paused state)
    let startTimestamp = Date.now() - elapsedTime;
    
    const tick = () => {
      const elapsed = Date.now() - startTimestamp;
      if (elapsed >= currentSlideDuration) {
        setProgress(100);
        setElapsedTime(0);
        cancelAnimationFrame(progressAnimRef.current);
        nextSlide();
        return;
      }
      setProgress((elapsed / currentSlideDuration) * 100);
      progressAnimRef.current = requestAnimationFrame(tick);
    };

    progressAnimRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(progressAnimRef.current);
  }, [selectedStory, currentSlide, isPaused, duration, elapsedTime]); // Add duration and elapsedTime as dependencies

  // Save elapsed time when paused
  useEffect(() => {
    if (isPaused) {
        setElapsedTime((progress / 100) * duration);
    }
  }, [isPaused, progress, duration]);

  // Reset progress and elapsed time when slide changes
  useEffect(() => {
    if (selectedStory) {
      setElapsedTime(0);
      setProgress(0);
      setIsPaused(false); // Autoplay on new story/slide
      if (selectedStory.slides[currentSlide]?.mediaType === "video") {
        setDuration(5000); // Reset duration for video until metadata loads
      } else {
        setDuration(5000); // Default duration for image
      }
    }
  }, [selectedStory, currentSlide]);


  const nextSlide = () => {
    if (!selectedStory) return;
    if (currentSlide < selectedStory.slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      closeOverlay();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else if (currentSlide === 0 && selectedStory) {
        // If on the first slide, do nothing or close the story, depending on desired UX
        // For now, let's keep it on the first slide
    }
  };

  // URL update helpers
  const updateURLWithSlug = (slug) => {
    if (window && window.history) {
      window.history.replaceState(null, "", `/web-stories/${slug}`);
    }
  };

  const openOverlay = (story) => {
    setSelectedStory(story);
    setCurrentSlide(0);
    setIsPaused(false);
    setElapsedTime(0); // Reset elapsed time
    setProgress(0);    // Reset progress
    updateURLWithSlug(story.slug);
  };

 
  const closeOverlay = () => {
    setSelectedStory(null);
    setCurrentSlide(0);
    setIsPaused(false);
    setElapsedTime(0); // Reset elapsed time
    setProgress(0);    // Reset progress
    navigate("/"); // ✅ यह हमेशा homepage पर redirect करेगा
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
   <div className="d-flex align-items-center mb-3 flex-wrap">
  <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
    <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
    <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
  </div>

  {/* Horizontal red line */}
  <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />

  {/* और देखें Button */}
  <Link
    to="/all-webstories"
    state={{ allWebStories: stories }}
    className="text-decoration-none fw-bold small flex-shrink-0"
    style={{ color: "#2E6E9E" }}
  >
    और देखें
  </Link>
</div>


      {/* ✅ Desktop Grid View */}
      <div className="d-none d-md-block"> {/* यह div केवल डेस्कटॉप पर दिखेगा */}
        <Row>
          {stories.map((story) => {
            const firstSlide = story.slides?.[0];
            return (
              <Col
                key={story._id}
                xs={12} sm={6} md={4} lg={3}
                className="mb-3"
                onClick={() => openOverlay(story)}
                style={{ cursor: "pointer" }}
              >
                <div className="position-relative overflow-hidden rounded" style={{ height: "300px", backgroundColor: "#000" }}>
                  {firstSlide?.mediaType === "video" ? (
                    <video src={firstSlide.mediaUrl} muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
                  ) : (
                    <img src={firstSlide?.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"} alt={story.title} className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
                  )}
                  <div className="position-absolute bottom-0 start-0 w-100 p-2 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))" }}>
                    <h6 className="mb-0">{story.title}</h6>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* ✅ Mobile Slider View */}
      <div className="d-md-none"> {/* यह div केवल मोबाइल पर दिखेगा */}
        <Swiper spaceBetween={10} slidesPerView={1.1}>
          {stories.map((story) => {
            const firstSlide = story.slides?.[0];
            return (
              <SwiperSlide key={story._id}>
                <div
                  onClick={() => openOverlay(story)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    overflow: "hidden",
                    height: "350px", // मोबाइल स्लाइडर के लिए थोड़ी अधिक ऊंचाई
                    backgroundColor: "#000",
                    position: "relative" // Added for proper positioning of inner elements
                  }}
                >
                  {firstSlide?.mediaType === "video" ? (
                    <video
                      src={firstSlide.mediaUrl}
                      muted
                      className="w-100 h-100"
                      style={{ objectFit: "contain", backgroundColor: "#000" }}
                    />
                  ) : (
                    <img
                      src={
                        firstSlide?.mediaUrl ||
                        "https://via.placeholder.com/300x400?text=Web+Story"
                      }
                      alt={story.title}
                      className="w-100 h-100"
                      style={{ objectFit: "contain", backgroundColor: "#000" }}
                    />
                  )}
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-2 text-white"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                    }}
                  >
                    <h6 className="mb-0">{story.title}</h6>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* ✅ Web Story Overlay */}
      {selectedStory && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-black d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
        >
          <div className="position-relative" style={{ height: "100vh", width: "500px", maxWidth: "95%" }}>
            {/* Story Progress Bars */}
            <div
              className="d-flex w-100 p-2"
              style={{ position: "absolute", top: 0, left: 0, zIndex: 1051, gap: "4px" }}
            >
              {selectedStory.slides.map((_, idx) => (
                <div key={idx} className="flex-grow-1 bg-dark rounded" style={{ height: "3px", overflow: "hidden" }}>
                  <div
                    className="bg-white"
                    style={{
                      width:
                        idx === currentSlide
                          ? `${progress}%`
                          : idx < currentSlide
                          ? "100%"
                          : "0%",
                      height: "100%",
                      transition: idx === currentSlide ? "none" : "width 0.1s linear", // No transition for current slide's dynamic progress
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Close Button - Moved to top-left */}
            <Button
              onClick={closeOverlay}
              className="position-absolute top-0 start-0 m-2" // 'end-0' को 'start-0' में बदला गया
              variant="light"
              style={{
                zIndex: 2100, // Make sure it's above other elements
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                backgroundColor: "rgba(255,255,255,0.7)",
                border: "none"
              }}
            >
              &times;
            </Button>

            {/* Controls (Play/Pause) - Positioned on top-right, relative to close button */}
            <div className="d-flex position-absolute top-0 end-0 p-2 gap-3" style={{ marginTop: "10px", right: "10px", zIndex: 2100 }}> {/* Removed right: "60px" and adjusted to be clear of new close button */}
              {isPaused ? (
                <HiOutlinePlay onClick={() => setIsPaused(false)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
              ) : (
                <HiOutlinePause onClick={() => setIsPaused(true)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
              )}
            </div>

            {/* Slide Navigation */}
            <div className="w-100 h-100 position-relative" style={{ overflow: "hidden" }} onClick={(e) => {
              const { clientX, currentTarget } = e;
              const { width, left } = currentTarget.getBoundingClientRect();
              const clickX = clientX - left;
              if (clickX < width / 2) prevSlide();
              else nextSlide();
            }}>
              {selectedStory.slides[currentSlide]?.mediaType === "video" ? (
                <video key={currentSlide} ref={videoRef} src={selectedStory.slides[currentSlide].mediaUrl} autoPlay muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }}
                    onLoadedMetadata={(e) => {
                        // Ensure duration is set for video on metadata load, but only if not paused
                        if (videoRef.current && !isPaused) {
                            setDuration(e.currentTarget.duration * 1000);
                        }
                    }}
                />
              ) : (
                <img key={currentSlide} src={selectedStory.slides[currentSlide]?.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"} alt="" className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
              )}
            </div>

            {/* Caption */}
            <div key={currentSlide} className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", animation: "slideInRight 0.6s ease-out" }}>
              <h5 style={{ color: "#ff4d4d", fontWeight: "bold" }}>{selectedStory.title}</h5>
              <p className="mb-0 small">{selectedStory.slides[currentSlide]?.caption}</p>
            </div>

            {/* Prev / Next buttons for overlay (outside clickable area) */}
            <button onClick={prevSlide} className="btn btn-dark position-absolute top-50 translate-middle-y d-none d-md-block" style={{ zIndex: 2100, left: "-60px" }}>‹</button>
            <button onClick={nextSlide} className="btn btn-dark position-absolute top-50 translate-middle-y d-none d-md-block" style={{ zIndex: 2100, right: "-60px" }}>›</button>

          </div>
        </div>
      )}
    </Container>
  );
};

export default WebStorySection;