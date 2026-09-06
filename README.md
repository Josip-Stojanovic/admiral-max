# Admiral Max, Novigrad

Website for Admiral Max, a fish konoba on the Porporela breakwater in Novigrad, Istria.

Static site, no build step. Open `index.html` in a browser or serve the folder:

```sh
python3 -m http.server 8080
```

## Editing

- **Languages**: the site is in English, Croatian, German and Italian. Interface text lives in `js/i18n.js`, one block per language with the same keys. The toggle in the header remembers the choice in the browser, and a first visit picks the browser's language. `?lang=de` in the URL forces a language.
- **Menu**: `js/menu.js`. One entry per dish with the name and description in all four languages, a price string, and an optional unit (`two`, `kg`, `100g`, `three`) whose label is translated.
- **Hours**: the table in `index.html` under "Hours and the terrace", and the `HOURS` object in `js/main.js` which drives the "open now" line.
- **Contact and address**: search `index.html` for `433 254` and `Porporela`.
- **Colours and type**: the `:root` block at the top of `css/style.css`.

## Photo gallery

The "Photos" section lists every image in `assets/photos/` as a thumbnail that opens a lightbox (arrow keys, swipe, Escape, focus stays inside). To add a photo, drop the file in `assets/photos/`, add an `<li>` to the `thumbs` list in `index.html` following the existing pattern, and add its caption key to all four languages in `js/i18n.js`.

## Reservation form

The form in the "Reserve a table" section posts to [FormSubmit](https://formsubmit.co), a free relay that emails each request to the address in `RESERVATION_EMAIL` at the top of `js/main.js`. No account is needed, but **the first request triggers an activation email to that inbox and the owner must click the link once**; until then nothing is delivered. The address currently set is the one listed for Obrt UNICO on istrabiz.hr and must be confirmed with the owner.

The form validates name, phone, date, time and guests (a whole number of at least 1), refuses past dates and Wednesday times before 18:00, and carries a hidden honeypot field against bots. It is a request, not a booking: the success message tells guests the table is confirmed only when the restaurant replies.

## Deploying

The site is plain files, so GitHub Pages works as is: Settings, Pages, deploy from the `main` branch root.

## Photos

`assets/photos/` holds screenshots of photos from the restaurant's Google Maps listing, cropped and saved at roughly 1000 px wide. The terrace photo was posted by the owner. The dish and interior photos were posted by guests, so ask the owner for original photos before going live, both for quality and so the site only uses images the restaurant has rights to.

## To confirm with the owner before going live

- Food prices in `js/menu.js` come from the printed menu photographed on Google Maps. The card still shows kuna next to euro, so it dates from 2023 and prices may have changed. Desserts and drinks are listed without prices.
- Replace the guest-photographed dish and interior photos with the owner's own.
- Wednesday hours. Listings disagree between 18:00 to 22:00 and closed.
- Street number. Google says Porporela 3, TripAdvisor says Porporela 5.
- The reservation inbox in `js/main.js`, and clicking FormSubmit's one-time activation link when the first request arrives.
