# eslint-plugin-guards

Enforces guard statements at the beginning of functions.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-guards`:

```sh
npm install eslint-plugin-guards --save-dev
```

## Usage

Add `guards` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "guards"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "guards/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


