'use strict';
/**
 * AIBH Entropy Computation — api/lib/entropy.js
 * Zone distribution entropy — Shannon H over particle zone populations.
 * F=(P,E,M,R,C) · USAL-1.0 · Phillip Aguilar Ruiz III / UUON Foundation Inc.
 */

/**
 * Compute Shannon entropy H over zone distribution.
 * @param {Array<{zone: string}>} particles
 * @returns {{ H, zones, distribution, compression_ratio }}
 */
function fieldEntropy(particles) {
  const counts = { stream: 0, isco: 0, ftz: 0, bound: 0 };
  for (const p of particles) {
    if (p.zone in counts) counts[p.zone]++;
  }
  const total = particles.length;
  let H = 0;
  const distribution = {};
  for (const [zone, count] of Object.entries(counts)) {
    const p = count / total;
    distribution[zone] = { count, fraction: parseFloat(p.toFixed(4)) };
    if (p > 0) H -= p * Math.log2(p);
  }
  // Compression ratio: P-vector (~32 bytes) to field state (~200KB equivalent)
  const compression_ratio = Math.round((total * 32) / 32);
  return {
    H: parseFloat(H.toFixed(6)),
    max_H: 2.0, // log2(4 zones)
    efficiency: parseFloat((H / 2.0).toFixed(4)),
    zones: counts,
    distribution,
    compression_ratio,
    particle_count: total,
  };
}

module.exports = { fieldEntropy };
