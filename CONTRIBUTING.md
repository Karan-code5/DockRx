# Contributing to DockRx

Thank you for your interest in contributing to **DockRx**! 🎉

Whether it's a bug fix, new feature, documentation improvement, or a typo — all contributions are welcome.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)

---

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and constructive environment. Be kind and professional in all interactions.

---

## 🚀 How to Contribute

### 1. Fork & Clone

```bash
# Fork via GitHub UI, then:
git clone https://github.com/YOUR_USERNAME/DockRx.git
cd DockRx
```

### 2. Add Upstream Remote

```bash
git remote add upstream https://github.com/Karan-code5/DockRx.git
```

### 3. Sync Before Starting Work

Always start from an up-to-date `main`:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 4. Create a Feature Branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/bug-description
```

### 5. Make Your Changes

- Follow the [Code Style Guidelines](#code-style-guidelines)
- Test your changes locally (see [Development Setup](#development-setup) in README.md)
- Write clear code with comments where necessary

### 6. Commit Your Changes

```bash
git add .
git commit -m "feat(frontend): add doctor availability toggle"
```

Use [Conventional Commits](#commit-message-format).

### 7. Push Your Branch

```bash
git push origin feat/your-feature-name
```

### 8. Open a Pull Request

- Go to the original repo on GitHub
- Click **New pull request**
- Select your fork and branch
- Fill in the PR template completely

---

## 🌿 Branch Naming Convention

Use this pattern: `<type>/<short-description>`

| Type | Use For | Example |
|---|---|---|
| `feat` | New features | `feat/doctor-rating-system` |
| `fix` | Bug fixes | `fix/appointment-cancel-crash` |
| `docs` | Documentation only | `docs/update-setup-guide` |
| `refactor` | Code refactoring | `refactor/auth-middleware` |
| `style` | CSS/UI changes | `style/mobile-navbar` |
| `chore` | Config, build, deps | `chore/update-dependencies` |
| `test` | Adding tests | `test/user-controller` |

---

## 💬 Commit Message Format

We follow **[Conventional Commits](https://www.conventionalcommits.org/)**:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, missing semicolons (no code logic change) |
| `refactor` | Code restructuring without feature/bug change |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `chore` | Build process, dependency updates |

### Scopes

Use the app/area name: `frontend`, `admin`, `backend`, `api`, `auth`, `payments`, `docs`

### Examples

```bash
feat(frontend): add speciality filter chips on doctors page
fix(backend): prevent double-booking same appointment slot
docs(readme): add troubleshooting section for CORS errors
refactor(admin): extract DoctorCard into reusable component
chore(deps): upgrade mongoose to 8.23.0
```

---

## 🔄 Pull Request Process

1. **Fill in the PR template** completely — don't skip sections.
2. **Link the issue** your PR addresses (if applicable): `Closes #123`
3. **Self-review** your diff before submitting — check for debug logs, secrets, or leftover commented code.
4. **Keep PRs focused** — one concern per PR. Large PRs are hard to review.
5. **Respond promptly** to review feedback.
6. PRs are merged by maintainers once approved. **Do not force-push** after review starts.

---

## 🛠️ Development Setup

See the **[Zero-to-Hero Local Setup](./README.md#-zero-to-hero-local-setup)** section in `README.md` for complete instructions.

Quick summary:

```bash
# Backend
cd backend && cp .env.example .env  # fill in values
npm install && npm run server

# Frontend (new terminal)
cd frontend && cp .env.example .env  # fill in values
npm install && npm run dev

# Admin (new terminal)
cd admin && cp .env.example .env  # fill in values
npm install && npm run dev
```

---

## 📐 Code Style Guidelines

### JavaScript / JSX

- Use **ES Modules** (`import`/`export`) — the project uses `"type": "module"`
- Use **arrow functions** for React components
- Use **`const`** by default; `let` only when reassignment is needed
- Prefer **optional chaining** (`?.`) over manual null checks
- Keep components **small and focused** — extract sub-components when a file exceeds ~150 lines
- **No inline styles** in JSX — use TailwindCSS classes

### CSS / Tailwind

- Use existing **Tailwind utility classes** — don't add custom CSS unless truly necessary
- For responsive design: mobile-first (`sm:`, `md:`, `lg:` prefixes)
- Keep class lists readable — group related utilities

### File Naming

- React components: **PascalCase** (e.g., `DoctorCard.jsx`)
- Utility files: **camelCase** (e.g., `formatDate.js`)
- Route files: **camelCase** (e.g., `userRoute.js`)

### API Routes (Backend)

- Follow RESTful conventions
- Use controller functions — no business logic in route files
- Validate request body in controllers before processing

---

## 🐛 Reporting Issues

Use the GitHub Issues tab with the provided templates:

- 🐛 **Bug Report** — For unexpected behavior
- 💡 **Feature Request** — For ideas and enhancements

---

## 🙏 Thank You

Every contribution matters, no matter how small. Thank you for helping make DockRx better!
