#!/bin/sh

echo "----- Install dependencies -----"
yarn
echo "----- Linter -----"
yarn test --ci

