'use strict'

const MESSAGE_ID = 'await-ns-functions'
const messages = {
  [MESSAGE_ID]: 'Netscript function {{ nsfunc }} must be called with await.'
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  const NS_PREFIX = 'ns'

  // Uses the list here: https://bitburner.readthedocs.io/en/latest/netscript/netscriptjs.html
  const FUNCTIONS_REQUIRING_AWAIT = [
    'hack',
    'grow',
    'weaken',
    'sleep',
    'prompt',
    'wget',
    'scp',
    'write',
    'writePort'
  ]

  return {
    CallExpression: node => {
      if (
        node.parent.type !== 'AwaitExpression' &&
        node.callee.type === 'MemberExpression' &&
        node.callee.object.type === 'Identifier' &&
        node.callee.object.name === NS_PREFIX &&
        node.callee.property.type === 'Identifier' &&
        FUNCTIONS_REQUIRING_AWAIT.includes(node.callee.property.name)
      ) {
        context.report({
          node,
          messageId: MESSAGE_ID,
          data: {
            nsfunc: node.callee.property.name
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
      description: 'Require awaiting ns functions that require await.'
    },
    fixable: 'code',
    schema: [],
    messages
  }
}
