const axios = require('axios');

const searchMusic = async (query, attribute) => {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://itunes.apple.com/search?term=${encodedQuery}&entity=song&attribute=${attribute}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    // Filter results based on trackName or artistName
    const filteredResults = results.filter(track => 
      track.trackName.toLowerCase().includes(query.toLowerCase()) ||
      track.artistName.toLowerCase().includes(query.toLowerCase())
    );

    return { results: filteredResults };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchMusic
};
