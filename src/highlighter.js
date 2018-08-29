const defaultLine = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  initial: true
}

const minClusterHeight = 2

const getEls = query =>
  Array.isArray(query) ? query : [...document.querySelectorAll(query)]

const getRects = el => {
  const {top, height, left, width} = el.getBoundingClientRect()
  const bbox = {top, height, left, width}
  Object.keys(bbox).forEach(key => (bbox[key] = Math.floor(bbox[key])))

  return bbox
}

const clusterizeBboxes = (lines, bbox) => {
  const cluster = lines.find(line =>
    line.some(item => bbox.top + bbox.height >= item.top)
  )

  if (cluster) {
    // insert in an existing line
    lines.splice(lines.indexOf(cluster), 1, [...cluster, bbox])
  } else {
    // add new line
    lines.push([bbox])
  }

  return lines
}

// const mergeHorizontally = (acc, item) => {
//   const prevInsertedLine = acc.find(
//     prev => prev.top + prev.height === item.top + item.height
//   )

//   if (prevInsertedLine) {
//     const {left, width} = item
//     const {left: l, width: w} = prevInsertedLine
//     const dw = l + w

//     const newLeft = Math.min(l, left)
//     const newWidth = Math.max(dw, width)

//     acc.splice(acc.indexOf(prevInsertedLine), 1, {
//       ...prevInsertedLine,
//       left: newLeft,
//       width: newWidth
//     })
//   } else {
//     acc.push(item)
//   }

//   return acc
// }

const filterOneLine = cluster =>
  cluster.reduce((totalHeight, bbox) => totalHeight + bbox.height, 0) >
  minClusterHeight

const clusterize = elements => {
  const bboxes = elements.map(getRects)

  const clusteriZedBoxes = bboxes
    .sort((a, b) => a.top > b.top)
    // .reduce(mergeHorizontally, [])
    .reduceRight(clusterizeBboxes, [])
    .filter(filterOneLine)

  return clusteriZedBoxes
}

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
