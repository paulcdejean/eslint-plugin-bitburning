'use strict'

const MESSAGE_ID = 'await-async-functions'
const messages = {
  [MESSAGE_ID]: 'Async function {{ nsfunc }} must be called with await.'
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  const ASYNC_SUFFIX = 'Async'
  const asyncRe = new RegExp(ASYNC_SUFFIX + '$')

  return {
    CallExpression: node => {
      // Functions called directly.
      if (
        node.parent.type !== 'AwaitExpression' &&
        node.callee.type === 'Identifier' &&
        asyncRe.test(node.callee.name)
      ) {
        context.report({
          node,
          messageId: MESSAGE_ID,
          data: {
            nsfunc: node.callee.name
          }
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
      description: 'Require awaiting function that have names that end in Async.'
    },
    fixable: 'code',
    schema: [],
    messages
  }
}
