'use strict'

const MESSAGE_ID = 'require-async-suffix'
const messages = {
  [MESSAGE_ID]: 'Async function must end with async.'
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  return {
    Identifier: node => {
      if (node.parent.type === 'FunctionDeclaration') {
        if (node.parent.async) {
          if (node.start === node.parent.id.start) {
            if (!/Async$/.test(node.parent.id.name)) {
              context.report({
                node,
                messageId: MESSAGE_ID
              })
            }
          }
        }
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
    schema: [],
    messages
  }
}
