import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app =express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/front.html");
});
app.post("/submit",(req,res)=>{
  const url = req.body.url;
  if (!url) {
    return res.status(400).send("URL is required.");
  }

  try {
    const qr_png = qr.imageSync(url, { type: "png" });
    fs.writeFileSync("qr_img.png", qr_png);

    // This part is not critical for the user, so we don't need to wait for it.
    fs.writeFile("URL.txt", url, (err) => {
      if (err) {
        console.error("Failed to save URL.txt:", err);
      }
      console.log("The file URL.txt has been saved!");
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    res.status(500).send("Failed to generate QR code.");
  }
});

app.listen(port,()=>{
  console.log(`listning on the port ${port}`);
});