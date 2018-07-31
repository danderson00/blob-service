const uploadFactory = require('./upload')
const Busboy = require('busboy')

module.exports = function (options = {}) {
  const upload = uploadFactory(options.connectionString, options.containerName)

  return (req, res, next) => {
    const busboy = new Busboy({ headers: req.headers })
    const uploadPromises = []

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      uploadPromises.push(
        upload(filename, file)
          .then(result => Object.assign({}, { filename: filename }, result))
          .catch(error => ({ filename: filename, error: error }))
      )
    })

    busboy.on('finish', () => {
      Promise.all(uploadPromises).then(results => res.json(results))
    })

    req.pipe(busboy)
  }
}
