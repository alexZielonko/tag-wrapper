import tagWrapper from '../src/index'

describe('tagWrapper', () => {
  const tags = ['<em>', '</em>']
  const str = 'The quick brown fox jumps over the lazy dog'

  it('Returns the original string if no tags passed', () => {
    const actual = tagWrapper([], 'fox', str)
    const expected = str

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Returns the original string if the query is not found', () => {
    const actual = tagWrapper(tags, 'canned beef', str)
    const expected = str

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Returns the query wrapped in the tags if found', () => {
    const actual = tagWrapper(tags, 'fox', str)
    const expected = 'The quick brown <em>fox</em> jumps over the lazy dog'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Returns the query wrapped in the tags regardless of query case', () => {
    const actual = tagWrapper(tags, 'FoX', str)
    const expected = 'The quick brown <em>fox</em> jumps over the lazy dog'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Returns the query wrapped in tags regardless of str case', () => {
    const actual = tagWrapper(tags, 'fOx', str.toUpperCase())
    const expected = 'THE QUICK BROWN <em>FOX</em> JUMPS OVER THE LAZY DOG'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps the query within an existing word in the str', () => {
    const actual = tagWrapper(tags, 'um', str)
    const expected = 'The quick brown fox j<em>um</em>ps over the lazy dog'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Hanldes multi word query matching', () => {
    const actual = tagWrapper(tags, 'quick brown fox', str)
    const expected = 'The <em>quick brown fox</em> jumps over the lazy dog'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps all query matches within a str', () => {
    const str = 'quick brown fox quick brown fox'
    const actual = tagWrapper(tags, 'quick brown', str)
    const expected = '<em>quick brown</em> fox <em>quick brown</em> fox'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps all query matches within a str while preserving str match case', () => {
    const str = 'quick brown fox QUICK BROWN FOX quick BROWN fox'
    const actual = tagWrapper(tags, 'quick brown', str)
    const expected =
      '<em>quick brown</em> fox <em>QUICK BROWN</em> FOX <em>quick BROWN</em> fox'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing escapable characters', () => {
    const str = 'five% nine('
    const actual = tagWrapper(tags, 'nine(', str)
    const expected = 'five% <em>nine(</em>'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "`"', () => {
    const str = 'bar `foo bar'
    const actual = tagWrapper(tags, '`foo', str)
    const expected = 'bar <em>`foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "~"', () => {
    const str = 'bar ~foo bar'
    const actual = tagWrapper(tags, '~foo', str)
    const expected = 'bar <em>~foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "!"', () => {
    const str = 'bar !foo bar'
    const actual = tagWrapper(tags, '!foo', str)
    const expected = 'bar <em>!foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "@"', () => {
    const str = 'bar @foo bar'
    const actual = tagWrapper(tags, '@foo', str)
    const expected = 'bar <em>@foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "#"', () => {
    const str = 'bar #foo bar'
    const actual = tagWrapper(tags, '#foo', str)
    const expected = 'bar <em>#foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "$"', () => {
    const str = 'bar $foo bar'
    const actual = tagWrapper(tags, '$foo', str)
    const expected = 'bar <em>$foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "%"', () => {
    const str = 'bar %foo bar'
    const actual = tagWrapper(tags, '%foo', str)
    const expected = 'bar <em>%foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "^"', () => {
    const str = 'bar ^foo bar'
    const actual = tagWrapper(tags, '^foo', str)
    const expected = 'bar <em>^foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "&"', () => {
    const str = 'bar &foo bar'
    const actual = tagWrapper(tags, '&foo', str)
    const expected = 'bar <em>&foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "*"', () => {
    const str = 'bar *foo bar'
    const actual = tagWrapper(tags, '*foo', str)
    const expected = 'bar <em>*foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "("', () => {
    const str = 'bar (foo) bar'
    const actual = tagWrapper(tags, '(foo', str)
    const expected = 'bar <em>(foo</em>) bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing ")"', () => {
    const str = 'bar (foo) bar'
    const actual = tagWrapper(tags, 'foo)', str)
    const expected = 'bar (<em>foo)</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "_"', () => {
    const str = 'bar _foo bar'
    const actual = tagWrapper(tags, '_foo', str)
    const expected = 'bar <em>_foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "-"', () => {
    const str = 'bar -foo bar'
    const actual = tagWrapper(tags, '-foo', str)
    const expected = 'bar <em>-foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "+"', () => {
    const str = 'bar +foo bar'
    const actual = tagWrapper(tags, '+foo', str)
    const expected = 'bar <em>+foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "="', () => {
    const str = 'bar =foo bar'
    const actual = tagWrapper(tags, '=foo', str)
    const expected = 'bar <em>=foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "["', () => {
    const str = 'bar [foo bar'
    const actual = tagWrapper(tags, '[foo', str)
    const expected = 'bar <em>[foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "]"', () => {
    const str = 'bar ]foo bar'
    const actual = tagWrapper(tags, ']foo', str)
    const expected = 'bar <em>]foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "{"', () => {
    const str = 'bar {foo} bar'
    const actual = tagWrapper(tags, '{foo', str)
    const expected = 'bar <em>{foo</em>} bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "}"', () => {
    const str = 'bar {foo} bar'
    const actual = tagWrapper(tags, 'foo}', str)
    const expected = 'bar {<em>foo}</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "?"', () => {
    const str = 'bar ?foo bar'
    const actual = tagWrapper(tags, '?foo', str)
    const expected = 'bar <em>?foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "|"', () => {
    const str = 'bar |foo bar'
    const actual = tagWrapper(tags, '|foo', str)
    const expected = 'bar <em>|foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "\'"', () => {
    const str = "bar 'foo bar"
    const actual = tagWrapper(tags, "'foo", str)
    const expected = "bar <em>'foo</em> bar"

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it("Wraps text containing '\"'", () => {
    const str = 'bar "foo bar'
    const actual = tagWrapper(tags, '"foo', str)
    const expected = 'bar <em>"foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing ","', () => {
    const str = 'bar ,foo bar'
    const actual = tagWrapper(tags, ',foo', str)
    const expected = 'bar <em>,foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "."', () => {
    const str = 'bar .foo bar'
    const actual = tagWrapper(tags, '.foo', str)
    const expected = 'bar <em>.foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })

  it('Wraps text containing "/"', () => {
    const str = 'bar /foo bar'
    const actual = tagWrapper(tags, '/foo', str)
    const expected = 'bar <em>/foo</em> bar'

    expect(actual).toBe(expected)
    expect(actual).toMatchSnapshot()
  })
})
