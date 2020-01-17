const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath, config) {
  if (req.url === '/favicon.ico') {
    return res.end()
  }
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        return res.end()
      }
      const contentType = mime(filePath).text
      res.setHeader('Content-Type', contentType)
      let rs;
      const {code, start, end} = range(stats.size, req, res)
      res.statusCode = code
      if (code === 200) {
        rs = fs.createReadStream(filePath)
      } else {
        rs = fs.createReadStream(filePath, {start, end})
      }
      if (config.compress.test(filePath)) {
        rs = compress(rs, req, res)
      }
      return rs.pipe(res)
    }
    const files = await readdir(filePath)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    const dir = path.relative(config.root, filePath)
    const iconPath = path.join(__dirname, '../icon/')
    const iconDir = path.relative(config.root, iconPath)
    const data = {
      title: path.basename(filePath),
      dir: dir ? `/${dir}` : '',
      files: files.map(file => {
        return {
          file,
          icon: path.extname(file)
            ? `/${iconDir}/${mime(file).icon}.png`
            : `/${iconDir}/icon-folder.png`
        }
      })
    }
    res.end(template(data))
  } catch (ex) {
    console.error(ex)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file.\n ${ex.toString()}`)
  }
}
