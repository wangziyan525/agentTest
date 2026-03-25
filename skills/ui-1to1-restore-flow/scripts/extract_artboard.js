#!/usr/bin/env node

const fs = require("fs");

function extractData(html) {
  const match = html.match(/let data = (\{.*\});/s);
  if (!match) {
    throw new Error("Cannot find `let data = {...};` in ui/index.html");
  }
  return JSON.parse(match[1]);
}

function normalizeLayer(layer) {
  return {
    name: layer.name,
    type: layer.type,
    content: layer.content,
    rect: layer.rect,
    css: layer.css,
    exportable: layer.exportable ? layer.exportable.map((item) => item.path) : undefined,
  };
}

function main() {
  const file = process.argv[2];
  const slug = process.argv[3];

  if (!file || !slug) {
    console.error("Usage: node extract_artboard.js <ui/index.html> <artboard-slug>");
    process.exit(1);
  }

  const html = fs.readFileSync(file, "utf8");
  const data = extractData(html);
  const artboard = data.artboards.find((item) => item.slug === slug);

  if (!artboard) {
    console.error(`Artboard not found: ${slug}`);
    process.exit(2);
  }

  console.log(
    JSON.stringify(
      {
        name: artboard.name,
        slug: artboard.slug,
        width: artboard.width,
        height: artboard.height,
        imagePath: artboard.imagePath,
        imageIconPath: artboard.imageIconPath,
        layers: artboard.layers.map(normalizeLayer),
      },
      null,
      2
    )
  );
}

main();
