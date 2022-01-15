'use strict'

const MESSAGE_ID = 'require-guards'
const messages = {
  [MESSAGE_ID]: 'Missing guard.'
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  return {
    FunctionDeclaration: node => {
      if (
        true
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
      description: 'Require functions to start with guard statements.'
    },
    fixable: 'code',
    schema: [],
    messages
  }
}
