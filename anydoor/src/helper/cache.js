const {cache} = require('../config/default')

function refreshRes (stats, res) {
  const {maxAge, expires, cacheControl, lastModified, etag} = cache
  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toString().replace(/中国标准时间/, ''))
  }
  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
  }
  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toString().replace(/中国标准时间/, ''))
  }
  if (etag) {
    res.setHeader('ETag', `${stats.size}-${stats.mtime.toString().replace(/中国标准时间/, '')}`)
  }
}

module.exports = function isFresh (stats, req, res) {
  refreshRes(stats, res)
  const lastModified = req.headers['if-modified-since']
  const etag = req.headers['if-none-match']
  if (!lastModified && !etag) {
    return false
  }
  if (lastModified && res.getHeader('Last-Modified') !== lastModified) {
    return false
  }
  if (etag && res.getHeader('ETag') !== etag) {
    return false
  }
  return true
}
