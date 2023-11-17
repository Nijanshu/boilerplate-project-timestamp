// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
   let dat = new Date()
   let datt=dat.toUTCString();
   unx = dat.getTime();
   res.json({
    unix: unx,
    utc: datt
  });
})

app.get("/api/:date", function (req, res) {
  let reqq = req.params.date;
  let dat;
  let unx;

  if (!isNaN(reqq)) {
    unx = Number(reqq);
    dat = new Date(unx).toUTCString();
  } else {
    let arr = reqq.split('-');
    let year = parseInt(arr[0]);
    let month = parseInt(arr[1]) - 1; // Adjust for zero-indexed months
    let day = parseInt(arr[2]);

    // Use Date.UTC to create a date object in UTC
    dat = new Date(Date.UTC(year, month, day, 0, 0, 0)).toUTCString();
    unx = dat.getTime();
  }

  if (isNaN(unx)) {
    res.status(400).json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: unx,
      utc: dat
    });
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
