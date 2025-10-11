
 
// import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import {
//   getNewsById,
//   addLikeToNews,
//   addCommentToNews,
//   allNews,
// } from "../../Services/authApi";
// import RelatedNews from "./RelatedNews";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Container, Spinner } from "react-bootstrap";
 
// // Media Renderer (no change)
// const MediaRenderer = ({ mediaItem }) => {
//   if (!mediaItem) {
//     return <div className="bg-light w-100 rounded mb-3" style={{ height: '300px' }}></div>;
//   }
//   switch (mediaItem.type) {
//     case "video":
//       return (
//         <video
//           src={mediaItem.url}
//           controls
//           className="img-fluid w-100 rounded mb-3"
//           style={{ maxHeight: "500px", backgroundColor: "#000" }}
//         />
//       );
//     case "image":
//     default:
//       return <img src={mediaItem.url} alt={mediaItem.caption || "News Media"} className="img-fluid w-100 rounded mb-3" />;
//   }
// };
 
// const NewsDetailPage = () => {
//   // CHANGE 1: Get 'slug' from useParams instead of 'newsId'
 
//  const { slugId } = useParams();
// const newsId = slugId.split("-").pop();
 
//   const location = useLocation();
 
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [relatedNews, setRelatedNews] = useState([]);
 
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [commentCount, setCommentCount] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
 
//   // Format date + time (no change)
//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return '';
//     const options = {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleString("hi-IN", options);
//   };
 
//   useEffect(() => {
//     // CHANGE 2: Use 'slug' to check for existence
//     if (!slugId) return;
 
//     const fetchArticleAndRelated = async () => {
//       try {
//         setLoading(true);
//         setArticle(null);
//         setError(null);
//         window.scrollTo(0, 0);
 
//         // CHANGE 3: Pass 'slug' to the getNewsById service
//         const articleRes = await getNewsById(newsId);
//         if (!articleRes.success) throw new Error(articleRes.message || "Failed to fetch article");
 
//         const currentArticle = articleRes.data || {};
//         setArticle(currentArticle);
//         setLikeCount(currentArticle.likesCount || 0);
//         setCommentCount(currentArticle.commentsCount || 0);
//         setComments(currentArticle.comments || []);
//         setIsLiked(currentArticle.isLiked || false);
 
//         const relatedFromState = location.state?.relatedArticles;
 
//         if (relatedFromState?.length > 0) {
//           setRelatedNews(relatedFromState);
//         } else if (currentArticle.category?._id) {
//           const allNewsRes = await allNews();
//           if (allNewsRes.success) {
//             const filtered = allNewsRes.data.filter(
//               (item) => item.category?._id === currentArticle.category._id && item._id !== currentArticle._id
//             );
//             setRelatedNews(filtered);
//           }
//         }
//       } catch (err) {
//         setError(err.message || "A network error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchArticleAndRelated();
//   // CHANGE 4: Add 'slug' to the dependency array
//   }, [slugId, location.state]);
 
//   // handleLikeClick, handleCommentSubmit, handleShareClick, loading/error/no article UI (no changes)
//   const handleLikeClick = async () => {
//     if (!article) return;
//     try {
//       const res = await addLikeToNews(article._id); // Likes/Comments still use article._id
//       if (res.success) {
//         if (isLiked) {
//           setIsLiked(false);
//           setLikeCount((prev) => prev - 1);
//         } else {
//           setIsLiked(true);
//           setLikeCount((prev) => prev + 1);
//         }
//       }
//     } catch (err) {
//       console.error("Like error:", err);
//     }
//   };
 
 
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim() || !article) return;
//     setIsSubmitting(true);
//     try {
//       const res = await addCommentToNews(article._id, { text: newComment }); // Likes/Comments still use article._id
//       if (res.success) {
//         setComments(res.data.comments || []);
//         setCommentCount(res.data.commentsCount || commentCount);
//         setNewComment("");
//       }
//     } catch (err) {
//       console.error("Comment error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
 
//   const handleShareClick = async () => {
//     if (!article) return;
//     const shareData = {
//       title: article.title_en, // Use title_en or title_hi as appropriate for the default share text
//       text: article.content_hi?.slice(0, 100), // Use content_en or content_hi
//       url: window.location.href, // This will already be the slug URL
//     };
//     try {
//       await navigator.share(shareData);
//     } catch (err) {
//       console.error("Share failed:", err);
//     }
//   };
 
//   if (loading) {
//     return (
//       <Container className="text-center my-5" style={{ minHeight: '60vh' }}>
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-2">Loading Article...</p>
//       </Container>
//     );
//   }
 
//   if (error) {
//     return (
//       <Container className="text-center my-5">
//         <p className="text-danger">{error}</p>
//       </Container>
//     );
//   }
 
//   if (!article) {
//     return (
//       <Container className="text-center my-5">
//         <p>Article not found.</p>
//       </Container>
//     );
//   }
 
//   return (
//     <Container className="my-4">
//       <div className="bg-white p-3 p-md-4 shadow-sm" style={{ border: "1px solid #eee", borderRadius: "8px" }}>
 
//         {/* Title */}
//         {/* Use article.title_en or article.title_hi based on your display logic */}
//         <h1 className="fw-bold mb-3" style={{ fontSize: "1.6rem" }}>
//           {article.title_hi}
//         </h1>
 
//         {/* Media */}
//         <MediaRenderer mediaItem={article.media?.[0]} />
 
//         {/* Meta info */}
//         <div className="d-flex align-items-center mb-3">
//           <UserAvatar user={article.createdBy} />
//           <small className="ms-2 text-muted">
//             {article.createdBy?.name || "Express Media Service"} | {formatFullDateTime(article.createdAt)}
//           </small>
//         </div>
 
//         {/* Content */}
//         {/* Use article.content_en or article.content_hi */}
//         <div
//           className="article-content mb-3"
//           style={{ fontSize: "1rem", lineHeight: "1.7", whiteSpace: "pre-wrap" }}
//           dangerouslySetInnerHTML={{ __html: article.content_hi }}
//         ></div>
 
//         {/* Like, Comment, Share */}
//      {/* Like, Comment, Share */}
// <div className="d-flex flex-wrap align-items-center gap-3 mt-3 pt-2 border-top">
//   <div
//     onClick={handleLikeClick}
//     className="d-flex align-items-center gap-2 text-muted"
//     style={{ cursor: "pointer" }}
//   >
//     <i className={`fs-5 bi ${isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"}`}></i>
//     <span>{likeCount}</span>
//   </div>

//   <div onClick={() => setShowComments(!showComments)} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
//     <i className="bi bi-chat-dots fs-5"></i>
//     <span>{commentCount}</span>
//   </div>

//   {/* Main Share Icon */}
//   <div onClick={handleShareClick} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
//     <i className="bi bi-share fs-5"></i>
//   </div>

//   {/* WhatsApp Share */}
//   <a
//     href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title_hi + " - " + window.location.href)}`}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="d-flex align-items-center gap-2 text-success"
//     style={{ cursor: "pointer" }}
//     title="Share on WhatsApp"
//   >
//     <i className="bi bi-whatsapp fs-5"></i>
//   </a>

//   {/* Facebook Share */}
//   <a
//     href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="d-flex align-items-center gap-2 text-primary"
//     style={{ cursor: "pointer" }}
//     title="Share on Facebook"
//   >
//     <i className="bi bi-facebook fs-5"></i>
//   </a>
// </div>

 
//         {/* Comments */}
//         {showComments && (
//           <div className="mt-4 border-top pt-3">
//             <h4 className="mb-3">Comments ({commentCount})</h4>
//             <form onSubmit={handleCommentSubmit} className="d-flex flex-column flex-md-row gap-2 mb-4">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Write a comment..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 disabled={isSubmitting}
//               />
//               <button type="submit" className="btn btn-primary" disabled={isSubmitting || !newComment.trim()}>
//                 {isSubmitting ? "..." : "Post"}
//               </button>
//             </form>
//             <div className="comments-list">
//               {comments.length > 0 ? (
//                 comments.map((comment) => (
//                   <div key={comment._id} className="border-bottom pb-2 mb-2">
//                     <div className="d-flex align-items-center mb-1">
//                       <UserAvatar user={comment.user} size={25} />
//                       <strong className="ms-2">{comment.user?.name || "Anonymous"}</strong>
//                     </div>
//                     <p className="mb-0 ps-5">{comment.text}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No comments yet. Be the first to comment!</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
 
//       {/* Related News */}
//       {/* Pass article._id here if RelatedNews needs to exclude the current article,
//           or pass slug if RelatedNews logic is also slug-based */}
//       <RelatedNews articles={relatedNews} currentArticleId={article._id} />
//     </Container>
//   );
// };
 
// export default NewsDetailPage;
 

// import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import {
//   getNewsById,
//   addLikeToNews,
//   addCommentToNews,
//   allNews,
// } from "../../Services/authApi";
// import RelatedNews from "./RelatedNews";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Container, Spinner } from "react-bootstrap";

// // Media Renderer
// const MediaRenderer = ({ mediaItem }) => {
//   if (!mediaItem) {
//     return <div className="bg-light w-100 rounded mb-3" style={{ height: '300px' }}></div>;
//   }
//   switch (mediaItem.type) {
//     case "video":
//       return (
//         <video
//           src={mediaItem.url}
//           controls
//           className="img-fluid w-100 rounded mb-3"
//           style={{ maxHeight: "500px", backgroundColor: "#000" }}
//         />
//       );
//     case "image":
//     default:
//       return <img src={mediaItem.url} alt={mediaItem.caption || "News Media"} className="img-fluid w-100 rounded mb-3" />;
//   }
// };

// const NewsDetailPage = () => {
//   const { slugId } = useParams();
//   const newsId = slugId.split("-").pop();
//   const location = useLocation();

//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [relatedNews, setRelatedNews] = useState([]);

//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [commentCount, setCommentCount] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Format date + time
//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return '';
//     const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleString("hi-IN", options);
//   };

//  useEffect(() => {
//   if (!slugId) return;

//   const fetchArticleAndRelated = async () => {
//     try {
//       setLoading(true);
//       setArticle(null);
//       setError(null);
//       window.scrollTo(0, 0);

//       const articleRes = await getNewsById(newsId);
//       if (!articleRes.success) throw new Error(articleRes.message || "Failed to fetch article");

//       const currentArticle = articleRes.data || {};
//       setArticle(currentArticle);
//       setLikeCount(currentArticle.likesCount || 0);
//       setCommentCount(currentArticle.commentsCount || 0);
//       setComments(currentArticle.comments || []);
//       setIsLiked(currentArticle.isLiked || false);

//       let related = [];

//       // 1️⃣ Option 1: location.state
//       const relatedFromState = location.state?.relatedArticles?.filter(item => item._id !== currentArticle._id);
//       if (relatedFromState?.length > 0) {
//         related = relatedFromState;
//       } 
//       // 2️⃣ Option 2: category-based
//       else if (currentArticle.category?._id) {
//         const allNewsRes = await allNews();
//         if (allNewsRes.success) {
//           const categoryNews = allNewsRes.data.filter(
//             item => item._id !== currentArticle._id && item.category?._id === currentArticle.category._id
//           );
//           if (categoryNews.length > 0) related = categoryNews;
//           // 3️⃣ Option 3: Tag/Author/Trending fallback
//           else {
//             const fallbackNews = allNewsRes.data
//               .filter(item => item._id !== currentArticle._id)
//               .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
//               .slice(0, 5);
//             related = fallbackNews;
//           }
//         }
//       } 
//       // 3️⃣ Option 3: if no category
//       else {
//         const allNewsRes = await allNews();
//         if (allNewsRes.success) {
//           const fallbackNews = allNewsRes.data
//             .filter(item => item._id !== currentArticle._id)
//             .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
//             .slice(0, 5);
//           related = fallbackNews;
//         }
//       }

//       setRelatedNews(related);

//     } catch (err) {
//       setError(err.message || "A network error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchArticleAndRelated();
// }, [slugId, location.state]);

//   const handleLikeClick = async () => {
//     if (!article) return;
//     try {
//       const res = await addLikeToNews(article._id);
//       if (res.success) {
//         if (isLiked) {
//           setIsLiked(false);
//           setLikeCount(prev => prev - 1);
//         } else {
//           setIsLiked(true);
//           setLikeCount(prev => prev + 1);
//         }
//       }
//     } catch (err) {
//       console.error("Like error:", err);
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim() || !article) return;
//     setIsSubmitting(true);
//     try {
//       const res = await addCommentToNews(article._id, { text: newComment });
//       if (res.success) {
//         setComments(res.data.comments || []);
//         setCommentCount(res.data.commentsCount || commentCount);
//         setNewComment("");
//       }
//     } catch (err) {
//       console.error("Comment error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleShareClick = async () => {
//     if (!article) return;
//     const shareData = {
//       title: article.title_en,
//       text: article.content_hi?.slice(0, 100),
//       url: window.location.href,
//     };
//     try { await navigator.share(shareData); } catch (err) { console.error(err); }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center my-5" style={{ minHeight: '60vh' }}>
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-2">Loading Article...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="text-center my-5">
//         <p className="text-danger">{error}</p>
//       </Container>
//     );
//   }

//   if (!article) {
//     return (
//       <Container className="text-center my-5">
//         <p>Article not found.</p>
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-4">
//       <div className="bg-white p-3 p-md-4 shadow-sm" style={{ border: "1px solid #eee", borderRadius: "8px" }}>
//         <h1 className="fw-bold mb-3" style={{ fontSize: "1.6rem" }}>{article.title_hi}</h1>
//         <MediaRenderer mediaItem={article.media?.[0]} />

//         <div className="d-flex align-items-center mb-3">
//           <UserAvatar user={article.createdBy} />
//           <small className="ms-2 text-muted">{article.createdBy?.name || "EMS"} | {formatFullDateTime(article.createdAt)}</small>
//         </div>

//         <div className="article-content mb-3" style={{ fontSize: "1rem", lineHeight: "1.7", whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: article.content_hi }}></div>

//         <div className="d-flex flex-wrap align-items-center gap-3 mt-3 pt-2 border-top">
//           <div onClick={handleLikeClick} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
//             <i className={`fs-5 bi ${isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"}`}></i>
//             <span>{likeCount}</span>
//           </div>

//           <div onClick={() => setShowComments(!showComments)} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
//             <i className="bi bi-chat-dots fs-5"></i>
//             <span>{commentCount}</span>
//           </div>

//           <div onClick={handleShareClick} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
//             <i className="bi bi-share fs-5"></i>
//           </div>

//           <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title_hi + " - " + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 text-success" style={{ cursor: "pointer" }} title="Share on WhatsApp">
//             <i className="bi bi-whatsapp fs-5"></i>
//           </a>

//           <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 text-primary" style={{ cursor: "pointer" }} title="Share on Facebook">
//             <i className="bi bi-facebook fs-5"></i>
//           </a>
//         </div>

//         {showComments && (
//           <div className="mt-4 border-top pt-3">
//             <h4 className="mb-3">Comments ({commentCount})</h4>
//             <form onSubmit={handleCommentSubmit} className="d-flex flex-column flex-md-row gap-2 mb-4">
//               <input type="text" className="form-control" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmitting} />
//               <button type="submit" className="btn btn-primary" disabled={isSubmitting || !newComment.trim()}>{isSubmitting ? "..." : "Post"}</button>
//             </form>
//             <div className="comments-list">
//               {comments.length > 0 ? comments.map(comment => (
//                 <div key={comment._id} className="border-bottom pb-2 mb-2">
//                   <div className="d-flex align-items-center mb-1">
//                     <UserAvatar user={comment.user} size={25} />
//                     <strong className="ms-2">{comment.user?.name || "Anonymous"}</strong>
//                   </div>
//                   <p className="mb-0 ps-5">{comment.text}</p>
//                 </div>
//               )) : <p>No comments yet. Be the first to comment!</p>}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Related News */}
//       <RelatedNews articles={relatedNews} currentArticleId={article._id} />
//     </Container>
//   );
// };

// export default NewsDetailPage;



import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  getNewsById,
  addLikeToNews,
  addCommentToNews,
  allNews,
} from "../../Services/authApi";
import RelatedNews from "./RelatedNews";
import UserAvatar from "../Main_NewsDetails/UserAvatar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Spinner } from "react-bootstrap";

// Media Renderer - इसमें कोई बदलाव नहीं
const MediaRenderer = ({ mediaItem }) => {
  if (!mediaItem) {
    return <div className="bg-light w-100 rounded mb-3" style={{ height: '300px' }}></div>;
  }
  switch (mediaItem.type) {
    case "video":
      return (
        <video
          src={mediaItem.url}
          controls
          className="img-fluid w-100 rounded mb-3"
          style={{ maxHeight: "500px", backgroundColor: "#000" }}
        />
      );
    case "image":
    default:
      return <img src={mediaItem.url} alt={mediaItem.caption || "News Media"} className="img-fluid w-100 rounded mb-3" />;
  }
};

// **नया हेल्पर फंक्शन**: यह फंक्शन HTML स्ट्रिंग से इमेज के साइज से जुड़े
// एट्रिब्यूट्स (width, height) और इनलाइन स्टाइल्स को हटाएगा.
// ताकि CSS पूरी तरह से इमेज को रिस्पॉन्सिव बना सके.
const cleanHtmlForImages = (htmlString) => {
  if (!htmlString) return '';

  // DOMParser का उपयोग करके HTML स्ट्रिंग को पार्स करें
  // यह ब्राउज़र के वातावरण में काम करेगा
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // सभी <img> टैग्स को ढूंढें
  const images = doc.querySelectorAll('img');

  images.forEach(img => {
    // hardcoded width और height एट्रिब्यूट्स को हटा दें
    img.removeAttribute('width');
    img.removeAttribute('height');

    // इनलाइन width और height स्टाइल्स को हटा दें
    // उदाहरण: <img style="width: 500px; height: 300px;"> से width और height हटाना
    if (img.style.width) {
      img.style.width = ''; // इनलाइन स्टाइल से width को खाली करें
    }
    if (img.style.height) {
      img.style.height = ''; // इनलाइन स्टाइल से height को खाली करें
    }
    // आप चाहें तो अन्य संभावित इनलाइन स्टाइल्स को भी यहाँ हटा सकते हैं
    // जैसे कि max-width, min-width, आदि, यदि वे समस्या पैदा कर रहे हों.
  });

  // साफ की हुई HTML स्ट्रिंग को वापस लौटाएं
  return doc.body.innerHTML;
};


const NewsDetailPage = () => {
  const { slugId } = useParams();
  // Ensure newsId is extracted correctly
  const newsId = slugId ? slugId.split("-").pop() : null; 
  const location = useLocation();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // क्लीन किए गए HTML कंटेंट के लिए नया स्टेट
  const [cleanedArticleContent, setCleanedArticleContent] = useState('');


  // Format date + time
  const formatFullDateTime = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric',  month: "2-digit", year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString("hi-IN", options);
  };

 useEffect(() => {
  if (!newsId) { // slugId के बजाय newsId चेक करें
      setLoading(false);
      setError("News ID not found in URL.");
      return;
  }

  const fetchArticleAndRelated = async () => {
    try {
      setLoading(true);
      setArticle(null);
      setError(null);
      setCleanedArticleContent(''); // कंटेंट लोड होने से पहले इसे रीसेट करें
      window.scrollTo(0, 0);

      const articleRes = await getNewsById(newsId);
      if (!articleRes.success) throw new Error(articleRes.message || "Failed to fetch article");

      const currentArticle = articleRes.data || {};
      setArticle(currentArticle);
      setLikeCount(currentArticle.likesCount || 0);
      setCommentCount(currentArticle.commentsCount || 0);
      setComments(currentArticle.comments || []);
      setIsLiked(currentArticle.isLiked || false);

      // **यहाँ पर कंटेंट को क्लीन करें और स्टेट में सेट करें**
      if (currentArticle.content_hi) {
        setCleanedArticleContent(cleanHtmlForImages(currentArticle.content_hi));
      }

      let related = [];

      // 1️⃣ Option 1: location.state
      const relatedFromState = location.state?.relatedArticles?.filter(item => item._id !== currentArticle._id);
      if (relatedFromState?.length > 0) {
        related = relatedFromState;
      } 
      // 2️⃣ Option 2: category-based
      else if (currentArticle.category?._id) {
        const allNewsRes = await allNews();
        if (allNewsRes.success) {
          const categoryNews = allNewsRes.data.filter(
            item => item._id !== currentArticle._id && item.category?._id === currentArticle.category._id
          );
          if (categoryNews.length > 0) related = categoryNews;
          // 3️⃣ Option 3: Tag/Author/Trending fallback
          else {
            const fallbackNews = allNewsRes.data
              .filter(item => item._id !== currentArticle._id)
              .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
              .slice(0, 5);
            related = fallbackNews;
          }
        }
      } 
      // 3️⃣ Option 3: if no category
      else {
        const allNewsRes = await allNews();
        if (allNewsRes.success) {
          const fallbackNews = allNewsRes.data
            .filter(item => item._id !== currentArticle._id)
            .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
            .slice(0, 5);
          related = fallbackNews;
        }
      }

      setRelatedNews(related);

    } catch (err) {
      setError(err.message || "A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  fetchArticleAndRelated();
}, [newsId, location.state]); // useEffect dependency array में slugId के बजाय newsId का उपयोग करें


  const handleLikeClick = async () => {
    if (!article) return;
    try {
      const res = await addLikeToNews(article._id);
      if (res.success) {
        if (isLiked) {
          setIsLiked(false);
          setLikeCount(prev => prev - 1);
        } else {
          setIsLiked(true);
          setLikeCount(prev => prev + 1);
        }
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !article) return;
    setIsSubmitting(true);
    try {
      const res = await addCommentToNews(article._id, { text: newComment });
      if (res.success) {
        setComments(res.data.comments || []);
        setCommentCount(res.data.commentsCount || commentCount);
        setNewComment("");
      }
    } catch (err) {
      console.error("Comment error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareClick = async () => {
    if (!article) return;
    const shareData = {
      title: article.title_en,
      text: article.content_hi?.slice(0, 100),
      url: window.location.href,
    };
    try { await navigator.share(shareData); } catch (err) { console.error(err); }
  };

  if (loading) {
    return (
      <Container className="text-center my-5" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading Article...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container className="text-center my-5">
        <p>Article not found.</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="bg-white p-3 p-md-4 shadow-sm" style={{ border: "1px solid #eee", borderRadius: "8px" }}>
        <h1 className="fw-bold mb-3" style={{ fontSize: "1.6rem" }}>{article.title_hi}</h1>
        <MediaRenderer mediaItem={article.media?.[0]} />

        <div className="d-flex align-items-center mb-3">
          <UserAvatar user={article.createdBy} />
          <small className="ms-2 text-muted">{article.createdBy?.name || "EMS"} | {formatFullDateTime(article.createdAt)}</small>
        </div>

        {/* **यहाँ dangerouslySetInnerHTML में क्लीन किए गए कंटेंट का उपयोग करें** */}
        <div className="article-content mb-3" style={{ fontSize: "1rem", lineHeight: "1.7", whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: cleanedArticleContent }}></div>

        <div className="d-flex flex-wrap align-items-center gap-3 mt-3 pt-2 border-top">
          <div onClick={handleLikeClick} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
            <i className={`fs-5 bi ${isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"}`}></i>
            <span>{likeCount}</span>
          </div>

          <div onClick={() => setShowComments(!showComments)} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
            <i className="bi bi-chat-dots fs-5"></i>
            <span>{commentCount}</span>
          </div>

          <div onClick={handleShareClick} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
            <i className="bi bi-share fs-5"></i>
          </div>

          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title_hi + " - " + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 text-success" style={{ cursor: "pointer" }} title="Share on WhatsApp">
            <i className="bi bi-whatsapp fs-5"></i>
          </a>

          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 text-primary" style={{ cursor: "pointer" }} title="Share on Facebook">
            <i className="bi bi-facebook fs-5"></i>
          </a>
        </div>

        {showComments && (
          <div className="mt-4 border-top pt-3">
            <h4 className="mb-3">Comments ({commentCount})</h4>
            <form onSubmit={handleCommentSubmit} className="d-flex flex-column flex-md-row gap-2 mb-4">
              <input type="text" className="form-control" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmitting} />
              <button type="submit" className="btn btn-primary" disabled={isSubmitting || !newComment.trim()}>{isSubmitting ? "..." : "Post"}</button>
            </form>
            <div className="comments-list">
              {comments.length > 0 ? comments.map(comment => (
                <div key={comment._id} className="border-bottom pb-2 mb-2">
                  <div className="d-flex align-items-center mb-1">
                    <UserAvatar user={comment.user} size={25} />
                    <strong className="ms-2">{comment.user?.name || "Anonymous"}</strong>
                  </div>
                  <p className="mb-0 ps-5">{comment.text}</p>
                </div>
              )) : <p>No comments yet. Be the first to comment!</p>}
            </div>
          </div>
        )}
      </div>

      {/* Related News */}
      <RelatedNews articles={relatedNews} currentArticleId={article._id} />
    </Container>
  );
};

export default NewsDetailPage;