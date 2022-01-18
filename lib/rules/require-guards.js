'use strict'

const MESSAGE_ID = 'require-guards'
const messages = {
  [MESSAGE_ID]: 'In function {{ functionName }} {{ param }} is missing a default or guard statement.'
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  return {
    FunctionDeclaration: node => {
      if (node.id.name === 'main') {
        return
      }

      for (const [paramIndex, param] of Object.entries(node.params)) {
        const guardSuggestion = `
  if (${param.name} === undefined) {
    throw new GuardError('${param.name} is required')
  }
        `.trim() + '\n'

        if (param.type === 'Identifier') {
          if (
            paramIndex in node.body.body &&
            node.body.body[paramIndex].type === 'IfStatement' &&
            node.body.body[paramIndex].test.type === 'BinaryExpression' &&
            node.body.body[paramIndex].test.left.type === 'Identifier' &&
            node.body.body[paramIndex].test.left.name === param.name &&
            node.body.body[paramIndex].test.right.type === 'Identifier' &&
            node.body.body[paramIndex].test.right.name === 'undefined'
          ) {
            continue
          } else {
            context.report({
              node: param,
              messageId: MESSAGE_ID,
              data: {
                functionName: node.id.name,
                param: param.name
              },
              fix: fixer => {
                if (paramIndex in node.body.body) {
                  return fixer.insertTextBeforeRange([node.body.body[paramIndex].start, node.body.body[paramIndex].end], guardSuggestion)
                } else {
                  return fixer.insertTextAfterRange([node.body.start + 1, node.body.end - 1], guardSuggestion)
                }
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
