const express = require('express');
const {connectToMongoDB} = require("./connect")
const urlRoute = require('./routes/url');
const app = express()
const PORT = 8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongodb connected")
);
app.use(express.json());
app.use('/url', urlRoute);

const entry = app.get('/:shortId', async(req, res)=>{
  const shortId = req.params.shortId;
  await URL.findOneAndUpdate({
    shortId
  },{
    $push:{
      visitHistory : {
        timestamp : Date.now()
      }
    },
  })
  res.redirect(entry.redirectURL);
})
app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`))