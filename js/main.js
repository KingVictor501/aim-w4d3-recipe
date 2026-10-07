// ==========================================================================
// Sweet Amber — shared JavaScript for every page
//
// Loaded in each page's <head> WITHOUT defer, so the saved theme is applied
// before the page is drawn (no flash of the wrong colors). Everything that
// touches page content waits for DOMContentLoaded at the bottom of the file.
//
//  1. Theme (runs immediately)      7. Recipe cards (shared builder)
//  2. Recipe data                   8. Homepage: typing + favourites
//  3. Helpers                       9. Recipes page: category filter
//  4. Nav menu (hamburger)         10. Recipe detail page
//  5. Theme toggle button          11. Share form: validation + handler flow
//  6. Footer links, back to top
// ==========================================================================

// ==========================================================================
// 1. Theme — runs immediately, before the page is drawn
// ==========================================================================
const THEME_KEY = "sweet-amber-theme";

// Read the saved theme; dark is the default, also when storage is blocked
const readTheme = () => {
  try {
    // getItem gives back nothing on a first visit, so compare instead of using it directly
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
};

// Apply a theme: the CSS swaps every color when <html data-theme="light">
const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
};

// Save a theme so it carries over to the other pages and future visits
const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage blocked (e.g. private browsing): the toggle still works for this page
  }
};

applyTheme(readTheme());

// ==========================================================================
// 2. Recipe data — the single source for every card and recipe page
// ==========================================================================
const CATEGORIES = {
  cakes: { label: "Cakes", emoji: "🎂" },
  cookies: { label: "Cookies & Bars", emoji: "🍪" },
  pies: { label: "Pies & Tarts", emoji: "🥧" },
  chilled: { label: "Frozen & Chilled", emoji: "🍨" }
};

const RECIPES = [
  {
    id: "chocolate-lava-cakes",
    title: "Chocolate Lava Cakes",
    category: "cakes",
    emoji: "🍫",
    description: "Individual cakes with a crisp edge and a molten chocolate center that spills out at the first spoonful.",
    prepMinutes: 15,
    cookMinutes: 13,
    chillMinutes: 0,
    serves: "4",
    ingredients: [
      "115 g (½ cup) unsalted butter, plus extra for the ramekins",
      "115 g (4 oz) bittersweet chocolate, chopped",
      "2 large eggs",
      "2 large egg yolks",
      "50 g (¼ cup) granulated sugar",
      "Pinch of salt",
      "2 tbsp all-purpose flour",
      "Cocoa powder, for dusting"
    ],
    steps: [
      "Heat the oven to 220°C (425°F). Butter four 6-oz ramekins and dust them with cocoa powder.",
      "Melt the butter and chocolate together over low heat, stirring until smooth. Let it cool for 5 minutes.",
      "Whisk the eggs, yolks, sugar and salt until pale and thick, about 2 minutes.",
      "Fold in the melted chocolate, then the flour, until just combined.",
      "Divide between the ramekins and bake for 12–14 minutes, until the edges are set but the centers still wobble.",
      "Rest for 1 minute, run a knife around the edges, turn out onto plates and serve right away."
    ]
  },
  {
    id: "lemon-drizzle-cake",
    title: "Lemon Drizzle Cake",
    category: "cakes",
    emoji: "🍋",
    description: "A soft, buttery loaf soaked in a sharp lemon syrup that sets into a crackly sugar crust.",
    prepMinutes: 20,
    cookMinutes: 45,
    chillMinutes: 0,
    serves: "10",
    ingredients: [
      "225 g (1 cup) unsalted butter, softened",
      "225 g (1 cup + 2 tbsp) caster sugar",
      "4 large eggs",
      "225 g (1¾ cups) self-raising flour",
      "Finely grated zest of 2 lemons",
      "Juice of 1½ lemons (for the drizzle)",
      "85 g (scant ½ cup) caster sugar (for the drizzle)"
    ],
    steps: [
      "Heat the oven to 180°C (350°F) and line a 2 lb (900 g) loaf tin.",
      "Beat the butter and sugar until pale and fluffy, then beat in the eggs one at a time.",
      "Fold in the flour and lemon zest, then spoon the batter into the tin.",
      "Bake for 45–50 minutes, until a skewer comes out clean.",
      "Mix the lemon juice with the drizzle sugar. Prick the warm cake all over and pour the drizzle on top.",
      "Leave in the tin until completely cool, so the drizzle sets into a crust."
    ]
  },
  {
    id: "carrot-cake",
    title: "Carrot Cake",
    category: "cakes",
    emoji: "🥕",
    description: "Moist, warmly spiced layers with walnuts, finished with a thick cream cheese frosting.",
    prepMinutes: 30,
    cookMinutes: 35,
    chillMinutes: 0,
    serves: "12",
    ingredients: [
      "250 g (2 cups) all-purpose flour",
      "2 tsp baking powder",
      "1 tsp baking soda",
      "2 tsp ground cinnamon",
      "½ tsp salt",
      "4 large eggs",
      "300 ml (1¼ cups) vegetable oil",
      "200 g (1 cup) brown sugar",
      "100 g (½ cup) granulated sugar",
      "300 g (about 3 cups) carrots, finely grated",
      "100 g (1 cup) walnuts, chopped",
      "Frosting: 225 g (8 oz) cream cheese, 115 g (½ cup) butter, 250 g (2 cups) powdered sugar, 1 tsp vanilla"
    ],
    steps: [
      "Heat the oven to 175°C (350°F). Grease and line two 9-inch round pans.",
      "Whisk together the flour, baking powder, baking soda, cinnamon and salt.",
      "In another bowl, whisk the eggs, oil and both sugars. Stir in the dry ingredients, then fold in the carrots and walnuts.",
      "Divide between the pans and bake for 30–35 minutes, until a toothpick comes out clean. Cool completely.",
      "Beat the softened cream cheese and butter until smooth, then beat in the powdered sugar and vanilla.",
      "Sandwich the layers with frosting and spread the rest over the top."
    ]
  },
  {
    id: "brown-butter-chocolate-chip-cookies",
    title: "Brown Butter Chocolate Chip Cookies",
    category: "cookies",
    emoji: "🍪",
    description: "Toffee-like browned butter, crisp edges, chewy middles and a pinch of flaky salt on top.",
    prepMinutes: 20,
    cookMinutes: 11,
    chillMinutes: 30,
    serves: "24 cookies",
    ingredients: [
      "170 g (¾ cup) unsalted butter",
      "200 g (1 cup) brown sugar",
      "50 g (¼ cup) granulated sugar",
      "1 large egg plus 1 egg yolk",
      "2 tsp vanilla extract",
      "250 g (2 cups) all-purpose flour",
      "½ tsp baking soda",
      "½ tsp salt",
      "250 g (1½ cups) chocolate chips",
      "Flaky sea salt, to finish"
    ],
    steps: [
      "Melt the butter in a pan and keep cooking, swirling, until it smells nutty and turns golden brown. Cool for 10 minutes.",
      "Whisk the browned butter with both sugars, then whisk in the egg, yolk and vanilla.",
      "Stir in the flour, baking soda and salt, then fold in the chocolate chips.",
      "Chill the dough for 30 minutes.",
      "Heat the oven to 180°C (350°F). Scoop 2-tablespoon balls onto lined trays, spaced well apart.",
      "Bake for 10–12 minutes, sprinkle with flaky salt and cool on the tray for 5 minutes."
    ]
  },
  {
    id: "fudgy-brownies",
    title: "Fudgy Brownies",
    category: "cookies",
    emoji: "🍫",
    description: "Dense, dark-chocolate squares with a shiny crackled top and a gooey, fudgy middle.",
    prepMinutes: 15,
    cookMinutes: 25,
    chillMinutes: 0,
    serves: "16 squares",
    ingredients: [
      "170 g (¾ cup) unsalted butter",
      "200 g (7 oz) dark chocolate, chopped",
      "250 g (1¼ cups) granulated sugar",
      "3 large eggs",
      "1 tsp vanilla extract",
      "75 g (⅔ cup) all-purpose flour",
      "30 g (¼ cup) cocoa powder",
      "½ tsp salt"
    ],
    steps: [
      "Heat the oven to 175°C (350°F) and line an 8-inch square pan.",
      "Melt the butter and chocolate together, then whisk in the sugar.",
      "Whisk in the eggs one at a time, then the vanilla, until glossy.",
      "Fold in the flour, cocoa and salt until no streaks remain.",
      "Bake for 22–25 minutes, until a toothpick comes out with moist crumbs.",
      "Cool completely in the pan before cutting into squares."
    ]
  },
  {
    id: "oatmeal-raisin-cookies",
    title: "Oatmeal Raisin Cookies",
    category: "cookies",
    emoji: "🥣",
    description: "Soft, chewy cookies with cinnamon, plump raisins and plenty of rolled oats.",
    prepMinutes: 15,
    cookMinutes: 12,
    chillMinutes: 0,
    serves: "24 cookies",
    ingredients: [
      "115 g (½ cup) unsalted butter, softened",
      "100 g (½ cup) brown sugar",
      "50 g (¼ cup) granulated sugar",
      "1 large egg",
      "1 tsp vanilla extract",
      "95 g (¾ cup) all-purpose flour",
      "½ tsp baking soda",
      "1 tsp ground cinnamon",
      "¼ tsp salt",
      "120 g (1½ cups) rolled oats",
      "100 g (¾ cup) raisins"
    ],
    steps: [
      "Heat the oven to 175°C (350°F) and line two baking trays.",
      "Beat the butter and both sugars until creamy, then beat in the egg and vanilla.",
      "Stir in the flour, baking soda, cinnamon and salt.",
      "Fold in the oats and raisins.",
      "Scoop tablespoon-size mounds onto the trays and bake for 10–12 minutes, until golden at the edges.",
      "Cool on the tray for 5 minutes, then move to a rack."
    ]
  },
  {
    id: "classic-apple-pie",
    title: "Classic Apple Pie",
    category: "pies",
    emoji: "🍎",
    description: "Flaky double crust packed with cinnamon-spiced apples that bake down into a jammy filling.",
    prepMinutes: 40,
    cookMinutes: 55,
    chillMinutes: 120,
    serves: "8",
    ingredients: [
      "Pastry for a double-crust 9-inch pie",
      "1.2 kg (about 6 medium) apples, peeled and thinly sliced",
      "100 g (½ cup) granulated sugar",
      "50 g (¼ cup) brown sugar",
      "2 tbsp all-purpose flour",
      "1 tsp ground cinnamon",
      "¼ tsp ground nutmeg",
      "1 tbsp lemon juice",
      "1 egg, beaten, for brushing"
    ],
    steps: [
      "Heat the oven to 220°C (425°F).",
      "Toss the apples with both sugars, the flour, spices and lemon juice.",
      "Line a 9-inch pie dish with one sheet of pastry and pile in the apples.",
      "Cover with the second sheet, trim and crimp the edges, and cut a few steam vents. Brush with beaten egg.",
      "Bake for 20 minutes, then lower to 190°C (375°F) and bake 35–40 minutes more, until golden and bubbling.",
      "Cool for at least 2 hours so the filling sets before slicing."
    ]
  },
  {
    id: "key-lime-pie",
    title: "Key Lime Pie",
    category: "pies",
    emoji: "🥧",
    description: "A buttery graham crust filled with a silky, tangy lime custard and topped with whipped cream.",
    prepMinutes: 20,
    cookMinutes: 25,
    chillMinutes: 180,
    serves: "8",
    ingredients: [
      "150 g (1½ cups) graham cracker crumbs",
      "60 g (5 tbsp) unsalted butter, melted",
      "2 tbsp granulated sugar",
      "1 can (400 g / 14 oz) sweetened condensed milk",
      "4 large egg yolks",
      "120 ml (½ cup) key lime juice",
      "1 tbsp finely grated lime zest",
      "Whipped cream, to serve"
    ],
    steps: [
      "Heat the oven to 175°C (350°F).",
      "Mix the crumbs, melted butter and sugar, press into a 9-inch pie dish and bake for 10 minutes.",
      "Whisk the egg yolks and lime zest, then whisk in the condensed milk and lime juice.",
      "Pour into the crust and bake for 15 minutes, until set at the edges with a slight wobble in the middle.",
      "Cool, then chill for at least 3 hours.",
      "Top with whipped cream just before serving."
    ]
  },
  {
    id: "strawberry-galette",
    title: "Rustic Strawberry Galette",
    category: "pies",
    emoji: "🍓",
    description: "A free-form, flaky pastry folded around juicy strawberries. No pie dish needed.",
    prepMinutes: 25,
    cookMinutes: 40,
    chillMinutes: 30,
    serves: "6",
    ingredients: [
      "160 g (1¼ cups) all-purpose flour",
      "1 tbsp granulated sugar, plus 50 g (¼ cup) for the filling",
      "¼ tsp salt",
      "115 g (½ cup) cold unsalted butter, cubed",
      "3–4 tbsp ice water",
      "450 g (1 lb) strawberries, hulled and halved",
      "1 tbsp cornstarch",
      "1 tsp lemon juice",
      "1 egg, beaten, and coarse sugar for sprinkling"
    ],
    steps: [
      "Rub the butter into the flour, 1 tbsp sugar and salt until it looks like coarse crumbs with pea-size pieces.",
      "Add ice water a spoonful at a time until the dough holds together. Shape into a disc and chill for 30 minutes.",
      "Heat the oven to 200°C (400°F). Toss the strawberries with the 50 g sugar, cornstarch and lemon juice.",
      "Roll the dough into a 12-inch round on baking paper. Pile the fruit in the middle, leaving a 2-inch border.",
      "Fold the border up over the fruit, brush the pastry with egg and sprinkle with coarse sugar.",
      "Bake for 35–40 minutes, until the pastry is golden and the juices bubble."
    ]
  },
  {
    id: "no-churn-vanilla-ice-cream",
    title: "No-Churn Vanilla Ice Cream",
    category: "chilled",
    emoji: "🍨",
    description: "Creamy, scoopable vanilla ice cream from four ingredients and no ice cream machine.",
    prepMinutes: 10,
    cookMinutes: 0,
    chillMinutes: 360,
    serves: "8",
    ingredients: [
      "475 ml (2 cups) cold heavy cream",
      "1 can (400 g / 14 oz) sweetened condensed milk",
      "2 tsp vanilla extract (or the seeds of 1 vanilla pod)",
      "Pinch of salt"
    ],
    steps: [
      "Whip the cream to stiff peaks.",
      "Stir the vanilla and salt into the condensed milk.",
      "Fold a third of the cream into the condensed milk to loosen it, then gently fold in the rest.",
      "Spread into a loaf pan, cover and freeze for at least 6 hours.",
      "Leave at room temperature for 5 minutes before scooping."
    ]
  },
  {
    id: "classic-tiramisu",
    title: "Classic Tiramisu",
    category: "chilled",
    emoji: "☕",
    description: "Coffee-soaked ladyfingers layered with a light mascarpone cream and a dusting of cocoa.",
    prepMinutes: 30,
    cookMinutes: 5,
    chillMinutes: 360,
    serves: "8",
    ingredients: [
      "4 large egg yolks",
      "100 g (½ cup) granulated sugar",
      "450 g (16 oz) mascarpone",
      "360 ml (1½ cups) cold heavy cream",
      "300 ml (1¼ cups) strong espresso, cooled",
      "2 tbsp coffee liqueur (optional)",
      "About 24 ladyfingers",
      "Cocoa powder, for dusting"
    ],
    steps: [
      "Whisk the egg yolks and sugar in a bowl set over simmering water until thick and pale, about 5 minutes. Let it cool.",
      "Beat in the mascarpone until smooth.",
      "Whip the cream to soft peaks and fold it into the mascarpone mixture.",
      "Mix the espresso and liqueur. Dip each ladyfinger for a second and lay half of them in a 9×13-inch dish.",
      "Spread over half the cream, then repeat with the remaining ladyfingers and cream.",
      "Chill for at least 6 hours, then dust generously with cocoa before serving."
    ]
  },
  {
    id: "vanilla-panna-cotta",
    title: "Vanilla Panna Cotta with Berries",
    category: "chilled",
    emoji: "🍮",
    description: "A silky, just-set vanilla cream that wobbles on the spoon, served with fresh berries.",
    prepMinutes: 15,
    cookMinutes: 5,
    chillMinutes: 240,
    serves: "6",
    ingredients: [
      "7 g (2¼ tsp, one packet) powdered gelatin",
      "3 tbsp cold water",
      "480 ml (2 cups) heavy cream",
      "240 ml (1 cup) whole milk",
      "65 g (⅓ cup) granulated sugar",
      "1 tsp vanilla extract",
      "Pinch of salt",
      "Fresh berries, to serve"
    ],
    steps: [
      "Sprinkle the gelatin over the cold water and leave it to soften for 5 minutes.",
      "Heat the cream, milk and sugar until steaming. Don't let it boil.",
      "Take the pan off the heat and stir in the gelatin until fully dissolved, then the vanilla and salt.",
      "Pour into 6 glasses or ramekins.",
      "Chill for at least 4 hours, until set.",
      "Top with fresh berries just before serving."
    ]
  }
];

// The three recipes shown under "Reader favourites" on the homepage
const FAVOURITE_IDS = ["chocolate-lava-cakes", "key-lime-pie", "classic-tiramisu"];

// ==========================================================================
// 3. Helpers
// ==========================================================================

// True when this page has an element with the given id.
// querySelectorAll gives an empty list (never "nothing") when there's no match.
const pageHas = (id) => document.querySelectorAll(`#${id}`).length > 0;

// User prefers less motion: skip typing, smooth scroll and flow delays
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 75 → "1 hr 15 min", 45 → "45 min", 120 → "2 hr"
const formatMinutes = (total) => {
  // Split into whole hours and leftover minutes
  const hours = Math.floor(total / 60);
  const minutes = total % 60;

  // Build only the parts that aren't zero
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
};

// 75 → "PT1H15M", for the machine-readable datetime of <time>
const isoDuration = (total) => `PT${Math.floor(total / 60)}H${total % 60}M`;

// Make an element with an optional class name and text
const make = (tag, className = "", text = "") => {
  const element = document.createElement(tag);
  if (className !== "") element.className = className;
  if (text !== "") element.textContent = text; // textContent: typed text never becomes HTML
  return element;
};

// Find a recipe by id; gives back an empty list when there's no match
const recipesWithId = (id) => RECIPES.filter((recipe) => recipe.id === id);

// ==========================================================================
// 4. Nav menu (hamburger on phones and tablets)
// ==========================================================================
// The Menu button starts hidden in the HTML and the header has no
// data-menu attribute, so without JavaScript the links always show.
const initNav = () => {
  if (!pageHas("nav-toggle")) return;

  // Grab the pieces
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const desktop = window.matchMedia("(min-width: 1024px)");

  // Open or close the menu; the CSS hides the links while data-menu="closed"
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", `${open}`);
    header.dataset.menu = open ? "open" : "closed";
  };

  // Is the menu open right now?
  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  // Reveal the button and start closed
  toggle.hidden = false;
  setOpen(false);

  // Button toggles the menu
  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Escape closes the menu and puts focus back on the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // A tap or click outside the open menu closes it
  document.addEventListener("pointerdown", (event) => {
    if (isOpen() && !toggle.contains(event.target) && !links.contains(event.target)) {
      setOpen(false);
    }
  });

  // Widening to desktop shows the links in a row; reset to closed for later
  desktop.addEventListener("change", () => setOpen(false));
};

// ==========================================================================
// 5. Theme toggle button
// ==========================================================================
// aria-pressed="true" means the light theme is on. The choice is saved in
// localStorage, so it carries over to every page.
const initThemeToggle = () => {
  if (!pageHas("theme-toggle")) return;

  const button = document.getElementById("theme-toggle");

  // Show the button state that matches the current theme
  const sync = () => {
    button.setAttribute("aria-pressed", `${document.documentElement.dataset.theme === "light"}`);
  };

  // Reveal the button (it needs JavaScript to work)
  button.hidden = false;
  sync();

  // Flip the theme, save it and update the button
  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next);
    saveTheme(next);
    sync();
  });

  // Another tab changed the theme: follow it here too
  window.addEventListener("storage", (event) => {
    if (event.key !== THEME_KEY) return;
    applyTheme(readTheme());
    sync();
  });
};

// ==========================================================================
// 6a. Footer links, copied from the main nav
// ==========================================================================
// Adding a page to the main nav adds it to the footer too, with no extra code.
const initFooterLinks = () => {
  if (!pageHas("footer-links") || !pageHas("nav-links")) return;

  const footerList = document.getElementById("footer-links");
  const navLinks = [...document.querySelectorAll("#nav-links a")];

  // Build one footer item per nav link, keeping the current-page marker
  const items = navLinks.map((navLink) => {
    const item = make("li");
    const link = make("a", "", navLink.textContent);
    link.href = navLink.getAttribute("href");
    if (navLink.hasAttribute("aria-current")) {
      link.setAttribute("aria-current", navLink.getAttribute("aria-current"));
    }
    item.append(link);
    return item;
  });

  // Replace whatever was there with the fresh list
  footerList.replaceChildren(...items);
};

// ==========================================================================
// 6b. Back-to-top button
// ==========================================================================
const initScrollTop = () => {
  if (!pageHas("to-top")) return;

  const button = document.getElementById("to-top");
  const SHOW_AFTER = 400; // px scrolled before the button appears

  // Reveal the button (it needs JavaScript) and show/hide it with scrolling
  button.hidden = false;

  // Show the button once the page is scrolled past SHOW_AFTER, hide it near the top
  const update = () => button.classList.toggle("is-visible", window.scrollY > SHOW_AFTER);
  window.addEventListener("scroll", update, { passive: true });
  update();

  // Scroll smoothly to the top (instantly with reduced motion), then move
  // keyboard focus to the page heading so Tab continues from the top
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    const headings = document.querySelectorAll("main h1");
    if (headings.length > 0) {
      headings[0].setAttribute("tabindex", "-1");
      headings[0].focus({ preventScroll: true });
    }
  });
};

// ==========================================================================
// 7. Recipe cards — one builder used by the homepage and the recipes page
// ==========================================================================
// <li data-category="cakes">
//   <article class="recipe-card">
//     <p class="card-top"><emoji> <category tag></p>
//     <h2>Title</h2> <p>description</p> <p>Prep <time>15 min</time></p>
//     <a class="button">View Recipe</a>
//   </article>
// </li>
const createCard = ({ id, title, category, emoji, description, prepMinutes }, headingTag = "h2") => {
  // Outer list item, tagged with its category for the filter
  const item = make("li");
  item.dataset.category = category;
  const card = make("article", "recipe-card");

  // Top row: decorative emoji (hidden from screen readers) and category tag
  const top = make("p", "card-top");
  const icon = make("strong", "card-emoji", emoji);
  icon.setAttribute("aria-hidden", "true");
  const tag = make("small", "category-tag", CATEGORIES[category].label);
  top.append(icon, tag);

  // Title, description and prep time
  const heading = make(headingTag, "", title);
  const text = make("p", "description", description);
  const prep = make("p", "prep", "Prep ");
  const time = make("time", "", formatMinutes(prepMinutes));
  time.dateTime = isoDuration(prepMinutes);
  prep.append(time);

  // "View Recipe" link; its accessible name includes the title, so a
  // screen reader's list of links says which recipe each one opens
  const link = make("a", "button card-link", "View Recipe");
  link.href = `recipe.html?id=${encodeURIComponent(id)}`;
  link.setAttribute("aria-label", `View Recipe: ${title}`);

  card.append(top, heading, text, prep, link);
  item.append(card);
  return item;
};

// ==========================================================================
// 8. Homepage: typing animation + reader favourites
// ==========================================================================
// The full hook sentence is in the HTML, so it shows without JavaScript and
// screen readers read it once. Here it's typed letter by letter into an
// <output> laid over it. Reduced motion: the sentence is left as it is.
const initTyping = () => {
  if (!pageHas("intro-typing") || reducedMotion) return;

  // Grab the sentence and set up the overlay
  const line = document.getElementById("intro-typing");
  const text = line.textContent.trim();
  const typed = make("output");
  typed.setAttribute("aria-hidden", "true"); // the original sentence is what gets read

  // Timing
  const LETTER_DELAY = 45; // ms between letters
  const PAUSE_DELAY = 380; // ms after punctuation, like a breath
  const START_DELAY = 450; // ms before typing starts

  // Swap in the overlay; the original turns transparent but keeps its space
  line.append(typed);
  line.classList.add("is-typing");

  let count = 0; // letters typed so far

  // Type one more letter, then schedule the next
  const typeNext = () => {
    count += 1;
    typed.textContent = text.slice(0, count);
    if (count >= text.length) return; // done; the caret keeps blinking

    const justTyped = text.charAt(count - 1);
    setTimeout(typeNext, /[.,!?—]/.test(justTyped) ? PAUSE_DELAY : LETTER_DELAY);
  };

  setTimeout(typeNext, START_DELAY);
};

// Draw the three favourite recipes on the homepage
const initFavourites = () => {
  if (!pageHas("favourites")) return;

  const list = document.getElementById("favourites");
  const favourites = FAVOURITE_IDS.flatMap(recipesWithId);
  list.replaceChildren(...favourites.map((recipe) => createCard(recipe, "h3")));
};

// Fill in how many recipes each homepage category link leads to
const initCategoryCounts = () => {
  document.querySelectorAll("[data-category-count]").forEach((element) => {
    const total = RECIPES.filter((recipe) => recipe.category === element.dataset.categoryCount).length;
    element.textContent = `${total} ${total === 1 ? "recipe" : "recipes"}`;
  });
};

// ==========================================================================
// 9. Recipes page: category filter
// ==========================================================================
// All 12 cards are drawn once from RECIPES. A filter button hides the cards
// that don't match; the cards and the data array are never changed.
const initRecipes = () => {
  if (!pageHas("recipe-grid")) return;

  // Grab the pieces
  const grid = document.getElementById("recipe-grid");
  const buttons = [...document.querySelectorAll("#recipe-filters button")];
  const count = document.getElementById("recipe-count");
  const empty = document.getElementById("recipe-empty");
  const status = document.getElementById("recipe-status");

  // Draw every card from the data
  grid.replaceChildren(...RECIPES.map((recipe) => createCard(recipe)));
  const cards = [...grid.children];

  // Show only the cards in one category ("all" shows everything)
  const applyFilter = (category) => {
    // Hide or show each card and count the ones shown
    const shown = cards.filter((card) => {
      const match = category === "all" || card.dataset.category === category;
      card.hidden = !match;
      return match;
    }).length;

    // Highlight the active button
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", `${button.dataset.filter === category}`);
    });

    // Update the count and the empty-state message
    count.textContent = `Showing ${shown} of ${cards.length} ${cards.length === 1 ? "recipe" : "recipes"}`;
    empty.hidden = shown > 0;

    // Keep the address in sync, so the filtered view can be shared or reloaded
    const url = new URL(window.location.href);
    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.replaceState({}, "", url);
  };

  // Clicking a button filters and tells screen readers the new count
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
      status.textContent = `${count.textContent}.`;
    });
  });

  // Start from ?category= in the address when it's a real category
  // (the homepage category links use this), otherwise show all
  const requested = new URLSearchParams(window.location.search).get("category") || "";
  applyFilter(Object.hasOwn(CATEGORIES, requested) ? requested : "all");
};

// ==========================================================================
// 10. Recipe detail page (recipe.html?id=...)
// ==========================================================================
const initRecipeDetail = () => {
  if (!pageHas("recipe-detail")) return;

  // Find the recipe named in the address
  const id = new URLSearchParams(window.location.search).get("id") || "";
  const matches = recipesWithId(id);

  // Unknown id: show the "Recipe not found" message instead, and say so in
  // the page title and breadcrumb
  if (matches.length === 0) {
    document.title = "Recipe not found | Sweet Amber";
    document.getElementById("crumb-current").textContent = "Recipe not found";
    document.getElementById("missing-id").textContent = id === "" ? "that" : `"${id}"`;
    document.getElementById("recipe-missing").hidden = false;
    return;
  }
  const [recipe] = matches;
  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes + recipe.chillMinutes;

  // Page title and breadcrumb
  document.title = `${recipe.title} | Sweet Amber`;
  document.getElementById("crumb-current").textContent = recipe.title;

  // Header: emoji, category, title, description
  document.getElementById("recipe-emoji").textContent = recipe.emoji;
  document.getElementById("recipe-category").textContent = CATEGORIES[recipe.category].label;
  document.getElementById("recipe-title").textContent = recipe.title;
  document.getElementById("recipe-description").textContent = recipe.description;

  // Facts: prep, cook, chill/cool (only when there is one), total, serves
  const facts = [
    ["Prep", recipe.prepMinutes],
    ["Cook", recipe.cookMinutes],
    ["Chill / cool", recipe.chillMinutes],
    ["Total", totalMinutes]
  ].filter(([label, minutes]) => minutes > 0 || label === "Cook");

  const factItems = facts.map(([label, minutes]) => {
    const item = make("li");
    const time = make("time", "", minutes === 0 ? "None" : formatMinutes(minutes));
    time.dateTime = isoDuration(minutes);
    const value = make("strong");
    value.append(time);
    item.append(make("small", "", label), value);
    return item;
  });
  const servesItem = make("li");
  servesItem.append(make("small", "", "Serves / makes"), make("strong", "", recipe.serves));
  document.getElementById("recipe-facts").replaceChildren(...factItems, servesItem);

  // Ingredients and numbered steps
  document.getElementById("recipe-ingredients").replaceChildren(
    ...recipe.ingredients.map((ingredient) => make("li", "", ingredient))
  );
  document.getElementById("recipe-steps").replaceChildren(
    ...recipe.steps.map((step) => make("li", "", step))
  );

  // "More in this category" link goes to the filtered recipes page
  const more = document.getElementById("recipe-more");
  more.href = `recipes.html?category=${recipe.category}`;
  more.textContent = `More ${CATEGORIES[recipe.category].label.toLowerCase()}`;

  // Everything is filled in: show the recipe
  document.getElementById("recipe-detail").hidden = false;
};

// ==========================================================================
// 11. Share form: validation + handler flow
// ==========================================================================
// The form has novalidate, so the browser's own pop-ups never appear. The
// HTML attributes (required, type="email", minlength, min/max) are still the
// rules: this code reads their results from el.validity and shows clear
// messages, plus checks HTML can't do on its own, including cross-field
// checks (title vs your name, title vs recipes already on the site,
// instructions vs ingredients). Each field is checked when you leave it,
// then live as you type. On submit, every step of the handler is logged
// in the "Handler flow" panel as it runs.
const initShareForm = () => {
  if (!pageHas("share-form")) return;

  // ---- Grab the pieces ----------------------------------------------------
  const form = document.getElementById("share-form");
  const submitButton = document.getElementById("share-submit");
  const resetButton = document.getElementById("share-reset");
  const status = document.getElementById("share-status");
  const confirmation = document.getElementById("share-confirmation");
  const summary = document.getElementById("share-summary");
  const flowList = document.getElementById("flow-steps");

  const ALLOWED_EMAIL_ENDINGS = ["com", "gov", "edu", "org", "mil"];

  const fields = {
    name: document.getElementById("share-name"),
    email: document.getElementById("share-email"),
    title: document.getElementById("share-title"),
    category: document.getElementById("share-category"),
    prep: document.getElementById("share-prep"),
    ingredients: document.getElementById("share-ingredients"),
    instructions: document.getElementById("share-instructions")
  };

  // Split a textarea into its non-blank lines
  const linesOf = (text) => text.split("\n").map((line) => line.trim()).filter((line) => line !== "");

  // Lower-case and squash spaces, for comparing two pieces of text
  const normalise = (text) => text.trim().toLowerCase().replace(/\s+/g, " ");

  // ---- Validators: each gives back an error message, or "" when fine -------
  const validators = {
    name: (el) => {
      const value = el.value.trim();
      if (value === "") return "Please enter your name.";
      if (value.length < el.minLength) return `Name must be at least ${el.minLength} characters.`;
      if (!/^[\p{L}\p{M}' .-]+$/u.test(value)) return "Use letters, spaces, hyphens, apostrophes and periods only.";
      return "";
    },

    email: (el) => {
      const value = el.value.trim();
      if (value === "") return "Please enter your email address.";
      // type="email" accepts "a@b", so also require a dotted domain
      if (el.validity.typeMismatch || !/^[^\s@]+@([a-z0-9-]+\.)+[a-z]{2,}$/i.test(value)) {
        return "Enter a valid email, like name@example.com.";
      }
      const ending = value.split(".").pop().toLowerCase();
      if (!ALLOWED_EMAIL_ENDINGS.includes(ending)) return "Email must end in .com, .gov, .edu, .org or .mil.";
      return "";
    },

    title: (el) => {
      const value = el.value.trim();
      if (value === "") return "Please enter a recipe title.";
      if (value.length < el.minLength) return `Title must be at least ${el.minLength} characters.`;
      // Cross-field: the title can't just be your name
      if (normalise(value) === normalise(fields.name.value)) return "The title can't be the same as your name.";
      // Cross-check with the site: no duplicates of recipes already here
      if (RECIPES.some((recipe) => normalise(recipe.title) === normalise(value))) {
        return `"${value}" is already on the site. Try a different title.`;
      }
      return "";
    },

    category: (el) => (el.value === "" ? "Please choose a category." : ""),

    prep: (el) => {
      if (el.validity.badInput) return "Enter the prep time as a number of minutes.";
      if (el.value === "") return "Please enter the prep time in minutes.";
      if (!Number.isInteger(Number(el.value))) return "Use whole minutes.";
      if (el.validity.rangeUnderflow) return `Prep time must be at least ${el.min} minute.`;
      if (el.validity.rangeOverflow) return `Prep time can be at most ${el.max} minutes (${formatMinutes(Number(el.max))}).`;
      return "";
    },

    ingredients: (el) => {
      const lines = linesOf(el.value);
      if (lines.length === 0) return "Please list the ingredients.";
      if (lines.length < 2) return "List at least 2 ingredients, one per line.";
      return "";
    },

    instructions: (el) => {
      const lines = linesOf(el.value);
      if (lines.length === 0) return "Please add the instructions.";
      if (lines.length < 2) return "Add at least 2 steps, one per line.";
      // Cross-field: instructions can't be a copy of the ingredients
      if (normalise(el.value) === normalise(fields.ingredients.value)) {
        return "The instructions are the same as the ingredients. Describe the steps.";
      }
      return "";
    }
  };

  // Which other field to re-check when one changes (cross-field rules)
  const dependants = { name: "title", ingredients: "instructions" };

  const touched = new Set(); // fields checked at least once

  // ---- Show one field's result ------------------------------------------
  const validateField = (name) => {
    // Run the rule
    const el = fields[name];
    const message = validators[name](el);
    const field = el.closest(".field");

    // Show the message and the red/green state
    document.getElementById(`${name}-error`).textContent = message;
    el.setAttribute("aria-invalid", `${message !== ""}`);
    field.classList.toggle("is-invalid", message !== "");
    field.classList.toggle("is-valid", message === "");
    return message;
  };

  // Clear one field's message and colors
  const clearField = (name) => {
    const el = fields[name];
    document.getElementById(`${name}-error`).textContent = "";
    el.removeAttribute("aria-invalid");
    el.closest(".field").classList.remove("is-valid", "is-invalid");
  };

  // ---- Live checking -------------------------------------------------------
  Object.entries(fields).forEach(([name, el]) => {
    // Leaving a field checks it, unless nothing was typed yet (so tabbing
    // through an empty form doesn't fill it with errors)
    el.addEventListener("blur", () => {
      if (el.value === "" && !touched.has(name)) return;
      touched.add(name);
      validateField(name);
    });

    // After that, re-check on every change; also re-check the field that
    // depends on this one (e.g. title when the name changes)
    const recheck = () => {
      if (touched.has(name)) validateField(name);
      if (Object.hasOwn(dependants, name) && touched.has(dependants[name])) {
        validateField(dependants[name]);
      }
      status.textContent = "";
      status.className = "form-status";
    };
    el.addEventListener("input", recheck);
    el.addEventListener("change", recheck);
  });

  // ---- Handler flow panel --------------------------------------------------
  const STEP_DELAY = reducedMotion ? 0 : 250; // ms between logged steps

  // Pause the handler for a moment so each step can be seen as it's logged
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let flowStart = 0;
  let running = false;

  // Add one step to the panel: code that ran, time since submit, what happened
  const logStep = (code, detail, state) => {
    // Time since the handler started
    const elapsed = Math.round(performance.now() - flowStart);

    // Build the step
    const item = make("li", `step is-${state}`);
    const codeEl = make("code", "", code);
    const time = make("time", "", `+${elapsed}ms`);
    time.dateTime = `PT${(elapsed / 1000).toFixed(3)}S`;
    item.append(codeEl, time, make("small", "", detail));

    // Add it and keep the newest step in view
    flowList.append(item);
    flowList.scrollTop = flowList.scrollHeight;
  };

  // ---- Confirmation card ---------------------------------------------------
  const showConfirmation = (data) => {
    // Rows of label + value
    const rows = [
      ["Recipe", data.title],
      ["Category", CATEGORIES[data.category].label],
      ["Prep time", formatMinutes(data.prep)],
      ["Ingredients", `${data.ingredientCount} ${data.ingredientCount === 1 ? "item" : "items"}`],
      ["Steps", `${data.stepCount} ${data.stepCount === 1 ? "step" : "steps"}`],
      ["Shared by", `${data.name} (${data.email})`]
    ];

    // Build the list with textContent so typed text is never treated as HTML
    summary.replaceChildren(...rows.flatMap(([label, value]) => [make("dt", "", label), make("dd", "", value)]));
    confirmation.hidden = false;
    confirmation.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
  };

  // ---- Submit handler ------------------------------------------------------
  form.addEventListener("submit", async (e) => {
    // Stop the page from reloading (must run before any await)
    e.preventDefault();
    if (running) return;

    // Start a new run: lock the buttons and clear the panel
    running = true;
    submitButton.disabled = true;
    resetButton.disabled = true;
    flowStart = performance.now();
    flowList.replaceChildren();
    confirmation.hidden = true;
    status.textContent = "";
    status.className = "form-status";

    logStep("form 'submit' event", "Submit clicked — handler invoked", "info");
    await wait(STEP_DELAY);
    logStep("e.preventDefault()", "Default browser submission blocked; JavaScript takes over", "info");

    // Check each field in turn, logging each result
    const invalid = [];
    for (const name of Object.keys(fields)) {
      await wait(STEP_DELAY);
      touched.add(name);
      const message = validateField(name);
      if (message !== "") invalid.push(name);

      // Mention the cross-field checks for the fields that have them
      const crossNotes = {
        title: " (incl. cross-checks: not your name, not already on the site)",
        instructions: " (incl. cross-check: not a copy of the ingredients)"
      };
      const passDetail = `Valid${Object.hasOwn(crossNotes, name) ? crossNotes[name] : ""}`;
      logStep(`validateField('${name}')`, message === "" ? passDetail : message, message === "" ? "pass" : "fail");
    }

    await wait(STEP_DELAY);
    if (invalid.length > 0) {
      // Something's wrong: summarise, focus the first problem, stop
      status.className = "form-status is-error";
      status.textContent = `Please fix ${invalid.length} ${invalid.length === 1 ? "field" : "fields"} above.`;
      fields[invalid[0]].focus();
      logStep(`${fields[invalid[0]].id}.focus()`, `${invalid.length} invalid — handler stopped, focus moved to the first problem`, "fail");
    } else {
      // All good: collect the values, show the confirmation, clear the form
      const data = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        title: fields.title.value.trim(),
        category: fields.category.value,
        prep: Number(fields.prep.value),
        ingredientCount: linesOf(fields.ingredients.value).length,
        stepCount: linesOf(fields.instructions.value).length
      };
      showConfirmation(data);
      logStep("showConfirmation(data)", `All fields valid — "${data.title}" summarised in the confirmation card`, "pass");

      await wait(STEP_DELAY);
      form.reset();
      status.className = "form-status is-success";
      status.textContent = `Thanks, ${data.name}! "${data.title}" is ready to share.`;
      logStep("form.reset()", "Form cleared, ready for another recipe (nothing is sent: no server yet)", "info");
    }

    // Unlock the buttons
    running = false;
    submitButton.disabled = false;
    resetButton.disabled = false;
  });

  // ---- Reset ---------------------------------------------------------------
  // Clears messages and colors as well as the values (the browser clears the
  // values itself, right after this event)
  form.addEventListener("reset", () => {
    touched.clear();
    Object.keys(fields).forEach(clearField);
    if (!running) {
      status.textContent = "";
      status.className = "form-status";
    }
  });
};

// ==========================================================================
// Start everything once the page's HTML has been read
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initThemeToggle();
  initFooterLinks();
  initScrollTop();
  initTyping();
  initFavourites();
  initCategoryCounts();
  initRecipes();
  initRecipeDetail();
  initShareForm();
});
