'use strict';

const MESSAGE_ID = 'require-guards';
const messages = {
	[MESSAGE_ID]: 'Function must end with async.',
};


/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  return {
    FunctionDeclaration(node) {
      if (node.async && !/Async$/.test(node.id.name)) {
        context.report({
          node,
          messageId: MESSAGE_ID,
        });
      }
    }
  }
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Enforce async functions ending with Async.',
		},
		fixable: 'code',
    schema: [],
		messages,
	},
};