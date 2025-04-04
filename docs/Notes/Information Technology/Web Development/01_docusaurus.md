---
id: html-docusaurus
title: Docusaurus
---

# Docusaurus Setup and Deployment Guide

## Useful Links

- [Create & Deploy Your Website Quickly - Docusaurus & GitHub Pages](https://www.youtube.com/watch?v=9iVNf0T09dE)

## Steps

### 1. Create a GitHub Repository

1. Create a new public repository on GitHub.
2. This repository will be used for hosting your Docusaurus website via GitHub Pages.

### 2. Set Up Your Project

#### Create the Docusaurus Project

Run the following command in PowerShell to create your Docusaurus project:

```cmd
npx create-docusaurus@latest MindMash classic
```

*Note: Replace MindMash with the name of your GitHub repository.*

#### Install Project Dependencies

After the project is created, navigate to the project directory:

```cmd
cd 'C:\Users\danyp\Documents\Programmazione\Github Repos\MindMash\'
```

Then, install the project dependencies by running:

```cmd
npm i
```

This command installs all the required packages listed in the `package.json` file. It ensures that your development environment is set up with all the necessary dependencies to run and build your Docusaurus site.

#### Update docusaurus.config.js

1. Open the `docusaurus.config.js` file in your project directory.
Update the `url` field from its default value (`https://your-docusaurus-site.example.com`) to `https://github.com`.

2. Modify the baseUrl to match the name of your repository, e.g., `'/MindMash/'`.

3. Set the organizationName to your GitHub username, e.g., `'DanielePassabi'`.

4. Add a new key `deploymentBranch` and set it to `'gh-pages'`. This configures the branch where your site will be deployed.

### 3. Deploy the Website

To deploy your site, run the following commands in PowerShell:

```cmd
$env:GIT_USER="DanielePassabi"
yarn deploy
```

:::tip

Note: If Yarn is not installed, you can install it globally using:

```cmd
npm install --global yarn
```

:::

This command will build your site and push the static files to the `gh-pages` branch on GitHub, making it available via GitHub Pages.

### 4. Set Up GitHub Actions for Continuous Deployment

#### Add the GitHub Workflows Directory

1. In your project, create the `.github/workflows/` directory.
2. Inside the workflows folder, create a file named `deploy.yml`.

#### Configure the Workflow File

Copy the following workflow configuration into `deploy.yml`:

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build Docusaurus
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: yarn

      - name: Install dependencies
        run: yarn install --frozen-lockfile
      - name: Build website
        run: yarn build

      - name: Upload Build Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    name: Deploy to GitHub Pages
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Configure GitHub Environment Settings

In your GitHub repository, navigate to `Settings` > `Environments`.
Under `Deployment branches and tags`, add `main` to allow deployments from the main branch.

### 5. Local Hosting

In order to run Docusaurus locally, you just need to launch the following command:

```cmd
yarn start
```

This will open your project in `http://localhost:3000/MindMash/`.
