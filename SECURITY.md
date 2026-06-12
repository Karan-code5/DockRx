# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| Latest (`main` branch) | ✅ |
| Older tags | ❌ |

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub Issues.**

If you discover a security vulnerability, please follow responsible disclosure:

1. **Email** the maintainer directly at the email listed on their [GitHub profile](https://github.com/Karan-code5).
2. Include the following in your report:
   - A description of the vulnerability
   - Steps to reproduce it
   - Potential impact
   - Any suggested fix (optional but appreciated)

3. You will receive an acknowledgment within **48 hours**.
4. We aim to resolve critical issues within **7 days** and will keep you updated on the progress.

## What to Report

Please report:
- Authentication bypasses
- SQL/NoSQL injection vulnerabilities
- Exposed secrets or environment variables
- Insecure direct object references (IDOR)
- Cross-site scripting (XSS)
- Broken access control (e.g., patient accessing admin routes)

## What NOT to Report

- Issues already fixed in the latest `main` branch
- Theoretical vulnerabilities without a proof-of-concept
- Issues in third-party dependencies (please report those upstream)
- Rate limiting / DDoS attack surface (out of scope for this project)

## Security Best Practices for Self-Hosters

If you are self-hosting DockRx:

- **Never commit `.env` files** — use `.env.example` as a template only
- **Use strong JWT secrets** — at least 64 random characters
- **Restrict MongoDB Atlas Network Access** appropriately for production (avoid `0.0.0.0/0` in production if possible)
- **Rotate credentials** regularly
- **Keep dependencies up to date** — run `npm audit` periodically
- **Do not expose** `.worker-secrets.json` — it is git-ignored by default

Thank you for helping keep DockRx and its users safe!
