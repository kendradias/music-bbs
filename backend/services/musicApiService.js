const axios = require('axios');

const searchMusic = async (query, attribute) => {
  console.log("[DEBUG] searchMusic called with query:", query, "attribute:", attribute);

  const encodedQuery = encodeURIComponent(query);
  const url = `https://itunes.apple.com/search?term=${encodedQuery}&entity=song&attribute=${attribute}`;

  console.log("[DEBUG] Request URL:", url);

  try {
    const response = await axios.get(url);
    console.log("[DEBUG] iTunes API status:", response.status);
    const results = response.data.results;
    const filteredResults = results.filter(track => 
      track.trackName.toLowerCase().includes(query.toLowerCase()) ||
      track.artistName.toLowerCase().includes(query.toLowerCase())
    );
    return { results: filteredResults };
  } catch (error) {
    console.error("[ERROR] iTunes API request failed:", error);
    throw error;
  }
};

module.exports = {
  searchMusic
};
