'use strict';
/**
 * AIBH Infall Dynamics — api/lib/infall.js
 * Angular momentum conservation + gravitational acceleration.
 * F=(P,E,M,R,C) · USAL-1.0 · Phillip Aguilar Ruiz III / UUON Foundation Inc.
 */

const { classify } = require('./zones');

/**
 * Advance one particle tick under infall dynamics.
 * @param {{ r, theta, L, dr }} particle
 * @param {{ rs, rFTZ, rISCO, rStream }} zones
 * @returns {object} updated particle state
 */
function infallTick(particle, zones) {
  let { r, theta, L, dr } = particle;

  // Angular momentum conservation: dTheta = L / r^2
  const dTheta = L / Math.max(r * r, 1);
  theta += dTheta;

  // Gravitational acceleration toward compression boundary
  // dr scaled by (rs/r)^2 — stronger pull closer to boundary
  const grav = Math.pow(zones.rs / Math.max(r, zones.rs * 0.1), 2);
  dr -= 0.001 * grav;

  // Clamp dr to prevent escape
  if (dr > 0) dr = -0.1;

  r += dr;

  return { r, theta, L, dr, zone: classify(r, zones) };
}

/**
 * Run N ticks of infall simulation.
 * @param {{ compressionK, particleCount, ticks }} params
 * @returns {Array} particle states after N ticks
 */
function simulate({ compressionK = 1.0, particleCount = 100, ticks = 60 }) {
  const { zoneMap } = require('./zones');
  const zones = zoneMap(compressionK);

  // Initialize particles
  let particles = Array.from({ length: particleCount }, (_, i) => {
    const r  = zones.rISCO + Math.random() * (zones.rStream - zones.rISCO);
    const L  = r * (0.0008 + Math.random() * 0.003);
    const dr = -(0.28 + Math.random() * 0.55);
    return { r, theta: Math.random() * Math.PI * 2, L, dr };
  });

  // Run ticks
  for (let t = 0; t < ticks; t++) {
    particles = particles.map(p => {
      const next = infallTick(p, zones);
      // Respawn at stream if particle crosses boundary
      if (next.r <= zones.rs * 0.5) {
        next.r = zones.rStream * (0.55 + Math.random() * 0.45);
        next.dr = -(0.28 + Math.random() * 0.55);
      }
      return next;
    });
  }

  return particles;
}

module.exports = { infallTick, simulate };
