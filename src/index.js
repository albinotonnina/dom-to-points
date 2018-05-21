const {getBoxes, mergeLine, clusterize} = require('./highlighter')

const goClockwise = (acc, item, index, array) => {
  const prevBox = array[index - 1]
  const yCoord = index === 0 ? item.top : prevBox.top + prevBox.height

  const topLine = [[item.left, yCoord], [item.left + item.width, yCoord]]
  const rightLine = [
    [item.left + item.width, yCoord + item.height],
    [item.left, yCoord + item.height]
  ]
  acc.push(...topLine, ...rightLine)

  return acc
}

const goAnticlock = (acc, item, index, array) => {
  const prevBox = array[index - 1]
  const yCoord = index === 0 ? item.top : prevBox.top + prevBox.height

  const leftLine = [[item.left, yCoord + item.height], [item.left, yCoord]]

  acc.push(...leftLine)

  return acc
}

const getPointsArray = query => {
  const boxes = getBoxes(query)
  const clockWiseCoords = boxes.reduce(goClockwise, [])
  const anticlockWiseCoords = boxes.reduceRight(goAnticlock, [])

  return clockWiseCoords.concat(anticlockWiseCoords)
}

const stringifier = fn => (...args) =>
  fn(...args)
    .map(point => point.join(','))
    .join(' ')

const getPolygonString = stringifier(getPointsArray)

module.exports = {getPointsArray, getPolygonString}
