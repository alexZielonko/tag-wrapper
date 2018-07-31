const radix = 16

function fullEncodeUri(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (char) => {
    return '%' + char.charCodeAt(0).toString(radix)
  })
}

function getQueryIndex(query, str) {
  return str.toLowerCase().indexOf(query.toLowerCase())
}

function hasMatchingQuery(query, str) {
  return getQueryIndex(query, str) > -1
}

function getFirstQueryMatchText(query, str) {
  const queryStart = getQueryIndex(query, str)

  return str.slice(0, queryStart + query.length)
}

function getAfterQueryText(query, str) {
  const queryStart = getQueryIndex(query, str)

  return str.slice(queryStart + query.length, str.length)
}

// Wrap query text in tag
// Tags - ['openingTag', 'closingTag']
// Query - text within str to wrap in tags
// Str - string containing query to wrap in tags
export default function tagWrapper(tags, query, str) {
  const [openingTag, closingTag] = tags

  function wrapQuery(query, str) {
    const queryStart = getQueryIndex(query, str)
    const queryMatch = fullEncodeUri(
      str.slice(queryStart, queryStart + query.length)
    )
    const regex = new RegExp(fullEncodeUri(query), 'ig')

    const wrappedText = fullEncodeUri(str).replace(
      regex,
      `${openingTag}${queryMatch}${closingTag}`
    )

    return decodeURIComponent(wrappedText)
  }

  function mapQueryPosition(query, str, wrappedText = '') {
    if (hasMatchingQuery(query, str)) {
      const match = getFirstQueryMatchText(query, str)
      const afterQueryText = getAfterQueryText(query, str)
      const newWrappedText = wrappedText + wrapQuery(query, match)

      return mapQueryPosition(query, afterQueryText, newWrappedText)
    }

    return wrappedText + str
  }

  const hasParams = !!str && !!query && !!openingTag && !!closingTag

  if (!hasParams || !hasMatchingQuery(query, str)) {
    return str
  }

  return mapQueryPosition(query, str, '')
}
