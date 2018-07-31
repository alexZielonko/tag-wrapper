# tag-wrapper

[![Build Status](https://travis-ci.org/alexZielonko/tag-wrapper.svg?branch=master)](https://travis-ci.org/alexZielonko/tag-wrapper)
[![npm Version](https://img.shields.io/badge/npm-v1.0.1-blue.svg)](https://www.npmjs.com/package/tag-wrapper)

Tag-wrapper provides a function to wrap all instances of a query within a string within the provided "tags." If you've ever wanted to wrap all instances of a string's substring(s) within HTML tags, regardless of case, you may find this package useful.

## Installation

```bash
npm install tag-wrapper --save
```

## Usage

```js
import tagWrapper from 'tag-wrapper'

const tags = ['<em>', '</em>']
const query = 'fox'
const str = 'The quick brown fox jumps over the lazy FOX.'
const formattedStr = tagWrapper(tags, query, str)

formattedStr // 'The quick brown <em>fox</em> jumps over the lazy <em>FOX</em>.'
```

`tagWrapper` returns the `str` argument if the `query` is not in the `str` _or_ the `query`, `str`, or either `tags` index is falsy.
