# Sweet Amber — Dessert Recipes

A dessert recipe site built with plain HTML, CSS and JavaScript (ES6, no frameworks, no build step).

## Pages

| Page | File | Interactive feature |
|---|---|---|
| Home | `index.html` | Hero with a typing animation on the intro hook, category shortcuts, three reader favourites |
| Recipes | `recipes.html` | Grid of 12 recipe cards with a filter by category |
| Recipe | `recipe.html?id=…` | One recipe: times, servings, ingredients and method (opened from "View Recipe") |
| Share a Recipe | `share.html` | Form with live validation, cross-field checks and a handler flow panel |
| Not found | `404.html` | Custom page for wrong links |

## Structure

```
.
├── index.html
├── recipes.html
├── recipe.html
├── share.html
├── 404.html
├── css/
│   └── styles.css   # All styles: dark theme (default) and light theme
└── js/
    └── main.js      # All JavaScript, including the recipe data
```

## Features

- **Navigation**: the same nav bar at the top of every page, with the current page highlighted (`aria-current`). On phones and tablets (under 1024px) it collapses into a **Menu** button. Escape, tapping outside, or tapping a link closes it. Without JavaScript, the links are always shown.
- **Typing animation**: the homepage hook types itself out with a blinking amber caret. Screen readers read the full sentence once, and it appears straight away with reduced motion turned on.
- **Category filter**: All, Cakes, Cookies & Bars, Pies & Tarts, and Frozen & Chilled, with a count ("Showing 3 of 12 recipes") and an empty-state message. The filter is kept in the address (`recipes.html?category=cakes`), so a filtered view can be shared or reloaded, and the homepage category links open it pre-filtered.
- **Share form validation**: each field is checked when you leave it, then live as you type, with a message under the field. It uses HTML validation attributes plus JavaScript for custom messages and cross-field checks:
  - the email must end in .com, .gov, .edu, .org or .mil
  - the recipe title can't match your name or a recipe already on the site
  - ingredients and instructions need at least 2 lines each, and the instructions can't be a copy of the ingredients
- **Handler flow panel**: every step of the share form's submit handler appears as it runs, with timings.
- **Breadcrumbs**: Home › Recipes › Key Lime Pie.
- **Light/dark theme toggle**: saved in `localStorage`, so it carries over to every page and future visits, and it's applied before the page is drawn (no flash).
- **Back to top**: a button appears after scrolling down and smoothly scrolls back up, then moves keyboard focus to the page heading.
- **Page transitions**: pages cross-fade (View Transitions) while the header stays still. Browsers without View Transitions get a short fade-in instead.
- **Footer links**: generated from the main nav, so adding a page to the nav adds it to the footer too.
- **Accessibility**: skip link, labelled controls, live regions for updates, visible keyboard focus, WCAG AA color contrast in both themes, and support for reduced motion and Windows High Contrast mode.

## How to view it

Run a local server from this folder:

```
python3 -m http.server 8000
```

then go to http://localhost:8000. You can also open `index.html` directly, but page transitions need a server.

**Live site:** https://kingvictor501.github.io/aim-w4d3-recipe/

**About the 404 page:** GitHub Pages shows `404.html` for any wrong address on the live site, even one several folders deep. Because of that, `404.html` has `<base href="/aim-w4d3-recipe/">` so its styles and links always load from the site's home folder (change it if the repository is renamed). To preview it locally, run the server from the folder *above* this one and open http://localhost:8000/aim-w4d3-recipe/404.html. A link to a recipe that doesn't exist (for example `recipe.html?id=nope`) shows a "Recipe not found" message on the recipe page itself.
