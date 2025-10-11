
// import React, { useState, useEffect } from "react";
// import { allNews } from "../../../Services/authApi";
// import { FaSearch } from "react-icons/fa";

// const SearchResultItem = () => {
//   const [query, setQuery] = useState("");
//   const [allNewsList, setAllNewsList] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Load all news once on component mount
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setLoading(true);
//         const res = await allNews();
//         setAllNewsList(res.data || []);
//         setResults(res.data || []); // Default: show all
//       } catch (error) {
//         console.error("❌ Failed to fetch all news:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   // ✅ Filter results whenever query changes
//   useEffect(() => {
//     if (!query.trim()) {
//       setResults(allNewsList); // Agar query empty hai to sab show karo
//       return;
//     }

//     const filtered = allNewsList.filter((news) => {
//       const lowerQuery = query.toLowerCase();

//       const titleMatch = news.title?.toLowerCase().includes(lowerQuery);
//       const tagsMatch = news.tags?.join(" ").toLowerCase().includes(lowerQuery);

//       const categoryMatch =
//         typeof news.category === "string"
//           ? news.category.toLowerCase().includes(lowerQuery)
//           : news.category?.name?.toLowerCase().includes(lowerQuery);

//       const cityMatch =
//         typeof news.city === "string"
//           ? news.city.toLowerCase().includes(lowerQuery)
//           : news.city?.name?.toLowerCase().includes(lowerQuery);

//       const stateMatch =
//         typeof news.state === "string"
//           ? news.state.toLowerCase().includes(lowerQuery)
//           : news.state?.name?.toLowerCase().includes(lowerQuery);

//       return titleMatch || tagsMatch || categoryMatch || cityMatch || stateMatch;
//     });

//     setResults(filtered);
//   }, [query, allNewsList]);

//   return (
//     <div style={{ padding: "20px", width: "100%", fontFamily: "Arial, sans-serif" }}>
//       {/* 🔍 Search Bar */}
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="खबर, टॉपिक, शहर, राज्य या स्टेट खोजें"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           style={{
//             flexGrow: 1,
//             padding: "11px 11px",
//             border: "2px solid black",
//             borderRadius: "25px 0 0 25px",
//             outline: "none",
//             fontSize: "14px",
//             backgroundColor: "#ffffff",
//             color: "black",
//           }}
//         />
//         <button
//           type="button"
//           style={{
//             padding: "12px 22px",
//             border: "none",
//             borderRadius: "0 25px 25px 0",
//             backgroundColor: "#db2929ff",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <FaSearch size={23} style={{ color: "white" }} />
//         </button>
//       </div>

//       {/* Loading State */}
//       {loading && <p>Loading...</p>}

//       {/* 🔥 Trending (Only when no query typed) */}
//       {!loading && !query && allNewsList.length > 0 && (
//         <div style={{ marginBottom: "20px" }}>
//           <h2 style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>ट्रेंडिंग</h2>
//           <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//             {allNewsList.slice(0, 6).map((news) => (
//               <li key={news._id}>
//                 <a
//                   href={`/news/${news._id}`}
//                   style={{
//                     display: "block",
//                     width: "100%",
//                     padding: "8px",
//                     borderBottom: "1px solid #ddd",
//                     fontWeight: "bold",
//                     color: "black",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {news.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* 💡 Suggestions - Filtered Result */}
//       {!loading && query && (
//         results.length > 0 ? (
//           <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//             {results.map((news) => (
//               <li
//                 key={news._id}
//                 className="search-item"
//                 style={{
//                   background: "#ffffff",
//                   color: "black",
//                   padding: "12px",
//                   borderRadius: "8px",
//                   marginBottom: "10px",
//                   border: "1px solid #ddd",
//                   boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
//                 }}
//               >
//                 <a
//                   href={`/news/${news._id}`}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "12px",
//                     textDecoration: "none",
//                     color: "inherit",
//                     flexWrap: "wrap", // ✅ Mobile friendly
//                   }}
//                 >
//                   {/* 🖼 Left Image */}
//                   {news.media?.[0]?.url && (
//                     <img
//                       src={news.media[0].url}
//                       alt={news.title}
//                       className="news-image"
//                       style={{
//                         width: "60px",
//                         height: "45px",
//                         objectFit: "cover",
//                         borderRadius: "5px",
//                         border: "1px solid #ccc",
//                         flexShrink: 0,
//                       }}
//                     />
//                   )}

//                   {/* 📝 Right Title & Date */}
//                   <div className="news-text">
//                     <h3
//                       style={{
//                         fontWeight: "bold",
//                         color: "black",
//                         fontSize: "14px",
//                         margin: 0,
//                       }}
//                     >
//                       {news.title}
//                     </h3>
//                     <p
//                       style={{
//                         fontSize: "12px",
//                         color: "gray",
//                         marginTop: "4px",
//                       }}
//                     >
//                       {new Date(news.createdAt).toLocaleDateString("hi-IN", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                       })}
//                     </p>
//                   </div>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p style={{ color: "gray", marginTop: "10px" }}>No results found.</p>
//         )
//       )}

//       {/* ✅ Responsive Tweaks */}
//       <style>{`
//         @media (max-width: 576px) {
//           .search-item a {
//             flex-direction: column !important;
//             align-items: flex-start !important;
//           }
//           .search-item img {
//             width: 100% !important;
//             height: auto !important;
//             margin-bottom: 8px;
//           }
//           .search-item h3 {
//             font-size: 13px !important;
//             line-height: 1.4;
//           }
//           .search-item p {
//             font-size: 11px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SearchResultItem;


import React, { useState, useEffect } from "react";
import { allNews } from "../../../Services/authApi";
import { FaSearch } from "react-icons/fa";

const SearchResultItem = () => {
  const [query, setQuery] = useState("");
  const [allNewsList, setAllNewsList] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all news on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await allNews();
        setAllNewsList(res.data || []);
        setResults(res.data || []); // default: show all
      } catch (error) {
        console.error("❌ Failed to fetch all news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Filter results whenever query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults(allNewsList); // show all when empty
      return;
    }

    const filtered = allNewsList.filter((news) => {
      const lowerQuery = query.toLowerCase();

      const titleMatch =
        news.title_hi?.toLowerCase().includes(lowerQuery) ||
        news.title_en?.toLowerCase().includes(lowerQuery);

      const tagsMatch = news.tags?.join(" ").toLowerCase().includes(lowerQuery);

      const categoryMatch =
        typeof news.category === "string"
          ? news.category.toLowerCase().includes(lowerQuery)
          : news.category?.name?.toLowerCase().includes(lowerQuery);

      const cityMatch =
        typeof news.city === "string"
          ? news.city.toLowerCase().includes(lowerQuery)
          : news.city?.name?.toLowerCase().includes(lowerQuery);

      const stateMatch =
        typeof news.state === "string"
          ? news.state.toLowerCase().includes(lowerQuery)
          : news.state?.name?.toLowerCase().includes(lowerQuery);

      return titleMatch || tagsMatch || categoryMatch || cityMatch || stateMatch;
    });

    setResults(filtered);
  }, [query, allNewsList]);

  return (
    <div style={{ padding: "20px", width: "100%", fontFamily: "Arial, sans-serif" }}>
      {/* Search Bar */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="खबर, टॉपिक, शहर, राज्य या स्टेट खोजें"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "10px 11px",
            border: "2px solid black",
            borderRadius: "25px 0 0 25px",
            outline: "none",
            fontSize: "14px",
            backgroundColor: "#ffffff",
            color: "black",
          }}
        />
       <button
  type="button"
  onClick={() => {
    // Scroll to top on search click
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  style={{
    padding: "11px 22px",
    border: "none",
    borderRadius: "0 25px 25px 0",
    backgroundColor: "#db2929ff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <FaSearch size={23} style={{ color: "white" }} />
</button>

      </div>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Trending News (when no query) */}
      {!loading && !query && allNewsList.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>ट्रेंडिंग</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {allNewsList.slice(0, 6).map((news) => (
              <li key={news._id}>
                <a
                  href={`/news/${news.slug_en}`}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px",
                    borderBottom: "1px solid #ddd",
                    fontWeight: "bold",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  {news.title_hi || news.title_en}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filtered Results */}
      {!loading && query && (
        results.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {results.map((news) => (
              <li
                key={news._id}
                className="search-item"
                style={{
                  background: "#ffffff",
                  color: "black",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                }}
              >
                <a
                  href={`/news/${news.slug_en}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    textDecoration: "none",
                    color: "inherit",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Left Image */}
                  {news.media?.[0]?.url && (
                    <img
                      src={news.media[0].url}
                      alt={news.title_hi || news.title_en}
                      className="news-image"
                      style={{
                        width: "60px",
                        height: "45px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        flexShrink: 0,
                      }}
                    />
                  )}

                  {/* Title & Date */}
                  <div className="news-text">
                    <h3
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "14px",
                        margin: 0,
                      }}
                    >
                      {news.title_hi || news.title_en}
                    </h3>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "gray",
                        marginTop: "4px",
                      }}
                    >
                      {news.createdAtDate || new Date(news.createdAt).toLocaleDateString("hi-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "gray", marginTop: "10px" }}>No results found.</p>
        )
      )}

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 576px) {
          .search-item a {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .search-item img {
            width: 100% !important;
            height: auto !important;
            margin-bottom: 8px;
          }
          .search-item h3 {
            font-size: 13px !important;
            line-height: 1.4;
          }
          .search-item p {
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchResultItem;
