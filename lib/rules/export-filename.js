'use strict'

const path = require('path')

const MESSAGE_ID = 'export-filename'
const messages = {
  [MESSAGE_ID]: 'File {{ fileName }} must export a function or class named {{ functionName }}.'
}

/** @param {import('eslint').Rule.RuleContext} context */
function create (context) {
  const fullFilePath = context.getFilename()
  const fileName = path.parse(fullFilePath).base
  const exportName = path.parse(fullFilePath).name
  const FIRST_LETTER_LOC = {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 1
    }
  }
  const WHITELISTED_FILENAMES = [
    'lib.js',
    'constants.js'
  ]

  const desiredFunction = `export function ${exportName} () {
  }`

  return {
    Program: node => {
      if (WHITELISTED_FILENAMES.includes(fileName)) {
        return
      }

      let foundFilenameExport = false

      for (const thing of node.body) {
        if (
          thing.type === 'ExportNamedDeclaration' &&
          thing.declaration &&
          thing.declaration.type === 'ClassDeclaration' &&
          thing.declaration.id.name === exportName
        ) {
          foundFilenameExport = true
        }
        if (
          thing.type === 'ExportNamedDeclaration' &&
          thing.declaration &&
          thing.declaration.type === 'FunctionDeclaration' &&
          thing.declaration.id.name === exportName
        ) {
          foundFilenameExport = true
        }
      }

      if (!foundFilenameExport) {
        context.report({
          node: node,
          messageId: MESSAGE_ID,
          data: {
            fileName: fileName,
            functionName: exportName
          },
          loc: FIRST_LETTER_LOC,
          fix: fixer => {
            return fixer.insertTextAfterRange([node.start, node.end], desiredFunction)
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
