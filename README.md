# Mauritius Mass Finder v20.6

GitHub Pages-ready static package.

v20.6 is a service-worker migration hotfix over v20.5. It restores a root-level `sw.js` migration bridge so users already installed on older versions such as v17.2 can escape the old service-worker cache and load the current app.

No Mass schedules, parish hierarchy, coordinates, source URLs, source excerpts, search logic, Sunday-obligation logic, trust strip, result-count behaviour, or empty-state UX were intentionally changed from v20.5.

Deployment note: upload the full extracted contents of this package, including both `sw.js` and `service-worker.js`.
