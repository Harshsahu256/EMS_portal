
// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
// import { getVideo } from "../../Services/authApi";

// const EmstvSection = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       try {
//         const res = await getVideo();
//         if (res?.success) setVideos(res.data);
//         else setError("Failed to load videos");
//       } catch (err) {
//         setError(err.message || "Error fetching videos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="light" />
//       </div>
//     );

//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (videos.length === 0) return null;

//   const mainVideo = videos[0];
//   const belowMainVideo = videos[1];
//   const rightSideVideos = videos.slice(2, 10); // 8 videos

//   const getThumbnailUrl = (url) => {
//     if (!url) return "https://via.placeholder.com/400x225";
//     let videoId = "";
//     if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
//     else if (url.includes("youtube.com/watch"))
//       videoId = new URL(url).searchParams.get("v");
//     return videoId
//       ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
//       : "https://via.placeholder.com/400x225";
//   };

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const mutedTextStyle = { color: "rgba(255,255,255,0.7)" }; // white-ish for meta

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
//       <Container fluid className="py-4">
//         {/* ==== EMS TV Section Heading ==== */}
//         <div className="d-flex align-items-center mb-3 flex-wrap">
//           <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//             <div
//               style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}
//               className="me-2"
//             ></div>
//             <h5 className="fw-bold m-0 text-white">EMS TV</h5>
//           </div>
//           <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//           <Link
//             to="/emstv"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें <FaArrowRight size={12} />
//           </Link>
//         </div>

//         <Row className="align-items-stretch">
//           {/* ==== Left Section: Main Video + Small Below Video ==== */}
//           <Col xs={12} md={5} className="d-flex flex-column h-100">
//             {/* Main Big Video */}
//             {mainVideo && (
//               <Link
//                 to={`/video/${mainVideo._id}`}
//                 state={{ relatedVideos: videos }}
//                 style={linkStyle}
//                 className="d-block mb-3 flex-grow-1"
//               >
//                 <div className="ratio ratio-16x9 rounded overflow-hidden mb-2">
//                   <Image
//                     src={getThumbnailUrl(mainVideo.videoUrl)}
//                     alt={mainVideo.title}
//                     className="w-100 h-100"
//                     style={{ objectFit: "cover",borderRadius: "8px" }}
//                   />
//                 </div>
//                 <h6 className="fw-bold mb-1 text-white">{mainVideo.title}</h6>
//                 <div className="d-flex align-items-center">
//                   <Image
//                     src={mainVideo.createdBy?.profileImage || "https://via.placeholder.com/40"}
//                     roundedCircle
//                     width={25}
//                     height={25}
//                   />
//                   <small
//                     className="ms-2"
//                     style={{ ...mutedTextStyle, fontSize: "0.8rem" }}
//                   >
//                     {mainVideo.createdBy?.email || "EMS TV"} |{" "}
//                     {new Date(mainVideo.createdAt).toLocaleDateString("hi-IN")}
//                   </small>
//                 </div>
//               </Link>
//             )}

//             {/* Small Video Below Main */}
//             {belowMainVideo && (
//               <Link
//                 to={`/video/${belowMainVideo._id}`}
//                 state={{ relatedVideos: videos }}
//                 style={linkStyle}
//                 className="mt-auto"
//               >
//                 <div className="d-flex">
//                   <div
//                     className="flex-shrink-0 me-2"
//                     style={{ width: "100px", height: "70px" }}
//                   >
//                     <Image
//                       src={getThumbnailUrl(belowMainVideo.videoUrl)}
//                       alt={belowMainVideo.title}
//                       className="w-100 h-100 rounded"
//                       style={{ objectFit: "cover",borderRadius: "8px" }}
//                     />
//                   </div>
//                   <div>
//                     <p className="fw-bold small mb-1 text-white">{belowMainVideo.title}</p>
//                     <div className="d-flex align-items-center">
//                       <Image
//                         src={belowMainVideo.createdBy?.profileImage || "https://via.placeholder.com/30"}
//                         roundedCircle
//                         width={20}
//                         height={20}

//                       />
//                       <small
//                         className="ms-2"
//                         style={{ ...mutedTextStyle, fontSize: "0.75rem" }}
//                       >
//                         {belowMainVideo.createdBy?.email || "EMS"} |{" "}
//                         {new Date(belowMainVideo.createdAt).toLocaleDateString("hi-IN")}
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             )}
//           </Col>

//           {/* ==== Right Section: 8 Videos ==== */}
//           <Col xs={12} md={7} className="d-flex flex-column h-100">
//             <Row className="h-100" style={{ marginTop: "10px" }}>
//               {rightSideVideos.map((video) => (
//                 <Col xs={12} sm={6} key={video._id} className="mb-4">
//                   <Link
//                     to={`/video/${video._id}`}
//                     state={{ relatedVideos: videos }}
//                     style={linkStyle}
//                   >
//                     <div className="d-flex">
//                       <div
//                         className="flex-shrink-0 me-2"
//                         style={{ width: "100px", height: "70px" }}
//                       >
//                         <Image
//                           src={getThumbnailUrl(video.videoUrl)}
//                           alt={video.title}
//                           className="w-100 h-100 rounded"
//                           style={{ objectFit: "cover" ,borderRadius: "8px"}}
//                         />
//                       </div>
//                       <div>
//                         <p
//                           className="fw-bold small mb-1 text-white"
//                           style={{
//                             fontSize: "0.9rem",
//                             lineHeight: "1.3",
//                             display: "-webkit-box",
//                             WebkitLineClamp: 2,
//                             WebkitBoxOrient: "vertical",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}
//                         >
//                           {video.title}
//                         </p>
//                         <div className="d-flex align-items-center">
//                           <Image
//                             src={video.createdBy?.profileImage || "https://via.placeholder.com/30"}
//                             roundedCircle
//                             width={20}
//                             height={20}
//                           />
//                           <small
//                             className="ms-2"
//                             style={{ ...mutedTextStyle, fontSize: "0.75rem" }}
//                           >
//                             {video.createdBy?.email || "EMS"} |{" "}
//                             {new Date(video.createdAt).toLocaleDateString("hi-IN")}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default EmstvSection;



// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
// import { getVideo } from "../../Services/authApi";

// const EmstvSection = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       try {
//         const res = await getVideo();
//         if (res?.success) setVideos(res.data);
//         else setError("Failed to load videos");
//       } catch (err) {
//         setError(err.message || "Error fetching videos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="light" />
//       </div>
//     );

//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (videos.length === 0) return null;

//   const mainVideo = videos[0];
//   const belowMainVideo = videos[1];
//   const rightSideVideos = videos.slice(2, 10); // 8 videos

//   const getThumbnailUrl = (url) => {
//     if (!url) return "https://via.placeholder.com/400x225";
//     let videoId = "";
//     if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
//     else if (url.includes("youtube.com/watch"))
//       videoId = new URL(url).searchParams.get("v");
//     return videoId
//       ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
//       : "https://via.placeholder.com/400x225";
//   };

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const mutedTextStyle = { color: "rgba(255,255,255,0.7)" }; // white-ish for meta

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
//       <Container fluid className="py-4">
//         {/* ==== EMS TV Section Heading ==== */}
//         <div className="d-flex align-items-center mb-3 flex-wrap">
//           <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//             <div
//               style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}
//               className="me-2"
//             ></div>
//             <h5 className="fw-bold m-0 text-white">EMS TV</h5>
//           </div>
//           <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//           <Link
//             to="/emstv"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें <FaArrowRight size={12} />
//           </Link>
//         </div>

//         <Row className="align-items-stretch">
//           {/* Left Section */}
//           <Col xs={12} md={5} className="d-flex flex-column">
//             {mainVideo && (
//               <Link
//                 to={`/video/${mainVideo._id}`}
//                 state={{ relatedVideos: videos }}
//                 style={linkStyle}
//                 className="d-block mb-3 flex-grow-1"
//               >
//                 <div className="ratio ratio-16x9 rounded overflow-hidden mb-2">
//                   <Image
//                     src={getThumbnailUrl(mainVideo.videoUrl)}
//                     alt={mainVideo.title}
//                     className="w-100 h-100"
//                     style={{ objectFit: "cover", borderRadius: "8px" }}
//                   />
//                 </div>
//                 <h6 className="fw-bold mb-1 text-white">{mainVideo.title}</h6>
//                 <div className="d-flex align-items-center">
//                   <Image
//                     src={mainVideo.createdBy?.profileImage || "https://via.placeholder.com/40"}
//                     roundedCircle
//                     width={25}
//                     height={25}
//                   />
//                   <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
//                     {mainVideo.createdBy?.email || "EMS TV"} |{" "}
//                     {new Date(mainVideo.createdAt).toLocaleDateString("hi-IN")}
//                   </small>
//                 </div>
//               </Link>
//             )}

//             {belowMainVideo && (
//               <Link
//                 to={`/video/${belowMainVideo._id}`}
//                 state={{ relatedVideos: videos }}
//                 style={linkStyle}
//                 className="mt-auto"
//               >
//                 <div className="d-flex">
//                   <div
//                     className="flex-shrink-0 me-2"
//                     style={{ width: "100px", height: "70px" }}
//                   >
//                     <Image
//                       src={getThumbnailUrl(belowMainVideo.videoUrl)}
//                       alt={belowMainVideo.title}
//                       className="w-100 h-100 rounded"
//                       style={{ objectFit: "cover", borderRadius: "8px" }}
//                     />
//                   </div>
//                   <div>
//                     <p className="fw-bold small mb-1 text-white">{belowMainVideo.title}</p>
//                     <div className="d-flex align-items-center">
//                       <Image
//                         src={belowMainVideo.createdBy?.profileImage || "https://via.placeholder.com/30"}
//                         roundedCircle
//                         width={20}
//                         height={20}
//                       />
//                       <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
//                         {belowMainVideo.createdBy?.email || "EMS"} |{" "}
//                         {new Date(belowMainVideo.createdAt).toLocaleDateString("hi-IN")}
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             )}
//           </Col>

//           {/* Right Section */}
//           <Col xs={12} md={7} className="d-flex flex-column">
//             <Row className="mt-2 mt-md-0">
//               {rightSideVideos.map((video) => (
//                 <Col xs={12} sm={6} key={video._id} className="mb-4">
//                   <Link
//                     to={`/video/${video._id}`}
//                     state={{ relatedVideos: videos }}
//                     style={linkStyle}
//                   >
//                     <div className="d-flex">
//                       <div
//                         className="flex-shrink-0 me-2"
//                         style={{ width: "100px", height: "70px" }}
//                       >
//                         <Image
//                           src={getThumbnailUrl(video.videoUrl)}
//                           alt={video.title}
//                           className="w-100 h-100 rounded"
//                           style={{ objectFit: "cover", borderRadius: "8px" }}
//                         />
//                       </div>
//                       <div>
//                         <p
//                           className="fw-bold small mb-1 text-white"
//                           style={{
//                             fontSize: "0.9rem",
//                             lineHeight: "1.3",
//                             display: "-webkit-box",
//                             WebkitLineClamp: 2,
//                             WebkitBoxOrient: "vertical",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}
//                         >
//                           {video.title}
//                         </p>
//                         <div className="d-flex align-items-center">
//                           <Image
//                             src={video.createdBy?.profileImage || "https://via.placeholder.com/30"}
//                             roundedCircle
//                             width={20}
//                             height={20}
//                           />
//                           <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
//                             {video.createdBy?.email || "EMS"} |{" "}
//                             {new Date(video.createdAt).toLocaleDateString("hi-IN")}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default EmstvSection;



// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
// import { getVideo } from "../../Services/authApi";

// const EmstvSection = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // ✅ for navigation

//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       try {
//         const res = await getVideo();
//         if (res?.success) {
//           setVideos(res.data);
//         } else {
//           setError("Failed to load videos");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching videos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="light" />
//       </div>
//     );

//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (videos.length === 0) return null;

//   const mainVideo = videos[0];
//   const belowMainVideo = videos[1];
//   const rightSideVideos = videos.slice(2, 10); // 8 videos

//   const getThumbnailUrl = (url) => {
//     if (!url) return "https://via.placeholder.com/400x225";
//     let videoId = "";
//     if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
//     else if (url.includes("youtube.com/watch"))
//       videoId = new URL(url).searchParams.get("v");
//     return videoId
//       ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
//       : "https://via.placeholder.com/400x225";
//   };

//   const mutedTextStyle = { color: "rgba(255,255,255,0.7)" };

//   // ✅ Navigate function to open detail page
//   const handleVideoClick = (video) => {
//     const slugToNavigate = video.slug ? video.slug : video._id;
//     navigate(`/video/${slugToNavigate}`, {
//       state: { videos, currentVideo: video },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
//       <Container fluid className="py-4">
//         {/* ==== EMS TV Section Heading ==== */}
//         <div className="d-flex align-items-center mb-3 flex-wrap">
//           <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//             <div
//               style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}
//               className="me-2"
//             ></div>
//             <h5 className="fw-bold m-0 text-white">EMS TV</h5>
//           </div>
//           <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//           <Link
//             to="/emstv"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें <FaArrowRight size={12} />
//           </Link>
//         </div>

//         <Row className="align-items-stretch">
//           {/* ===== Left Section ===== */}
//           <Col xs={12} md={5} className="d-flex flex-column">
          
//           {/* === Main Video === */}
// {mainVideo && (
//   <div
//     onClick={() => handleVideoClick(mainVideo)}
//     className="d-block mb-3"
//     style={{ cursor: "pointer" }}
//   >
//     {/* Fixed height container using Bootstrap */}
//     <div className="w-100 overflow-hidden mb-2" style={{ height: "225px" }}>
//       <Image
//         src={getThumbnailUrl(mainVideo.videoUrl)}
//         alt={mainVideo.title}
//         className="w-100 h-100 rounded"
//         style={{ objectFit: "cover" }}
//       />
//     </div>

//     {/* Title */}
//     <h6 className="fw-bold mb-1 text-white">{mainVideo.title}</h6>

//     {/* Creator and Date Info */}
//     <div className="d-flex align-items-center">
//       <Image
//         src={mainVideo.createdBy?.profileImage || "https://via.placeholder.com/40"}
//         roundedCircle
//         width={25}
//         height={25}
//       />
//       <small className="ms-2 text-white-50" style={{ fontSize: "0.8rem" }}>
//         {mainVideo.createdBy?.email || "EMS TV"} |{" "}
//         {new Date(mainVideo.createdAt).toLocaleDateString("hi-IN")}
//       </small>
//     </div>
//   </div>
// )}


//             {/* === Below Main Video === */}
//             {belowMainVideo && (
//               <div
//                 onClick={() => handleVideoClick(belowMainVideo)}
//                 className="mt-2"
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="d-flex">
//                   <div
//                     className="flex-shrink-0 me-2"
//                     style={{ width: "100px", height: "70px" }}
//                   >
//                     <Image
//                       src={getThumbnailUrl(belowMainVideo.videoUrl)}
//                       alt={belowMainVideo.title}
//                       className="w-100 h-100 rounded"
//                       style={{ objectFit: "cover", borderRadius: "8px" }}
//                     />
//                   </div>
//                   <div>
//                     <p className="fw-bold small mb-1 text-white">{belowMainVideo.title}</p>
//                     <div className="d-flex align-items-center">
//                       <Image
//                         src={
//                           belowMainVideo.createdBy?.profileImage ||
//                           "https://via.placeholder.com/30"
//                         }
//                         roundedCircle
//                         width={20}
//                         height={20}
//                       />
//                       <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
//                         {belowMainVideo.createdBy?.email || "EMS"} |{" "}
//                         {new Date(belowMainVideo.createdAt).toLocaleDateString("hi-IN")}
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </Col>

//           {/* ===== Right Section ===== */}
//           <Col xs={12} md={7} className="d-flex flex-column">
//             <Row className="mt-2 mt-md-0">
//               {rightSideVideos.map((video) => (
//                 <Col xs={12} sm={6} key={video._id} className="mb-4">
//                   <div
//                     onClick={() => handleVideoClick(video)}
//                     style={{ cursor: "pointer" }}
//                     className="d-flex"
//                   >
//                     <div
//                       className="flex-shrink-0 me-2"
//                       style={{ width: "100px", height: "70px" }}
//                     >
//                       <Image
//                         src={getThumbnailUrl(video.videoUrl)}
//                         alt={video.title}
//                         className="w-100 h-100 rounded"
//                         style={{ objectFit: "cover", borderRadius: "8px" }}
//                       />
//                     </div>
//                     <div>
//                       <p
//                         className="fw-bold small mb-1 text-white"
//                         style={{
//                           fontSize: "0.9rem",
//                           lineHeight: "1.3",
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {video.title}
//                       </p>
//                       <div className="d-flex align-items-center">
//                         <Image
//                           src={video.createdBy?.profileImage || "https://via.placeholder.com/30"}
//                           roundedCircle
//                           width={20}
//                           height={20}
//                         />
//                         <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
//                           {video.createdBy?.email || "EMS"} |{" "}
//                           {new Date(video.createdAt).toLocaleDateString("hi-IN")}
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default EmstvSection;


// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
// import { getVideo } from "../../Services/authApi";

// const EmstvSection = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       try {
//         const res = await getVideo();
//         if (res?.success) {
//           setVideos(res.data);
//         } else {
//           setError("Failed to load videos");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching videos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="light" />
//         <p className="text-light mt-2">Loading videos...</p>
//       </div>
//     );

//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (videos.length === 0) return null;

//   const mainVideo = videos[0];
//   const belowMainVideo = videos[1];
//   const rightSideVideos = videos.slice(2, 10);

//   const getThumbnailUrl = (url) => {
//     if (!url) return "https://via.placeholder.com/400x225?text=No+Video";
//     let videoId = "";
//     if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
//     else if (url.includes("youtube.com/watch"))
//       videoId = new URL(url).searchParams.get("v");
//     return videoId
//       ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
//       : "https://via.placeholder.com/400x225?text=No+Video";
//   };

//   const mutedTextStyle = { color: "rgba(255,255,255,0.7)" };

//   const handleVideoClick = (video) => {
//     const slugToNavigate = video.slug ? video.slug : video._id;
//     navigate(`/video/${slugToNavigate}`, {
//       state: { videos, currentVideo: video },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // --- Styling Constants (can be moved to a CSS file or theme) ---
//   const accentColor = "#A12D2A";
//   const linkColor = "#2E6E9E";
//   // ----------------------------------------------------------------

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
//       <Container fluid className="py-4">
//         {/* ==== EMS TV Section Heading ==== */}
//         <div className="d-flex align-items-center mb-3 flex-wrap">
//           <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//             <div
//               style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
//               className="me-2"
//             ></div>
//             <h5 className="fw-bold m-0 text-white">EMS TV</h5>
//           </div>
//           <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//           <Link
//             to="/emstv"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: linkColor }}
//           >
//             और देखें <FaArrowRight size={12} />
//           </Link>
//         </div>

//         <Row className="align-items-stretch">
//           {/* ===== Left Section ===== */}
//           <Col xs={12} md={5} className="d-flex flex-column">

//             {/* === Main Video === */}
//             {mainVideo && (
//               <div
//                 onClick={() => handleVideoClick(mainVideo)}
//                 className="d-block mb-3"
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="w-100 overflow-hidden mb-2" style={{ height: "225px" }}>
//                   <Image
//                     src={getThumbnailUrl(mainVideo.videoUrl)}
//                     alt={mainVideo.title}
//                     className="w-100 h-100 rounded"
//                     style={{ objectFit: "cover" }}
//                   />
//                   {/* Optional: Play icon overlay */}
//                   {/* <div className="position-absolute top-50 start-50 translate-middle text-white">
//                     <FaPlayCircle size={40} />
//                   </div> */}
//                 </div>

//                 <h6 className="fw-bold mb-1 text-white text-wrap">{mainVideo.title}</h6>

//                 <div className="d-flex align-items-center flex-wrap">
//                   <Image
//                     src={mainVideo.createdBy?.profileImage || "https://via.placeholder.com/40"}
//                     roundedCircle
//                     width={25}
//                     height={25}
//                   />
//                   <small className="ms-2 text-white-50 text-wrap" style={{ fontSize: "0.8rem" }}>
//                     {mainVideo.createdBy?.name || "EMS TV"} |{" "}
//                     {new Date(mainVideo.createdAt).toLocaleDateString("hi-IN")}
//                   </small>
//                 </div>
//               </div>
//             )}

//             {/* === Below Main Video === */}
//             {belowMainVideo && (
//               <div
//                 onClick={() => handleVideoClick(belowMainVideo)}
//                 className="mt-2"
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="d-flex">
//                   <div
//                     className="flex-shrink-0 me-2"
//                     style={{ width: "100px", height: "70px" }}
//                   >
//                     <Image
//                       src={getThumbnailUrl(belowMainVideo.videoUrl)}
//                       alt={belowMainVideo.title}
//                       className="w-100 h-100 rounded"
//                       style={{ objectFit: "cover", borderRadius: "8px" }}
//                     />
//                   </div>
//                   <div>
//                     <p className="fw-bold small mb-1 text-white text-wrap">{belowMainVideo.title}</p>
//                     <div className="d-flex align-items-center flex-wrap">
//                       <Image
//                         src={
//                           belowMainVideo.createdBy?.profileImage ||
//                           "https://via.placeholder.com/30"
//                         }
//                         roundedCircle
//                         width={20}
//                         height={20}
//                       />
//                       <small className="ms-2 text-wrap" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
//                         {belowMainVideo.createdBy?.name || "EMS"} |{" "}
//                         {new Date(belowMainVideo.createdAt).toLocaleDateString("hi-IN")}
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </Col>

//           {/* ===== Right Section ===== */}
//           <Col xs={12} md={7} className="d-flex flex-column">
//             <Row className="mt-2 mt-md-0">
//               {rightSideVideos.map((video) => (
//                 <Col xs={12} sm={6} key={video._id} className="mb-4">
//                   <div
//                     onClick={() => handleVideoClick(video)}
//                     style={{ cursor: "pointer" }}
//                     className="d-flex"
//                   >
//                     <div
//                       className="flex-shrink-0 me-2"
//                       style={{ width: "100px", height: "70px" }}
//                     >
//                       <Image
//                         src={getThumbnailUrl(video.videoUrl)}
//                         alt={video.title}
//                         className="w-100 h-100 rounded"
//                         style={{ objectFit: "cover", borderRadius: "8px" }}
//                       />
//                     </div>
//                     <div>
//                       <p
//                         className="fw-bold small mb-1 text-white text-wrap"
//                         style={{
//                           fontSize: "0.9rem",
//                           lineHeight: "1.3",
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {video.title}
//                       </p>
//                       <div className="d-flex align-items-center flex-wrap">
//                         <Image
//                           src={video.createdBy?.profileImage || "https://via.placeholder.com/30"}
//                           roundedCircle
//                           width={20}
//                           height={20}
//                         />
//                         <small className="ms-2 text-wrap" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
//                           {video.createdBy?.name || "EMS"} |{" "}
//                           {new Date(video.createdAt).toLocaleDateString("hi-IN")}
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default EmstvSection;


import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { getVideo } from "../../Services/authApi";

const EmstvSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await getVideo();
        if (res?.success) {
          setVideos(res.data);
        } else {
          setError("Failed to load videos");
        }
      } catch (err) {
        setError(err.message || "Error fetching videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="light" />
        <p className="text-light mt-2">Loading videos...</p>
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (videos.length === 0) return null;

  const mainVideo = videos[0];
  const belowMainVideo = videos[1];
  const rightSideVideos = videos.slice(2, 10);

  const getThumbnailUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400x225?text=No+Video";
    let videoId = "";
    if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
    else if (url.includes("youtube.com/watch"))
      videoId = new URL(url).searchParams.get("v");
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : "https://via.placeholder.com/400x225?text=No+Video";
  };

  const mutedTextStyle = { color: "rgba(255,255,255,0.7)" };

  const handleVideoClick = (video) => {
    const slugToNavigate = video.slug ? video.slug : video._id;
    navigate(`/video/${slugToNavigate}`, {
      state: { videos, currentVideo: video },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Styling Constants (can be moved to a CSS file or theme) ---
  const accentColor = "#A12D2A";
  const linkColor = "#2E6E9E";
  // ----------------------------------------------------------------

  return (
    <div className="mt-4" style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
      <Container fluid className="py-4">
        {/* ==== EMS TV Section Heading ==== */}
        <div className="d-flex align-items-center mb-3 flex-wrap">
          <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
            <div
              style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
              className="me-2"
            ></div>
            <h5 className="fw-bold m-0 text-white">EMS TV</h5>
          </div>
          <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
          <Link
            to="/emstv"
            className="text-decoration-none fw-bold small flex-shrink-0"
            style={{ color: linkColor }}
          >
            और देखें <FaArrowRight size={12} />
          </Link>
        </div>

        <Row className="align-items-stretch">
          {/* ===== Left Section ===== */}
          <Col xs={12} md={5} className="d-flex flex-column">

            {/* === Main Video === */}
            {mainVideo && (
              <div
                onClick={() => handleVideoClick(mainVideo)}
                className="d-block mb-3"
                style={{ cursor: "pointer" }}
              >
                <div className="w-100 overflow-hidden mb-2" 
                    // **यहाँ मुख्य वीडियो की ऊँचाई कम की गई है**
                    style={{ height: "200px" }}> {/* Original was 225px, changed to 180px */}
                  <Image
                    src={getThumbnailUrl(mainVideo.videoUrl)}
                    alt={mainVideo.title}
                    className="w-100 h-100 rounded"
                    style={{ objectFit: "cover" }}
                  />
                  {/* Optional: Play icon overlay */}
                  {/* <div className="position-absolute top-50 start-50 translate-middle text-white">
                    <FaPlayCircle size={40} />
                  </div> */}
                </div>

                <h6 className="fw-bold mb-1 text-white text-wrap">{mainVideo.title}</h6>

                <div className="d-flex align-items-center flex-wrap">
                  <Image
                    src={mainVideo.createdBy?.profileImage || "https://via.placeholder.com/40"}
                    roundedCircle
                    width={25}
                    height={25}
                  />
                  <small className="ms-2 text-white-50 text-wrap" style={{ fontSize: "0.8rem" }}>
                    {mainVideo.createdBy?.name || "EMS TV"} |{" "}
                    {new Date(mainVideo.createdAt).toLocaleDateString("hi-IN")}
                  </small>
                </div>
              </div>
            )}

            {/* === Below Main Video === */}
            {belowMainVideo && (
              <div
                onClick={() => handleVideoClick(belowMainVideo)}
                // **यहाँ ऊपर की तरफ मार्जिन एडजस्ट किया गया है**
                className="mt-2" // mt-2 (margin-top: 0.5rem) को mt-1 (margin-top: 0.25rem) कर सकते हैं, या सीधे style से एडजस्ट कर सकते हैं
                style={{ cursor: "pointer", marginTop: "-10px" }} // यहाँ नकारात्मक मार्जिन-टॉप का उपयोग किया गया है
              >
                <div className="d-flex">
                  <div
                    className="flex-shrink-0 me-2"
                    style={{ width: "100px", height: "70px" }}
                  >
                    <Image
                      src={getThumbnailUrl(belowMainVideo.videoUrl)}
                      alt={belowMainVideo.title}
                      className="w-100 h-100 rounded"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                  <div>
                    <p className="fw-bold small mb-1 text-white text-wrap">{belowMainVideo.title}</p>
                    <div className="d-flex align-items-center flex-wrap">
                      <Image
                        src={
                          belowMainVideo.createdBy?.profileImage ||
                          "https://via.placeholder.com/30"
                        }
                        roundedCircle
                        width={20}
                        height={20}
                      />
                      <small className="ms-2 text-wrap" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
                        {belowMainVideo.createdBy?.name || "EMS"} |{" "}
                        {new Date(belowMainVideo.createdAt).toLocaleDateString("hi-IN")}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>

          {/* ===== Right Section ===== */}
          <Col xs={12} md={7} className="d-flex flex-column">
            <Row className="mt-2 mt-md-0">
              {rightSideVideos.map((video) => (
                <Col xs={12} sm={6} key={video._id} className="mb-4">
                  <div
                    onClick={() => handleVideoClick(video)}
                    style={{ cursor: "pointer" }}
                    className="d-flex"
                  >
                    <div
                      className="flex-shrink-0 me-2"
                      style={{ width: "100px", height: "70px" }}
                    >
                      <Image
                        src={getThumbnailUrl(video.videoUrl)}
                        alt={video.title}
                        className="w-100 h-100 rounded"
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </div>
                    <div>
                      <p
                        className="fw-bold small mb-1 text-white text-wrap"
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: "1.3",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {video.title}
                      </p>
                      <div className="d-flex align-items-center flex-wrap">
                        <Image
                          src={video.createdBy?.profileImage || "https://via.placeholder.com/30"}
                          roundedCircle
                          width={20}
                          height={20}
                        />
                        <small className="ms-2 text-wrap" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
                          {video.createdBy?.name || "EMS"} |{" "}
                          {new Date(video.createdAt).toLocaleDateString("hi-IN")}
                        </small>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmstvSection;