# Mauritius Mass Finder v16.2 — Release-Hardening Edition

Public-facing bilingual Mass Finder for Mauritius.

This release hardens v16.1 with stronger update/cache behavior, stop-word tolerant search, accessibility labels, clearer trust wording, and cleaner package hygiene.

Normal Mass schedule updates should be made in `data/masses.json` or `data/masses.csv`. The app keeps an embedded fallback database for offline/resilience.

Coordinate note: all 117 sites have coordinates. Exact/existing coordinates are used for direct pin navigation; approximate locality-level coordinates are shown with `~` and directions use Google Maps text query to avoid false precision.
