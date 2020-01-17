const path = require('path')
const mimeTypes = {
  'css': {
    text: 'text/css',
    icon: 'icon-text'
  },
  'gif': {
    text: 'image/gif',
    icon: 'icon-image'
  },
  'html': {
    text: 'text/html',
    icon: 'icon-text'
  },
  'ico': {
    text: 'image/x-icon',
    icon: 'icon-image'
  },
  'jpeg': {
    text: 'image/jpeg',
    icon: 'icon-image'
  },
  'jpg': {
    text: 'image/jpeg',
    icon: 'icon-image'
  },
  'js': {
    text: 'text/javascript',
    icon: 'icon-text'
  },
  'json': {
    text: 'application/json',
    icon: 'icon-text'
  },
  'pdf': {
    text: 'application/pdf',
    icon: 'icon-text'
  },
  'png': {
    text: 'image/png',
    icon: 'icon-image'
  },
  'svg': {
    text: 'image/svg+xml',
    icon: 'icon-image'
  },
  'swf': {
    text: 'application/x-shockwave-flash',
    icon: 'icon-image'
  },
  'tiff': {
    text: 'image/tiff',
    icon: 'icon-image'
  },
  'txt': {
    text: 'text/plain',
    icon: 'icon-text'
  },
  'wav': {
    text: 'audio/x-wav',
    icon: 'icon-image'
  },
  'wma': {
    text: 'audio/x-ms-wma',
    icon: 'icon-image'
  },
  'wmv': {
    text: 'vedio/x-ms-wmv',
    icon: 'icon-image'
  },
  'xml': {
    text: 'text/xml',
    icon: 'icon-text'
  }
}

module.exports = (filePath) => {
  let ext = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase()
  if (!ext) {
    ext = filePath
  }
  return mimeTypes[ext] || mimeTypes['txt']
}
