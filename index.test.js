const {mountEls, clearDOM} = require('./mountUtilities')
const {getPoints, polygonString} = require('./index')

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

  describe('getPoints: get the final shape points, array format', () => {
    it('should return a shape ', () => {
      mountEls('manyboxes')

      const points = getPoints('.item')

      console.log('points', points)

      expect(points).toEqual(testPoints)
    })
  })

  describe('polygonString: get the final shape points, polygon string', () => {
    it('should return a shape ', () => {
      mountEls('manyboxes')

      const points = polygonString('.item')

      console.log('polygonString', points)

      expect(points).toEqual(testPolygonString)
    })
  })
})
