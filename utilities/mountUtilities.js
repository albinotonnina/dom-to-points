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

  document.body.children.forEach(el => {})
}

const mountEls = file => {
  const els = require(`../tests/integration/${file}`)

  els.forEach(el => {
    document.body.appendChild(createMockSpan(el))
  })
}

const createMockSpan = ({width, height, top, left, className}) => {
  const span = document.createElement('span')
  Object.assign(span.style, {
    width: width + 'px',
    height: height + 'px',
    top: top + 'pt',
    left: left + 'pt'
  })
  span.classList.add(className)
  // we have to mock this for jsdom.
  span.getBoundingClientRect = () => ({
    width,
    height,
    top: top,
    left: left,
    right: width,
    bottom: height
  })
  return span
}

module.exports = {mountDOM, mountEls, createMockSpan, clearDOM}
