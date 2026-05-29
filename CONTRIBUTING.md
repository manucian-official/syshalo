# 🤝 Contributing to HALO Agency Platform

Thank you for showing interest in contributing to our high-performance brand portal. We adhere to meticulous code quality, professional UI designs, and rigorous type systems to make sure our digital touchpoints remain legendary.

Please take a moment to review this guidelines document before submitting your issues or Pull Requests.

---

## 🗺️ Git Workflow & Branching
To maintain a pristine deployment history, we utilize a streamlined version of the Git Flow mechanism:

1. **Fork the Repository** and create a feature branch off of the `main` branch.
   ```bash
   git checkout -b feat/your-incredible-feature
   ```
2. Make isolated, atomic commits that target distinct functional files.
3. Push your branch upstream and open a **Pull Request** against `main`.

---

## ✍️ Semantic Commit Message Rules
We strictly enforce **Conventional Commits** to keep our changelog transparent, clean, and professional. Commit messages must be structured as follows:

```
<type>(<scope>): <short description>
```

### Approved Commit Types (`<type>`):
*   `feat`: A brand new interactive capability (e.g., adding an interactive chart, a search indexing tool).
*   `fix`: Patches resolving structural visual errors, rendering flashes, or standard script issues.
*   `docs`: Significant improvements to README, CONTRIBUTING, or code comments.
*   `style`: Pure CSS/Tailwind class reorganizations without script behavior adjustments.
*   `refactor`: Rewriting component logic (like splitting a complex view to modular components) without introducing new features.
*   `test`: Appending automated unit, integration, or end-to-end tests.

### Examples:
*   `feat(faq): implement live search filters on knowledge atlas`
*   `fix(pricing): resolve alignment errors in tailored financial quotes`
*   `style(admin): align security scanner gauge colors to match slate themes`

---

## 🎨 Code Style & Styling Standard
Every component must look custom-crafted rather than generic. Respect these core layout rules:

### 1. Tailwind Usage
*   Do not write inline `style={{ ... }}` attributes or separate `.css` files.
*   Utilize Tailwind v4 utility variables for all margin, padding, color, and size classes.
*   Leverage rich interactive hover feedback prompts (e.g., `hover:bg-opacity-80 transition-all`).

### 2. Desktop-First Elegance, Mobile-First Code
*   Design and test your components across the full responsive spectrum.
*   Utilize fluid max-width constraints (such as `w-full max-w-5xl mx-auto`) to prevent UI elements from becoming excessively stretched on ultra-wide desktop monitors.
*   Ensure all buttons and touch inputs on mobile touchpads offer safe targets (at least `44px`).

### 3. TypeScript Strictness
*   Explicitly define all return types on helper functions.
*   Do not bypass TypeScript compile checks using `any`. Define robust interfaces inside `/src/types.ts` for any shared properties.

---

## ⚡ React Optimization Checklist
*   **Prevent infinite rendering**: Never call state setters directly inside the main body of a component.
*   **Safe useEffect dependencies**: Only use primitive values (strings, numbers, booleans) in dependency arrays. Never write a dependency array that references raw arrays or objects without stabilizing them with `useMemo` first.
*   **Avoid big monolithic files**: If a component exceeds 400 lines of code, break it down logically. Move large static mock objects or localization models into dedicated helper modules so that files compile quickly.

---

## 📈 Pull Request Checklist
Before requesting a code review, verify that you completed each of these checkboxes:
- [ ] Your code compiles without errors: ran `npm run build` locally successfully.
- [ ] The linter reports zero warnings: ran `npm run lint` cleanly.
- [ ] All interactive elements (such as toggles, expanders, input forms) feature unique `id` attributes.
- [ ] Direct text labels are localized correctly inside the translation context for both EN and VI users.
- [ ] No placeholder console logs are committed to the codebase.

Thank you for guarding clean, authentic, and secure software development!
**— The HALO Engineering Team**
