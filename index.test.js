const mountDOM = require('./mountDOM')

describe('A sample test', function() {
  it('works as expected', function() {
    mountDOM(`
        <div id="foo">
          <h1>Just HTML</h1>
        </div>
      `)

    const myDiv = document.getElementById('foo')

    myDiv.setAttribute('data-foo-bar', 'bazd')

    expect(myDiv.dataset.fooBar).toEqual('bazd')
  })
})
