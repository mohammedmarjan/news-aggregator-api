const axios = require('axios');
const { newsApi } = require('../config'); // External news API configuration

module.exports = {
  async getNews(req, res) {
    try {
      const user = req.user; // User object obtained from authentication middleware

      // Fetch news articles from the external API based on user preferences
      const { preferences } = user;
      const newsPromises = preferences.map(async preference => {
        const response = await axios.get(`${newsApi.baseUrl}/everything`, {
          params: {
            apiKey: newsApi.apiKey,
            q: preference,
          },
        });
        return response.data.articles;
      });

      const newsByPreferences = await Promise.all(newsPromises);

      // Flatten the array of news articles and remove duplicates
      const allNews = newsByPreferences.flat();
      const uniqueNews = Array.from(new Set(allNews.map(article => article.url)))
        .map(url => allNews.find(article => article.url === url));

      return res.status(200).json(uniqueNews);
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },

  async markAsRead(req, res) {
    try {
      // Code to mark an article as read
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },

  async markAsFavorite(req, res) {
    try {
      // Code to mark an article as favorite
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },

  async getReadNews(req, res) {
    try {
      // Code to retrieve read news articles
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },

  async getFavoriteNews(req, res) {
    try {
      // Code to retrieve favorite news articles
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },

  async searchNewsByKeyword(req, res) {
    try {
      // Code to search news articles by keyword
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },
};
