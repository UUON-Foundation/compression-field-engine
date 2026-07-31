# UUON Compression Field Engine -- API Layer

Planned. Not yet built.

This directory documents the server layer. The engine currently runs entirely in the browser. This is the extension path for internal and external API access via uuon-clouud.

---

## Planned Stack

Node.js / Express deployed on Railway via uuon-clouud monorepo.

Two API surfaces are planned:

**Internal API** -- accessed by UUON Foundation services and tools only. No public auth required. Used for session management, P-vector storage, and engine state queries from trusted callers inside the uuon-clouud environment.

**External API** -- public-facing, rate limited. Requires an API key issued by uuon-clouud. Used by third parties to call the compression field engine without running a browser.

---

## Planned File Tree

```
api/
  lib/
    zones.js          zone mapping and classification (AIBH_zoneMap, AIBH_classify)
    infall.js         infall dynamics (AIBH_infall)
    entropy.js        entropy computation (AIBH_entropy)
  routes/
    internal/
      state.js        GET  /internal/v1/state         full field snapshot
      store.js        POST /internal/v1/store          save P vector
    external/
      encode.js       POST /external/v1/encode         P vector to field geometry
      decode.js       GET  /external/v1/decode/:hash   hash to P vector
      field.js        POST /external/v1/field          full zone state from P
  middleware/
    auth.js           API key validation for external routes
    rateLimit.js      rate limiting for external routes
  index.js            Express entry point
```

---

## Planned Endpoints

### Internal

| Method | Route | Input | Output |
|--------|-------|-------|--------|
| GET | /internal/v1/state | compressionK, zoom, pan | Full zone state snapshot |
| POST | /internal/v1/store | P vector JSON | SHA-256 hash for retrieval |

### External

| Method | Route | Input | Output |
|--------|-------|-------|--------|
| POST | /external/v1/encode | P vector JSON | Compression boundary geometry |
| GET | /external/v1/decode/:hash | SHA-256 of P | P vector JSON |
| POST | /external/v1/field | P vector JSON | Full zone state snapshot |

---

## Next Session Starting Point

Extract AIBH_zoneMap and AIBH_classify from core/engine.js into api/lib/zones.js as a Node.js CommonJS module. That is the first step. Everything else in the API depends on the M-layer zone architecture being callable server-side without a browser.

Route it through uuon-clouud. Internal routes first, then external with key middleware.
