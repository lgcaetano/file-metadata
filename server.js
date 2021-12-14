var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
require('dotenv').config()
const upload = multer({ dest: 'uploads/' })

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {   
    res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.post('/api/fileanalyse', upload.single('upfile'),(req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})
