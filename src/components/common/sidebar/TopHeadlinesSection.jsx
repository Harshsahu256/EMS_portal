

// import React, { useState, useEffect } from 'react';
// import { Image, Spinner, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { allNews } from '../../../Services/authApi';

// const TopHeadlinesSection = () => {
//   const [headlines, setHeadlines] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);

//   const navigate = useNavigate();

//   // ✅ Horoscope aur unwanted categories
//   const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

//   useEffect(() => {
//     allNews()
//       .then((response) => {
//         if (response?.success) {
//           // ✅ Filter: Horoscope, Sports, Flace remove
//           const filteredData = response.data.filter((article) => {
//             const cat = article?.category?.name?.toLowerCase();
//             if (!cat) return false;

//             return !(
//               cat === "sports" ||
//               cat === "flace" ||
//               HOROSCOPE_CATEGORY.includes(cat)
//             );
//           });

//           setHeadlines(filteredData);
//         }
//       })
//       .catch((err) => console.error("Failed to load news", err))
//       .finally(() => setIsLoading(false));
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" size="sm" />
//       </div>
//     );
//   }

//   // ✅ Agar showAll false hai to pehli 5 news show hogi, warna sab
//   const displayedHeadlines = showAll ? headlines : headlines.slice(0, 5);

//   return (
//     <div className="mb-4">
//       {/* ✅ Heading like Videos */}
//       <div className="d-flex align-items-center mb-3">
//         <div
//           style={{
//             width: "3px",
//             height: "16px",
//             backgroundColor: "#C00000",
//             marginRight: "8px",
//           }}
//         />
//         <h4
//           className="fw-bold m-0"
//           style={{ fontSize: "22px", lineHeight: "1.3", color: "#000" }}
//         >
//           Top Headlines
//         </h4>
//         <div
//           style={{
//             flex: 1,
//             height: "2px",
//             backgroundColor: "#C00000",
//             marginLeft: "12px",
//           }}
//         />
//       </div>

//       {displayedHeadlines.map((item) => (
//         <div
//           key={item._id}
//           className="mb-3"
//           style={{ cursor: "pointer" }}
//           onClick={() =>
//             navigate(`/news/${item._id}`, {
//               state: { relatedArticles: headlines },
//             })
//           }
//         >
//           {/* Category Name */}
//           <p className="text-danger small fw-bold mb-2">
//             {item.category?.name || "General"}
//           </p>

//           <div className="d-flex flex-wrap align-items-center">
//             {/* News Image */}
//             {item.media?.length > 0 && (
//               <Image
//                 src={item.media[0].url}
//                 alt={item.title}
//                 style={{
//                   width: "100px",
//                   height: "75px",
//                   objectFit: "cover",
//                   flexShrink: 0,
//                 }}
//                 className="me-3 mb-2 mb-sm-0 rounded"
//               />
//             )}

//             {/* News Title */}
//             <p
//               className="fw-bold m-0"
//               style={{ fontSize: "0.9rem", lineHeight: "1.4", flex: 1 }}
//             >
//               {item.title}
//             </p>
//           </div>
//         </div>
//       ))}

//       {/* Read More / Read Less Button */}
//       {headlines.length > 5 && (
//         <div className="text-center mt-2">
//           <Button variant="link" onClick={() => setShowAll(!showAll)}>
//             {showAll ? "Read Less" : "Read More"}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopHeadlinesSection;


import React, { useState, useEffect } from "react";
import { Image, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { allNews } from "../../../Services/authApi";

const TopHeadlinesSection = () => {
  const [headlines, setHeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

  useEffect(() => {
    allNews()
      .then((response) => {
        console.log("API Response Raw:", response); // ✅ Debug

        if (response?.success) {
          const filteredData = response.data.filter((article) => {
            const cat = article?.category?.name?.toLowerCase();
            if (!cat) return false;

            return !(
              cat === "sports" ||
              cat === "flace" ||
              HOROSCOPE_CATEGORY.includes(cat)
            );
          });

          console.log("Filtered Headlines:", filteredData); // ✅ Debug
          setHeadlines(filteredData);
        }
      })
      .catch((err) => console.error("Failed to load news", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  const displayedHeadlines = showAll ? headlines : headlines.slice(0, 5);

  return (
    <div className="mb-4">
      {/* Section Heading */}
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
          Top Headlines
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

      {displayedHeadlines.map((item) => {
        const title = item?.title_hi || item?.title_en || "Untitled";
        const imageUrl =
          item?.media && item.media.length > 0 ? item.media[0].url : null;

        // ✅ Safe slug fallback
        const finalSlug = item?.slug || item?.slug_en || item?._id;

        return (
          <div
            key={item._id}
            className="mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log("Clicked Item:", item); // ✅ Debug
              navigate(`/news/${finalSlug}`, {
                state: { relatedArticles: headlines },
              });
            }}
          >
            {/* Category Name */}
            <p className="text-danger small fw-bold mb-2">
              {item.category?.name || "General"}
            </p>

            <div className="d-flex flex-wrap align-items-center">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={title}
                  style={{
                    width: "100px",
                    height: "75px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                  className="me-3 mb-2 mb-sm-0 rounded"
                />
              )}

              <p
                className="fw-bold m-0"
                style={{ fontSize: "0.9rem", lineHeight: "1.4", flex: 1 }}
              >
                {title}
              </p>
            </div>
          </div>
        );
      })}

      {headlines.length > 5 && (
        <div className="text-center mt-2">
          <Button variant="link" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Read Less" : "Read More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopHeadlinesSection;
