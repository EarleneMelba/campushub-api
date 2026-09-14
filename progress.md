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

**Next:** Build signup/register endpoint (Ticket #2)