'use strict'

const MESSAGE_ID = 'require-async-suffix'
const messages = {
  [MESSAGE_ID]: 'Async function {{ fnname }} must end with Async.'
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  const option = context.options[0]
  let excludedNamesOption = []
  let excludeMainOption = true

  if (typeof option === 'object') {
    if (Object.prototype.hasOwnProperty.call(option, 'excludedNames')) {
      excludedNamesOption = option.excludedNames
    }
    if (Object.prototype.hasOwnProperty.call(option, 'excludedNames')) {
      excludeMainOption = option.excludeMain
    }
  }

  if (excludeMainOption) {
    excludedNamesOption.push('main')
  }

  const ASYNC_SUFFIX = 'Async'
  const asyncRe = new RegExp(ASYNC_SUFFIX + '$')

  return {
    FunctionDeclaration: node => {
      if (
        node.async &&
        !excludedNamesOption.includes(node.id.name) &&
        !asyncRe.test(node.id.name)
      ) {
        context.report({
          node: node.id,
          messageId: MESSAGE_ID,
          data: {
            fnname: node.id.name
          }
        })
      }
    }
  }
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create: create,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce async functions ending with Async.'
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          excludedNames: {
            type: 'array',
            uniqueItems: true,
            items: {
              type: 'string'
            }
          },
          excludeMain: {
            type: 'bool',
            default: 'true'
          }
        },
        additionalProperties: false
      }
    ],
    messages: messages
  }
}
