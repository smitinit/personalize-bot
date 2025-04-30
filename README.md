# Concept and TODO'S

- [x] Make it deploy (Vercel)
- [x] Set up db (Supabase)
- [x] db w ui (Shadcn)
- [x] Add auth (Clerk)
- [ ] Custom auth
- [x] Routing (App Router)
- [ ] Websockets (Secure)
- [ ] Ratelimiting (Upstash)
- [x] Upload avatar
- [ ] Upload and Read from custom documents
- [ ] Audit Logs (per API key)
- [ ] CORS & Domain Whitelisting
- [ ] API Key Rotation (manual + auto-expire)
- [ ] JWT Auth Option (Webhook or Signed Header)
- [x] Sentry {closed}

# Form

## Personality Base

- [x] Bot Name
- [x] Conversation Tone
- [x] Bot Thesis or project concept
- [x] Area of Expertise
- [x] Custom Expertise (separated by comma)

## Knowledge Base

- [x] Default Greeting
- [x] Fallback Response
- [x] Use Web Search (switch)
- [ ] Upload custom Docs (switch)
- [ ] Bot Memory Type (per user)
- [ ] Focus Domains (more precise version of Area of Expertise, separated by comma)
- [ ] Site URL (homepage or documentation link)
- [ ] Intent Snippets / Prompt Macros
- [ ] Bot Memory Expiration Control (session / 24h / 7d / perm)
- [ ] Config Snapshots & Version Restore

## Bot Appearance

- [x] Bot Avatar
- [ ] Theme Color (to be replaced with overlay image)
- [ ] Chat Bubble Style
- [ ] Live Bot Config Preview in Dashboard

# Developer Experience (DX)

- [ ] npm SDK (@yourorg/bot-client)
- [ ] Embed Script Generator (for no-code clients)
- [ ] CLI Tool (npx yourbot init)
- [ ] Error Boundary in Bot UI (graceful fallback)
- [ ] Rate Limit Simulation in Dashboard
