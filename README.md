# eslint-plugin-bitburning

Various eslint rules I wrote to reduce bugs in my bitburner scripts.

Current TODOS:

- [x] Require async functions (excluding main) to end with Async
- x ] Require await before NS functions: hack, grow, weaken, sleep, prompt, wget, scp, write, writePort
- [ ] Require await before async functions (functions ending with Async)
- [ ] Require guards
- [ ] Require constants in constants.js to use SCREAMING_SNAKE_CASE
- [ ] Fix things automatically that can be fixed automatically.


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

* Fill in provided rules here


