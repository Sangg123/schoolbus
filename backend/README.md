# 🚀 How to Run the Project

This project uses **NestJS** for the backend and **PostgreSQL** as the database. To run the application locally, follow these steps:

---

## 🧱 1. Set Up PostgreSQL (No Docker Required)

This project includes a batch script to run PostgreSQL on-demand without installing it globally or using Docker.

### 🔧 Configure PostgreSQL

1. Download the PostgreSQL binaries from [EnterpriseDB](https://www.enterprisedb.com/download-postgresql-binaries).
2. Extract them into the following path:
   ```
   external-tools/postgres/postgresql-18.0-2-windows-x64-binaries/pgsql
   ```
3. Ensure the folder structure matches the expected path used in `start-postgres.bat`.

### ▶️ Start PostgreSQL

From your project root, run:

```bash
start-postgres.bat
```

- On first run, it initializes the data directory.
- PostgreSQL runs in the foreground; close the command window to stop it.

> 💡 Automatically creates the `schoolbus` database if it doesn't exist.

---

## 📁 2. Configure Environment Variables

Copy the example environment file and rename it:

```bash
cp .env.example .env
```

Then edit `.env` to match your PostgreSQL setup:

```env
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/schoolbus?schema=public"
```

---

## 🧪 3. Migrate and Seed the Database

Apply Prisma migrations and seed the database:

```bash
yarn db:setup
```

This will:

- Apply any pending Prisma migrations
- Seed the database with default data (e.g. admin user)

---

## 🧬 4. Generate Prisma Types

Generate TypeScript types from your Prisma schema:

```bash
yarn prisma:generate
```

This ensures your application has up-to-date Prisma client types.

---

## 🚦 5. Start the NestJS Backend

Launch the backend server:

```bash
yarn start:dev
```

Your NestJS app will start and connect to your configured PostgreSQL database.

---

## ✅ Summary

| Step | Command                | Purpose                          |
| ---- | ---------------------- | -------------------------------- |
| 1    | `start-postgres.bat`   | Start PostgreSQL locally         |
| 2    | `cp .env.example .env` | Set up environment variables     |
| 3    | `yarn db:setup`        | Migrate and seed the database    |
| 4    | `yarn prisma:generate` | Generate Prisma TypeScript types |
| 5    | `yarn start:dev`       | Start NestJS backend             |

---

## 📚 Additional Notes

- Prisma reads the connection string from `.env` via `env("DATABASE_URL")` in `schema.prisma`.
- The Prisma client is generated in `generated/prisma`.
- PostgreSQL runs as a foreground process. To stop it, close the command prompt window.
- The `schoolbus` database is created automatically if missing.

---

## 📚 Additional Notes

- Prisma reads the connection string from `.env` via `env("DATABASE_URL")` in `schema.prisma`.
- The Prisma client is generated in `generated/prisma` — no need to run `prisma dev`.
- PostgreSQL runs as a foreground process. To stop it, close the command prompt window.
- The `schoolbus` database is created automatically if missing.

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
