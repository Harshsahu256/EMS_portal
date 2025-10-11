
// import React, { useEffect, useState } from 'react';
// import { allNews } from '../../Services/authApi';
// import TopStory from '../NewsDetails/TopStory';
// import TrendingSection from '../NewsDetails/TrendingSection';
// import City from '../NewsDetails/City';
// import Manoranjan from '../NewsDetails/Manoranjan';
// import PremiereSection from '../NewsDetails/PremiereSection';
// import SportsSection from '../NewsDetails/SportsSection';
// import BusinessSection from '../NewsDetails/BusinessSection';
// import NewsShortsSection from '../NewsDetails/NewsShortsSection';
// import HindiNewsSection from '../NewsDetails/LatestSection';

// const NewsPage = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNewsData = async () => {
//       try {
//         const res = await allNews();
//         if (res.success) {
//           setNewsData(res.data);
//         }
//       } catch (err) {
//         console.error("News fetch error", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNewsData();
//   }, []);

//   if (loading) return <div>Loading news...</div>;

//   return (
//     <div>
//       <div className="bg-white p-0 shadow-sm" style={{ border: '1px solid #eee' }}>
//         {/* ✅ TopStory component ko full data de rahe hain */}
//         <TopStory data={newsData} />

//         {/* बाकी सेक्शन बाद में */}

//          <hr className="my-2" />
//        {/* <HindiNewsSection /> */}
//        <HindiNewsSection
//   stories={newsData.slice(10, 15)} // 10 से 15 वाली news Hindi section को दो
// />
//          <hr className="my-2" />
//         <NewsShortsSection />
// <hr className="my-2" />

//         <TrendingSection
//           stories={newsData.slice(5, 10).map(news => ({
//             category: news?.category?.name || "General",
//             text: news?.title || "",
//             prefixIcon: false
//           }))}
//         />
//       </div>

//    {/* बाकी सेक्शन */}
//       <City />
//       <Manoranjan />
//       <PremiereSection />
//       <SportsSection />
//       <BusinessSection />
      
//     </div>
//   );
// };

// export default NewsPage;

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { allNews } from "../../Services/authApi";
import TopStory from "../NewsDetails/TopStory";
import HindiNewsSection from "../NewsDetails/LatestSection";
import NewsShortsSection from "../NewsDetails/NewsShortsSection";
import TrendingSection from "../NewsDetails/TrendingSection";
import City from "../NewsDetails/City";
import Manoranjan from "../NewsDetails/Manoranjan";
import PremiereSection from "../NewsDetails/PremiereSection";
import SportsSection from "../NewsDetails/SportsSection";
import BusinessSection from "../NewsDetails/BusinessSection";
import WebStorySection from "../../webStory/WebStorySection";
import EmstvSection from "../NewsDetails/EmstvSection";
import MultiNewsSection from "../NewsDetails/MultiNewsSection";


const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const res = await allNews();
        if (res.success) setNewsData(res.data);
      } catch (err) {
        console.error("News fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsData();
  }, []);

  if (loading)
    return <div className="text-center my-4">Loading news...</div>;

  return (
    <Container fluid className="p-2 p-md-3">
  <TopStory data={newsData} />
  <hr className="my-3" />
  <HindiNewsSection stories={newsData.slice(10,15)} />
  <hr className="my-3" />
  <NewsShortsSection />
  <hr className="my-3" />
  <TrendingSection stories={newsData.slice(5,10)} />
  <hr className="my-3" />
  <City />
  <WebStorySection />
  <Manoranjan />
  <PremiereSection />
  <EmstvSection />
  <SportsSection />
  <BusinessSection />
  <MultiNewsSection />
</Container>

  );
};

export default NewsPage;
