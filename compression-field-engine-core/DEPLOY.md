# Compression Field Engine -- Core Deploy

This file is the proprietary engine core (USAL-1.0).
It is NOT committed to the public GitHub repo.

Local development:
  Copy engine.js to compression-field-engine/core/engine.js
  The .gitignore in the public repo excludes this path automatically.

uuon.world production:
  Upload to uuon-clouud at: engine/compression-field/core.js
  Update index.html script src to:
    https://uuon.world/engine/compression-field/core.js
  Once confirmed working, remove core/engine.js from the local public folder
  and push the updated index.html.

Do not commit this file to any public repository.
