# UUON Compression Field Engine

**AI Information Black Hole / Geometric Compression Model**

`compression-field-engine` on GitHub under UUON-Foundation org.
Live at: https://uuon-foundation.github.io/compression-field-engine/
License: USAL-1.0 / Phillip Aguilar Ruiz III / UUON Foundation Inc.

![Display](https://github.com/UUON-Foundation/compression-field-engine/blob/220940ca92104d055d93a2ab58af52450ed45fdc/docs/images/compression-field-engine-image.png)
---

## What This Is

A geometric compression model that renders the structure of information encoding as a live field. The engine borrows the mathematical vocabulary of gravitational geometry (Schwarzschild radius, ISCO, angular momentum conservation) to make the topology of compression visible as drawn structure.

Four concentric zones model the stages of information state change. Particles travel inward under angular momentum conservation and gravitational acceleration, transform at the compression boundary, and emit outward from the boundary surface. The white interior is the latent space -- structure too dense to render.

This is not a simulation of a black hole. It is a compression field rendered using gravitational field geometry as its coordinate system.

---

## Interaction

- **Scroll** to zoom. Zooms toward the cursor position. No limit on zoom in or out.
- **Drag** to move the field. The compression boundary and all zones move together.
- **RST** button resets view to center.
- **+/-** buttons scale the compression boundary radius.
- **GEO** toggles the geodesic curves.
- **ZN** toggles zone labels.

Zoom range: 0.08x to 40x. Pinch-zoom supported on touch devices.

---

## F = (P, E, M, R, C)

| Symbol | Name | Definition | This Engine |
|--------|------|------------|-------------|
| P | Parameters | Minimal seed | compressionK, diskTilt, particleCount -- 3 values, ~32 bytes |
| E | Encoding | Deterministic topology from P | Infall dynamics: dr scaled by (rs/r)^2, angular momentum L/r^2 |
| M | Mapping | E output to zone classification to behavioral parameters | Zone threshold ratios to glyph class, opacity curve, angular boost |
| R | Representation | Any rendered output | Canvas 2D frame -- particle field, geodesics, leakage, zone geometry |
| C | Compression | Ratio of R size to P size | P(~32B) to R(~200KB at 1080p) = ~6,250:1 |

---

## Architecture

```
index.html          PUBLIC    renderer shell, UI, zoom, pan, draw passes
core/engine.js      PROPRIETARY  excluded from public repo via .gitignore
```

`index.html` calls into `window.AIBH.*` -- the API exposed by `core/engine.js`. The shell runs without the core using fallback dynamics. When the core is present, it replaces the fallback with the proprietary infall, zone mapping, and entropy computation.

### AIBH API

```javascript
AIBH.zoneMap(rs)                              // zone geometry from compression radius
AIBH.classify(r, zones)                       // zone key for radius r
AIBH.infall(r, theta, L, dr, rs, zones)       // one particle step
AIBH.entropy(particles, zones)                // H = -Sp.log2(p) over zone distribution
AIBH.leakSpawn(cx, cy, rs, diskTilt)          // compression event to leakage particle
AIBH.particleInit(zone, rs, zones, fieldR)    // particle initialization
```

### Zone Structure

| Zone | Radius | Information State |
|------|--------|-------------------|
| OUTER FIELD | rs x 8.0 | Binary substrate -- raw possibility space |
| DATA STREAM | rs x 3.0 | Semantic tokens -- structured incoming data |
| FEATURE TRANSITION | rs x 1.5 | Transformation operators -- encoding boundary |
| COMPRESSION BOUNDARY | rs x 1.0 | Compressed residuals -- post-encoding trace |

---

## Biological Analog

**Cellular membrane receptor complex / receptor-mediated endocytosis**

The four-zone compression field matches the receptor-mediated endocytosis pathway with structural correspondence, not visual:

- Outer field: extracellular ligand diffusion -- unstructured molecular possibility space
- Data stream: receptor binding zone -- structured recognition, selectivity begins
- Feature transition zone: clathrin-coated pit -- topology changes, inward curvature locks structure
- Compression boundary: endosome membrane -- content enclosed, exterior dissolved, structure preserved inside

Leakage emission (isotropic from boundary surface) maps to exosome secretion -- the cell emitting compressed vesicles carrying encoded molecular information outward.

Both systems transform high-entropy input into low-entropy enclosed state through a defined boundary with measured transition zones.

---

## Compression Ratio

| Configuration | P (bytes) | R (approx) | C ratio |
|---------------|-----------|------------|---------|
| compressionK=1.0, 1400 particles | 32 | ~200 KB | ~6,250:1 |
| compressionK=3.0, 1400 particles | 32 | ~200 KB | ~6,250:1 |

P does not change size with compressionK. Only rs scales. The compression ratio is a structural property of the formulation, not a codec claim.

---

## Shannon Entropy

H is computed over the zone-classified particle population, not over raw radial position:

```
H = -Sp(zone).log2(p(zone))     zones = { bound, ftz, isco, stream }
```

Maximum H = 2.0 bits at uniform zone occupancy. Displayed in the metrics panel, updated every 24 frames. When the engine core is absent, H falls back to spatial bin computation.

---

## Dependencies

Zero runtime dependencies. Google Fonts (Space Mono) loaded from CDN for typography only.

---

## Known Limitations at v1.0.0

| Limitation | Resolution Path |
|------------|-----------------|
| diskTilt fixed at 0.30 | Add tilt control in v1.1.0 |
| No P-vector serializer | Save/load JSON P vector in v1.1.0 |
| No API server | Build Node.js module from AIBH core |
| core/engine.js in repo (interim) | Complete uuon.world /engine route, restore .gitignore exclusion |

---

## License

USAL-1.0 -- UUON Source Attribution License
Copyright Phillip Aguilar Ruiz III / UUON Foundation Inc.
phi1@uuonfoundation.com

Attribution required on all copies and derivatives.
AI training use prohibited.
