# GLO365 Booking Flow Mockup

This project is an interactive HTML/CSS/JavaScript mockup for a WhatsApp-style appointment booking flow for GLO365. It runs entirely in the browser with localStorage-backed state and demo-only booking logic.

## What is included

- Booking flow starting from WhatsApp entry, language selection, contact lookup, branch selection, service selection, specialist matching, time selection, review, note, phone validation, OTP flow, and booking confirmation.
- Mobile-first WhatsApp app shell styled to match the reminder UI reference.
- Demo controls available via URL query parameter `?demo=1`.
- Demo-only OTP, hold logic, bookings, and pricing examples.
- Local persistence for draft state and saved booking data using localStorage.

## Files

- `index.html` — shell layout and modal sheet container.
- `styles.css` — responsive app styling inspired by the reminder CSS reference.
- `data.js` — demo branches, services, specialists, contacts, and scenario seeds.
- `app.js` — state machine, branch/service logic, OTP simulation, and UI rendering.

## Demo mode

Open the app with:

- `http://localhost:8000/?demo=1`

Demo controls appear in a drawer panel, and the app is seeded with scenario presets. The panel also displays the demo OTP code to reviewers.

## Local run

From this folder:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/`
- `http://localhost:8000/?demo=1`

## Sources used

- The reminder CSS reference in this workspace was used for visual direction: chat shell layout, WhatsApp-like bubbles, light purple background, header styling, and card structure.
- The booking workflow prompt in the task description was used as the business source of truth for the state flow.
- Since the booking-flow Figma file was not present in the workspace, this implementation follows the direct instructions in the prompt and uses clearly labeled illustrative demo content.

## Demo data note

Illustrative demo data — not verified business pricing or availability.

This mockup intentionally uses example values such as AED 800 / SAR values and a simple OTP code for demo review only. It is not connected to a real CRM, phone API, or WhatsApp service.

## Config highlights

- holdMinutes: 10
- otpTtlMinutes: 5
- resendCooldownSeconds: 30
- maxOtpAttempts: 3
- depositRate: 20%
- requireOtpForCurrentNumber: true

## Known limitations

- This is a frontend-only mockup; no backend or live messaging service is connected.
- The location lookup is simulation-only and does not use actual device geolocation unless a browser implementation is added later.
- The sample pricing and availability are illustrative and should not be treated as live business data.

## State and validation notes

- Draft state and booking state are stored under keys prefixed with `glo365_booking_mock_` to avoid deleting unrelated localStorage entries.
- Validation is demo-only and deliberately checks formatting rather than real-world existence of numbers.
- The user-facing UI hides technical state names, raw JSON, and test controls from the main conversational flow.

## Screens represented

- Language selection
- Main menu
- Branch search and confirm
- Service selection
- Specialist selection
- Time selection
- Booking review
- Note entry
- Deposit and payment info
- Phone verification
- OTP entry
- Booking success
- Empty booking state, agent handoff, slot hold expiry, and retry logic paths

## Verification summary

This project was run locally in a browser-capable environment using a static HTTP server. The key flows were validated with manual logic checks and interactive state testing for the core success path and common recovery states.

Note: the browser environment here is limited to static page loading and runtime testing, so the app is intentionally designed to be closed-loop and self-contained without requiring external APIs.
