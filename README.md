# Project summary
__Monster Land__ is a web-based game about collecting monsters and conquering challenges. It is built and optimized for browsers on desktops to give players the best experience.

In this game, players can explore the world of different types of monsters. In addition, the game contains challenges for players to challenge and get rewarded. Players can enhance the monster’s strength with items and hatch eggs to receive new monsters. The player aims to become a trainer with the most powerful monsters. Only monsters with the highest attributes appear on the ___Golden Board___, the ranking board.

![phat-tran-bosses-page](https://user-images.githubusercontent.com/45039354/231328102-2208ef2f-0d1a-4281-bea9-6d741dd291bd.png)


# Installation instructions
The project consists of two parts: __backend__ and __frontend__. Make sure you are in the folder while doing the installation.

## Frontend
Firstly, move to the folder with this command:
```cd frontend```

Next, install all the dependencies:
```npm install``` if you do not install __yarn__. Otherwise, use ```yarn install```.

Finally, run this command to start the development server:
```npm run dev``` or ```yarn dev```

## ___Note___
Since I did not use environment variables for the frontend, you might want to change the API server's URL when fetching data. Please go to ```redux/services``` and edit all the files fetching data from the API server.

For example: ```redux/services/authentication.js```
```javascript
...
// Replace the baseUrl with your local API server.
// baseQuery: fetchBaseQuery({ baseUrl: "https://monster-land-backend.vercel.app/api/v1/" })
baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/" })
...
```

## Backend
Firstly, move to the folder with this command:
```cd backend```

Secondly, create a file named ```.env``` based on the ```.env.example``` file inside the folder. The ```.env``` file stores all the environment variables.

Next, install all the dependencies:
```npm install``` if you do not install pnpm. Otherwise, use ```pnpm install```.

Finally, run this command to start the development server:
```npm run dev``` or ```pnpm dev ```

# Technologies used
__Frontend__: React, Redux Toolkit, React Router, TailwindCSS, React Icons.

__Backend__: Nodejs, Expressjs, Restful API.

__Database__: MongoDB.

__Environment__: Vite, Pnpm.

__Deployment__: Vercel, Netlify.
# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
