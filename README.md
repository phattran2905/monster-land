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

Secondly, create a file named ```.env``` based on the ```.env-template``` file inside the folder. The ```.env``` file stores all the environment variables.

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
