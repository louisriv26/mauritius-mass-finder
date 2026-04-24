# Mauritius Mass Finder v15.1

Public-facing bilingual Mass Finder for Mauritius.

This release is the final checked version following v15.0 disambiguation. It preserves the premium UX, repeated-name handling, richer Google Maps fallback query, visible versioning, and live-update structure.

Normal Mass schedule updates should be made in `data/masses.json` or `data/masses.csv`. The app keeps an embedded fallback database for offline/resilience.

Coordinate note: all 117 sites have coordinates. Existing/exact coordinates are used for distance and direct pin navigation; approximate locality-level coordinates are shown with `~` and directions use Google Maps text query to avoid false precision.
