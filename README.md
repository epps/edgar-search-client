# EDGAR Search

## Description

EDGAR Search is a lightweight wrapper around the SEC's Electronic Data Gathering, Analysis, and Retrieval (EDGAR) system by way of a web client and a filings search API. Users can search for companies' filings using [ticker symbols](https://en.wikipedia.org/wiki/Ticker_symbol).

## Organization

The codes is organized according to the [monorepo](https://en.wikipedia.org/wiki/Monorepo) pattern. The root-level `package.json` contains scripts to build, run, etc. the projects.

    ├── packages
    │   ├── api
    │   └── web-client
    ├── package.json
    ├── .prettierrc
    ├── .gitignore
    └── README.md

## Installation

To install dependencies for all packages, run:

```shell
> yarn run install:all
```

## Running

### API

To run the filings search API locally, run

```shell
> yarn run watch:api # executes the build process in watch mode
> yarn run serve:api # start a server listing on http://localhost:3000
```

Any changes to the code will be detected and the project will automatically recompile

### Web Client

Given the web client isn't being served by the API project, running both projects in parallel will run up against the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) restriction. There are several ways around this issue in local development, but for Chrome users, the simplest approach is to launch an instance of the browser from the command line using the following command:

On OSX:

```shell
> /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome —disable-web-security
```

Once Chrome has launch, run

```shell
> yarn run serve:web
```
