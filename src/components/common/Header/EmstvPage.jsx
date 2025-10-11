
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Spinner, Image, Button } from "react-bootstrap";
// import { FaPlayCircle } from "react-icons/fa";
// import { getVideo } from "../../../Services/authApi";
// import { useNavigate } from "react-router-dom";

// const VideoCard = ({ thumbnail, onClick, title }) => (
//   <div
//     className="position-relative mb-3 shadow-sm"
//     onClick={onClick}
//     style={{
//       cursor: "pointer",
//       borderRadius: "10px",
//       overflow: "hidden",
//       transition: "transform 0.2s ease-in-out",
//     }}
//   >
//     <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
//       <Image
//         src={thumbnail}
//         alt="Video Thumbnail"
//         fluid
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           objectPosition: "center",
//           filter: "brightness(85%)",
//         }}
//       />
//       <FaPlayCircle
//         color="#ffffff"
//         size={36}
//         className="position-absolute top-50 start-50 translate-middle"
//         style={{
//           opacity: 0.9,
//           filter: "drop-shadow(0px 0px 6px rgba(0,0,0,0.6))",
//         }}
//       />
//     </div>
//     <div className="p-2 fw-bold text-truncate">{title}</div>
//   </div>
// );

// const EmstvPage = () => {
//   const [videos, setVideos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0); // Scroll to top when component mounts
//     getVideo()
//       .then((res) => {
//         const data = res?.data || [];
//         setVideos(data);
//       })
//       .catch((err) => {
//         setError("Failed to load videos");
//         console.error(err);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   // Unique categories निकालो
//   const categories = ["All", ...new Set(videos.map((v) => v.category_name))];

//   // Selected category की videos
//   const filteredVideos =
//     selectedCategory === "All"
//       ? videos
//       : videos.filter((v) => v.category_name === selectedCategory);

//   const getThumbnailUrl = (url) => {
//     if (!url) return "";
//     let videoId = "";
//     if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
//     else if (url.includes("youtube.com/watch"))
//       videoId = new URL(url).searchParams.get("v");
//     return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
//   };

//   if (isLoading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" size="sm" />
//       </div>
//     );
//   if (error) return <div className="text-center text-danger my-4">{error}</div>;

//   return (
//     <Container className="mt-4">
//       {/* EMS TV Heading */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div
//             style={{ width: "7px", height: "35px", backgroundColor: "#C00000" }}
//             className="me-2"
//           ></div>
//           <h2 className="fw-bold m-0">EMS TV</h2>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//       </div>

//       {/* ✅ Categories Tabs */}
//       <div className="d-flex flex-wrap gap-2 mb-3">
//         {categories.map((cat) => (
//           <Button
//             key={cat}
//             variant={selectedCategory === cat ? "danger" : "outline-danger"}
//             size="sm"
//             onClick={() => setSelectedCategory(cat)}
//           >
//             {cat}
//           </Button>
//         ))}
//       </div>

//       {/* ✅ Videos Grid */}
//       <Row className="g-3">
//         {filteredVideos.map((video) => (
//           <Col key={video._id} xs={12} sm={6} md={4} lg={3}>
//             <VideoCard
//               thumbnail={getThumbnailUrl(video.videoUrl)}
//               title={video.title}
//               onClick={() => {
//                 navigate(`/video/${video._id}`, {
//                   state: { videos, currentVideo: video },
//                 });
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//               }}
//             />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default EmstvPage;


// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Spinner, Image, Button } from "react-bootstrap";
// import { FaPlayCircle } from "react-icons/fa";
// import { getVideo } from "../../../Services/authApi";
// import { useNavigate } from "react-router-dom";
// const VideoCard = ({ thumbnail, onClick, title }) => (
//   <div className="mb-3">
//     {/* Card with cropped image */}
//     <div
//       className="position-relative shadow-sm video-card"
//       onClick={onClick}
//       style={{
//         cursor: "pointer",
//         overflow: "hidden", // crop top/bottom
//         transition: "transform 0.2s ease-in-out",
//         backgroundColor: "#000",
//         height: "180px", // card height
//       }}
//     >
//       <Image
//         src={thumbnail}
//         alt={title}
//         fluid
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           objectPosition: "center",
//           filter: "brightness(85%)",
//         }}
//       />
//       <FaPlayCircle
//         color="#ffffff"
//         size={36}
//         className="position-absolute top-50 start-50 translate-middle"
//         style={{
//           opacity: 0.9,
//           filter: "drop-shadow(0px 0px 6px rgba(0,0,0,0.6))",
//         }}
//       />
//     </div>

//     {/* Title below card */}
//     <p
//       className="mt-2 mb-0 fw-bold text-truncate text-center"
//       style={{ color: "red", fontSize: "0.95rem" }}
//       title={title} // hover pe full title
//     >
//       {title}
//     </p>
//   </div>
// );


// const EmstvPage = () => {
//   const [videos, setVideos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0); // Scroll to top when component mounts
//     getVideo()
//       .then((res) => {
//         const data = res?.data || [];
//         setVideos(data);
//       })
//       .catch((err) => {
//         setError("Failed to load videos");
//         console.error(err);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   // Unique categories निकालो
//   const categories = ["All", ...new Set(videos.map((v) => v.category_name))];

//   // Selected category की videos
//   const filteredVideos =
//     selectedCategory === "All"
//       ? videos
//       : videos.filter((v) => v.category_name === selectedCategory);

//   const getThumbnailUrl = (url) => {
//     if (!url) return "";
//     let videoId = "";
//     if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
//     else if (url.includes("youtube.com/watch"))
//       videoId = new URL(url).searchParams.get("v");
//     return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
//   };

//   if (isLoading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" size="sm" />
//       </div>
//     );
//   if (error) return <div className="text-center text-danger my-4">{error}</div>;

//   return (
//     <Container className="mt-4">
//       {/* EMS TV Heading */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div
//             style={{ width: "7px", height: "35px", backgroundColor: "#C00000" }}
//             className="me-2"
//           ></div>
//           <h2 className="fw-bold m-0">EMS TV</h2>
//         </div>
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//       </div>

//       {/* ✅ Categories Tabs */}
//       <div className="d-flex flex-wrap gap-2 mb-3">
//         {categories.map((cat) => (
//           <Button
//             key={cat}
//             variant={selectedCategory === cat ? "danger" : "outline-danger"}
//             size="sm"
//             onClick={() => setSelectedCategory(cat)}
//           >
//             {cat}
//           </Button>
//         ))}
//       </div>

//       {/* ✅ Videos Grid */}
//       <Row className="g-3">
//         {filteredVideos.map((video) => (
//           <Col key={video._id} xs={12} sm={6} md={4} lg={3}>
//             <VideoCard
//               thumbnail={getThumbnailUrl(video.videoUrl)}
//               title={video.title}
//               onClick={() => {
//                 navigate(`/video/${video._id}`, {
//                   state: { videos, currentVideo: video },
//                 });
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//               }}
//             />
//           </Col>
//         ))}
//       </Row>

//       {/* ✅ Extra Mobile Styling */}
//       <style>{`
//         @media (max-width: 576px) {
//           .video-card {
//             margin-bottom: 15px;
//           }
//           .video-title {
//             font-size: 14px;
//             white-space: normal;
//           }
//         }
//       `}</style>
//     </Container>
//   );
// };

// export default EmstvPage;


import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Image, Button, Dropdown } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { getVideo } from "../../../Services/authApi";
import { useNavigate } from "react-router-dom";

// VideoCard कॉम्पोनेंट में कोई बदलाव नहीं
const VideoCard = ({ thumbnail, onClick, title }) => (
  <div className="mb-3">
    {/* Card with cropped image */}
    <div
      className="position-relative shadow-sm video-card"
      onClick={onClick}
      style={{
        cursor: "pointer",
        overflow: "hidden", // crop top/bottom
        transition: "transform 0.2s ease-in-out",
        backgroundColor: "#000",
        height: "180px", // card height
      }}
    >
      <Image
        src={thumbnail}
        alt={title}
        fluid
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
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

    {/* Title below card */}
    <p
      className="mt-2 mb-0 fw-bold text-truncate text-center"
      style={{ color: "red", fontSize: "0.95rem" }}
      title={title} // hover pe full title
    >
      {title}
    </p>
  </div>
);


const EmstvPage = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // ✅ Track screen width
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
    getVideo()
      .then((res) => {
        const data = res?.data || [];
        setVideos(data);
      })
      .catch((err) => {
        setError("Failed to load videos");
        console.error(err);
      })
      .finally(() => setIsLoading(false));

    // ✅ Event listener for window resize to update screenWidth
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Unique categories निकालो
  const allCategories = ["All", ...new Set(videos.map((v) => v.category_name))];

  // ✅ Dynamically determine max visible categories based on screen width
  const getMaxVisibleCategories = (width) => {
    if (width <= 480) { // Very small devices (e.g., small phones)
      return 2;
    } else if (width <= 768) { // Small devices (phones, small tablets)
      return 3;
    } else if (width <= 992) { // Medium devices (tablets, small laptops)
      return 4;
    } else { // Large devices (desktops)
      return allCategories.length; // Show all
    }
  };

  const maxVisibleCategories = getMaxVisibleCategories(screenWidth);

  // ✅ कैटेगरी को स्क्रीन साइज़ के अनुसार मैनेज करें
  let visibleCategories = allCategories;
  let hiddenCategories = [];

  if (allCategories.length > maxVisibleCategories) {
    visibleCategories = allCategories.slice(0, maxVisibleCategories);
    hiddenCategories = allCategories.slice(maxVisibleCategories);
  }

  // Selected category की videos
  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((v) => v.category_name === selectedCategory);

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
    <Container className="mt-4">
      {/* EMS TV Heading */}
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div
            style={{ width: "7px", height: "35px", backgroundColor: "#C00000" }}
            className="me-2"
          ></div>
          <h2 className="fw-bold m-0">EMS TV</h2>
        </div>
        <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
      </div>

      {/* Categories Tabs */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {/* Visible Categories */}
        {visibleCategories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "danger" : "outline-danger"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}

        {/* More Button with Dropdown for hidden categories */}
        {hiddenCategories.length > 0 && (
          <Dropdown>
            <Dropdown.Toggle
              variant={selectedCategory && hiddenCategories.includes(selectedCategory) ? "danger" : "outline-danger"}
              size="sm"
              id="dropdown-basic"
              className="ems-dropdown-toggle"
            >
              More
            </Dropdown.Toggle>

            <Dropdown.Menu className="ems-dropdown-menu-custom"> {/* ✅ नया क्लास जोड़ा */}
              {hiddenCategories.map((cat) => (
                <Dropdown.Item
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  active={selectedCategory === cat}
                  className="ems-dropdown-item-custom" // ✅ नया क्लास जोड़ा
                >
                  {cat}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      {/* Videos Grid */}
      <Row className="g-3">
        {filteredVideos.map((video) => (
          <Col key={video._id} xs={12} sm={6} md={4} lg={3}>
            <VideoCard
              thumbnail={getThumbnailUrl(video.videoUrl)}
              title={video.title}
              onClick={() => {
                navigate(`/video/${video._id}`, {
                  state: { videos, currentVideo: video },
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </Col>
        ))}
      </Row>

      {/* ✅ Custom CSS for Dropdown and mobile styling */}
      <style>{`
        /* Mobile specific video card styling */
        @media (max-width: 576px) {
          .video-card {
            margin-bottom: 15px;
          }
          .video-title {
            font-size: 14px;
            white-space: normal;
          }
        }

        /* Dropdown Menu Styling (No border, better look) */
        .ems-dropdown-menu-custom {
          border-radius: 0.5rem; /* Rounded corners */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow */
          border: none; /* ✅ बॉर्डर हटा दिया */
          min-width: 120px; /* Minimum width for the dropdown */
          padding: 0.5rem 0; /* Padding inside the dropdown */
        }

        /* Dropdown Item Styling */
        .ems-dropdown-item-custom {
          color: #212529; /* Default text color */
          font-weight: 500;
          padding: 0.6rem 1rem; /* Slightly more padding for better touch target */
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .ems-dropdown-item-custom:hover,
        .ems-dropdown-item-custom:focus {
          background-color: #f8d7da; /* ✅ लाइट रेड बैकग्राउंड ऑन होवर */
          color: #dc3545; /* ✅ रेड टेक्स्ट कलर ऑन होवर */
        }

        /* Active Dropdown Item Styling */
        .ems-dropdown-item-custom.active,
        .ems-dropdown-item-custom:active {
          background-color: #dc3545 !important; /* ✅ रेड बैकग्राउंड फॉर एक्टिव आइटम */
          color: #fff !important; /* ✅ व्हाइट टेक्स्ट फॉर एक्टिव आइटम */
          font-weight: bold;
        }

        /* Dropdown Toggle Button Styling (Optional: if you want more specific styling than Bootstrap's default) */
        .ems-dropdown-toggle {
          height: 31px; /* Adjust height to match other sm buttons if needed */
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </Container>
  );
};

export default EmstvPage;
