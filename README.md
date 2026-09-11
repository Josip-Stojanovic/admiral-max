# admiral-max

Admiral Max, a fish konoba in Novigrad: its website and its reservation system. One project, one machine, one repository, one configuration, done once.

```
box/cloud-init.yaml   the machine — paste into Hetzner once
box/deploy            pull this repo on the box and converge the stack
compose.yaml          the runtime: caddy now, app + db when they exist
Caddyfile             serves site/, proxies /api/ to app
site/                 the static website (its own README inside)
app/                  the reservation backend and Telegram bot
.env.example          every secret the box needs; the real .env lives on the box only
```

## The machine

Hetzner Cloud, Debian 13, cheapest x86 (CX) or ARM (CAX) plan, with an IPv4. Labels `customer=admiral-max role=app env=prod`.
Paste `box/cloud-init.yaml` into the Cloud config field. The comment at its top lists the one-time steps after
first boot (Telegram creds, deploy key on GitHub, `deploy-bootstrap`, `.env`, `deploy`).

## Deploying

Push to `main`, then either wait for the 05:00 timer or:

```sh
ssh root@<box> deploy
```

`deploy` is `git pull` plus `docker compose up -d`. Idempotent. It posts to Telegram when the commit changed.

## The site

Edit sources under `site/`, run `python3 build.py` from inside `site/`, commit the generated files. See `site/README.md`.
The box serves `site/` as-is; nothing is built on the box.

## The app

Not started. See `app/README.md`.

## Rules

- Nothing on the box is edited by hand. If it is not in this repo, it does not exist.
- No secrets in the repo. `.env` on the box, `/etc/telegram.env` for the cluster's alert bot.
- No mail server on this box. Outbound mail goes to the shared relay on port 587.
- Commit messages say what was done. No trailers.
