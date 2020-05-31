# Forkify App


> A JavaScript search recipe application taken from Food2Fork API. All code is built with Vanilla JS ES6 .

![Example screenshot](./src/img/readme/readme-preview.png)

![node-current](https://img.shields.io/badge/made%20with-javascript-f3db1b.svg?style=for-the-badge&labelColor=080804) &nbsp;![node-current](https://img.shields.io/badge/node%20version-13.14.0-8ccb4c.svg?style=for-the-badge&labelColor=080804) &nbsp;![node-current](https://img.shields.io/badge/uses-scss-cb649b.svg?style=for-the-badge&labelColor=080804) &nbsp;![node-current](https://img.shields.io/badge/markup-html5-eb6434.svg?style=for-the-badge&labelColor=080804) &nbsp;![node-current](https://img.shields.io/badge/bundled%20with-webpack%204-1d78c0.svg?style=for-the-badge&labelColor=080804)

## Table of contents

- [Forkify App](#forkify-app)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Forkify API Documentation](#forkify-api-documentation)
  - [Installation and Usage](#installation-and-usage)
    - [Dev Mode](#dev-mode)
    - [Prod Mode](#prod-mode)
    - [Live Demo](#live-demo)
  - [To-do list](#to-do-list)
  - [Status](#status)
  - [Contact](#contact)

## General info

The Forkify App allows users to search for recipes using the Food2Fork API. Users can view the recipe along with the cook time and also increase or decrease the amount of servings they need. At this point the user can favorite the recipe or even add it to their shopping list if they want to shop for more than one recipe. Favourite meals are stored in local storage so no database was required for this application.

## Technologies

- JavaScript
- HTML 5
- SCSS

## Forkify API Documentation

This is the test API dedicated to the Forkify app

- http://forkify-api.herokuapp.com/

## Installation and Usage

Prerequisites: [Node.js](https://nodejs.org/download/release/v13.14.0/) (13.14.0). As of latest version 14.3.0 some dependencies break at install.

To run this project:

- Clone this repo to your local machine using

```shell
$ git clone https://github.com/francislagares/forkify-app
```

- Switch into directory

```shell
$ cd forkify-app
```

- Install dependencies

```shell
$ yarn install
```

### Dev Mode

- Run server

```shell
$ yarn start
```

- Browser will open automatically at http://localhost:3000

### Prod Mode

- Make a build

```shell
$ yarn build
```

- Run Express Server

```shell
$ yarn serve
```

- Open http://localhost:3000 in your browser.

### Live Demo

You can see the application running
[here.](https://francislagares.github.io/forkify-app/)

## To-do list

Although this project has accomplished its main purpose, still needs a lot of improvements, and if time and work allow for it, I'll keep adding more features.

To-do list:

- Implement button to delete all shopping list items.
- Save shopping list data in localStorage.
- Improve ingredient parsing algorithm.
- Come up with an algorithm to calculate the amount of servings.
- Implement better error handling ( displaying errors in UI ).

## Status

Currently: _in progress_...

## Contact

Created by [@francislagares](https://www.linkedin.com/in/francislagares/) - feel free to contact me!
