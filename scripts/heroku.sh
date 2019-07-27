#!/bin/sh -e

usage() {
  echo "OVERVIEW: Build apps according to BUILD_ENV value. Meant to be used for Heroku deployment"
  exit
}

if [ "$1" = '-h' ] || [ "$1" = '--help' ]; then
  usage
fi

(
  PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

  cd $PROJECT_ROOT

  if [ "$BUILD_ENV" = "edgar-search-web-client" ]; then
    yarn run build:web
  elif [ "$BUILD_ENV" = "edgar-search-api" ]; then
    yarn run build:api
  else
    echo "Error: no build config for EDGAR_SEARCH_BUILD_ENV value '$EDGAR_SEARCH_BUILD_ENV'"
    exit 1
  fi
)