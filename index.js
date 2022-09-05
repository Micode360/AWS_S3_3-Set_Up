const express = require("express");
const cors = require("cors");
const { uploadFile, getPreSignedUrl } = require("./s3");
const formidable = require('formidable');
const form = formidable({ multiples: true });


const app = express();
app.use(cors());
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(express.static(__dirname + '/views'));


//Routes

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
});


/*
   Uploading files to AWS S3 bucket
*/

app.post("/upload", async (req, res) => {

    form.parse(req, (err, fields, files) => {
      if (err) return { error: err };
      let imageProps = {
         filepath: files.file.filepath,
         filename: files.file.originalFilename
      };

      //Passing the image file in getPreSignedUrl function
    let result = getPreSignedUrl(
        imageProps.filename,
        imageProps.filepath
      )


      console.log(result, "result")
          
 });

});




//Powering up the server
let port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`User_Server:${port}`)
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Process Error: ${error}`);

  server.close(() => process.exit(1));
});
