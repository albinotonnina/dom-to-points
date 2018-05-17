function createMockSpan({width, height, top, left, className}) {
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

module.exports = createMockSpan
