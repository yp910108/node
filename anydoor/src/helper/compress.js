const {createGzip, createDeflate} = require('zlib')
module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding']
  if (!acceptEncoding || !/\b(gzip|deflate)\b/.test(acceptEncoding)) {
    return rs
  }
  if (/\bgzip\b/.test(acceptEncoding)) {
    res.setHeader('Content-Encoding', 'gzip')
    return rs.pipe(createGzip())
  }
  if (/\bdeflate\b/.test(acceptEncoding)) {
    res.setHeader('Content-Encoding', 'deflate')
    return rs.pipe(createDeflate())
  }
}
