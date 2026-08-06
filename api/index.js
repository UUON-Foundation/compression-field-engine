'use strict';
/**
 * AIBH Compression Field Engine — API Server
 * POST /external/v1/encode   — P-vector to zone geometry
 * POST /external/v1/field    — full field simulation
 * GET  /external/v1/decode/:hash — hash to P-vector
 * GET  /internal/v1/state    — field snapshot
 * POST /internal/v1/store    — store P-vector
 * GET  /health               — heartbeat
 *
 * F=(P,E,M,R,C) · USAL-1.0 · Phillip Aguilar Ruiz III / UUON Foundation Inc.
 */

require('dotenv').config();
const express = require('express');
const crypto  = require('crypto');
const { zoneMap, classify } = require('./lib/zones');
const { simulate }          = require('./lib/infall');
const { fieldEntropy }      = require('./lib/entropy');

const app    = express();
const PORT   = process.env.PORT || 3000;
const APIKEY = process.env.UUON_API_KEY;
const ADMIN  = process.env.ADMIN_KEY;

app.use(express.json());

// In-memory P-vector store (replace with DB in production)
const pvStore = new Map();

// ── Auth middleware ────────────────────────────────────────────────────────
function requireKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!APIKEY || key === APIKEY) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// ── Health ─────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'aibh-compression-field-engine',
    version: '1.0.0',
    core: typeof global.AIBH !== 'undefined' ? 'proprietary' : 'fallback',
    framework: 'F=(P,E,M,R,C)',
    license: 'USAL-1.0',
    author: 'Phillip Aguilar Ruiz III / UUON Foundation Inc.',
    timestamp: new Date().toISOString(),
  });
});

// ── External: encode P-vector → zone geometry ──────────────────────────────
app.post('/external/v1/encode', requireKey, (req, res) => {
  const { compressionK = 1.0, diskTilt = 0.35, particleCount = 100 } = req.body;
  const zones   = zoneMap(compressionK);
  const pvHash  = crypto.createHash('sha256')
    .update(JSON.stringify({ compressionK, diskTilt, particleCount }))
    .digest('hex');

  pvStore.set(pvHash, { compressionK, diskTilt, particleCount, stored_at: new Date().toISOString() });

  res.json({
    p_vector:    { compressionK, diskTilt, particleCount },
    p_vector_hash: pvHash,
    zones,
    provenance: {
      framework: 'F=(P,E,M,R,C)',
      usal_1_0:  'UUON-Foundation/USAL-1.0',
      author:    'Phillip Aguilar Ruiz III / UUON Foundation Inc.',
      engine:    'aibh-compression-field-engine@1.0.0',
      core:      typeof global.AIBH !== 'undefined' ? 'proprietary' : 'fallback',
      timestamp: new Date().toISOString(),
    }
  });
});

// ── External: full field simulation ───────────────────────────────────────
app.post('/external/v1/field', requireKey, (req, res) => {
  const {
    compressionK  = 1.0,
    diskTilt      = 0.35,
    particleCount = 100,
    ticks         = 60,
  } = req.body;

  const zones     = zoneMap(compressionK);
  const particles = simulate({ compressionK, particleCount, ticks });
  const entropy   = fieldEntropy(particles);

  res.json({
    p_vector: { compressionK, diskTilt, particleCount, ticks },
    zones,
    entropy,
    particles: particles.slice(0, 50), // Return first 50 for API response
    particle_count: particles.length,
    provenance: {
      framework:  'F=(P,E,M,R,C)',
      usal_1_0:   'UUON-Foundation/USAL-1.0',
      author:     'Phillip Aguilar Ruiz III / UUON Foundation Inc.',
      engine:     'aibh-compression-field-engine@1.0.0',
      core:       typeof global.AIBH !== 'undefined' ? 'proprietary' : 'fallback',
      compression_ratio: `~6250:1 (32B P-vector → ~200KB field)`,
      timestamp:  new Date().toISOString(),
    }
  });
});

// ── External: decode hash → P-vector ──────────────────────────────────────
app.get('/external/v1/decode/:hash', requireKey, (req, res) => {
  const pv = pvStore.get(req.params.hash);
  if (!pv) return res.status(404).json({ error: 'Hash not found. P-vectors expire on server restart.' });
  res.json({ hash: req.params.hash, p_vector: pv });
});

// ── Internal: full state snapshot ─────────────────────────────────────────
app.get('/internal/v1/state', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (ADMIN && adminKey !== ADMIN) return res.status(403).json({ error: 'Forbidden' });
  res.json({
    stored_pvectors: pvStore.size,
    pvectors: Array.from(pvStore.entries()).map(([hash, pv]) => ({ hash, ...pv })),
    timestamp: new Date().toISOString(),
  });
});

// ── Internal: store P-vector ───────────────────────────────────────────────
app.post('/internal/v1/store', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (ADMIN && adminKey !== ADMIN) return res.status(403).json({ error: 'Forbidden' });
  const pv   = req.body;
  const hash = crypto.createHash('sha256').update(JSON.stringify(pv)).digest('hex');
  pvStore.set(hash, { ...pv, stored_at: new Date().toISOString() });
  res.json({ hash, stored: true });
});

app.listen(PORT, () => {
  console.log(`[AIBH] Compression Field Engine API running on port ${PORT}`);
  console.log(`[AIBH] Core: ${typeof global.AIBH !== 'undefined' ? 'PROPRIETARY' : 'fallback'}`);
});
