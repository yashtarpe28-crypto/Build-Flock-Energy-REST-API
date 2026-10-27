require('dotenv').config();

const express = require('express');
const meterRoutes = require('./routes/meterRoutes');
const hierarchyRoutes = require('./routes/hierarchyRoutes');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Flock Energy API',
    timestamp: new Date().toISOString()
  });
});


app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Flock Energy API',
    timestamp: new Date().toISOString()
  });
});


app.use('/api/v1/meters', meterRoutes);
app.use('/api/v1/hierarchy', hierarchyRoutes);

app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'The requested route does not exist.'
    }
  });
});

app.use((err, _req, res, _next) => {
  console.error('[api-error]', err.message);
  const status = Number.isInteger(err.status) ? err.status : 500;
  res.status(status).json({
    error: {
      code: err.code || (status === 500 ? 'INTERNAL_SERVER_ERROR' : 'REQUEST_ERROR'),
      message: status === 500 ? 'An unexpected error occurred.' : err.message
    }
  });
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Flock Energy API running at http://localhost:${port}`);
  });
}

module.exports = app;
