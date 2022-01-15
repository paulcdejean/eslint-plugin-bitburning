'use strict'

const MESSAGE_ID = 'require-guards'
const messages = {
  [MESSAGE_ID]: 'In function {{ functionName }} {{ param }} is missing a default or guard statement.'
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  return {
    FunctionDeclaration: node => {
      for (const [paramIndex, param] of Object.entries(node.params)) {
        if (param.type === 'Identifier') {
          if (
            paramIndex in node.body.body &&
            node.body.body[paramIndex].type === 'IfStatement'
          ) {
            console.log(node.body.body[paramIndex])
            continue
          } else {
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
