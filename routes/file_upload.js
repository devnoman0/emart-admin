const express = require("express");
const Router = express.Router();
const AWS = require("aws-sdk");
const Busboy = require("busboy");

const BUCKET_NAME = "emart-test";
const IAM_USER_KEY = "AKIAIOGVNBD2HESX67LA";
const IAM_USER_SECRET = "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";

Router.post("/file/upload", (req, res) => {
  const element1 = req.body.element1;

  var busboy = new Busboy({ headers: req.headers });

  busboy.on("finish", function() {
    console.log("Upload finished");

    const file = req.files.element2;
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function() {
      var params = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file.data
      };
      s3bucket.upload(params, function(err, data) {
        if (err) {
          res.json({ msg: "Something went wrong try again" });
          console.log(err);
        }
        res.json({ msg: "Image Uploaded Successfuly" });
        console.log(data);
      });
    });
  });

  req.pipe(busboy);
});

//Router Exported
module.exports = Router;
