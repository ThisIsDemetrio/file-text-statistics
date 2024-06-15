# file-statistics

Small application in NodeJS that, given a text file (from a path or from an url), prints some statistics about the text file, such as number of words, number of whitespaces and the words that are repeated more than ten times.

## How to run

Ensure to have _NodeJS_ v20 or above. If you use [nvm](https://github.com/nvm-sh/nvm), you can launch the following command:

```sh
nvm use
```

to refer to the v20.11.4 or NodeJS.

Install the dependencies first:

```sh
npm ci
```

The application is written in Typescript, so it is necessary to build it before:

```sh
npm run build
```

Then you can run the application, including the path with the `--path` argument:

```sh
npm run start -- --path <path-to-the-text-file>
```

Path can be either a file path or an URL. The application automatically recognize what it is, and fetch the content correctly. Here's are valid examples:

```sh
npm run start -- --path ./tests/docs/lorem-ipsum.txt
# Or
npm run start -- --path https://filesamples.com/samples/document/txt/sample1.txt
```

## How to launch tests

Unit tests are located in the `./tests` folder and can be launched with:

```sh
npm run test
```

Remember to ensure that existing tests are passing in case of any modification to the code

## Linting

This code follows the [Airbnb style guide](https://github.com/airbnb/javascript) and uses [ESLint](https://eslint.org/) to check the code. In case you make any modification, remember to lint the code with the following command:

```sh
npm run lint
```
