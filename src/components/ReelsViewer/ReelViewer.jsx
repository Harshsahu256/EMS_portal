

// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom"; // Import useParams and useLocation
// import { IoArrowBack } from "react-icons/io5";
// import { AiFillHeart } from "react-icons/ai";
// import { BiCommentDetail, BiShare } from "react-icons/bi";
// import { newsshorts, addLikeToShort } from "../../Services/authApi";
// import CommentOffcanvas from "./CommentOffcanvas";
// import logo from "../../assets/logo.png";

// const ReelViewer = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // To get state (allShorts, initialIndex)
//   const { slug } = useParams(); // To get slug from URL if navigating to /shorts/:slug

//   const [shorts, setShorts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [activeShort, setActiveShort] = useState(null);
//   const [activeShortIndex, setActiveShortIndex] = useState(0); // Track active short index
//   const reelsListRef = useRef(null);
//   const shortRefs = useRef([]); // To hold refs for each individual short div

//   // Effect to hide/show body scrollbar
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const fetchAllShorts = useCallback(async () => {
//     try {
//       if (shorts.length === 0) setIsLoading(true);
//       const response = await newsshorts();
//       const fetchedShorts = response?.data || [];
//       setShorts(fetchedShorts);

//       // Determine initial active short based on URL slug or passed state
//       let initialIndex = 0;
//       if (slug) {
//         // If slug is in URL, find its index
//         const indexBySlug = fetchedShorts.findIndex(s => s.slug === slug);
//         if (indexBySlug !== -1) {
//           initialIndex = indexBySlug;
//         }
//       } else if (location.state && location.state.initialIndex !== undefined) {
//         // If initialIndex is passed in state
//         initialIndex = location.state.initialIndex;
//       }
//       setActiveShortIndex(initialIndex);
//       setActiveShort(fetchedShorts[initialIndex] || null); // Set activeShort initially
//       // Update URL if it doesn't match the initial short's slug (important for direct slug access)
//       if (fetchedShorts[initialIndex] && location.pathname !== `/shorts/${fetchedShorts[initialIndex].slug}`) {
//         navigate(`/shorts/${fetchedShorts[initialIndex].slug}`, { replace: true });
//       }

//     } catch (err) {
//       console.error("Error fetching shorts:", err);
//       setError("रील्स लोड करने में समस्या हुई");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [slug, location.state, navigate]); // Depend on slug and location.state for initial load

//   useEffect(() => {
//     fetchAllShorts();
//   }, [fetchAllShorts]);

//   // Scroll to the active short when the component loads or activeShortIndex changes
//   useEffect(() => {
//     if (shorts.length > 0 && reelsListRef.current && shortRefs.current[activeShortIndex]) {
//       // Calculate scroll position to center the active short
//       const shortElement = shortRefs.current[activeShortIndex];
//       const container = reelsListRef.current;
//       if (shortElement && container) {
//         const scrollOffset = shortElement.offsetTop - (container.clientHeight / 2) + (shortElement.clientHeight / 2);
//         container.scrollTo({
//           top: scrollOffset,
//           behavior: 'smooth'
//         });
//       }
//     }
//   }, [activeShortIndex, shorts]);


//   // Intersection Observer for updating slug on scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && entry.intersectionRatio >= 0.75) { // Consider 75% visibility
//             const index = parseInt(entry.target.dataset.index, 10);
//             if (shorts[index] && shorts[index].slug && index !== activeShortIndex) {
//               setActiveShortIndex(index);
//               setActiveShort(shorts[index]); // Update activeShort for comments/likes
//               navigate(`/shorts/${shorts[index].slug}`, { replace: true }); // Update URL with new slug
//             }
//           }
//         });
//       },
//       {
//         root: reelsListRef.current, // Observe within the scrollable reels list
//         rootMargin: '0px',
//         threshold: 0.75, // A short is considered "active" when 75% of it is visible
//       }
//     );

//     // Observe each short container
//     shortRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => {
//       observer.disconnect(); // Clean up observer on unmount
//     };
//   }, [shorts, navigate, activeShortIndex]); // Re-run if shorts or navigate changes


//   // Infinite scroll detect - now adjusted for the new `shorts` state
//   const handleScroll = () => {
//     const el = reelsListRef.current;
//     if (!el || isLoading) return; // Don't trigger if loading

//     // If user is near the end, duplicate the list (basic infinite scroll)
//     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) { // 50px buffer
//       // Ensure we don't fetch/duplicate if there's an actual 'next page' logic later
//       // For now, it duplicates the current set.
//       setShorts((prev) => [...prev, ...shorts]); // Duplicates original fetched shorts
//     }

//     // You could also detect the actively viewed reel by scroll position if IntersectionObserver isn't precise enough
//     // For now, IntersectionObserver handles active short detection and slug change.
//   };


//   const handleLike = async (shortId) => {
//     const originalShorts = [...shorts];
//     const updatedShorts = shorts.map((s) =>
//       s._id === shortId
//         ? {
//             ...s,
//             isLikedByCurrentUser: !s.isLikedByCurrentUser,
//             likesCount: s.isLikedByCurrentUser
//               ? s.likesCount - 1
//               : s.likesCount + 1,
//           }
//         : s
//     );
//     setShorts(updatedShorts);
//     try {
//       await addLikeToShort(shortId);
//     } catch (err) {
//       alert("Something went wrong while liking");
//       setShorts(originalShorts);
//     }
//   };

//   const openCommentBox = (short) => {
//     setActiveShort(short); // Ensure the correct activeShort is set for the comment box
//     setShowCommentBox(true);
//   };

//   const handleCommentPosted = () => {
//     // If a comment is posted, you might want to refresh the comments count for the active short
//     // For now, re-fetching all shorts will update counts.
//     fetchAllShorts(); // Re-fetch all shorts to update comment counts
//   };

//   if (isLoading) { // Only check isLoading here
//     return (
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <h5 className="text-white">Reels are loading...</h5>
//       </div>
//     );
//   }

//   if (error) { // Display error separately
//     return (
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <h5 className="text-white">{error}</h5>
//       </div>
//     );
//   }

//   if (shorts.length === 0) {
//     return (
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <h5 className="text-white">No reels available.</h5>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <IoArrowBack className="position-absolute top-0 start-0 m-3 text-white h2"
//           style={{ cursor: "pointer", zIndex: 10 }}
//           onClick={() => navigate(-1)} />
//         <div className="reels-main-container h-100 position-relative"
//           style={{ width: "100%", maxWidth: "420px", backgroundColor: "#000" }}>

//           <div
//             className="reels-list h-100 overflow-y-scroll"
//             ref={reelsListRef}
//             onScroll={handleScroll}
//             style={{
//               scrollSnapType: "y mandatory",
//               msOverflowStyle: "none",
//               scrollbarWidth: "none"
//             }}
//           >
//             {shorts.map((short, index) => (
//               <div key={`${short._id}-${index}`} // Unique key using _id and index
//                 ref={(el) => (shortRefs.current[index] = el)} // Assign ref for IntersectionObserver
//                 data-index={index} // Store index as data attribute
//                 className="h-100 w-100 d-flex justify-content-center align-items-center position-relative"
//                 style={{ scrollSnapAlign: "start" }}>

//                 {/* Video */}
//                 <video
//                   src={short.videoUrl}
//                   loop
//                   autoPlay
//                   muted // Start muted to comply with autoplay policies
//                   playsInline
//                   className="w-100 h-100"
//                   style={{ objectFit: "cover" }}
//                   onClick={(e) => {
//                     // Toggle mute on click
//                     e.target.muted = !e.target.muted;
//                   }}
//                 ></video>

//                 {/* Logo */}
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="position-absolute"
//                   style={{
//                     top: "10px",
//                     left: "10px",
//                     width: "200px",
//                     opacity: 0.9,
//                     zIndex: 20,
//                   }}
//                 />

//                 {/* Bottom overlay */}
//                 <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex align-items-end"
//                   style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 10%, transparent)" }}>
//                   <div className="flex-grow-1">
//                     <h5 className="fw-bold m-0">@{short.createdBy?.name ?? "User"}</h5>
//                     <p className="m-0 mt-1 small">{short.title}</p>
//                   </div>
//                   <div className="d-flex flex-column align-items-center gap-4">
//                     <div className="text-center" style={{ cursor: "pointer" }}
//                       onClick={() => handleLike(short._id)}>
//                       <AiFillHeart
//                         className={`h1 ${short.isLikedByCurrentUser ? "text-danger" : "text-white"}`}
//                       />
//                       <span className="d-block small fw-bold text-white">
//                         {short.likesCount ?? 0}
//                       </span>
//                     </div>
//                     <div className="text-center" style={{ cursor: "pointer" }}
//                       onClick={() => openCommentBox(short)}>
//                       <BiCommentDetail className="h1 text-white" />
//                       <span className="d-block small fw-bold text-white">
//                         {short.comments?.length ?? 0}
//                       </span>
//                     </div>
//                     <div className="text-center" style={{ cursor: "pointer" }}>
//                       <BiShare
//                         className="h1 text-white"
//                         style={{ transform: "scaleX(-1)" }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Comment Box */}
//       <CommentOffcanvas
//         show={showCommentBox}
//         onHide={() => setShowCommentBox(false)}
//         short={activeShort} // Pass the currently active short
//         onCommentPosted={handleCommentPosted}
//       />
//     </>
//   );
// };

// export default ReelViewer;


// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
// import { AiFillHeart } from "react-icons/ai";
// import { BiCommentDetail, BiShare } from "react-icons/bi";
// import { newsshorts, addLikeToShort } from "../../Services/authApi";
// import CommentOffcanvas from "./CommentOffcanvas";
// import logo from "../../assets/logo.png";

// const ReelViewer = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { slug } = useParams();

//   const [shorts, setShorts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [activeShort, setActiveShort] = useState(null);
//   const [activeShortIndex, setActiveShortIndex] = useState(0);
//   const reelsListRef = useRef(null);
//   const shortRefs = useRef([]);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const fetchAllShorts = useCallback(async () => {
//     try {
//       if (shorts.length === 0) setIsLoading(true);
//       const response = await newsshorts();
//       const fetchedShorts = response?.data || [];
//       setShorts(fetchedShorts);

//       let initialIndex = 0;
//       if (slug) {
//         const indexBySlug = fetchedShorts.findIndex(s => s.slug === slug);
//         if (indexBySlug !== -1) {
//           initialIndex = indexBySlug;
//         }
//       } else if (location.state && location.state.initialIndex !== undefined) {
//         initialIndex = location.state.initialIndex;
//       }
//       setActiveShortIndex(initialIndex);
//       setActiveShort(fetchedShorts[initialIndex] || null);

//       // Ensure URL matches the initial active short
//       if (fetchedShorts[initialIndex] && location.pathname !== `/shorts/${fetchedShorts[initialIndex].slug}`) {
//         navigate(`/shorts/${fetchedShorts[initialIndex].slug}`, { replace: true });
//       }

//     } catch (err) {
//       console.error("Error fetching shorts:", err);
//       setError("रील्स लोड करने में समस्या हुई");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [slug, location.state, navigate]);

//   useEffect(() => {
//     fetchAllShorts();
//   }, [fetchAllShorts]);

//   // Scroll to the initial active short only once on load or when shorts change significantly
//   useEffect(() => {
//     if (shorts.length > 0 && reelsListRef.current && shortRefs.current[activeShortIndex]) {
//       const shortElement = shortRefs.current[activeShortIndex];
//       const container = reelsListRef.current;
//       if (shortElement && container) {
//         // Use scrollIntoView for better browser compatibility with scroll-snap
//         shortElement.scrollIntoView({
//           behavior: 'instant', // Use 'instant' for initial load to prevent visual jumps
//           block: 'start' // Ensure the top of the short aligns with the top of the container
//         });
//       }
//     }
//   }, [activeShortIndex, shorts]);


//   // Intersection Observer for updating slug on scroll - MODIFIED THRESHOLD
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           // Only update if the entry is fully intersecting (or very nearly so)
//           // and it's a new short.
//           if (entry.isIntersecting && entry.intersectionRatio >= 0.95) { // Adjusted threshold
//             const index = parseInt(entry.target.dataset.index, 10);
//             if (shorts[index] && shorts[index].slug && index !== activeShortIndex) {
//               setActiveShortIndex(index);
//               setActiveShort(shorts[index]);
//               navigate(`/shorts/${shorts[index].slug}`, { replace: true });
//             }
//           }
//         });
//       },
//       {
//         root: reelsListRef.current,
//         rootMargin: '0px',
//         threshold: 0.95, // New, higher threshold
//       }
//     );

//     shortRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, [shorts, navigate, activeShortIndex]); // Keep dependencies as is

//   const handleScroll = () => {
//     const el = reelsListRef.current;
//     if (!el || isLoading) return;

//     // Basic infinite scroll: duplicate shorts when near the end
//     // This is a simple duplication. For a real app, you'd fetch more data from the server.
//     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50 && shorts.length > 0) {
//       // Avoid excessive duplication by checking if the last set of original shorts has been added
//       const originalShortsLength = shorts.filter((_, i) => i < shorts.length / 2).length; // Assuming first half is original
//       if (shorts.length % originalShortsLength === 0) { // Check if we've just completed an original set
//         setShorts((prev) => [...prev, ...prev.slice(0, originalShortsLength)]); // Duplicate original set
//       }
//     }
//   };


//   const handleLike = async (shortId) => {
//     const originalShorts = [...shorts];
//     const updatedShorts = shorts.map((s) =>
//       s._id === shortId
//         ? {
//             ...s,
//             isLikedByCurrentUser: !s.isLikedByCurrentUser,
//             likesCount: s.isLikedByCurrentUser
//               ? s.likesCount - 1
//               : s.likesCount + 1,
//           }
//         : s
//     );
//     setShorts(updatedShorts);
//     try {
//       await addLikeToShort(shortId);
//     } catch (err) {
//       alert("Something went wrong while liking");
//       setShorts(originalShorts);
//     }
//   };

//   const openCommentBox = (short) => {
//     setActiveShort(short);
//     setShowCommentBox(true);
//   };

//   const handleCommentPosted = () => {
//     // You might want to update comments count directly for the active short
//     // or refetch to ensure all data is fresh.
//     fetchAllShorts(); // Re-fetch all shorts to update comment counts
//   };

//   if (isLoading) {
//     return (
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <h5 className="text-white">Reels are loading...</h5>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <h5 className="text-white">{error}</h5>
//       </div>
//     );
//   }

//   if (shorts.length === 0) {
//     return (
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <h5 className="text-white">No reels available.</h5>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <IoArrowBack className="position-absolute top-0 start-0 m-3 text-white h2"
//           style={{ cursor: "pointer", zIndex: 10 }}
//           onClick={() => navigate(-1)} />
//         <div className="reels-main-container h-100 position-relative"
//           style={{ width: "100%", maxWidth: "420px", backgroundColor: "#000" }}>

//           <div
//             className="reels-list h-100 overflow-y-scroll"
//             ref={reelsListRef}
//             onScroll={handleScroll}
//             style={{
//               scrollSnapType: "y mandatory",
//               msOverflowStyle: "none",
//               scrollbarWidth: "none"
//             }}
//           >
//             {shorts.map((short, index) => (
//               <div key={`${short._id}-${index}`}
//                 ref={(el) => (shortRefs.current[index] = el)}
//                 data-index={index}
//                 className="h-100 w-100 d-flex justify-content-center align-items-center position-relative"
//                 style={{ scrollSnapAlign: "start" }}>

//                 {/* Video */}
//                 <video
//                   src={short.videoUrl}
//                   loop
//                   autoPlay
//                   muted // Start muted to comply with autoplay policies
//                   playsInline
//                   className="w-100 h-100"
//                   style={{ objectFit: "cover" }}
//                   onClick={(e) => {
//                     // Toggle mute on click
//                     e.target.muted = !e.target.muted;
//                   }}
//                 ></video>

//                 {/* Logo */}
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="position-absolute"
//                   style={{
//                     top: "10px",
//                     left: "10px",
//                     width: "200px",
//                     opacity: 0.9,
//                     zIndex: 20,
//                   }}
//                 />

//                 {/* Bottom overlay */}
//                 <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex align-items-end"
//                   style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 10%, transparent)" }}>
//                   <div className="flex-grow-1">
//                     <h5 className="fw-bold m-0">@{short.createdBy?.name ?? "User"}</h5>
//                     <p className="m-0 mt-1 small">{short.title}</p>
//                   </div>
//                   <div className="d-flex flex-column align-items-center gap-4">
//                     <div className="text-center" style={{ cursor: "pointer" }}
//                       onClick={() => handleLike(short._id)}>
//                       <AiFillHeart
//                         className={`h1 ${short.isLikedByCurrentUser ? "text-danger" : "text-white"}`}
//                       />
//                       <span className="d-block small fw-bold text-white">
//                         {short.likesCount ?? 0}
//                       </span>
//                     </div>
//                     <div className="text-center" style={{ cursor: "pointer" }}
//                       onClick={() => openCommentBox(short)}>
//                       <BiCommentDetail className="h1 text-white" />
//                       <span className="d-block small fw-bold text-white">
//                         {short.comments?.length ?? 0}
//                       </span>
//                     </div>
//                     <div className="text-center" style={{ cursor: "pointer" }}>
//                       <BiShare
//                         className="h1 text-white"
//                         style={{ transform: "scaleX(-1)" }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <CommentOffcanvas
//         show={showCommentBox}
//         onHide={() => setShowCommentBox(false)}
//         short={activeShort}
//         onCommentPosted={handleCommentPosted}
//       />
//     </>
//   );
// };

// export default ReelViewer;

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail, BiShare } from "react-icons/bi";
import { newsshorts, addLikeToShort } from "../../Services/authApi";
import CommentOffcanvas from "./CommentOffcanvas";
import logo from "../../assets/logo.png";
import logoT from "../../assets/logoT.png";
 
const ReelViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
 
  const [shorts, setShorts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [activeShort, setActiveShort] = useState(null);
  const [activeShortIndex, setActiveShortIndex] = useState(0);
  const reelsListRef = useRef(null);
  const shortRefs = useRef([]);
 
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
 
  // ✅ API सिर्फ एक बार call होगी
  const fetchAllShorts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await newsshorts();
      const fetchedShorts = response?.data || [];
      setShorts(fetchedShorts);
 
      let initialIndex = 0;
      if (slug) {
        const indexBySlug = fetchedShorts.findIndex((s) => s.slug === slug);
        if (indexBySlug !== -1) {
          initialIndex = indexBySlug;
        }
      } else if (location.state?.initialIndex !== undefined) {
        initialIndex = location.state.initialIndex;
      }
 
      setActiveShortIndex(initialIndex);
      setActiveShort(fetchedShorts[initialIndex] || null);
 
      if (
        fetchedShorts[initialIndex] &&
        location.pathname !== `/shorts/${fetchedShorts[initialIndex].slug}`
      ) {
        navigate(`/shorts/${fetchedShorts[initialIndex].slug}`, {
          replace: true,
        });
      }
    } catch (err) {
      console.error("Error fetching shorts:", err);
      setError("रील्स लोड करने में समस्या हुई");
    } finally {
      setIsLoading(false);
    }
  }, []); // ✅ खाली dependency
 
  useEffect(() => {
    fetchAllShorts();
  }, [fetchAllShorts]);
 
  // ✅ Initial scroll position
  useEffect(() => {
    if (
      shorts.length > 0 &&
      reelsListRef.current &&
      shortRefs.current[activeShortIndex]
    ) {
      const shortElement = shortRefs.current[activeShortIndex];
      if (shortElement) {
        shortElement.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      }
    }
  }, [activeShortIndex, shorts]);
 
  // ✅ Intersection observer for slug update
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (
              shorts[index] &&
              shorts[index].slug &&
              index !== activeShortIndex
            ) {
              setActiveShortIndex(index);
              setActiveShort(shorts[index]);
              navigate(`/shorts/${shorts[index].slug}`, { replace: true });
            }
          }
        });
      },
      {
        root: reelsListRef.current,
        rootMargin: "0px",
        threshold: 0.95,
      }
    );
 
    shortRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
 
    return () => {
      observer.disconnect();
    };
  }, [shorts, navigate, activeShortIndex]);
 
  // ✅ Infinite scroll (local state duplication only, no API call)
  const handleScroll = () => {
    const el = reelsListRef.current;
    if (!el || isLoading) return;
 
    if (
      el.scrollTop + el.clientHeight >= el.scrollHeight - 50 &&
      shorts.length > 0
    ) {
      const originalLength = shorts.length;
      setShorts((prev) => [...prev, ...prev.slice(0, originalLength)]);
    }
  };
 
  // ✅ Like handler (local update + API)
  const handleLike = async (shortId) => {
    const originalShorts = [...shorts];
    const updatedShorts = shorts.map((s) =>
      s._id === shortId
        ? {
            ...s,
            isLikedByCurrentUser: !s.isLikedByCurrentUser,
            likesCount: s.isLikedByCurrentUser
              ? s.likesCount - 1
              : s.likesCount + 1,
          }
        : s
    );
    setShorts(updatedShorts);
 
    try {
      await addLikeToShort(shortId);
    } catch (err) {
      alert("Something went wrong while liking");
      setShorts(originalShorts);
    }
  };
 
  // ✅ Comment box open
  const openCommentBox = (short) => {
    setActiveShort(short);
    setShowCommentBox(true);
  };
 
  // ✅ Comment posted → सिर्फ local state update
  const handleCommentPosted = (shortId) => {
    setShorts((prev) =>
      prev.map((s) =>
        s._id === shortId
          ? { ...s, commentsCount: (s.commentsCount ?? 0) + 1 }
          : s
      )
    );
  };
 
  // ================= UI =================
  if (isLoading) {
    return (
      <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
        style={{ zIndex: 99999 }}>
        <h5 className="text-white">Reels are loading...</h5>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
        style={{ zIndex: 99999 }}>
        <h5 className="text-white">{error}</h5>
      </div>
    );
  }
 
  if (shorts.length === 0) {
    return (
      <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
        style={{ zIndex: 99999 }}>
        <h5 className="text-white">No reels available.</h5>
      </div>
    );
  }
 
  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
        style={{ zIndex: 99999 }}>
        <IoArrowBack className="position-absolute top-0 start-0 m-3 text-white h2"
          style={{ cursor: "pointer", zIndex: 10 }}
          onClick={() => navigate(-1)} />
        <div className="reels-main-container h-100 position-relative"
          style={{ width: "100%", maxWidth: "420px", backgroundColor: "#000" }}>
          <div className="reels-list h-100 overflow-y-scroll"
            ref={reelsListRef}
            onScroll={handleScroll}
            style={{
              scrollSnapType: "y mandatory",
              msOverflowStyle: "none",
              scrollbarWidth: "none"
            }}>
            {shorts.map((short, index) => (
              <div key={`${short._id}-${index}`}
                ref={(el) => (shortRefs.current[index] = el)}
                data-index={index}
                className="h-100 w-100 d-flex justify-content-center align-items-center position-relative"
                style={{ scrollSnapAlign: "start" }}>
                <video
                  src={short.videoUrl}
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onClick={(e) => (e.target.muted = !e.target.muted)}
                ></video>
 
                {/* Logo */}
            <video
  src="/logogif.mp4"  // public folder me rakhi file
  autoPlay
  loop
  muted
  className="position-absolute top-0 start-0 m-3"
  style={{ width: "60px", zIndex: 2100 }}
/>

 
                {/* Bottom overlay */}
                <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex align-items-end"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 10%, transparent)" }}>
                  <div className="flex-grow-1">
                    <h5 className="fw-bold m-0">@{short.createdBy?.name ?? "User"}</h5>
                    <p className="m-0 mt-1 small">{short.title}</p>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-4">
                    <div className="text-center" style={{ cursor: "pointer" }}
                      onClick={() => handleLike(short._id)}>
                      <AiFillHeart
                        className={`h1 ${short.isLikedByCurrentUser ? "text-danger" : "text-white"}`}
                      />
                      <span className="d-block small fw-bold text-white">
                        {short.likesCount ?? 0}
                      </span>
                    </div>
                    <div className="text-center" style={{ cursor: "pointer" }}
                      onClick={() => openCommentBox(short)}>
                      <BiCommentDetail className="h1 text-white" />
                      <span className="d-block small fw-bold text-white">
                        {short.commentsCount ?? 0}
                      </span>
                    </div>
                    <div className="text-center" style={{ cursor: "pointer" }}>
                      <BiShare className="h1 text-white"
                        style={{ transform: "scaleX(-1)" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      <CommentOffcanvas
        show={showCommentBox}
        onHide={() => setShowCommentBox(false)}
        short={activeShort}
        onCommentPosted={(id) => handleCommentPosted(id)}
      />
    </>
  );
};
 
export default ReelViewer;
 