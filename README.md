# Flock Energy API

A Node.js/Express REST API wrapper scaffold for the legacy Urja Meter Ops portal.

> **Current status:** The local API scaffold and health endpoint are implemented. Portal-backed meter endpoints intentionally return `501 UPSTREAM_INTEGRATION_NOT_CONFIGURED` until the real portal authentication and request flow is inspected. This avoids guessing undocumented endpoints.

## Requirements
- Node.js 18 or newer
- Authorized access to the Urja Meter Ops portal

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and fill in the credentials supplied for the assignment:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Never commit `.env` or share session cookies/tokens.

## Run locally

```bash
npm run dev
```

Health check: `GET http://localhost:3000/health`

## Intended API endpoints

| Method | Path | Status |
| --- | --- | --- |
| GET | `/health` | Implemented |
| GET | `/api/v1/meters` | Route exists; portal integration pending |
| GET | `/api/v1/meters/:id` | Route exists; portal integration pending |
| GET | `/api/v1/meters/:id/consumption?from=...&to=...` | Route exists; portal integration pending |
| GET | `/api/v1/hierarchy` | Optional route exists; portal integration pending |

## Tests

```bash
npm test
```

## Portal investigation

1. Sign in to the portal using the assignment credentials.
2. Open Chrome DevTools > Network and enable Preserve log.
3. Inspect Fetch/XHR requests for login, meter listing, meter details, and consumption.
4. Record observed paths, parameters, session behavior, and response shapes in `PROTOCOL.md`.
5. Implement only observed behavior in `src/services/urjaClient.js`.
6. Add response mappings in `src/utils/normalizeData.js` and integration tests.

## Error format

Errors use a consistent JSON shape:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested route does not exist."
  }
}
```

## Design decisions
- The legacy integration is isolated in a service module.
- Credentials are configured through environment variables.
- Upstream endpoints are not guessed; the protocol must be verified.
- Tests can run without a live portal account.

## Limitations
- Meter and hierarchy responses are not yet wired to the portal. Complete `PROTOCOL.md` first and implement the discovered requests.
