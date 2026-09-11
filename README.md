# admiral-max

Reservation and inquiry backend for Admiral Max, Novigrad. One project, one machine, one repository.

- `cloud-init.yaml` — the whole machine. Paste into Hetzner when creating the server (Debian 13, x86 or ARM, labels `customer=admiral-max role=app env=prod`). Edit `DOMAIN` first. After boot, copy `/etc/telegram.env` to the box by hand; nothing else is done by hand.
- The public site lives in its own repo (`Josip-Stojanovic/admiral-max`) and the box pulls it daily.
- The backend (Telegram group as back office, customer notified on their channel) will live here, deployed as the Compose stack at `/srv/app` on the box.
