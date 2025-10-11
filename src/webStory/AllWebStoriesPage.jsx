
// import React, { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { getWebStroy } from "../Services/authApi";
// import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
// import { useLocation } from "react-router-dom";

// const AllWebStoriesPage = () => {
//   const location = useLocation();
//   const stateStories = location.state?.allWebStories;

//   const [stories, setStories] = useState(stateStories || []);
//   const [loading, setLoading] = useState(!stateStories); // agar state me stories nahi hai to loading true
//   const [error, setError] = useState(null);

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

//   // Agar state me stories nahi hai to fetch kar lo
//   useEffect(() => {
//     if (!stateStories) {
//       const fetchStories = async () => {
//         try {
//           const response = await getWebStroy();
//           if (response.success && response.data) {
//             setStories(response.data);
//           } else {
//             setError("Failed to load stories.");
//           }
//         } catch (err) {
//           setError(err.message || "Error fetching stories.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchStories();
//     }
//   }, [stateStories]);

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
//       dur = (videoRef.current?.duration || 5) * 1000;
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

//   const openOverlay = (story) => {
//     setSelectedStory(story);
//     setCurrentSlide(0);
//     setIsPaused(false);
//   };

//   const closeOverlay = () => {
//     setSelectedStory(null);
//     setCurrentSlide(0);
//     setIsPaused(false);
//   };

//   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (!stories.length) return <Alert variant="info" className="mt-4">No stories found.</Alert>;

//   return (
//     <Container className="mt-4">
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//     <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//       <div
//         style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }}
//         className="me-2"
//       />
//       <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
//     </div>
//   </div>

//       <Row>
//         {stories.map(story => {
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

// export default AllWebStoriesPage;






import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { getWebStroy } from "../Services/authApi";
import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";

const AllWebStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedStory, setSelectedStory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [duration, setDuration] = useState(5000);
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
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

  // ✅ हमेशा backend से fetch करो
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await getWebStroy();
        if (response.success && response.data) {
          setStories(response.data); // सारे stories load होंगे
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

  // Video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
    }
  }, [isPaused, currentSlide]);

  // Progress Control
  useEffect(() => {
    if (!selectedStory || isPaused) return;

    const slide = selectedStory.slides[currentSlide];
    if (!slide) return;

    let dur = 5000;
    if (slide.mediaType === "video") {
      dur = (videoRef.current?.duration || 5) * 1000;
    }
    setDuration(dur);

    let start = Date.now() - elapsedTime;
    setProgress((elapsedTime / dur) * 100);

    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed >= dur) {
        setProgress(100);
        setElapsedTime(0);
        nextSlide();
        return;
      }
      setProgress((elapsed / dur) * 100);
      progressRef.current = requestAnimationFrame(tick);
    };

    progressRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(progressRef.current);
  }, [selectedStory, currentSlide, isPaused]);

  useEffect(() => {
    if (isPaused) setElapsedTime((progress / 100) * duration);
  }, [isPaused]);

  // Page open होते ही top पर scroll करने के लिए
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);


  const nextSlide = () => {
    if (!selectedStory) return;
    if (currentSlide < selectedStory.slides.length - 1) setCurrentSlide(prev => prev + 1);
    else closeOverlay();
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  const openOverlay = (story) => {
    setSelectedStory(story);
    setCurrentSlide(0);
    setIsPaused(false);
  };

  const closeOverlay = () => {
    setSelectedStory(null);
    setCurrentSlide(0);
    setIsPaused(false);
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!stories.length) return <Alert variant="info" className="mt-4">No stories found.</Alert>;

  return (
    <Container className="mt-4">
      {/* Heading with Red Line */}
     <div className="d-flex align-items-center mb-3 flex-wrap">
  <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
    <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
    <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
  </div>

  {/* यह line heading के right तक जाएगी */}
  <div
    style={{
      flexGrow: 1,
      height: "3px",          // line की thickness
      backgroundColor: "#C00000",
      marginLeft: "10px",     // heading से gap
      alignSelf: "center"
    }}
  />
</div>

      {/* ✅ अब backend से आने वाली सारी stories render होंगी */}
      <Row>
        {stories.map(story => {
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

      {selectedStory && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
          <div className="position-relative" style={{ height: "100vh", width: "500px", maxWidth: "95%" }}>
            {/* Progress Bar */}
            <div className="d-flex position-absolute top-0 start-0 w-100 p-2 gap-1" style={{ zIndex: 2000 }}>
              {selectedStory.slides.map((_, i) => (
                <div key={i} className="flex-grow-1 bg-dark rounded overflow-hidden" style={{ height: "5px" }}>
                  <div className="h-100" style={{
                    backgroundColor: "red",
                    width: i < currentSlide ? "100%" : i === currentSlide ? `${progress}%` : "0%"
                  }} />
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="d-flex position-absolute top-0 end-0 p-2 gap-3" style={{ marginTop: "10px", zIndex: 2100 }}>
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
                <video key={currentSlide} ref={videoRef} src={selectedStory.slides[currentSlide].mediaUrl} autoPlay muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
              ) : (
                <img key={currentSlide} src={selectedStory.slides[currentSlide]?.mediaUrl} alt="" className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
              )}
            </div>

            {/* Caption */}
            <div key={currentSlide} className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", animation: "slideInRight 0.6s ease-out" }}>
              <h5 style={{ color: "#ff4d4d", fontWeight: "bold" }}>{selectedStory.title}</h5>
              <p className="small">{selectedStory.slides[currentSlide]?.caption}</p>
            </div>

            {/* Prev / Next */}
            <button onClick={prevSlide} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, left: "-60px" }}>‹</button>
            <button onClick={nextSlide} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, right: "-60px" }}>›</button>

            {/* Close */}
            <button onClick={closeOverlay} className="btn btn-dark position-absolute top-0 start-0 m-2">✕</button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AllWebStoriesPage;
