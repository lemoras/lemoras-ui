# lemoras-ui

> **Author:** Onur Yaşar ([@onurid](https://github.com/onurid))
> **Part of:** [Lemoras](https://lemoras.com) — Identity-powered application ecosystem
> Built on [Rymory](https://rymory.org) identity infrastructure
> © 2017–2026 Onur Yaşar. All rights reserved.

---

## What is lemoras-ui?

`lemoras-ui` is the reference frontend implementation of the Rymory identity ecosystem. It is a config-driven, multi-template AngularJS SPA that connects to `id.rymory.org` (or any Rymory-compatible identity backend) for authentication and session management.

It demonstrates how to build a full multi-application ecosystem on top of Rymory — one identity, many apps, unified navigation.

---

## Structure

```
lemoras-ui/
├── apps/                    ← per-application modules
│   ├── account/             ← identity & profile management
│   ├── notes/               ← note-taking application
│   ├── drive/               ← file storage
│   ├── planner/             ← task & planning
│   ├── passwords/           ← credential vault
│   └── root/                ← system root panel
├── system/                  ← core AngularJS engine
│   ├── app.js               ← module bootstrap, routing engine
│   ├── requires/            ← vendor dependencies (RequireJS, Angular, etc.)
│   ├── services/            ← shared services
│   │   ├── authentication.js  ← login, token build, SSO flows
│   │   ├── profile.js         ← account get/update, password change
│   │   ├── member.js          ← member management
│   │   ├── project.js         ← project/tenant management
│   │   ├── note.js            ← notes CRUD
│   │   ├── lemoras.js         ← system init
│   │   └── flash.js           ← flash messaging, localStorage config
│   └── modules/             ← page controllers
│       ├── login.js           ← login, SSO callback, token handling
│       ├── register.js        ← account creation
│       ├── logout.js          ← cross-domain logout propagation
│       ├── dashboard.js       ← app launcher, cross-domain SSO
│       ├── account.js         ← profile, password change, photo upload
│       ├── root.js            ← root admin panel
│       └── ...
└── templates/               ← UI themes
    ├── w_default/           ← dashboard/panel theme (Now UI)
    └── w_artfactory/        ← landing/public theme
```

---

## How it works

The entire UI is config-driven. On load, `main.js` fetches a JSON config that defines:

- Which template to use (`w_default` or `w_artfactory`)
- Navigation structure (multilingual)
- Route definitions (templateUrl + controller per route)
- Module settings per application

This means the same codebase serves every application in the ecosystem — notes, drive, planner, passwords — each with its own config, template and routes.

---

## Authentication Flow

```
User visits app domain
        ↓
app checks for valid session cookie
        ↓
no session → redirect to id.rymory.org/login
        ↓
user logs in → short-lived JWT issued
        ↓
JWT wrapped in HttpOnly cookie by rymory-gateway
        ↓
redirect back to app with session established
        ↓
app-specific token built (appId + merchantId + roleId)
```

Cross-domain SSO works by passing token via URL parameter on trusted domains, then immediately cleaning the URL.

---

## Multi-language Support

Built-in support for **EN, TR, RU** via AngularJS `$rootScope.langKey`. Language is detected from browser or user preference. All UI strings are defined per-language in config JSON.

---

## Templates

| Template | Use case |
|---|---|
| `w_artfactory` | Public-facing pages (login, register, landing, home) |
| `w_default` | Authenticated dashboard/panel pages |

Templates are swappable per-application and even per-user via the `ChangeTemplate` feature.

---

## Running locally

```bash
git clone https://github.com/lemoras/lemoras-ui.git
cd lemoras-ui
# serve with any static file server
npx serve .
# or
python3 -m http.server 8080
```

Point your browser to `http://localhost:8080`. You will need a running `rymory-core` and `rymory-gateway` backend, or configure `system/requires/main.js` to point to your API endpoint.

---

## License

Licensed under **GNU AGPL v3** with Commercial Exception.
See [LICENSE.txt](./LICENSE.txt) for full terms.

Commercial licensing: onxorg@proton.me

---

## Related Repositories

```
rymory-core       ← identity backend (Go)
rymory-gateway    ← edge proxy, token/cookie management
goutils           ← shared Go utilities
lemoras-ui        ← you are here (reference frontend)
lemoras-modules   ← additional application modules
```

→ [rymory.org](https://rymory.org) · [lemoras.com](https://lemoras.com)
