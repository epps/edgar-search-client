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

## Approach and Learnings

Prior to tackling this exercise, I had never heard of the SEC's EDGAR system, so the first order of business was familiarizing myself with the constraints it imposed.

#### Understanding the Problem

A note on paying attention to details while understanding a problem: even though the description provided an example URL with the ticker symbol in the query string:

> e.g. `https://www.sec.gov/cgi-bin/browse-edgar?CIK=AAPL&owner=exclude&action=getcompany`

After poking around EDGAR and noticing that the URL normally used Central Index Keys (CIKs) to specify the company, I lost track of the example URL and began looking into creating a stable association between:

1. Company name as listed in SEC filings
2. CIK
3. Ticker symbol
4. Variants of company name

Given this is an interesting problem and not one that seems to have been solved by any open source projects, I began thinking about how to seed a database with this information so as to guarantee easy queryability of companies' filings. After exploring this for a bit, I returned to the example and realized I had "baked in" a problem that wasn't originally intended, nor supported by the 15-hour scope.

#### Web Scraping

Given the SEC's site is completely rendered on the server and all searches return complete HTML, it was clear from the outset that scraping the HTML for data would be the only option.

Previously, I didn't have any experience with web scraping, so this constraint was definitely a welcomed opportunity to learn something new. I chose [Cheerio](https://cheerio.js.org/) because it seemed to be standard in the JavaScript community and, based on a skim of the documentation, the syntax/approach to things was familiar.

Despite how simple it was to begin fetching the HTML for search results, getting at the data in the way I wanted to and/or thought I should be able to was trickier than I'd expected. My initial thought was to locate the results table and reduce the list of '<tr>'s into a list of objects that contained:

1. The filing type
2. The path to the filing details page
3. The filing description
4. The filing date

However, after looking at the return values and noticing the number of empty strings, I thought it would be better to be more targeted with the HTML to avoid writing conditional logic just to handle cruft.

#### Project Organization

Initially, I organized the project the way I had done for past side projects that required both a web client and an API. But in past examples, I'd used the API to serve my web client, and after thinking about this in the context of recent articles I've read on the monorepo pattern, I decided to reorganize things to make a clean separation between web client and API. This refactor was simple enough; however, with more time I would invest into research:

1. [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) (Instead I ended up passing the `--cwd` flag to yarn to execute scripts in the target project directory)
2. [Lerna](https://github.com/lerna/lerna)
3. Better tooling around the monorepo pattern

The upside to the refactor is two independent projects/packages that can evolve (in this case, semi-) independently; the downside in the complication the monorepo adds to deployment.

#### Deployment

After reaching feature complete with commit [`a986f01`](https://github.com/epps/edgar-search-client/commit/a986f01a427ca7b12bd40657596188e4cb50e7da) (i.e. all functional behavior had been implemented without much polish or refinement just to ensure the exercise could be submitted with all requirements met), I spent a good deal of time looking into how to handle this kind of deployment. I've deployed several projects and coding challenges to Heroku in the past; however, never with the monorepo pattern. Given this problem was interesting and valuable enough to me, I spent several of my remaining hours looking into.

Unfortunately, I was able to get the [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static) to work with my web client. After reaching my limit of what I'd time-boxed for this piece, I thought of deploying the static component on GitHub pages and the API to Heroku, but this felt like defeat. I will definitely continue looking into what deployment for a project of this organization looks like in practice as I'm sure it'll come in handy for future projects.

#### Overall Impression

Overall, I felt like the nature and scope of the problem were reasonable and interesting. I don't often set up repos from scratch in my day job, so building up a bit of muscle memory for this skill was valuable. In the same vein, thinking about the monorepo pattern and deployment for this pattern were also interesting takeaways.

Other weak points that I knew ahead of time that I would encounter were all front-end related. This past year and half have been largely filled with back-end work, which has left my front-end muscle memory severely atrophied. I will definitely invest more time going forward in React and other front-end specific skill sets to ensure I can confidently tackle full-stack work.
