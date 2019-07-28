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

To run the filings search API locally, run:

```shell
> yarn run run:api
```

Any changes to the code will be detected and the project will automatically recompile.

### Web Client

To run the web client locally, run:

```shell
> yarn run serve:web
```
