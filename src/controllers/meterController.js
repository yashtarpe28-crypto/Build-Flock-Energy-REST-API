const urjaClient = require('../services/urjaClient');

async function listMeters(_req, res, next) {
  try {
    const data = await urjaClient.listMeters();
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function getMeter(req, res, next) {
  try {
    const data = await urjaClient.getMeter(req.params.id);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function getMeterConsumption(req, res, next) {
  try {
    const { from, to } = req.query;
    if ((from && Number.isNaN(Date.parse(from))) || (to && Number.isNaN(Date.parse(to)))) {
      return res.status(400).json({
        error: {
          code: 'INVALID_DATE',
          message: 'from and to must be valid date strings.'
        }
      });
    }
    const data = await urjaClient.getMeterConsumption(req.params.id, { from, to });
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
}

module.exports = { listMeters, getMeter, getMeterConsumption };
