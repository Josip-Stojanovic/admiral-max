/*
 * Admiral Max menu data.
 *
 * Edit this file to change the menu. Each section has an id (matches the
 * anchors in index.html), a title, an optional note, and a list of items.
 *
 * Each item: { hr: "Croatian name", en: "English name", desc: "short line", price: "12" }
 *   - price is a string so you can write "38", "per kg 60" or "market".
 *   - Leave desc out for a plain line.
 *
 * !! PRICES BELOW ARE PLACEHOLDERS based on the €15–35 per person range guests
 *    report on Google. Confirm every price with the kitchen before publishing.
 */
window.ADMIRAL_MENU = [
  {
    id: "m-starters",
    title: "Starters",
    hr: "Predjela",
    items: [
      { hr: "Domaći kruh i istarsko maslinovo ulje", en: "House bread with Istrian olive oil", desc: "Baked here every day. Comes to every table.", price: "3" },
      { hr: "Novigradske kapešante", en: "Novigrad scallops", desc: "Small bay scallops grilled in the shell with garlic, parsley and olive oil. Seasonal.", price: "per piece 4" },
      { hr: "Riblja juha", en: "Fish soup", desc: "Clear broth of the day's rockfish with rice and vegetables.", price: "8" },
      { hr: "Carpaccio od tune", en: "Tuna carpaccio", desc: "Thin-sliced raw tuna, capers, rocket, lemon.", price: "14" },
      { hr: "Goveđi carpaccio s tartufom", en: "Beef carpaccio with truffle", desc: "Istrian beef, shaved truffle, aged cheese.", price: "15" },
      { hr: "Bruschette", en: "Bruschetta", desc: "Tomato, garlic and basil on grilled bread.", price: "7" },
      { hr: "Salata od hobotnice", en: "Octopus salad", desc: "Cold, with potato, red onion and parsley.", price: "13" },
      { hr: "Pršut i sir", en: "Istrian prosciutto and cheese", desc: "Air-dried ham from the interior with sheep's cheese and olives.", price: "14" }
    ]
  },
  {
    id: "m-sea",
    title: "From the sea",
    hr: "Iz mora",
    note: "Whole fish is brought to the table before cooking and priced by weight.",
    items: [
      { hr: "Riblja plata za dvoje", en: "Fish platter for two", desc: "Grilled whole fish, squid, prawns, mussels and scallops, with potatoes and blitva. The house dish.", price: "for two 70" },
      { hr: "Riblja plata za dvoje bez školjki", en: "Fish platter for two, without shellfish", desc: "The same board without mussels and scallops.", price: "for two 62" },
      { hr: "Riba s gradela", en: "Fresh fish from the grill", desc: "Sea bass, sea bream, dentex or whatever came in that morning. Served with potatoes and blitva.", price: "per kg 60" },
      { hr: "Tuna steak", en: "Tuna steak", desc: "Grilled pink in the middle, with grilled vegetables.", price: "24" },
      { hr: "Lignje na žaru", en: "Grilled squid", desc: "Whole Adriatic squid, garlic and parsley, with potatoes and blitva.", price: "18" },
      { hr: "Pržene lignje", en: "Fried calamari", desc: "Light batter, lemon, tartare sauce.", price: "16" },
      { hr: "Frittura mista", en: "Fritto misto", desc: "Small fish, squid rings and prawns fried crisp.", price: "18" },
      { hr: "Dagnje na buzaru", en: "Mussels in buzara", desc: "White wine, garlic, parsley, breadcrumbs. Bring bread.", price: "14" },
      { hr: "Škampi na buzaru", en: "Scampi in buzara", desc: "Adriatic langoustines in the same sauce, eaten with the fingers.", price: "per kg 90" },
      { hr: "Srdele s gradela", en: "Grilled sardines", desc: "Simple, salted, with chard and potato.", price: "12" },
      { hr: "Fish and chips", en: "Fish and chips", desc: "For the table's smallest sailors, and the occasional admiral.", price: "13" }
    ]
  },
  {
    id: "m-pasta",
    title: "Pasta and risotto",
    hr: "Tjestenina i rižoti",
    items: [
      { hr: "Crni rižot od dagnji", en: "Black mussel risotto", desc: "Cuttlefish ink, mussels, a little parmesan.", price: "16" },
      { hr: "Špageti s plodovima mora", en: "Seafood spaghetti", desc: "Mussels, clams, prawns and squid in tomato and wine.", price: "17" },
      { hr: "Crni ravioli na buzaru", en: "Black ravioli in buzara", desc: "Squid-ink ravioli filled with fish, in a prawn buzara sauce.", price: "18" },
      { hr: "Tagliatelle sa škampima", en: "Tagliatelle with scampi", desc: "Langoustine tails, cherry tomato, brandy.", price: "19" },
      { hr: "Tagliatelle s tartufom", en: "Tagliatelle with Istrian truffle", desc: "Butter, cream and fresh truffle from the Motovun forest.", price: "20" },
      { hr: "Fuži s gulašem", en: "Istrian fuži with beef goulash", desc: "Hand-rolled pasta, slow-cooked beef.", price: "15" }
    ]
  },
  {
    id: "m-grill",
    title: "From the grill",
    hr: "S gradela",
    items: [
      { hr: "Mesna plata za dvoje", en: "Meat platter for two", desc: "Steak, pork medallions, čevapi, sausage, with fries and ajvar.", price: "for two 48" },
      { hr: "Biftek", en: "Beef fillet", desc: "Grilled to order, with fries and grilled vegetables.", price: "32" },
      { hr: "Ramstek", en: "Rump steak", desc: "With pepper or truffle sauce.", price: "26" },
      { hr: "Medaljoni u umaku od tartufa", en: "Pork medallions in truffle sauce", desc: "With fried potatoes.", price: "19" },
      { hr: "Pljeskavica", en: "Pljeskavica", desc: "Grilled minced beef patty, onion, kajmak.", price: "13" },
      { hr: "Piletina na žaru", en: "Grilled chicken breast", desc: "With seasonal vegetables.", price: "14" }
    ]
  },
  {
    id: "m-sides",
    title: "Sides and salads",
    hr: "Prilozi i salate",
    items: [
      { hr: "Blitva s krumpirom", en: "Swiss chard with potato", desc: "The Dalmatian way, with garlic and olive oil.", price: "5" },
      { hr: "Pomfrit", en: "Fries", price: "4" },
      { hr: "Povrće s gradela", en: "Grilled vegetables", price: "6" },
      { hr: "Miješana salata", en: "Mixed salad", price: "5" },
      { hr: "Salata od rajčice", en: "Tomato salad with onion", price: "5" },
      { hr: "Zelena salata", en: "Green salad", price: "4" }
    ]
  },
  {
    id: "m-sweets",
    title: "Desserts",
    hr: "Deserti",
    items: [
      { hr: "Palačinke", en: "Pancakes", desc: "With chocolate, jam or walnuts.", price: "6" },
      { hr: "Tiramisu", en: "House tiramisu", price: "6" },
      { hr: "Panna cotta", en: "Panna cotta with forest fruit", price: "6" },
      { hr: "Fritule", en: "Istrian fritule", desc: "Small doughnuts with grappa and raisins, warm.", price: "6" },
      { hr: "Sladoled", en: "Ice cream", desc: "Three scoops.", price: "5" }
    ]
  },
  {
    id: "m-drinks",
    title: "Drinks",
    hr: "Pića",
    note: "The wine list is Istrian. Ask for the bottle list.",
    items: [
      { hr: "Malvazija istarska", en: "Istrian Malvazija", desc: "The white for fish. By the glass or the litre.", price: "glass 4, litre 18" },
      { hr: "Teran", en: "Teran", desc: "The Istrian red, for the grill.", price: "glass 4, litre 18" },
      { hr: "Muškat", en: "Muscat", desc: "Sweet, with dessert.", price: "glass 4" },
      { hr: "Pivo", en: "Beer", desc: "Draft Ožujsko or bottled Istrian craft beer.", price: "from 3.5" },
      { hr: "Aperol Spritz", en: "Aperol Spritz", price: "7" },
      { hr: "Rakija", en: "Grappa and herbal rakija", desc: "Biska, medica, travarica.", price: "3.5" },
      { hr: "Kava", en: "Coffee", price: "2" },
      { hr: "Voda, sokovi", en: "Water and soft drinks", price: "from 2.5" }
    ]
  }
];
