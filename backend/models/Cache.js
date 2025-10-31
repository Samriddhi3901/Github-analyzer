const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
  fetchedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }
});

module.exports = mongoose.model('Cache', cacheSchema);