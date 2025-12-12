# Copilot instructions — Pet's Heaven (WebPet's)

Focused guidance for AI coding agents working on this Pet's Heaven website repository.

## Big picture

- **Static website** (no backend required) built with vanilla HTML/CSS/JS and Bootstrap 5 CDN
- Primary entry: `index.html` — navigation hub to four feature pages
- **Asset structure** under `assets/`:
  - `assets/js/script.js` — shared auth logic, navbar state, subscription handling
  - `assets/js/{products,vets,rdv,pets}.js` — page-specific interactivity
  - `assets/css/styles.css` — Bootstrap overrides and custom styles
  - `assets/images/` — logo, hero image, potential icons
- **Design intent**: lightweight demo for local/showcase use; auth and payments are client-side only via `localStorage`
- **Language**: French. All UI copy, labels, and form text must remain in French for consistency

## Key files & patterns to reference

### `index.html` — Canonical template
- Bootstrap navbar with sticky positioning and auth UI branching (`#btnLogin`, `#btnSignup`, `#accountMenu`)
- Modal dialogs for signup (`#signupModal`, `#signupForm`) and login (`#loginModal`, `#loginForm`)
- Hero section with image (`hero-img` class)
- Subscription cards (4 plans: Découverte, Plus, Pro, Premium)
  - Each has class `sub-btn` and attribute `data-plan="<PlanName>"` 
  - Shared toast `#subToast` and `#subName` for confirmation feedback
- Section navigation via hash anchors: `#menu`, `#abonnement`, `#contact`

### Navbar/Auth pattern (used across all 5 pages)
- Copied navbar markup appears in `products.html`, `vets.html`, `rdv.html`, `pets.html`
- Login/signup modals also duplicated (same structure as index.html)
- Element IDs must match: `#loginForm`, `#signupForm`, `#btnLogin`, `#btnSignup`, `#accountMenu`, etc.
- See `assets/js/script.js` for shared handlers

### Page-specific logic
- **`products.html`** + `assets/js/products.js`:
  - Products array stored in JS (no API)
  - Filtering by category via `[data-category]` buttons
  - Call `renderProducts(category)` to update grid
  
- **`vets.html`** + `assets/js/vets.js`:
  - Veterinarian array (name, city, specialty, phone, email)
  - Filters: `#cityFilter` and `#specialtyFilter` dropdowns
  - `filterVets()` on dropdown change, `renderVets(filtered)` to display
  
- **`rdv.html`** + `assets/js/rdv.js`:
  - Form collects: pet, vet, date, time, reason
  - Date input has min constraint (today's date)
  - On submit: save to `localStorage` key `ph_rdv`, show success message
  
- **`pets.html`** + `assets/js/pets.js`:
  - Add/edit cat profiles (name, age, breed, weight)
  - Modal `#addPetModal` with form `#addPetForm`
  - Stored in `localStorage` key `ph_pets`
  - `renderPets()` displays cards; `deletePet(id)` removes records

## Project-specific conventions

1. **Language**: All text in French (menus, labels, error messages, confirmations)
2. **Currency**: Display prices in `DH` (Moroccan Dirham) or `MAD` — examples: `50 DH/mois`, `200 MAD`
3. **No build tools**: This is a static site. Avoid introducing webpack, rollup, or bundlers unless explicitly required
4. **CDN dependencies** (not npm):
   - Bootstrap 5.3.3 CSS/JS
   - Bootstrap Icons 1.11.3
   - Loaded via `<link>` and `<script>` tags, not imports
5. **Accessibility**: Modals use `aria-hidden`, buttons have proper `type` attributes, form inputs have labels
6. **DOM IDs are the source of truth** for JS handlers — don't change IDs without updating all references in `script.js` and page-specific files

## Developer workflows

### Local preview (no build step needed)

**PowerShell:**
```powershell
# Using Python (built-in on many systems)
cd "C:\Users\HP EliteBook 840 G6\Downloads\WebPet's"
python -m http.server 8000
# Open http://localhost:8000

# OR using Node.js
npx serve . -l 8000
```

### Testing & debugging
- Open DevTools Console (F12) to inspect JS errors
- Check Network tab for missing assets (CSS, images, JS files)
- Use `localStorage` inspection (Application tab) to verify auth/pet/RDV data
- No automated test suite exists — validate manually in browser

## Common change patterns

- **Add a new menu card** (in `#menu` section): Copy existing card structure, update icon class (`.bi-*`), title, description, and `href`
- **Add a new subscription plan**: Duplicate a plan card in `#abonnement`, set `data-plan` to the new plan name; shared toast auto-populates via `#subName`
- **Add a product category**: Add option to `products.html` product filter, create new entry in `products.js` array with matching category string
- **Add a new vet**: Insert into veterinarians array in `vets.js` (follows: name, city, specialty, phone, email)
- **Add a pet field**: Extend `#addPetForm` with new input, capture in `pets.js` form handler, include in localStorage object
- **Add new string/label**: Directly in HTML; keep French

## Integration points & external dependencies

- **Bootstrap CSS/JS**: Loaded via CDN. Versions pinned (5.3.3, 1.11.3). Changing versions may break styling/behavior
- **No backend**: This repo has no server. Real auth, payments, or persistence require adding a backend API (Node/Python/PHP) and discussing architecture first
- **Image assets**: Logo and hero image referenced in modals/header. Ensure files exist in `assets/images/` or links break silently

## If you can't find a behavior in the code

1. Search for the element ID (e.g., `#myButton`) in `assets/js/script.js` first — shared handlers live there
2. If not found, search the page-specific `.js` file (e.g., `products.js` for a products page feature)
3. If still not found, the behavior may need to be added as a new event listener
4. **Avoid inline `<script>` blocks** in HTML; put all JS logic in the `.js` files

## Testing validation checklist

Before committing changes:
- [ ] Modals open and close properly (login, signup, "add pet", etc.)
- [ ] Form validation triggers (required, email, minlength)
- [ ] Toast notifications display on subscription choice or RDV confirmation
- [ ] Navbar auth state updates correctly after login/logout
- [ ] Assets load without 404 errors (check Network tab)
- [ ] Browser console is clean (no JS errors)
- [ ] French text is spelled correctly and consistent

## File paths reference

- Main pages: root directory (index.html, products.html, vets.html, rdv.html, pets.html)
- Stylesheets: `assets/css/styles.css`
- JavaScript: `assets/js/script.js` (shared), `assets/js/{page}.js` (page-specific)
- Images: `assets/images/` (Logo.jpg, image.chats.jpg, icons/)
- Documentation: `README.md`, `.github/copilot-instructions.md`

---

**Last updated**: November 2025  
**Maintainer note**: This is a demo/showcase project. Keep structure simple and focused. When adding complex features, document the "why" for future maintainers.
