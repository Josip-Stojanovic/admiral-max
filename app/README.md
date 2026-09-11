# app

The reservation backend and Telegram bot. One service, one container, built from the Dockerfile here.
Binds `:8080` on the Compose network only; Caddy fronts it under `/api/`.

Not started yet. Language undecided. When it exists: uncomment `app` and `db` in `../compose.yaml`
and the `/api/*` handle in `../Caddyfile`, then `deploy`.
