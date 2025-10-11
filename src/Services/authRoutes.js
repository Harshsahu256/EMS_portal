



// export const API_BASE_URL =
//   "https://117pw42t-6000.inc1.devtunnels.ms/api/v1/user";

// export const API_END_POINT = {
//   // Auth Routes ===============================================================
//   // REGISTER: `${API_BASE_URL}/register`,
//   LOGIN: `${API_BASE_URL}/login`,

//   // Headline Routes ===========================================================
//   HEADLINE: `${API_BASE_URL}/headline`,

//   // NewsShorts Routes =========================================================
//   NEWSSHORTS: `${API_BASE_URL}/shorts`,

//   // News Routes ===============================================================
//   ALL_NEWS: `${API_BASE_URL}/news`,

//   // NEW: Like & Comment Routes ================================================
//   // These are now functions to accept dynamic IDs

//   // News Likes & Comments
//   LIKE_NEWS: (newsId) => `${API_BASE_URL}/news/${newsId}/like`,
//   COMMENT_ON_NEWS: (newsId) => `${API_BASE_URL}/news/${newsId}/comment`,

//   // Shorts Likes & Comments
//   // Shorts Likes & Comments
// LIKE_SHORT: (shortId) => `${API_BASE_URL}/shorts/${shortId}/like`,
// COMMENT_ON_SHORT: (shortId) => `${API_BASE_URL}/shorts/${shortId}/comment`,

//     // ✅ NAYA POLL ENDPOINT YAHAN JODEIN
//   POLLS: `${API_BASE_URL}/polls`,

//     GET_NEWS_BY_ID: (newsId) => `${API_BASE_URL}/admin/news/${newsId}`,


//      // ✅ YEH NAYI LINE JODEIN
//   VOTE_ON_POLL: (pollId) => `${API_BASE_URL}/polls/${pollId}/vote`, 

// };

// This file defines the base URL and all API endpoints for the application.

// export const API_BASE_URL = "https://newsapp.aasmo.in/api/v1/user";

 export const API_BASE_URL = "https://117pw42t-8004.inc1.devtunnels.ms/api/v1/user";


export const API_END_POINT = {

  // ===============================================================
  // --- Authentication Endpoints ---
  // ===============================================================
  LOGIN: `${API_BASE_URL}/login`,
  // REGISTER: `${API_BASE_URL}/register`, // This endpoint is currently commented out.


  // ===============================================================
  // --- General Content Endpoints ---
  // ===============================================================
  HEADLINE: `${API_BASE_URL}/headline`,
  NEWSSHORTS: `${API_BASE_URL}/shorts`,                
  ALL_NEWS: `${API_BASE_URL}/news`,
  
  // NOTE: This URL might be incorrect as it becomes ".../user/admin/news/..."
  GET_NEWS_BY_ID: (newsId) => `${API_BASE_URL}/news/${newsId}`,


  // ===============================================================
  // --- News Interaction Endpoints ---
  // ===============================================================
LIKE_NEWS: (newsId) => `${API_BASE_URL}/news/${newsId}/like`,
  COMMENT_ON_NEWS: (newsId) => `${API_BASE_URL}/news/${newsId}/comment`,


  // ===============================================================
  // --- Shorts Interaction Endpoints ---
  // ===============================================================
  LIKE_SHORT: (shortId) => `${API_BASE_URL}/shorts/${shortId}/like`,
  COMMENT_ON_SHORT: (shortId) => `${API_BASE_URL}/shorts/${shortId}/comment`,
GET_COMMENTS_FOR_SHORT:(shortId) => `${API_BASE_URL}/shorts/${shortId}/comment`,
  
  // ===============================================================
  // --- Polls Endpoints ---
  // ===============================================================
  POLLS: `${API_BASE_URL}/polls`,
  VOTE_ON_POLL: (pollId) => `${API_BASE_URL}/polls/${pollId}/vote`, 
     GET_COUNTRIES: `${API_BASE_URL}/countries`,
  GET_STATES_BY_COUNTRY: (countryId) => `${API_BASE_URL}/countries/${countryId}/states`,
  GET_CITIES_BY_STATE: (stateId) => `${API_BASE_URL}/states/${stateId}/cities`,
  

   GET_TRENDING_TOPICS: `${API_BASE_URL}/getTrendingTopics`,

   GET_MULTITRANDING: `${API_BASE_URL}/selected-category-news`,

  GET_VIDEO : `${API_BASE_URL}/videos`,
  

 GET_WEBSTORY : `${API_BASE_URL}/Stories`,


 Company_REGISTER : `${API_BASE_URL}/Companyregister`,

GET_ALL_CompanyCATEGORIES:`${API_BASE_URL}/CompanyCategory`,

GET_ALL_CompanySUBCATEGORIES:`${API_BASE_URL}/CompanySubCategories`,
 

GET_COMPANIES_BY_CATEGORY: (categoryId) => `${API_BASE_URL}/getCompaniesByCategory/${categoryId}`,

GET_COMPANY_BY_ID: (id) => `${API_BASE_URL}/company/${id}`,


};

 