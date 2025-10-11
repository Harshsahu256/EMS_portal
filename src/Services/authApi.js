

import axios from "axios";
import { API_END_POINT } from "./authRoutes";

// ======================================================================
// --- User Authentication Functions ---
// ======================================================================
const getToken = () => localStorage.getItem("token");
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});
 
 
// Logs in a user.
export const userLogin = async (email, password) => {
  try {
    const response = await axios.post(API_END_POINT.LOGIN, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error in login:", error.response?.data || error.message);
    throw error.response?.data?.message || "Login failed";
  }
};
// ======================================================================

// Registers a new user.
export const userRegister = async (data) => {
  try {
    const response = await axios.post(API_END_POINT.REGISTER, data);
    return response.data;
  } catch (error) {
    console.error("Error in register:", error.response?.data || error.message);
    throw error.response?.data?.message || "Registration failed";
  }
};
// ======================================================================


// ======================================================================
// --- Content Fetching Functions ---
// ======================================================================

// Fetches headlines.
export const headline = async () => {
  try {
    const response = await axios.get(API_END_POINT.HEADLINE);
    return response.data;
  } catch (error) {
    console.error("Error fetching headline:", error.response?.data || error.message);
    throw error.response?.data?.message || "Headline fetch failed.";
  }
};
// ======================================================================

// Fetches all shorts for the logged-in user.
export const newsshorts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_END_POINT.NEWSSHORTS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shorts:", error.response?.data || error.message);
    throw error.response?.data?.message || "Newsshorts fetch failed";
  }
};
// ======================================================================

// Fetches all news articles.
// export const allNews = async () => {
//   try {
//     const response = await axios.get(API_END_POINT.ALL_NEWS);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching news:", error.response?.data || error.message);
//     throw error.response?.data?.message || "News fetch failed";
//   }
// };
export const allNews = async (filters = {}) => {
  try {
    // ✅ localStorage से language ले लो
    const lang = localStorage.getItem("userLanguage") || "en";
    const response = await axios.get(API_END_POINT.ALL_NEWS, {
      params: { ...filters, lang }  // ✅ backend को lang भेजेंगे
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error.response?.data || error.message);
    throw error.response?.data?.message || "News fetch failed";
  }
};
// export const allNews = async (filters = {}) => {
//   try {
//     const response = await axios.get(API_END_POINT.ALL_NEWS, { params: filters });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching news:", error.response?.data || error.message);
//     throw error.response?.data?.message || "News fetch failed";
//   }
// };

// ======================================================================

// Fetches a single news article by its ID.
// export const getNewsById = async (newsId) => {
//   try {
//     const response = await axios.get(API_END_POINT.GET_NEWS_BY_ID(newsId));
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching news with ID ${newsId}:`, error.response?.data || error.message);
//     throw error.response?.data?.message || "Failed to fetch news details.";
//   }
// };\

export const getNewsById = async (newsId) => {
  try {
    const lang = localStorage.getItem("userLanguage") || "en";
    const response = await axios.get(API_END_POINT.GET_NEWS_BY_ID(newsId), {
      params: { lang }, // ✅ backend को language भेज रहे हैं
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching news with ID ${newsId}:`, error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch news details.";
  }
};
// ======================================================================


// ======================================================================
// --- News Interaction Functions ---
// ======================================================================

// Adds a like to a news article.
export const addLikeToNews = async (newsId) => {
  try {
    const response = await axios.post(API_END_POINT.LIKE_NEWS(newsId));
    return response.data;
  } catch (error) {
    console.error("Error liking news:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to like news";
  }
};
// ======================================================================

// Adds a comment to a news article.
// export const addCommentToNews = async (newsId, commentData) => {
//   try {
//     const response = await axios.post(API_END_POINT.COMMENT_ON_NEWS(newsId), commentData);
//     return response.data;
//   } catch (error) {
//     console.error("Error commenting on news:", error.response?.data || error.message);
//     throw error.response?.data?.message || "Failed to add comment";
//   }
// };

export const addCommentToNews = async (newsId, commentData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_END_POINT.COMMENT_ON_NEWS(newsId),
      commentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error commenting on news:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to add comment";
  }
};
// ======================================================================


// ======================================================================
// --- Shorts Interaction Functions ---
// ======================================================================

// Adds a like to a short.
export const addLikeToShort = async (shortId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_END_POINT.LIKE_SHORT(shortId),
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error liking short:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to like short";
  }
};
// ======================================================================

// Adds a comment to a short.
export const addCommentToShort = async (shortId, commentData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_END_POINT.COMMENT_ON_SHORT(shortId),
      commentData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error commenting on short:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to add comment";
  }
};
// ======================================================================

// export const getCommentsByShortId = async (shortId) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.get(`${  API_END_POINT}/shorts/${shortId}/comment`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   return response.data;
// };

export const getCommentsForShort = async (shortId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      API_END_POINT.GET_COMMENTS_FOR_SHORT(shortId),
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // आपका API रिस्पांस { success: true, count: N, data: commentsArray } है।
    // तो हम सीधे response.data को रिटर्न करेंगे।
    return response.data;
  } catch (error) {
    console.error("Error fetching comments for short:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch comments";
  }
};

// ======================================================================
// --- Polls Functions ---
// ======================================================================

// Fetches all active polls for the logged-in user.
export const getAllPolls = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_END_POINT.POLLS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching polls:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch polls.";
  }
};
// ======================================================================

// Submits a vote on a specific poll.
export const voteOnPoll = async (pollId, voteData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_END_POINT.VOTE_ON_POLL(pollId),
      voteData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; 
  } catch (error) {
    console.error(`Error voting on poll ${pollId}:`, error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to record vote.";
  }
};
// ======================================================================


// ======================================================================
// --- Placeholder API Functions for Sidebar (Dummy Data) ---
// ======================================================================

// Fetches trending topics (placeholder).
//updations by 28-08-2025
// export const getTrendingTopics = async () => {
//   console.warn("Using placeholder data for getTrendingTopics. Replace with actual API call.");
//   return Promise.resolve({
//     success: true,
//     data: ['Today\'s Horoscope', 'Your Voice', 'Aarti Chalisa', 'Admissions', 'Archive']
//   });
// };
// ======================================================================

// Fetches videos (placeholder).
export const getVideos = async () => {
  console.warn("Using placeholder data for getVideos. Replace with actual API call.");
  return Promise.resolve({
    success: true,
    data: {
      mainVideo: { image: 'https://via.placeholder.com/400x250', title: 'Main Video Title from API' },
      videoList: [
        { image: 'https://via.placeholder.com/200x120', title: 'Video 1 from API' },
        { image: 'https://via.placeholder.com/200x120', title: 'Video 2 from API' }
      ]
    }
  });
};
// ======================================================================

// Fetches headlines (placeholder).
export const getHeadlines = async () => {
    console.warn("Using placeholder data for getHeadlines. Replace with actual API call.");
    return Promise.resolve({
        success: true,
        data: [
            { category: 'World', text: 'Headline 1 from API...', image: 'https://via.placeholder.com/100x75' },
            { category: 'Cricket', text: 'Headline 2 from API...', image: 'https://via.placeholder.com/100x75' }
        ]
    });
};
// ======================================================================

// Fetches horoscope data for a specific sign (placeholder).
export const getHoroscope = async (sign) => {
    console.warn(`Using placeholder data for getHoroscope for ${sign}. Replace with actual API call.`);
    const horoscopes = {
        'Aries': { name: 'Aries', description: 'API says: An energetic day awaits Aries.' },
        'Taurus': { name: 'Taurus', description: 'API says: A happy day for Taurus family.' },
        // ... add other signs as needed for placeholder
    };
    return Promise.resolve({
        success: true,
        data: horoscopes[sign] || horoscopes['Aries']
    });
};
// ======================================================================


// Fetch all countries
export const getCountries = async () => {
  try {
    const response = await axios.get( API_END_POINT.GET_COUNTRIES);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    throw error?.response?.data || { message: "Error fetching countries" };
  }
};


//==============================================================================//
// Fetch states by country ID
export const getStatesByCountry = async (countryId) => {
  try {
    const url =  API_END_POINT.GET_STATES_BY_COUNTRY(countryId);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch states for country ${countryId}:`, error);
    throw error?.response?.data || { message: "Error fetching states" };
  }
};

//===========================================================================================//
// Fetch cities by state ID
export const getCitiesByState = async (stateId) => {
  try {
    const url =  API_END_POINT.GET_CITIES_BY_STATE(stateId);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch cities for state ${stateId}:`, error);
    throw error?.response?.data || { message: "Error fetching cities" };
  }
};


// Tranding Topics api
//===========================================================================================================//
export const getTrendingTopic = async () => {
  try {
    const response = await axios.get(API_END_POINT.GET_TRENDING_TOPICS);
    return response.data; // { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching trending topics:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch trending topics";
  }
};

//==================================================================================================================//
export const getTrending = async () =>{
  try {
    const response = await axios.get(API_END_POINT.GET_MULTITRANDING)
   return response.data; // { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching trending topics:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch trending topics";
  }
};



//======================================================================================================//
// Rightsaid baar videos
export const getVideo = async () => {
  try {
    const response = await axios.get(API_END_POINT.GET_VIDEO);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch video";
  }
}


//==============================================================================================================//
// web story 


export const getWebStroy = async () =>{
  try {
    const response = await axios.get(API_END_POINT.GET_WEBSTORY);
    return response.data;
  } catch (error) {
    console.error("Error fetching webStrogy:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch video";
  }
}


//===============================Direcoty+==============================


export const registerCompany = async (data) => {
  try {
    const response = await axios.post(API_END_POINT.Company_REGISTER, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in company register:", error.response?.data || error.message);
    throw error.response?.data?.message || "Company Registration failed";
  }
};



export const getAllCompanyCategories = async () => {
  try {
    const res = await axios.get(API_END_POINT.GET_ALL_CompanyCATEGORIES, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Error in getAllCompanyCategories:", err.response?.data || err.message);
    throw err;
  }
};
export const getAllCompanySubCategories = async () => {
  try {
    const res = await axios.get(API_END_POINT.GET_ALL_CompanySUBCATEGORIES, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Error in getAllCompanySubCategories:", err.response?.data || err.message);
    throw err;
  }
};




// ✅ New: Get Companies By Category
export const getCompaniesByCategory = async (categoryId) => {
  try {
    const res = await axios.get(API_END_POINT.GET_COMPANIES_BY_CATEGORY(categoryId), getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error(`Error in getCompaniesByCategory(${categoryId}):`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ New: Get Company By ID
export const getCompanyById = async (companyId) => {
  try {
    const res = await axios.get(API_END_POINT.GET_COMPANY_BY_ID(companyId), getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error(`Error in getCompanyById(${companyId}):`, err.response?.data || err.message);
    // यह सुनिश्चित करने के लिए कि res.data में एक 'success: false' प्रॉपर्टी हो,
    // ताकि कंपोनेंट इसे ठीक से संभाल सके।
    return { success: false, message: err.response?.data?.message || "Failed to fetch company details by ID." };
  }
};