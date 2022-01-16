'use strict'

const path = require('path')

const MESSAGE_ID = 'export-filename'
const messages = {
  [MESSAGE_ID]: 'File {{ fileName }} must export a function named {{ functionName }}.'
}

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
  const fullFilePath = context.getFilename()
  const fileName = path.parse(fullFilePath).base
  const functionName = path.parse(fullFilePath).name

  return {
    Program: node => {
      let foundFilenameExport = false

      for (const thing of node.body) {
        if (
          thing.type === 'ExportNamedDeclaration'
        ) {
          // foundFilenameExport = true
        }
      }

      if (!foundFilenameExport) {
        context.report({
          node: node,
          messageId: MESSAGE_ID,
          data: {
            fileName: fileName,
            functionName: functionName
          },
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
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
      description: 'Require that most files export a function with the same name.'
    },
    fixable: 'code',
    schema: [],
    messages: messages
  }
}
