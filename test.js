const config = require('./test.config.json')
const middleware = require('.')(config)
const app = require('express')()

app.post('/upload', middleware)
app.get('/', (req, res) => {
  res.send(`
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="file1" /><br />
      <input type="file" name="file2" /><br />
      <input type="submit" />
    </form>
  `)
})
app.listen(3001)