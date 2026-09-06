/*
 * Admiral Max menu data, four languages.
 *
 * Each section: { id, title: {en,hr,de,it}, note: {en,hr,de,it} (optional), items: [...] }
 * Each item:    { name: {en,hr,de,it}, desc: {en,hr,de,it} (optional), price: "12", unit: "two" (optional) }
 *   - price is a string; leave it out for no price.
 *   - unit is one of: "two" (for two), "kg" (per kg), "100g", "three" (3 pieces).
 *     The label is translated in js/i18n.js under unitTwo, unitKg, unit100g, unitThree.
 *
 * Food prices were read from the printed menu photographed on Google Maps
 * (the card still shows kuna alongside euro, so it dates from 2023).
 * Confirm current prices with the kitchen before publishing.
 * Desserts and drinks are not on that card, so they carry no prices here.
 */
window.ADMIRAL_MENU = [
  {
    id: "m-cold",
    title: { en: "Cold starters", hr: "Hladna predjela", de: "Kalte Vorspeisen", it: "Antipasti freddi" },
    items: [
      { name: { en: "Cold fish plate for two", hr: "Hladna riblja plata", de: "Kalte Fischplatte", it: "Piatto freddo di pesce" },
        desc: { en: "Salted and marinated sardines, octopus salad, fish pâté.", hr: "Slani i marinirani sardoni, salata od hobotnice, riblja pašteta.", de: "Gesalzene und marinierte Sardellen, Oktopussalat, Fischpastete.", it: "Sardoni salati e marinati, insalata di polpo, paté di pesce." },
        price: "24", unit: "two" },
      { name: { en: "Octopus salad", hr: "Salata od hobotnice", de: "Oktopussalat", it: "Insalata di polpo" }, price: "14" },
      { name: { en: "Salted or marinated anchovies", hr: "Slani ili marinirani sardoni", de: "Gesalzene oder marinierte Sardellen", it: "Sardoni sotto sale o marinati" }, price: "8" },
      { name: { en: "Fish pâté", hr: "Riblja pašteta", de: "Fischpastete", it: "Paté di pesce" }, price: "8.50" },
      { name: { en: "Istrian prosciutto", hr: "Pršut istarski", de: "Istrischer Schinken", it: "Prosciutto istriano" }, price: "11", unit: "100g" },
      { name: { en: "Sheep's cheese", hr: "Ovčji sir", de: "Schafskäse", it: "Formaggio pecorino" }, price: "10", unit: "100g" },
      { name: { en: "Cheese with truffles", hr: "Sir s tartufima", de: "Käse mit Trüffeln", it: "Formaggio al tartufo" }, price: "12", unit: "100g" },
      { name: { en: "Beef carpaccio", hr: "Carpaccio od bifteka", de: "Carpaccio vom Rindsteak", it: "Carpaccio di manzo" }, price: "16", unit: "100g" },
      { name: { en: "Octopus carpaccio", hr: "Carpaccio od hobotnice", de: "Carpaccio vom Oktopus", it: "Carpaccio di polpo" }, price: "14" },
      { name: { en: "Octopus carpaccio with truffles", hr: "Carpaccio od hobotnice sa tartufima", de: "Oktopus-Carpaccio mit Trüffeln", it: "Carpaccio di polpo al tartufo" }, price: "18" }
    ]
  },
  {
    id: "m-hot",
    title: { en: "Hot starters and risotto", hr: "Topla predjela i rižoti", de: "Warme Vorspeisen und Risotto", it: "Antipasti caldi e risotti" },
    note: { en: "Kapešante and kanaštrele are the two scallops of the Novigrad bay, grilled in the shell.", hr: "Kapešante i kanaštrele dvije su školjke novigradskog zaljeva, pečene u ljušturi.", de: "Kapešante und Kanaštrele sind die beiden Kammmuscheln der Bucht von Novigrad, in der Schale gegrillt.", it: "Capesante e canestrelli sono le due conchiglie della baia di Cittanova, grigliate nel guscio." },
    items: [
      { name: { en: "Mussels in buzara", hr: "Dagnje na buzaru", de: "Miesmuscheln in Buzara-Sauce", it: "Cozze alla busara" },
        desc: { en: "White wine, garlic, parsley, breadcrumbs.", hr: "Bijelo vino, češnjak, peršin, krušne mrvice.", de: "Weißwein, Knoblauch, Petersilie, Semmelbrösel.", it: "Vino bianco, aglio, prezzemolo, pangrattato." },
        price: "12" },
      { name: { en: "Grilled queen scallops", hr: "Kapešante na žaru", de: "Jakobsmuscheln vom Grill", it: "Capesante alla griglia" }, price: "13.50", unit: "three" },
      { name: { en: "Grilled canestrelli", hr: "Kanaštrele na žaru", de: "Kanaštrele vom Grill", it: "Canestrelli alla griglia" },
        desc: { en: "The small Novigrad scallops.", hr: "Male novigradske školjke.", de: "Die kleinen Kammmuscheln aus Novigrad.", it: "Le piccole conchiglie di Cittanova." },
        price: "13.50" },
      { name: { en: "Scampi risotto", hr: "Rižoto škampi", de: "Risotto mit Scampi", it: "Risotto con scampi" }, price: "18" },
      { name: { en: "Black risotto with seafood", hr: "Crni rižoto s plodovima mora", de: "Schwarzes Risotto mit Meeresfrüchten", it: "Risotto nero ai frutti di mare" },
        desc: { en: "Cuttlefish ink.", hr: "Na crnilu sipe.", de: "Mit Sepiatinte.", it: "Al nero di seppia." },
        price: "16" }
    ]
  },
  {
    id: "m-soups",
    title: { en: "Soups and salads", hr: "Juhe i salate", de: "Suppen und Salate", it: "Zuppe e insalate" },
    items: [
      { name: { en: "Fish soup", hr: "Riblja juha", de: "Fischsuppe", it: "Brodo di pesce" }, price: "7" },
      { name: { en: "Beef soup", hr: "Goveđa juha", de: "Rindsuppe", it: "Brodo di manzo" }, price: "5" },
      { name: { en: "Tomato soup", hr: "Juha od rajčice", de: "Tomatensuppe", it: "Zuppa di pomodoro" }, price: "5" },
      { name: { en: "Mixed salad", hr: "Miješana salata", de: "Gemischter Salat", it: "Insalata mista" }, price: "4.80" },
      { name: { en: "Šopska salad", hr: "Šopska salata", de: "Schopska-Salat", it: "Insalata šopska" },
        desc: { en: "Mixed salad with cheese.", hr: "Miješana salata sa sirom.", de: "Gemischter Salat mit Käse.", it: "Insalata mista con formaggio." },
        price: "7.80" },
      { name: { en: "Tuna salad", hr: "Salata sa tunjevinom", de: "Salat mit Thunfisch", it: "Insalata con tonno" }, price: "8.80" },
      { name: { en: "Caprese", hr: "Caprese salata", de: "Caprese", it: "Caprese" }, price: "8" },
      { name: { en: "Chicken salad with dressing", hr: "Salata sa piletinom i dresingom", de: "Salat mit Hähnchen und Dressing", it: "Insalata con pollo e condimento" }, price: "10" }
    ]
  },
  {
    id: "m-pasta",
    title: { en: "Pasta", hr: "Tjestenina", de: "Teigwaren", it: "Pasta" },
    items: [
      { name: { en: "Tagliatelle with scampi", hr: "Tagliatelle sa škampima", de: "Tagliatelle mit Scampi", it: "Tagliatelle con scampi" }, price: "18" },
      { name: { en: "Tagliatelle with truffles", hr: "Tagliatelle sa tartufima", de: "Tagliatelle mit Trüffeln", it: "Tagliatelle al tartufo" }, price: "18" },
      { name: { en: "Tagliatelle with pesto", hr: "Tagliatelle pesto", de: "Tagliatelle mit Pesto", it: "Tagliatelle al pesto" },
        desc: { en: "Pesto genovese, dried tomatoes, grana padano.", hr: "Pesto genovese, sušene rajčice, grana padano.", de: "Pesto genovese, getrocknete Tomaten, Grana Padano.", it: "Pesto genovese, pomodori secchi, grana padano." },
        price: "14" },
      { name: { en: "Seafood spaghetti", hr: "Špageti plodovi mora", de: "Spaghetti mit Meeresfrüchten", it: "Spaghetti ai frutti di mare" }, price: "14" },
      { name: { en: "Spaghetti bolognese", hr: "Špageti bolognese", de: "Spaghetti Bolognese", it: "Spaghetti alla bolognese" }, price: "11" }
    ]
  },
  {
    id: "m-sea",
    title: { en: "From the sea", hr: "Riblja jela", de: "Fischgerichte", it: "Piatti di pesce" },
    note: { en: "Whole fish is brought to the table before cooking and priced by weight.", hr: "Cijela riba donosi se na stol prije pripreme i naplaćuje po težini.", de: "Ganzer Fisch wird vor der Zubereitung am Tisch gezeigt und nach Gewicht berechnet.", it: "Il pesce intero si mostra al tavolo prima della cottura e si paga a peso." },
    items: [
      { name: { en: "Fish platter for two", hr: "Riblja plata za dvoje", de: "Fischplatte für zwei", it: "Grigliata di pesce per due" },
        desc: { en: "Sea bream, sea bass, scampi, shellfish, squid, with chard and potatoes. The house dish.", hr: "Orada, brancin, škampi, školjke, lignje, blitva i krumpir. Jelo kuće.", de: "Dorade, Wolfsbarsch, Scampi, Muscheln, Tintenfisch, Mangold und Kartoffeln. Das Gericht des Hauses.", it: "Orata, branzino, scampi, conchiglie, calamari, bietole e patate. Il piatto della casa." },
        price: "52", unit: "two" },
      { name: { en: "First-class fish with garnish", hr: "Riba I. klase s prilogom", de: "Fisch erster Klasse mit Beilage", it: "Pesce di prima qualità con contorno" },
        desc: { en: "Whole fish of the day, priced by the kilogram.", hr: "Cijela riba dana, po kilogramu.", de: "Ganzer Fisch des Tages, nach Kilogramm.", it: "Pesce intero del giorno, al chilo." },
        price: "60", unit: "kg" },
      { name: { en: "Grilled sea bass or sea bream", hr: "Brancin ili orada sa žara", de: "Wolfsbarsch oder Dorade vom Grill", it: "Branzino o orata alla griglia" },
        desc: { en: "300 to 400 g, with chard and potatoes.", hr: "300 do 400 g, blitva i krumpir.", de: "300 bis 400 g, mit Mangold und Kartoffeln.", it: "300–400 g, con bietole e patate." },
        price: "19.50" },
      { name: { en: "Sea bass fillet", hr: "File brancina", de: "Wolfsbarschfilet", it: "Filetto di branzino" },
        desc: { en: "With chard and potatoes.", hr: "Blitva i krumpir.", de: "Mit Mangold und Kartoffeln.", it: "Con bietole e patate." },
        price: "19.50" },
      { name: { en: "Scampi, grilled or in buzara", hr: "Škampi na žaru ili buzara", de: "Scampi gegrillt oder in Buzara-Sauce", it: "Scampi alla griglia o alla busara" }, price: "28" },
      { name: { en: "Grilled squid", hr: "Lignje na žaru", de: "Calamari vom Grill", it: "Calamari alla griglia" },
        desc: { en: "With chard and potatoes.", hr: "Blitva i krumpir.", de: "Mit Mangold und Kartoffeln.", it: "Con bietole e patate." },
        price: "14" },
      { name: { en: "Fried squid", hr: "Lignje pržene", de: "Frittierte Calamari", it: "Calamari fritti" },
        desc: { en: "With fries.", hr: "S pomfritom.", de: "Mit Pommes.", it: "Con patatine." },
        price: "14" },
      { name: { en: "Tuna steak", hr: "Tuna steak", de: "Thunfischsteak", it: "Bistecca di tonno" },
        desc: { en: "With grilled vegetables.", hr: "S povrćem sa žara.", de: "Mit gegrilltem Gemüse.", it: "Con verdure alla griglia." },
        price: "21.50" },
      { name: { en: "Grilled sardines", hr: "Srdele na žaru", de: "Sardinen vom Grill", it: "Sardine alla griglia" },
        desc: { en: "With chard and potatoes.", hr: "Blitva i krumpir.", de: "Mit Mangold und Kartoffeln.", it: "Con bietole e patate." },
        price: "11.50" }
    ]
  },
  {
    id: "m-grill",
    title: { en: "From the grill", hr: "Mesna jela", de: "Fleischgerichte", it: "Piatti di carne" },
    items: [
      { name: { en: "Meat platter for two", hr: "Mesna plata za dvoje", de: "Fleischplatte für zwei", it: "Piatto di carne per due" }, price: "34", unit: "two" },
      { name: { en: "Grilled beef fillet", hr: "Biftek na žaru", de: "Rinderfilet vom Grill", it: "Filetto alla griglia" },
        desc: { en: "With fried potatoes.", hr: "S prženim krumpirom.", de: "Mit Bratkartoffeln.", it: "Con patate fritte." },
        price: "26" },
      { name: { en: "Beef fillet in green pepper sauce", hr: "Biftek u umaku od zelenog papra", de: "Rinderfilet in grüner Pfeffersauce", it: "Filetto in salsa al pepe verde" },
        desc: { en: "With croquettes.", hr: "S kroketima.", de: "Mit Kroketten.", it: "Con crocchette." },
        price: "29" },
      { name: { en: "Beef fillet in truffle sauce", hr: "Biftek u umaku od tartufa", de: "Rinderfilet in Trüffelsauce", it: "Filetto in salsa al tartufo" },
        desc: { en: "With croquettes.", hr: "S kroketima.", de: "Mit Kroketten.", it: "Con crocchette." },
        price: "34" },
      { name: { en: "Rump steak in mushroom sauce", hr: "Ramstek u umaku od gljiva", de: "Rumpsteak in Pilzsauce", it: "Bistecca di groppa in salsa ai funghi" },
        desc: { en: "With croquettes.", hr: "S kroketima.", de: "Mit Kroketten.", it: "Con crocchette." },
        price: "22" },
      { name: { en: "Rump steak in green pepper sauce", hr: "Ramstek u umaku od zelenog papra", de: "Rumpsteak in grüner Pfeffersauce", it: "Bistecca di groppa al pepe verde" },
        desc: { en: "With croquettes.", hr: "S kroketima.", de: "Mit Kroketten.", it: "Con crocchette." },
        price: "22" },
      { name: { en: "Grilled pork medallions", hr: "Svinjski medaljoni na žaru", de: "Schweinemedaillons vom Grill", it: "Medaglioni di maiale alla griglia" },
        desc: { en: "With fried potatoes.", hr: "S prženim krumpirom.", de: "Mit Bratkartoffeln.", it: "Con patate fritte." },
        price: "14" },
      { name: { en: "Pork medallions in truffle sauce", hr: "Svinjski medaljoni u umaku od tartufa", de: "Schweinemedaillons in Trüffelsauce", it: "Medaglioni in salsa al tartufo" },
        desc: { en: "With croquettes.", hr: "S kroketima.", de: "Mit Kroketten.", it: "Con crocchette." },
        price: "17" },
      { name: { en: "Mixed grill", hr: "Miješano meso", de: "Gemischtes Fleisch vom Grill", it: "Carne mista" },
        desc: { en: "With fries.", hr: "S pomfritom.", de: "Mit Pommes.", it: "Con patatine." },
        price: "14" },
      { name: { en: "Gourmet pljeskavica", hr: "Gurmanska pljeskavica", de: "Gourmet-Pljeskavica", it: "Pljeskavica gourmet" },
        desc: { en: "Beef patty with bacon and cheese, fried potatoes.", hr: "S pancetom i sirom, prženi krumpir.", de: "Mit Speck und Käse, Bratkartoffeln.", it: "Con pancetta e formaggio, patate fritte." },
        price: "14" },
      { name: { en: "Boneless chicken thigh, barbecue", hr: "Pileći batak bez kosti BBQ", de: "Hähnchenschenkel ohne Knochen, BBQ", it: "Coscia di pollo disossata BBQ" },
        desc: { en: "With fried potatoes.", hr: "S prženim krumpirom.", de: "Mit Bratkartoffeln.", it: "Con patate fritte." },
        price: "13.50" },
      { name: { en: "Chicken schnitzel", hr: "Bečki odrezak pileći", de: "Wiener Schnitzel vom Hähnchen", it: "Scaloppina viennese di pollo" },
        desc: { en: "With fries.", hr: "S pomfritom.", de: "Mit Pommes.", it: "Con patatine." },
        price: "12" },
      { name: { en: "Ćevapčići", hr: "Ćevapčići", de: "Ćevapčići", it: "Ćevapčići" },
        desc: { en: "With fries.", hr: "S pomfritom.", de: "Mit Pommes.", it: "Con patatine." },
        price: "12" },
      { name: { en: "Chicken in orange and curry sauce", hr: "Piletina u umaku od naranče i curryja", de: "Hähnchen in Orangen-Curry-Sauce", it: "Pollo in salsa di arancia e curry" },
        desc: { en: "With croquettes.", hr: "S kroketima.", de: "Mit Kroketten.", it: "Con crocchette." },
        price: "16.50" }
    ]
  },
  {
    id: "m-kids",
    title: { en: "For children", hr: "Dječji meni", de: "Kindermenü", it: "Menù bambini" },
    items: [
      { name: { en: "Chicken schnitzel with fries", hr: "Bečki odrezak pileći, pomfrit", de: "Hähnchenschnitzel mit Pommes", it: "Scaloppina di pollo con patatine" }, price: "8" },
      { name: { en: "Spaghetti with tomato sauce", hr: "Špageti od rajčice", de: "Spaghetti mit Tomatensauce", it: "Spaghetti al pomodoro" }, price: "7" }
    ]
  },
  {
    id: "m-sweets",
    title: { en: "Desserts and drinks", hr: "Deserti i pića", de: "Desserts und Getränke", it: "Dolci e bevande" },
    note: { en: "Ask for the day's desserts and the Istrian wine list. Malvazija by the glass or the litre goes with the fish, Teran with the grill.", hr: "Pitajte za deserte dana i istarsku vinsku kartu. Malvazija na čašu ili litru ide uz ribu, teran uz roštilj.", de: "Fragen Sie nach den Desserts des Tages und der istrischen Weinkarte. Malvazija im Glas oder Liter passt zum Fisch, Teran zum Grill.", it: "Chiedete i dolci del giorno e la carta dei vini istriani. La Malvasia al bicchiere o al litro accompagna il pesce, il Terrano la griglia." },
    items: [
      { name: { en: "Pancakes", hr: "Palačinke", de: "Palatschinken", it: "Crêpes" },
        desc: { en: "Chocolate, jam or walnuts.", hr: "Čokolada, marmelada ili orasi.", de: "Schokolade, Marmelade oder Walnüsse.", it: "Cioccolato, marmellata o noci." } },
      { name: { en: "House tiramisu", hr: "Domaći tiramisu", de: "Hausgemachtes Tiramisu", it: "Tiramisù della casa" } },
      { name: { en: "Istrian Malvazija", hr: "Malvazija istarska", de: "Istrische Malvazija", it: "Malvasia istriana" },
        desc: { en: "By the glass or the litre.", hr: "Na čašu ili litru.", de: "Im Glas oder Liter.", it: "Al bicchiere o al litro." } },
      { name: { en: "Teran", hr: "Teran", de: "Teran", it: "Terrano" },
        desc: { en: "The Istrian red.", hr: "Istarsko crno.", de: "Der istrische Rote.", it: "Il rosso istriano." } },
      { name: { en: "Grappa and herbal rakija", hr: "Rakije", de: "Grappa und Kräuterschnaps", it: "Grappa e acquaviti alle erbe" },
        desc: { en: "Biska, medica, travarica.", hr: "Biska, medica, travarica.", de: "Biska, Medica, Travarica.", it: "Biska, medica, travarica." } }
    ]
  }
];
