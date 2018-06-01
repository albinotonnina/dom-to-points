const defaultLine = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  initial: true
}
const tolerance = 14

const getEls = query =>
  Array.isArray(query) ? query : [...document.querySelectorAll(query)]

const clusterize = elements =>
  elements.reduceRight((lines, el) => {
    const bbox = el.getBoundingClientRect()

    const cluster = lines.find(line =>
      line.find(
        item =>
          Math.abs(item.top + item.height - (bbox.top + bbox.height)) <=
          tolerance
      )
    )

    if (!cluster) {
      lines.push([bbox])
    } else {
      lines.splice(lines.indexOf(cluster), 1, [...cluster, bbox])
    }

    return lines
  }, [])

const mergeLine = line => {
  const fn = ({top, left, width, height, initial}, bbox) => {
    const {top: t, left: l, width: w, height: h} = bbox
    const dw = l + w
    const dh = t < 0 ? t - h : t + h

    const newTop = Math.floor(initial || t < top ? t : top)
    const newLeft = Math.floor(initial || l < left ? l : left)
    const newWidth = Math.floor(dw > width ? dw : width)
    const newHeight =
      t < 0
        ? Math.floor(dh < height ? t + h : height)
        : Math.floor(dh > height ? dh : height)

    return {
      top: newTop,
      left: newLeft,
      width: newWidth,
      height: newHeight,
      initial: false
    }
  }

  const dimensions = line.reduce(fn, defaultLine)

  return {
    ...dimensions,
    width: dimensions.width - dimensions.left,
    height: dimensions.height - dimensions.top
  }
}

const getBoxes = query =>
  clusterize(getEls(query))
    .map(cluster => mergeLine(cluster))
    .reverse()

module.exports = {getBoxes, mergeLine, clusterize}
