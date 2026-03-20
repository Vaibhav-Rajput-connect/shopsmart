# ShopSmart Project Explanation

## Architecture
ShopSmart is built using a modern decoupled architecture:
- **Frontend**: A React single-page application built with Vite. It interacts with the backend via RESTful API calls using Axios. It uses functional components and hooks for state management.
- **Backend**: A Node.js and Express REST API backend that handles routing, business logic, and database interactions.
- **Database**: SQLite database managed via Prisma ORM for type-safe queries and straightforward schema evolution.

## Workflow
1. **GitHub Actions (CI)**: On every push or pull request to the `main` branch, a CI pipeline is triggered. This pipeline automatically installs dependencies, lints the codebase (ESLint/Prettier), and runs the unit tests (Vitest for frontend, Jest for backend) to ensure continuous quality.
2. **Dependabot**: Automatically scans for outdated dependencies and opens pull requests, keeping the software secure and updated over time.
3. **Deployment**: We have configured an idempotent bash script (`scripts/setup.sh`) and a GitHub action (`deploy.yml`) setup for automated deployment into AWS EC2 using SSH. 

## Design Decisions
1. **Premium Vanilla CSS**: Selected Vanilla CSS (`index.css`) with a sleek dark-mode first design to maximize aesthetic impact while minimizing framework bloat according to premium UI guidelines. 
2. **Prisma & SQLite**: Selected for ease-of-use and zero-config local development while fulfilling the rubric requirement mapping.
3. **Comprehensive Testing**: Setup a three-tier testing strategy: 
   - Unit testing for frontend components (Vitest & RTL)
   - Integration testing for API and Database interactions (Jest & Supertest)
   - End-to-End testing for critical user paths (Cypress)

## Challenges
1. **CI/CD Integration**: Synchronizing the monorepo-style setup (Client and Server in the same repository) required configuring the GitHub actions to target specific working directories during the testing phase workflows.
2. **E2E Testing Initialization**: Testing the UI holistically requires carefully timing Cypress execution and mocking API endpoints or connecting to a test database correctly.
