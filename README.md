# Admiral Max, Novigrad

Website for Admiral Max, a fish konoba on the Porporela breakwater in Novigrad, Istria.

Static site, no build step. Open `index.html` in a browser or serve the folder:

```sh
python3 -m http.server 8080
```

## Editing

- **Menu**: `js/menu.js`. One entry per dish with Croatian name, English name, description and price. Prices are strings, so `"per kg 60"` and `"glass 4, litre 18"` work; every number gets a € sign automatically.
- **Hours**: the table in `index.html` under "Hours and the terrace", and the `HOURS` object in `js/main.js` which drives the "open now" line.
- **Contact and address**: search `index.html` for `433 254` and `Porporela`.
- **Colours and type**: the `:root` block at the top of `css/style.css`.

## Deploying

The site is plain files, so GitHub Pages works as is: Settings, Pages, deploy from the `main` branch root.

## To confirm with the owner before going live

- Every price in `js/menu.js` is a placeholder based on the €15–35 per person range reported by guests.
- Wednesday hours. Listings disagree between 18:00 to 22:00 and closed.
- Street number. Google says Porporela 3, TripAdvisor says Porporela 5.
- Whether to publish an email address for reservations.
