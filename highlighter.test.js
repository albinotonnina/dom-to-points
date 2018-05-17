const {mountEls, clearDOM} = require('./mountUtilities')
const {getBoxes, mergeLine, clusterize} = require('./highlighter')

describe('Highlighter', () => {
  beforeEach(clearDOM)

  describe('clusterize: merge boxes in multiple lines - ', () => {
    it('should merge together all the boxes in two lines ', () => {
      mountEls('twolines')

      expect(clusterize('.item')).toHaveLength(2)
    })

    it('should merge together all the boxes in three lines ', () => {
      mountEls('threelines')

      expect(clusterize('.item')).toHaveLength(3)
    })

    it('should merge together many boxes in many lines ', () => {
      mountEls('manyboxes')

      expect(clusterize('.item')).toHaveLength(4)
    })
  })

  describe('mergeLine: merge boxes in one line', () => {
    it('should merge together all the boxes in one line ', () => {
      mountEls('oneline')

      const line = clusterize('.item')

      expect(mergeLine(line[0])).toMatchObject({
        left: expect.any(Number),
        top: expect.any(Number),
        width: expect.any(Number),
        height: expect.any(Number)
      })
    })
  })

  describe('getBoxes: merge boxes in many line', () => {
    it('should merge together all the boxes in many line ', () => {
      mountEls('manyboxes')

      const output = getBoxes('.item')

      expect(output).toHaveLength(4)
    })
  })
})
