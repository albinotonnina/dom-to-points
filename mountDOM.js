const jsdom = require('jsdom')

const clearDOM = () => {
  const body = document.body
  while (body.firstChild) {
    body.removeChild(body.firstChild)
  }
}

const createGlobals = () => {
  const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
  const win = doc.defaultView

  global.document = doc
  global.window = win

  Object.keys(window).forEach(key => {
    if (!(key in global)) {
      global[key] = window[key]
    }
  })
}

if (!global.document) createGlobals()

const mountDOM = htmlString => {
  if (!global.document) createGlobals()
  clearDOM()
  document.body.innerHTML = htmlString
}

module.exports = mountDOM
