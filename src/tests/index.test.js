const {mountEls, clearDOM} = require('../utilities/mountUtilities')
const {getPointsArray, getPolygonString} = require('../index')

const testPoints = [
  [0, 0],
  [300, 0],
  [300, 100],
  [0, 100],
  [0, 100],
  [200, 100],
  [200, 200],
  [0, 200],
  [0, 200],
  [200, 200],
  [200, 300],
  [0, 300],
  [0, 300],
  [300, 300],
  [300, 400],
  [0, 400],
  [0, 400],
  [0, 300],
  [0, 300],
  [0, 200],
  [0, 200],
  [0, 100],
  [0, 100],
  [0, 0]
]

const testPolygonString =
  '0,0 300,0 300,100 0,100 0,100 200,100 200,200 0,200 0,200 200,200 200,300 0,300 0,300 300,300 300,400 0,400 0,400 0,300 0,300 0,200 0,200 0,100 0,100 0,0'

describe('index', () => {
  beforeEach(clearDOM)

  describe('getPointsArray: get the final shape points, array format', () => {
    it('should return a shape passing a query string', () => {
      mountEls('manyboxes')

      const points = getPointsArray('.item')

      // console.log('points', points)

      expect(points).toEqual(testPoints)
    })

    it('should return a shape passing elements', () => {
      mountEls('manyboxes')

      const points = getPointsArray([...document.querySelectorAll('.item')])

      // console.log('points', points)

      expect(points).toEqual(testPoints)
    })
  })

  describe('getPolygonString: get the final shape points, polygon string', () => {
    it('should return a shape passing a query string', () => {
      mountEls('manyboxes')

      const points = getPolygonString('.item')

      // console.log('polygonString', points)

      expect(points).toEqual(testPolygonString)
    })

    it('should return a shape passing elements', () => {
      mountEls('manyboxes')

      const points = getPolygonString([...document.querySelectorAll('.item')])

      // console.log('polygonString', points)

      expect(points).toEqual(testPolygonString)
    })
  })
})
