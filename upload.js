const azure = require('azure-storage')

module.exports = (connectionString, containerName) => {
  const storage = azure.createBlobService(connectionString)

  return (fileName, stream) => {
    return new Promise((resolve, reject) => {
      return storage.createContainerIfNotExists(containerName, error => {
        if(error)
          reject(error)

        const blobName = getBlobName(fileName)
        const writeStream = storage.createWriteStreamToBlockBlob(containerName, blobName)
        stream.pipe(writeStream)
        writeStream.on('error', reject)
        writeStream.on('close', () => {
          resolve({ url: getBlobUrl(containerName, blobName) })
        })
      })
    })  
  }

  function getBlobName(filename) {
    return `${filename.substring(0, filename.lastIndexOf('.'))}-${Date.now()}${filename.substring(filename.lastIndexOf('.'))}`
  }

  function getBlobUrl(containerName, blobName) {
    return storage.getUrl(containerName, blobName)
  }
}