'use strict';
/**
 * AIBH Zone Mapping — api/lib/zones.js
 * Extracted from compression-field-engine public shell.
 * When core/engine.js is present, AIBH.classify replaces this.
 * F=(P,E,M,R,C) · USAL-1.0 · Phillip Aguilar Ruiz III / UUON Foundation Inc.
 */

/**
 * Compute zone geometry from compressionK parameter.
 * @param {number} compressionK — compression radius multiplier (default 1.0)
 * @returns {{ rs, rFTZ, rISCO, rStream }}
 */
function zoneMap(compressionK = 1.0) {
  const rs      = Math.round(60 * compressionK);
  const rFTZ    = rs * 1.5;
  const rISCO   = rs * 3;
  const rStream = rs * 8;
  return { rs, rFTZ, rISCO, rStream };
}

/**
 * Classify a radius into a zone.
 * @param {number} r — radius from field center
 * @param {{ rs, rFTZ, rISCO, rStream }} zones
 * @returns {'bound'|'ftz'|'isco'|'stream'}
 */
function classify(r, zones) {
  if (r > zones.rStream) return 'stream';
  if (r > zones.rISCO)   return 'isco';
  if (r > zones.rFTZ)    return 'ftz';
  return 'bound';
}

module.exports = { zoneMap, classify };
