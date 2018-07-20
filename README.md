# blob-storage-middleware

This package contains express middleware for easily uploading files to Azure blob storage.

## Installation

    npm i blob-storage-middleware --save

## Usage

### Server

```Javascript
const app = require('express')()
const middleware = require('blob-storage-middleware')({
  connectionString: "<your_storage_account_connection_string",
  containerName: "<name_of_blob_container>"
})
app.post('/upload', middleware)
app.listen(3000)
```
