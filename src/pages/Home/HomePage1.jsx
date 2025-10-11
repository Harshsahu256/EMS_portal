

// import React, { useState, useRef, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";

// // कॉमन कंपोनेंट्स
// import Header from "../../components/common/Header/Header";
// import Footer from "../../components/common/Footer";
// import LeftSidebar from "../../components/common/LeftSidebar";

// // लेआउट्स
// import LayoutWithRightSidebarOnly from "../../layouts/LayoutWithRightSidebarOnly";

// // पेज कंटेंट
// import EntertainmentPage from "../../components/MainArtical/EntertainmentPage";
// import PlacementPage from "../../components/MainArtical/PlacementPage";
// import IndiaPage from "./IndiaPage";
// import RashifalDetailsPage from "../../components/MainArtical/RashifalDetailsPage";
// import Form from "../../components/MainArtical/Form";
// import NewsPage from "../../components/Main_NewsDetails/NewsContent";
// import EpaperGallery from "../EpaperGallery";
// import EpaperViewer from "./EpaperViewer";
// import EpaperPage from "../../components/MainArtical/EpaperPage"; 
// import ReelViewer from "../../components/ReelsViewer/ReelViewer";
// import NewsDetailPage from "../../components/Main_NewsDetails/NewsDetailPage";
// import DirectoryPage from "../../Directory/DirectoryPage";
// import CategoryNewsPage from '../../components/NewsDetails/CategoryNewsPage';
// import StateNewsPage from '../../components/Main_NewsDetails/StateNewsPage';
// import BusinessListPage from "../../components/common/saidbarPage/BusinessListPage";
// import EntertainmentListPage from "../../components/common/saidbarPage/EntertainmentListPage";
// import SportsListPage from "../../components/common/saidbarPage/SportsListPage";

// import VideoDetail from "../../components/Main_NewsDetails/VideoDetail";
// import EmstvPage from "../../components/common/Header/EmstvPage";
// import YouthPage from "../../components/common/saidbarPage/YouthPage";
// import ThoughtsListPage from "../../components/common/saidbarPage/ThoughtsListPage";
// import RelatedNewsList from "../../components/NewsDetails/RelatedNewsList";
// import SearchResultItem from "../../components/common/Header/SearchResultItem";

// import WebStorySection from "../../webStory/WebStorySection";
// import AllWebStoriesPage from "../../webStory/AllWebStoriesPage";
// import AllShortsPage from "../../components/NewsDetails/AllShortsPage";


// const HEADER_HEIGHT = 155; // px में
// const TOGGLE_BUTTON_OFFSET = 50; // toggle button की top offset (px)

// const HomePage1 = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [sidebarStyle, setSidebarStyle] = useState({
//     position: "fixed",
//     top: HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET,
//     height: `calc(100vh - ${HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET}px)`,
//   });

//   const footerRef = useRef(null);

//   // Toggle Sidebar
//   const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

//   // Footer observer
//   useEffect(() => {
//     const footerElement = footerRef.current;
//     if (!footerElement) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setSidebarStyle({ position: "absolute", bottom: 0, top: "auto" });
//         } else {
//           setSidebarStyle({
//             position: "fixed",
//             top: HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET,
//             height: `calc(100vh - ${HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET}px)`,
//             bottom: "auto",
//           });
//         }
//       },
//       { rootMargin: "0px" }
//     );

//     observer.observe(footerElement);
//     return () => observer.unobserve(footerElement);
//   }, []);

//   return (
//     <div>
//       {/* ===== Header ===== */}
//       <header
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 1030,
//           backgroundColor: "white",
//         }}
//       >
//         <Header onToggleSidebar={handleToggleSidebar} />
//       </header>

//       {/* ===== Left Sidebar (Overlay) ===== */}
//       <div
//         style={{
//           position: "fixed",
//           top: HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET, // toggle button के नीचे start
//           left: isSidebarOpen ? 0 : "-270px",
//           width: "270px",
//           height: `calc(100vh - ${HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET}px)`,
//           backgroundColor: "#fff",
//           zIndex: 1040,
//           transition: "left 0.3s ease",
//           overflowY: "auto",
//           boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
//           ...sidebarStyle,
//         }}
//       >
//         <LeftSidebar />
//       </div>

//       {/* Overlay */}
//       {isSidebarOpen && (
//         <div
//           onClick={handleToggleSidebar}
//           style={{
//             position: "fixed",
//             top: HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET,
//             left: 0,
//             width: "100%",
//             height: `calc(100vh - ${HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET}px)`,
//             backgroundColor: "rgba(0,0,0,0.3)",
//             zIndex: 1035,
//           }}
//         />
//       )}

//       {/* Main Content */}
//       <main className="position-relative">
//         <Routes>
//           <Route path="/placement-consultants" element={<PlacementPage />} />
//           <Route path="/epaper" element={<EpaperGallery />} />
//           <Route path="/epaper/viewer/:editionId" element={<EpaperViewer />} />
//           <Route path="/directory" element={<DirectoryPage />} />
//           <Route path="/epaper" element={<EpaperPage />} />
//           <Route path="/login" element={<Form />} />

//           <Route element={<LayoutWithRightSidebarOnly sidebarStyle={sidebarStyle} />}>
//             <Route path="/" element={<NewsPage />} />
//             <Route path="/india" element={<IndiaPage />} />
//             <Route path="/astrology" element={<RashifalDetailsPage />} />
//            <Route path="/news/:slugId" element={<NewsDetailPage />} />
//             <Route path="/business" element={<BusinessListPage />} />
//             <Route path="/sports" element={<SportsListPage />} />
//             <Route path="/entertainment" element={<EntertainmentListPage />} />
//             <Route path="/category/:categoryName" element={<CategoryNewsPage />} />
//             <Route path="/state/:stateName/:stateId" element={<StateNewsPage />} />
//             <Route path="/entertainment" element={<EntertainmentPage />} />
//             <Route path="/thoughts" element={<ThoughtsListPage />} />
//             <Route path="/shorts/:slug" element={<ReelViewer />} />
//              <Route path="/shorts" element={<AllShortsPage />} />
           
//             <Route path="/video/:id" element={<VideoDetail />} />
//             <Route path="/emstv" element={<EmstvPage />} />
//             <Route path="/related-news" element={<RelatedNewsList />} />
//             <Route path="/search" element={<SearchResultItem />} />

        
 
// <Route path="/web-stories" element={<WebStorySection />} />
// <Route path="/all-webstories" element={<AllWebStoriesPage/>} />

             
// <Route path="/youth" element={<YouthPage />} />
//           </Route>
//         </Routes>
//       </main>

//       <div ref={footerRef}>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default HomePage1;



// import React, { useState, useRef, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";

// // कॉमन कंपोनेंट्स
// import Header from "../../components/common/Header/Header";
// import Footer from "../../components/common/Footer";
// import LeftSidebar from "../../components/common/LeftSidebar";

// // लेआउट्स
// import LayoutWithRightSidebarOnly from "../../layouts/LayoutWithRightSidebarOnly";

// // पेज कंटेंट
// import EntertainmentPage from "../../components/MainArtical/EntertainmentPage";
// import PlacementPage from "../../components/MainArtical/PlacementPage";
// import IndiaPage from "./IndiaPage";
// import RashifalDetailsPage from "../../components/MainArtical/RashifalDetailsPage";
// import Form from "../../components/MainArtical/Form";
// import NewsPage from "../../components/Main_NewsDetails/NewsContent";
// import EpaperGallery from "../EpaperGallery";
// import EpaperViewer from "./EpaperViewer";
// import EpaperPage from "../../components/MainArtical/EpaperPage"; 
// import ReelViewer from "../../components/ReelsViewer/ReelViewer";
// import NewsDetailPage from "../../components/Main_NewsDetails/NewsDetailPage";
// import DirectoryPage from "../../Directory/DirectoryPage";
// import CategoryNewsPage from '../../components/NewsDetails/CategoryNewsPage';
// import StateNewsPage from '../../components/Main_NewsDetails/StateNewsPage';
// import BusinessListPage from "../../components/common/saidbarPage/BusinessListPage";
// import EntertainmentListPage from "../../components/common/saidbarPage/EntertainmentListPage";
// import SportsListPage from "../../components/common/saidbarPage/SportsListPage";

// import VideoDetail from "../../components/Main_NewsDetails/VideoDetail";
// import EmstvPage from "../../components/common/Header/EmstvPage";
// import YouthPage from "../../components/common/saidbarPage/YouthPage";
// import ThoughtsListPage from "../../components/common/saidbarPage/ThoughtsListPage";
// import RelatedNewsList from "../../components/NewsDetails/RelatedNewsList";
// import SearchResultItem from "../../components/common/Header/SearchResultItem";

// import WebStorySection from "../../webStory/WebStorySection";
// import AllWebStoriesPage from "../../webStory/AllWebStoriesPage";
// import AllShortsPage from "../../components/NewsDetails/AllShortsPage";
// import CategoryDetailPage from "../../Directory/CategoryDetailPage";

// const HEADER_HEIGHT = 155; // px
// const TOGGLE_BUTTON_OFFSET = 50; // px

// const HomePage1 = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSidebarFixed, setIsSidebarFixed] = useState(true);
//   const footerRef = useRef(null);

//   // Toggle Sidebar
//   const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

//   // Footer observer → sidebar को footer आने पर absolute करना
//   useEffect(() => {
//     const footerElement = footerRef.current;
//     if (!footerElement) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsSidebarFixed(!entry.isIntersecting);
//       },
//       { rootMargin: "0px" }
//     );

//     observer.observe(footerElement);
//     return () => observer.unobserve(footerElement);
//   }, []);

//   return (
//     <div>
//       {/* ===== Header ===== */}
//       <header
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 1030,
//           backgroundColor: "white",
//         }}
//       >
//         <Header onToggleSidebar={handleToggleSidebar} />
//       </header>

//       {/* ===== Left Sidebar (Overlay) ===== */}
//       <div
//         style={{
//           position: isSidebarFixed ? "fixed" : "absolute",
//           top: isSidebarFixed ? HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET : "auto",
//           bottom: isSidebarFixed ? "auto" : 0,
//           left: isSidebarOpen ? 0 : "-270px",
//           width: "270px",
//           height: isSidebarFixed
//             ? `calc(100vh - ${HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET}px)`
//             : "auto",
//           backgroundColor: "#fff",
//           zIndex: 1040,
//           transition: "left 0.3s ease",
//           overflowY: "auto",
//           boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
//         }}
//       >
//         <LeftSidebar />
//       </div>

//       {/* Overlay */}
//       {isSidebarOpen && (
//         <div
//           onClick={handleToggleSidebar}
//           style={{
//             position: "fixed",
//             top: HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET,
//             left: 0,
//             width: "100%",
//             height: `calc(100vh - ${HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET}px)`,
//             backgroundColor: "rgba(0,0,0,0.3)",
//             zIndex: 1035,
//           }}
//         />
//       )}

//       {/* Main Content */}
//       <main className="position-relative">
//         <Routes>
//           <Route path="/placement-consultants" element={<PlacementPage />} />
//           <Route path="/epaper" element={<EpaperGallery />} />
//           <Route path="/epaper/viewer/:editionId" element={<EpaperViewer />} />
//           <Route path="/directory" element={<DirectoryPage />} />
//           <Route path="/CategoryDetailPage" element={< CategoryDetailPage />} />
//           <Route path="/epaper" element={<EpaperPage />} />
//           <Route path="/login" element={<Form />} />

//           <Route element={<LayoutWithRightSidebarOnly />}>
//             <Route path="/" element={<NewsPage />} />
//             <Route path="/india" element={<IndiaPage />} />
//             <Route path="/astrology" element={<RashifalDetailsPage />} />
//             <Route path="/news/:slugId" element={<NewsDetailPage />} />
//             <Route path="/business" element={<BusinessListPage />} />
//             <Route path="/sports" element={<SportsListPage />} />
//             <Route path="/entertainment" element={<EntertainmentListPage />} />
//             <Route path="/category/:categoryName" element={<CategoryNewsPage />} />
//             <Route path="/state/:stateName/:stateId" element={<StateNewsPage />} />
//             <Route path="/entertainment" element={<EntertainmentPage />} />
//             <Route path="/thoughts" element={<ThoughtsListPage />} />
//             <Route path="/shorts/:slug" element={<ReelViewer />} />
//             <Route path="/shorts" element={<AllShortsPage />} />
//             <Route path="/video/:id" element={<VideoDetail />} />
//             <Route path="/emstv" element={<EmstvPage />} />
//             <Route path="/related-news" element={<RelatedNewsList />} />
//             <Route path="/search" element={<SearchResultItem />} />
//             <Route path="/web-stories" element={<WebStorySection />} />
//             <Route path="/all-webstories" element={<AllWebStoriesPage />} />
//             <Route path="/youth" element={<YouthPage />} />
              
//           </Route>
//         </Routes>
//       </main>

//       <div ref={footerRef}>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default HomePage1;
        



import React, { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// कॉमन कंपोनेंट्स
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer";
import LeftSidebar from "../../components/common/LeftSidebar";

// लेआउट्स
import LayoutWithRightSidebarOnly from "../../layouts/LayoutWithRightSidebarOnly";

// पेज कंटेंट
import EntertainmentPage from "../../components/MainArtical/EntertainmentPage";
import PlacementPage from "../../components/MainArtical/PlacementPage";
import IndiaPage from "./IndiaPage";
import RashifalDetailsPage from "../../components/MainArtical/RashifalDetailsPage";
import Form from "../../components/MainArtical/Form";
import NewsPage from "../../components/Main_NewsDetails/NewsContent";
// EpaperGallery, EpaperViewer, EpaperPage के imports हटा दिए गए हैं
import ReelViewer from "../../components/ReelsViewer/ReelViewer";
import NewsDetailPage from "../../components/Main_NewsDetails/NewsDetailPage";
import DirectoryPage from "../../Directory/DirectoryPage";
import CategoryNewsPage from '../../components/NewsDetails/CategoryNewsPage';
import StateNewsPage from '../../components/Main_NewsDetails/StateNewsPage';
import BusinessListPage from "../../components/common/saidbarPage/BusinessListPage";
import EntertainmentListPage from "../../components/common/saidbarPage/EntertainmentListPage";
import SportsListPage from "../../components/common/saidbarPage/SportsListPage";

import VideoDetail from "../../components/Main_NewsDetails/VideoDetail";
import EmstvPage from "../../components/common/Header/EmstvPage";
import YouthPage from "../../components/common/saidbarPage/YouthPage";
import ThoughtsListPage from "../../components/common/saidbarPage/ThoughtsListPage";
import RelatedNewsList from "../../components/NewsDetails/RelatedNewsList";
import SearchResultItem from "../../components/common/Header/SearchResultItem";

import WebStorySection from "../../webStory/WebStorySection";
import AllWebStoriesPage from "../../webStory/AllWebStoriesPage";
import AllShortsPage from "../../components/NewsDetails/AllShortsPage";
import CategoryDetailPage from "../../Directory/CategoryDetailPage";
import CompanyDetailPage from "../../Directory/CompanyDetailPage";


const HEADER_HEIGHT = 155; // px
const TOGGLE_BUTTON_OFFSET = 50; // px

const HomePage1 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarFixed, setIsSidebarFixed] = useState(true);
  const footerRef = useRef(null);

  // Toggle Sidebar
  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Footer observer → sidebar को footer आने पर absolute करना
  useEffect(() => {
    const footerElement = footerRef.current;
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSidebarFixed(!entry.isIntersecting);
      },
      { rootMargin: "0px" }
    );

    observer.observe(footerElement);
    return () => observer.unobserve(footerElement);
  }, []);

  return (
    <div>
      {/* ===== Header ===== */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1030,
          backgroundColor: "white",
        }}
      >
        <Header onToggleSidebar={handleToggleSidebar} />
      </header>

      {/* ===== Left Sidebar (Overlay) ===== */}
      <div
        style={{
          position: isSidebarFixed ? "fixed" : "absolute",
          top: isSidebarFixed ? HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET : "auto",
          bottom: isSidebarFixed ? "auto" : 0,
          left: isSidebarOpen ? 0 : "-270px",
          width: "270px",
          height: isSidebarFixed
            ? `calc(100vh - ${HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET}px)`
            : "auto",
          backgroundColor: "#fff",
          zIndex: 1040,
          transition: "left 0.3s ease",
          overflowY: "auto",
          boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
        }}
      >
        <LeftSidebar />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={handleToggleSidebar}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET,
            left: 0,
            width: "100%",
            height: `calc(100vh - ${HEADER_HEIGHT + TOGGLE_BUTTON_OFFSET}px)`,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1035,
          }}
        />
      )}

      {/* Main Content */}
      <main className="position-relative">
        <Routes>
          <Route path="/placement-consultants" element={<PlacementPage />} />
          {/* E-Paper संबंधित सभी Routes हटा दिए गए हैं */}
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/CategoryDetailPage" element={< CategoryDetailPage />} />
          <Route path="/login" element={<Form />} />
               <Route path="/company/:companyId" element={<CompanyDetailPage />} />
   

          <Route element={<LayoutWithRightSidebarOnly />}>
            <Route path="/" element={<NewsPage />} />
            <Route path="/india" element={<IndiaPage />} />
            <Route path="/astrology" element={<RashifalDetailsPage />} />
            <Route path="/news/:slugId" element={<NewsDetailPage />} />
            <Route path="/business" element={<BusinessListPage />} />
            <Route path="/sports" element={<SportsListPage />} />
            <Route path="/entertainment" element={<EntertainmentListPage />} />
            <Route path="/category/:categoryName" element={<CategoryNewsPage />} />
            <Route path="/state/:stateName/:stateId" element={<StateNewsPage />} />
            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route path="/thoughts" element={<ThoughtsListPage />} />
            <Route path="/shorts/:slug" element={<ReelViewer />} />
            <Route path="/shorts" element={<AllShortsPage />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/emstv" element={<EmstvPage />} />
            <Route path="/related-news" element={<RelatedNewsList />} />
            <Route path="/search" element={<SearchResultItem />} />
            <Route path="/web-stories" element={<WebStorySection />} />
            <Route path="/all-webstories" element={<AllWebStoriesPage />} />
            <Route path="/youth" element={<YouthPage />} />
          
              
          </Route>
        </Routes>
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage1;