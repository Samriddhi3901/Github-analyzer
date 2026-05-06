const express = require('express');
const axios = require('axios');
const Cache = require('../models/Cache');
const router = express.Router();

async function getOrFetch(username) {
  let cached = await Cache.findOne({ username, expiresAt: { $gt: new Date() } });
  if (cached) return cached.data;
  const headers = { Authorization: `bearer ${process.env.GITHUB_TOKEN}` };
  const [userRes, reposRes, graphRes] = await Promise.all([
    axios.get(`https://api.github.com/users/${username}`, { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }),
    axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }),
    axios.post('https://api.github.com/graphql', {
      query: `
        query($user: String!) {
          user(login: $user) {
            name
            bio
            location
            company
            avatarUrl
            followers { totalCount }
            following { totalCount }
            repositories { totalCount }
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `,
      variables: { user: username }
    }, { headers })
  ]);

  

  const user = graphRes.data.data.user;
  const contributions = user.contributionsCollection.contributionCalendar.weeks
    .flatMap(w => w.contributionDays)
    .map(d => ({ date: d.date, count: d.contributionCount }));

  const repos = reposRes.data
    .map(r => ({
      name: r.name,
      description: r.description || "No description",
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updated: r.updated_at,
      url: r.html_url
    }))
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 10);

  const data = {
    stats: {
      name: user.name || username,
      bio: user.bio,
      location: user.location,
      company: user.company,
      avatar: user.avatarUrl,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      totalRepos: user.repositories.totalCount,
      totalContributions: user.contributionsCollection.contributionCalendar.totalContributions
    },
    contributions,
    repos
  };

  await Cache.findOneAndUpdate(
    { username },
    { data, fetchedAt: new Date(), expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    { upsert: true }
  );

  return data;
}

router.get('/:username', async (req, res) => {
  try {
    const data = await getOrFetch(req.params.username);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'User not found or API error' });
  }
});

module.exports = router;
