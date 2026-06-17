# 05 — Accessibility Audit, WCAG 2.2-Oriented

Target WCAG 2.2 AA where reasonably applicable. Automated scans are not enough; combine static code review, rendered DOM inspection, keyboard testing, and manual reasoning when possible.

## 1. Baseline principles

Evaluate through POUR:

- Perceivable: users can perceive content and UI.
- Operable: users can navigate and operate controls.
- Understandable: content and interactions are clear and predictable.
- Robust: markup works across assistive technologies.

## 2. Document language and structure

Check:

- `<html lang>` is present and correct.
- `dir` is present for RTL languages when needed.
- Page title is unique and useful.
- Landmark regions are present: header/banner, nav, main, footer/contentinfo, complementary where relevant.
- Exactly one primary `<main>` per page.
- Skip link exists and works.
- Headings are semantic and ordered logically.
- Repeated layout sections are not noisy for assistive tech.

## 3. Semantic HTML

Check:

- Native elements are used before ARIA: `button`, `a`, `form`, `label`, `select`, `details`, `summary`, etc.
- Buttons are used for actions; links are used for navigation.
- Lists are lists when content is list-like.
- Tables are used for tabular data, not layout.
- Custom controls expose correct role, name, state, and keyboard behavior.
- ARIA is not used to paper over invalid semantics.

## 4. Accessible names and descriptions

Check:

- All controls have accessible names.
- Icon-only buttons/links have `aria-label`, visible text, or accessible text.
- Images have appropriate alt text.
- Decorative images use empty alt or are hidden correctly.
- SVGs are labelled or hidden based on purpose.
- Inputs have visible labels where possible; `aria-label` is fallback, not default.
- `aria-describedby` connects helper/error text to fields.

## 5. Keyboard navigation

Test or infer:

- All interactive elements are reachable by keyboard.
- Focus order follows visual/logical order.
- Focus indicators are visible and not obscured.
- Custom menus, tabs, dialogs, accordions, sliders, and carousels have expected keyboard behavior.
- No keyboard traps.
- Skip link moves focus to main content.
- Hidden/offscreen interactive elements are not focusable.
- Disabled controls are handled predictably.

## 6. Focus management

Check:

- Focus is managed when opening/closing dialogs, mobile menus, drawers, popovers, and route-level modal patterns.
- Focus returns to the trigger after closing overlays.
- Route transitions do not leave screen reader/keyboard users disoriented.
- Error summary or first invalid field receives focus after failed submission when appropriate.
- Focus styles meet visibility expectations.
- Sticky headers/cookie banners do not obscure focused elements.

## 7. Forms

Check:

- Every field has a visible label.
- Required fields are communicated textually, not color-only.
- Input type and autocomplete attributes are appropriate.
- Validation errors are specific and associated with fields.
- Error state is not communicated only by color.
- Success/error messages are announced when dynamic.
- Form instructions are available before submission.
- Multi-step forms preserve context and do not force redundant entry unless necessary.
- Public forms are spam-protected without inaccessible puzzles.

## 8. Color, contrast, and visual design

Check:

- Normal text contrast is at least WCAG AA 4.5:1.
- Large text contrast is at least 3:1.
- UI components and graphical objects have sufficient contrast.
- Focus indicators are visible.
- Information is not conveyed by color alone.
- Text remains readable at zoom and with user font settings.
- Gradients/images behind text preserve contrast across breakpoints.

## 9. Responsive accessibility and touch

Check:

- Mobile navigation is keyboard/screen-reader accessible.
- Touch targets meet practical minimum size and spacing.
- Content reflows at 320 CSS px without horizontal scrolling except for valid exceptions.
- Sticky elements do not cover content or focus targets.
- Orientation is not restricted unless essential.
- Hover-only interactions have keyboard/touch alternatives.

## 10. Motion and animation

Check:

- `prefers-reduced-motion` is respected.
- Parallax, scroll-jacking, cursor effects, and large motion can be reduced/disabled.
- Auto-playing carousels/videos can be paused/stopped/hidden.
- Animations do not block interaction.
- Flashing content is avoided.

## 11. Dynamic content and live regions

Check:

- Async updates that matter are announced with appropriate live regions.
- Loading states are communicated when delays matter.
- Toasts are accessible and do not disappear too quickly.
- Client-side route changes preserve a coherent accessibility experience.
- Modals/dialogs expose correct title/description relationships.

## 12. Navigation components

Check:

- Main nav has clear label.
- Multiple navs have distinct accessible labels.
- Current page uses `aria-current="page"`.
- Dropdown/mobile nav exposes expanded/collapsed state.
- Breadcrumb nav uses `nav aria-label="Breadcrumb"` and current page semantics.
- Footer links are grouped meaningfully.

## 13. Media and non-text content

Check:

- Meaningful images have equivalent alt text.
- Decorative images are ignored by assistive tech.
- Videos have captions; important audio has transcript.
- Audio/video controls are keyboard accessible.
- Embedded maps/charts have text alternatives or summaries.
- Icons are not the only way to understand an action.

## 14. Dialogs, drawers, popovers, menus

Check:

- Use native `<dialog>` or accessible primitives where possible.
- Correct role and modal behavior.
- Focus trap only while modal is open.
- Escape closes when expected.
- Background content is inert/unavailable to assistive tech when modal.
- Trigger state is communicated where relevant.

## 15. WCAG 2.2 additions to explicitly consider

Check especially:

- Focus Not Obscured (AA): sticky headers, cookie banners, chat widgets, and bottom bars should not cover focused controls.
- Dragging Movements (AA): drag interactions have non-drag alternatives.
- Target Size Minimum (AA): small links/buttons have sufficient target area or spacing.
- Consistent Help (A): help/contact options appear consistently when repeated across pages.
- Redundant Entry (A): users should not re-enter the same information in multi-step flows unless necessary.
- Accessible Authentication Minimum (AA): login/auth flows should not rely on cognitive tests without accessible alternatives.

## 16. Common React/Next.js accessibility pitfalls

Check:

- `onClick` on non-interactive elements instead of buttons/links.
- Missing keyboard handlers on custom controls.
- `tabIndex` misuse.
- `aria-hidden="true"` on focusable elements or ancestors of focusable elements.
- `role="button"` without keyboard parity.
- Links with `href="#"` or empty href.
- Buttons without type inside forms.
- Hydration changing labels, IDs, or focusable structure.
- Component libraries used without accessible configuration.

## 17. Tools to recommend

Use or recommend when available:

- axe DevTools / axe-core.
- Lighthouse accessibility audit.
- WAVE.
- Screen reader smoke test: NVDA, VoiceOver, or equivalent.
- Keyboard-only test.
- Browser zoom/reflow test.
- Manual contrast check for gradients and overlays.

