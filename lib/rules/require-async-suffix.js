'use strict'

const MESSAGE_ID = 'require-async-suffix'
const messages = {
  [MESSAGE_ID]: 'Async function must end with async.'
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

  return {
    Identifier: node => {
      if (
        !excludedNamesOption.includes(node.name) &&
        node.parent.type === 'FunctionDeclaration' &&
        node.parent.async &&
        node.start === node.parent.id.start &&
        !/Async$/.test(node.parent.id.name)
      ) {
        context.report({
          node,
          messageId: MESSAGE_ID
        })
      }
    }
  }
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create,
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
    messages
  }
}
