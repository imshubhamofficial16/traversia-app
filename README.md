# Traversia App

## Description

Traversia App is a web application built with Node.js, Express, and MongoDB

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Installation

1. Clone the repository:
    ```sh
    git@github.com:imshubhamofficial16/traversia-app.git
    cd traversia-app
    ```

2. Install the required npm packages:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory of the project and add the following environment variables:
    ```plaintext
    PORT=4000
    MONGO_DB_URL=mongodb+srv://username:<password>@url/test
    JWT_SECRET=your-secret
    ```

### Running the Application

To start the application, run the following command:
```sh
npm start
