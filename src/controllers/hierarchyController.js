const urjaClient = require('../services/urjaClient');

async function getHierarchy(_req, res, next) {
  try {
    const data = await urjaClient.getHierarchy();
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = { getHierarchy };
