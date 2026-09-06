/*
 * Admiral Max menu data.
 *
 * Edit this file to change the menu. Each section has an id (matches the
 * anchors in index.html), a title, a Croatian title, an optional note, and
 * a list of items.
 *
 * Each item: { hr: "Croatian name", en: "English name", desc: "short line", price: "12" }
 *   - price is a string so you can write "38", "per kg 60" or "for two 52".
 *     Every number gets a € sign automatically. Leave it out for no price.
 *   - Leave desc out for a plain line.
 *
 * Food prices were read from the printed menu photographed on Google Maps
 * (the card still shows kuna alongside euro, so it dates from 2023).
 * Confirm current prices with the kitchen before publishing.
 * Desserts and drinks are not on that card, so they carry no prices here.
 */
window.ADMIRAL_MENU = [
  {
    id: "m-cold",
    title: "Cold starters",
    hr: "Hladna predjela",
    items: [
      { hr: "Hladna riblja plata", en: "Cold fish plate for two", desc: "Salted and marinated sardines, octopus salad, fish pâté.", price: "for two 24" },
      { hr: "Salata od hobotnice", en: "Octopus salad", price: "14" },
      { hr: "Slani ili marinirani sardoni", en: "Salted or marinated anchovies", price: "8" },
      { hr: "Riblja pašteta", en: "Fish pâté", price: "8.50" },
      { hr: "Pršut istarski", en: "Istrian prosciutto", desc: "100 g.", price: "11" },
      { hr: "Ovčji sir", en: "Sheep's cheese", desc: "100 g.", price: "10" },
      { hr: "Sir s tartufima", en: "Cheese with truffles", desc: "100 g.", price: "12" },
      { hr: "Carpaccio od bifteka", en: "Beef carpaccio", desc: "100 g.", price: "16" },
      { hr: "Carpaccio od hobotnice", en: "Octopus carpaccio", price: "14" },
      { hr: "Carpaccio od hobotnice sa tartufima", en: "Octopus carpaccio with truffles", price: "18" }
    ]
  },
  {
    id: "m-hot",
    title: "Hot starters and risotto",
    hr: "Topla predjela i rižoti",
    note: "Kapešante and kanaštrele are the two scallops of the Novigrad bay, grilled in the shell.",
    items: [
      { hr: "Dagnje na buzaru", en: "Mussels in buzara", desc: "White wine, garlic, parsley, breadcrumbs.", price: "12" },
      { hr: "Kapešante na žaru", en: "Grilled queen scallops", desc: "Three pieces.", price: "13.50" },
      { hr: "Kanaštrele na žaru", en: "Grilled canestrelli", desc: "The small Novigrad scallops.", price: "13.50" },
      { hr: "Rižoto škampi", en: "Scampi risotto", price: "18" },
      { hr: "Crni rižoto s plodovima mora", en: "Black risotto with seafood", desc: "Cuttlefish ink.", price: "16" }
    ]
  },
  {
    id: "m-soups",
    title: "Soups and salads",
    hr: "Juhe i salate",
    items: [
      { hr: "Riblja juha", en: "Fish soup", price: "7" },
      { hr: "Goveđa juha", en: "Beef soup", price: "5" },
      { hr: "Juha od rajčice", en: "Tomato soup", price: "5" },
      { hr: "Miješana salata", en: "Mixed salad", price: "4.80" },
      { hr: "Šopska salata", en: "Šopska salad", desc: "Mixed salad with cheese.", price: "7.80" },
      { hr: "Salata sa tunjevinom", en: "Tuna salad", price: "8.80" },
      { hr: "Caprese salata", en: "Caprese", price: "8" },
      { hr: "Salata sa piletinom i dresingom", en: "Chicken salad with dressing", price: "10" }
    ]
  },
  {
    id: "m-pasta",
    title: "Pasta",
    hr: "Tjestenina",
    items: [
      { hr: "Tagliatelle sa škampima", en: "Tagliatelle with scampi", price: "18" },
      { hr: "Tagliatelle sa tartufima", en: "Tagliatelle with truffles", price: "18" },
      { hr: "Tagliatelle pesto", en: "Tagliatelle with pesto", desc: "Pesto genovese, dried tomatoes, grana padano.", price: "14" },
      { hr: "Špageti plodovi mora", en: "Seafood spaghetti", price: "14" },
      { hr: "Špageti bolognese", en: "Spaghetti bolognese", price: "11" }
    ]
  },
  {
    id: "m-sea",
    title: "From the sea",
    hr: "Riblja jela",
    note: "Whole fish is brought to the table before cooking and priced by weight.",
    items: [
      { hr: "Riblja plata za dvoje", en: "Fish platter for two", desc: "Sea bream, sea bass, scampi, shellfish, squid, with chard and potatoes. The house dish.", price: "for two 52" },
      { hr: "Riba I. klase s prilogom", en: "First-class fish with garnish", desc: "Whole fish of the day, priced by the kilogram.", price: "per kg 60" },
      { hr: "Brancin ili orada sa žara", en: "Grilled sea bass or sea bream", desc: "300 to 400 g, with chard and potatoes.", price: "19.50" },
      { hr: "File brancina", en: "Sea bass fillet", desc: "With chard and potatoes.", price: "19.50" },
      { hr: "Škampi na žaru ili buzara", en: "Scampi, grilled or in buzara", price: "28" },
      { hr: "Lignje na žaru", en: "Grilled squid", desc: "With chard and potatoes.", price: "14" },
      { hr: "Lignje pržene", en: "Fried squid", desc: "With fries.", price: "14" },
      { hr: "Tuna steak", en: "Tuna steak", desc: "With grilled vegetables.", price: "21.50" },
      { hr: "Srdele na žaru", en: "Grilled sardines", desc: "With chard and potatoes.", price: "11.50" }
    ]
  },
  {
    id: "m-grill",
    title: "From the grill",
    hr: "Mesna jela",
    items: [
      { hr: "Mesna plata za dvoje", en: "Meat platter for two", price: "for two 34" },
      { hr: "Biftek na žaru", en: "Grilled beef fillet", desc: "With fried potatoes.", price: "26" },
      { hr: "Biftek u umaku od zelenog papra", en: "Beef fillet in green pepper sauce", desc: "With croquettes.", price: "29" },
      { hr: "Biftek u umaku od tartufa", en: "Beef fillet in truffle sauce", desc: "With croquettes.", price: "34" },
      { hr: "Ramstek u umaku od gljiva", en: "Rump steak in mushroom sauce", desc: "With croquettes.", price: "22" },
      { hr: "Ramstek u umaku od zelenog papra", en: "Rump steak in green pepper sauce", desc: "With croquettes.", price: "22" },
      { hr: "Svinjski medaljoni na žaru", en: "Grilled pork medallions", desc: "With fried potatoes.", price: "14" },
      { hr: "Svinjski medaljoni u umaku od tartufa", en: "Pork medallions in truffle sauce", desc: "With croquettes.", price: "17" },
      { hr: "Miješano meso", en: "Mixed grill", desc: "With fries.", price: "14" },
      { hr: "Gurmanska pljeskavica", en: "Gourmet pljeskavica", desc: "Beef patty with bacon and cheese, fried potatoes.", price: "14" },
      { hr: "Pileći batak bez kosti BBQ", en: "Boneless chicken thigh, barbecue", desc: "With fried potatoes.", price: "13.50" },
      { hr: "Bečki odrezak pileći", en: "Chicken schnitzel", desc: "With fries.", price: "12" },
      { hr: "Ćevapčići", en: "Ćevapčići", desc: "With fries.", price: "12" },
      { hr: "Piletina u umaku od naranče i curryja", en: "Chicken in orange and curry sauce", desc: "With croquettes.", price: "16.50" }
    ]
  },
  {
    id: "m-kids",
    title: "For children",
    hr: "Dječji meni",
    items: [
      { hr: "Bečki odrezak pileći, pomfrit", en: "Chicken schnitzel with fries", price: "8" },
      { hr: "Špageti od rajčice", en: "Spaghetti with tomato sauce", price: "7" }
    ]
  },
  {
    id: "m-sweets",
    title: "Desserts and drinks",
    hr: "Deserti i pića",
    note: "Ask for the day's desserts and the Istrian wine list. Malvazija by the glass or the litre goes with the fish, Teran with the grill.",
    items: [
      { hr: "Palačinke", en: "Pancakes", desc: "Chocolate, jam or walnuts." },
      { hr: "Tiramisu", en: "House tiramisu" },
      { hr: "Malvazija istarska", en: "Istrian Malvazija", desc: "By the glass or the litre." },
      { hr: "Teran", en: "Teran", desc: "The Istrian red." },
      { hr: "Rakija", en: "Grappa and herbal rakija", desc: "Biska, medica, travarica." }
    ]
  }
];
