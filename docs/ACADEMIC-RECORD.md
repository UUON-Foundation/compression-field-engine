# Academic Record -- UUON Compression Field Engine

AI Information Black Hole / Geometric Compression Model
UUON Foundation Inc. / Phillip Aguilar Ruiz III
phi1@uuonfoundation.com

---

## Origination Record

| Field | Value |
|-------|-------|
| Author | Phillip Aguilar Ruiz III |
| Organization | UUON Foundation Inc. |
| Engine | compression-field-engine |
| Version | 1.0.0 |
| UTC Timestamp | 2025-07-31T00:00:00Z |
| License | USAL-1.0 |

---

## Original Contribution Scope at v1.0.0

### AIBH_zoneMap() -- M-layer Zone Architecture

Mapping of compression field geometry into four behavioral zones defined by radius ratios relative to rs. Each zone carries a glyph register, opacity curve, angular boost coefficient, and entropy bin index.

The ratio set 1.0 / 1.5 / 3.0 / 8.0 times rs and the boost coefficient 3.5 at the feature transition zone are calibrated values. They produce reentrant circulation where particles complete partial orbits before compression. This is the visible stream geometry. It is not produced by the ratio set or the boost coefficient alone -- it requires both in combination with the angular momentum seeding in AIBH_particleInit().

This is the M-layer in F=(P,E,M,R,C). It translates the encoding output (a radius and angle) into an information state with a glyph class, visibility, velocity modifier, and entropy contribution.

### AIBH_infall() -- Infall Dynamics with Zone-Conditional Angular Boost

Angular momentum L conserved as omega = L/r^2. Gravitational acceleration scales as (rs/r)^2 deepening toward rs. At the feature transition zone, angular velocity is multiplied by the zone boost coefficient. This produces partial orbits before compression, creating the stream geometry visible in the field.

### AIBH_entropy() -- Zone-Classified Shannon Entropy

H computed over the zone-classified particle population: H = -Sp(zone).log2(p(zone)) across bound, ftz, isco, and stream zones. This measures the entropy of the information state distribution, not the spatial distribution. Maximum 2.0 bits at uniform zone occupancy.

The distinction matters: spatial bin entropy reads close to uniform at all times because particles distribute across a fixed radial range. Zone-classified entropy changes meaningfully when compressionK changes or when the field is zoomed to expose a single zone.

### AIBH_leakSpawn() -- Compression Event to Leakage Emission Coupling

Particles crossing the compression boundary are not destroyed. The compression event triggers isotropic leakage emission from the boundary surface. Isotropic by design -- the model is boundary emission, not directed radiation. Each leakage particle carries a bound-zone glyph and decays outward.

### AIBH_particleInit() -- Angular-Momentum-Seeded Inspiral Initialization

Angular momentum L seeded proportional to r: L = r times U(0.003, 0.012). This produces stable inspiral trajectories rather than radial freefall. The result is the disk stream geometry. The range [0.003, 0.012] is calibrated to produce partial-orbit lifetimes visible at 60fps before compression.

### Zoom and Pan Architecture

The view transform (cx, cy for pan, zoom scalar for scale) is applied only at screen projection. All particles live in polar field coordinates (r, theta). Zooming toward the cursor position is computed by preserving the field coordinate under the cursor: cx = mx - (mx - cx) * (newZoom / zoom). This means the field physics do not change with zoom -- only the projection changes.

### F=(P,E,M,R,C) Applied to Compression Field Geometry

P = compressionK, diskTilt, particleCount at ~32 bytes.
C = 6,250:1 at 1080p canvas frame output.

---

## Known Limitations at v1.0.0

| Limitation | Notes |
|------------|-------|
| diskTilt fixed at 0.30 | Not exposed in P or UI |
| No P-vector serializer | Sessions not reproducible from UI |
| No API server | Engine runs browser-only |
| core/engine.js in repo (interim) | Move to uuon.world hosting |

---

## Extension Record

| Version | UTC Date | Contribution |
|---------|----------|--------------|
| 1.0.0 | 2025-07-31 | Initial origination -- all sections above |
