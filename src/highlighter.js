const defaultLine = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  initial: true
}

const tolerance = 4

const clusterize = query =>
  [...document.querySelectorAll(query)].reduceRight((lines, el, index) => {
    const bbox = el.getBoundingClientRect()

    const item = {
      bbox,
      el
    }

    const cluster = lines.find(line =>
      line.find(item => Math.abs(item.bbox.top - bbox.top) <= tolerance)
    )

    if (!cluster) {
      lines.push([item])
    } else {
      lines.splice(lines.indexOf(cluster), 1, [...cluster, item])
    }

    return lines
  }, [])

const mergeLine = line => {
  const fn = ({top, left, width, height, initial}, item) => {
    const {top: t, left: l, width: w, height: h} = item.bbox
    const dw = l + w
    const dh = t + h

    return {
      top: initial || t < top ? t : top,
      left: initial || l < left ? l : left,
      width: dw > width ? dw : width,
      height: dh > height ? dh : height,
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
  clusterize(query)
    .map(cluster => mergeLine(cluster))
    .reverse()

module.exports = {getBoxes, mergeLine, clusterize}
