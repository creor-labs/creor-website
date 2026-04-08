#!/usr/bin/env bash
# Generates public/_headers with environment-specific CSP connect-src.
# Cloudflare Pages reads _headers from the deploy root (out/).
# next build copies public/_headers into out/_headers automatically.
#
# Usage: NEXT_PUBLIC_API_URL=https://api.creor.ai bash scripts/generate-headers.sh

set -euo pipefail

API_URL="${NEXT_PUBLIC_API_URL:-http://localhost:3001}"
API_ORIGIN=$(echo "$API_URL" | grep -oE '^https?://[^/]+')

cat > public/_headers << HEADERS_EOF
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), gyroscope=(), accelerometer=(), magnetometer=(), payment=(), usb=(), autoplay=(), fullscreen=(self)
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com; font-src 'self'; connect-src 'self' ${API_ORIGIN} https://*.supabase.co wss://*.supabase.co https://*.ingest.us.sentry.io https://cloudflareinsights.com; worker-src 'self' blob:; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'
HEADERS_EOF

echo "Generated public/_headers with API_ORIGIN=${API_ORIGIN}"
