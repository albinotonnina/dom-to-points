const {getBoxes} = require('./highlighter')

const goClockwise = (acc, box, i, arr) => {
  const {
    top: tp,
    left: lp,
    right: rp = box.left + box.width,
    bottom: bp = box.top + box.height
  } = box

  const tLine = [[lp, tp], [rp, tp]]
  i === 0 && acc.push(...tLine)

  const rLine = [[rp, tp], [rp, bp]]
  acc.push(...rLine)

  return acc
}

const goAnticlock = (acc, box, index, array) => {
  const prevBox = array[index - 1]

  const {top: tp, left: lp, bottom: bp = tp + box.height} = box

  const leftLine = [[lp, bp], [lp, tp]]

  acc.push(...leftLine)

  return acc
}

const getPointsArray = query => {
  const boxes = getBoxes(query)
  const clockWiseCoords = boxes.reduce(goClockwise, [])
  const anticlockWiseCoords = boxes.reduceRight(goAnticlock, [])

  return clockWiseCoords.concat(anticlockWiseCoords)
}

const getPointsArrayFrom = (query, parentEl) => {
  const points = getPointsArray(query)
  const parentPos = parentEl.getBoundingClientRect()

  return points.map(pointGroup => [
    Math.floor(pointGroup[0] - parentPos.left),
    Math.floor(pointGroup[1] - parentPos.top)
  ])
}

const stringifier = fn => (...args) =>
  fn(...args)
    .map(point => point.join(','))
    .join(' ')

const getPolygonString = stringifier(getPointsArray)

const getPolygonStringFrom = stringifier(getPointsArrayFrom)

module.exports = {
  getPointsArray,
  getPointsArrayFrom,
  getPolygonString,
  getPolygonStringFrom
}
