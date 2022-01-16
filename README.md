# eslint-plugin-bitburning

Various eslint rules I wrote to reduce bugs in my bitburner scripts.

Current TODOS:

- [x] Require async functions (excluding main) to end with Async
- [x] Require await before NS functions: hack, grow, weaken, sleep, prompt, wget, scp, write, writePort
- [x] Require await before async functions (functions ending with Async)
- [x] Require guards
- [x] Require that js files export a function with their filename
- [x] Automatically fix js files that are missing a function with their filename
- [x] Automatically add guard statements
- [ ] Require ns argument is documented with type NS and description NS
- [ ] Automatically import undefined errors from errors
- [ ] Require constants in constants.js to use SCREAMING_SNAKE_CASE

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-bitburning`:

```sh
npm install eslint-plugin-bitburning --save-dev
```

## Usage

Add `bitburning` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "bitburning"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "bitburning/rule-name": 2
    }
}
```

## Supported Rules

### await-async-functions

Requires that functions ending in Async are awaited. I know there's a lot more you can do with promises besides awaiting them, but in the context of bitburner it's rare.

### await-ns-functions

Requires that ns functions that return promises are awaited. Since the game makes that mandatory.

### export-filename

Requires that a file define a function or class that matches its filename.

### require-async-suffix

Requires that async functions end with Async. This helps prevent dangling promises as we're not using typescript.

### require-guards

Requires that all arguments without default values are checked for undefined. This helps prevent errors when you call functions with the wrong number of arguments.
