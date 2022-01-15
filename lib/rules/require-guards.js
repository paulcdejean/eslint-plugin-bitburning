'use strict'

const MESSAGE_ID = 'require-guards'
const messages = {
  [MESSAGE_ID]: 'In function {{ functionName }} parameter {{ param }} is missing a guard statement.'
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  return {
    FunctionDeclaration: node => {
      for (const param of node.params) {
        context.report({
          node: param,
          messageId: MESSAGE_ID,
          data: {
            functionName: node.id.name,
            param: param.name
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
      description: 'Require functions to start with guard statements.'
    },
    fixable: 'code',
    schema: [],
    messages: messages
  }
}
