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

## Photos

`assets/photos/` holds screenshots of photos from the restaurant's Google Maps listing, cropped and saved at roughly 1000 px wide. The terrace photo was posted by the owner. The dish and interior photos were posted by guests, so ask the owner for original photos before going live, both for quality and so the site only uses images the restaurant has rights to.

## To confirm with the owner before going live

- Food prices in `js/menu.js` come from the printed menu photographed on Google Maps. The card still shows kuna next to euro, so it dates from 2023 and prices may have changed. Desserts and drinks are listed without prices.
- Replace the guest-photographed dish and interior photos with the owner's own.
- Wednesday hours. Listings disagree between 18:00 to 22:00 and closed.
- Street number. Google says Porporela 3, TripAdvisor says Porporela 5.
- Whether to publish an email address for reservations.
