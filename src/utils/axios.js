const axios = require("axios");
const PUBLIC_REPOS_URL = "https://api.github.com/repositories";

async function getPublicRepos(since = 0) {
  const { data } = await axios.get(`${PUBLIC_REPOS_URL}?since=${since}`);
  return data;
}

export default getPublicRepos;
