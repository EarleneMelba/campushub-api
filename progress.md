# CampusHub API — Progress Log

## Sept 6, 2026
- Set up project structure (routes/controllers/config/models)
- Connected PostgreSQL via Sequelize
- Fixed bug: Sequelize class vs instance naming (capital S vs lowercase s)
- Fixed bug: models must be `require()`d before `sequelize.sync()` runs
- Built User model, seeded test user with bcrypt hash
- Built and tested login endpoint (JWT + bcrypt.compare)
- Fixed bug: null check must happen before accessing user.password
- Learned: nodemon vs plain node (auto-restart on file changes)
- Verified both failure cases (wrong email, wrong password) return clean 401s
- Decided: JS first for CampusHub, TypeScript conversion after signup ticket
- Built and connected signup/register endpoint (`POST /api/auth/signup`) in auth controller and routes
- Integrated Swagger / OpenAPI 3.0 documentation using `swagger-ui-express` and `swagger-jsdoc` at `/api-docs`
- Documented authentication endpoints (`signup` and `login`) with request/response schemas
- Verified signup (success, missing fields, duplicate email) and login flows with JWT

**Next:** Protected routes & role-based access control (RBAC) middleware

## Oct 19, 2026
- Created models/index.js as the single place that registers models and associations
- Fixed: Node resolves require('./models') to models/index.js, which didn't exist yet
- Designed Institution, Branch and role structure from Pappa.ai domain knowledge (concepts only, own schema)
- Decided: UUID ids everywhere, Create Institution v1 without transaction (logo/email parked)
- Dropped and recreated tables to switch ids from integer to UUID

**Next:** verify UUID columns in the DB, then roles groundwork (super_admin + role middleware), then Create Institution


## Oct 24, 2026 
todays progress

## Oct 23, 2026
- Set up the project on the office laptop: clone, fresh DB, own .env
- Learned: the DB is rebuilt from code (sync + seed), so it never needs to be shared between machines
- Learned: 401 = server doesn't know who you are, 403 = it knows you but you're not allowed
- Wrote requireRole middleware (returns a middleware, so one file serves every role check)
- Changed User role default from 'admin' to 'user' (least privilege)
- Rewrote seed.js to create the super admin from .env, safe to run twice

## Oct 24, 2026
**Goal today:** super admin seeded, role middleware tested (401 / 403 / 200), commit, 1 GFG problem
- Fixed: seed said env vars missing. Cause: the new lines weren't being read (env count was 7, not 9)

