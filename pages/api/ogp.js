import * as path from "path";
const { createCanvas, registerFont, loadImage } = require("canvas");

export default async (req, res) => {
  const { text } = req.query;

  function splitByMeasureWidth(str, maxWidth, context) {
    const lines = [];
    let line = "";
    str.split("").forEach((char) => {
      line += char;
      if (context.measureText(line).width > maxWidth) {
        lines.push(line.slice(0, -1));
        line = line.slice(-1);
      }
    });
    lines.push(line);
    return lines;
  }

  async function generateImage(text) {
    const CANVAS_WIDTH = 1600;
    const CANVAS_HEIGHT = 900;

    const TEXT_SIZE = 72;
    const TEXT_LINE_MARGIN_SIZE = 16;
    const TEXT_MARGIN_X = 68;

    registerFont( path.join("fonts", "shirokuma-regular.ttf") ,
                   { family: "shirokuma-regular" });

    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const context = canvas.getContext("2d");

    const backgroundImage = await loadImage( path.join("images","ogp-background.jpg") );
    context.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.font = `${TEXT_SIZE} shirokuma-regular`;
    context.fillStyle = "#000";
    const textLines = splitByMeasureWidth(text, CANVAS_WIDTH - TEXT_MARGIN_X, context);

    let lineY = CANVAS_HEIGHT / 2 - ((TEXT_SIZE + TEXT_LINE_MARGIN_SIZE) / 2) * (textLines.length - 1);

    textLines.forEach((line) => {
      const textWidth = context.measureText(line).width;
      context.fillText(line, (CANVAS_WIDTH - textWidth) / 2, lineY);
      lineY += TEXT_SIZE + TEXT_LINE_MARGIN_SIZE;
    });

    return canvas.toBuffer();
  }

  try {
    const image = await generateImage("webstock.dev/"+text);
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": image.length,
    });

    res.end(image, "binary");
  } catch (error) {
    console.log(error);
    res.end(error.message);
  }
};