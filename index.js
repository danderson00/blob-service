const uploadFactory = require('./upload')

module.exports = function (options = {}) {
  const upload = uploadFactory(options.connectionString, options.containerName)

  return (req, res, next) => {
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      upload(filename, file)
        .then(result => res.json(result))
        .catch(next)
    })
    req.pipe(busboy)
  }
}
