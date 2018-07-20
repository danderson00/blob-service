module.exports = (url, file, progressCallback) => {
  return new Promise((resolve, reject) => {
    const formdata = new FormData()
    formdata.append('file', file)

    var xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    
    xhr.addEventListener('progress', e => {
      if(progressCallback && typeof progressCallback === 'function'){
        const progress = parseInt(e.loaded / e.total * 100, 10)
        progressCallback(progress)
      }
    })

    xhr.addEventListener("error", e => reject(e))
    xhr.addEventListener("abort", e => reject(e))
    
    xhr.onload = () => resolve(xhr.responseText)

    xhr.send(formdata)
    return xhr
  })
}
