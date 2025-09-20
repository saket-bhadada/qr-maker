import express from "express";
import qr from "qr-image";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front.html");
});

app.post("/submit", (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send("URL is required.");
  }

  try {
    const qr_png = qr.image(url, { type: "png" });
    res.setHeader("Content-type", "image/png");
    qr_png.pipe(res);
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    res.status(500).send("Failed to generate QR code.");
  }
});

app.listen(port, () => {
  console.log(`listening on the port ${port}`);
});
