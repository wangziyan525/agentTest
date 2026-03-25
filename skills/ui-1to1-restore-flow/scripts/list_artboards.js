#!/usr/bin/env node

const fs = require("fs");

function extractData(html) {
  const match = html.match(/let data = (\{.*\});/s);
  if (!match) {
    throw new Error("Cannot find `let data = {...};` in ui/index.html");
  }
  return JSON.parse(match[1]);
}

function main() {
  const file = process.argv[2];
  const keyword = process.argv[3] || "";

  if (!file) {
    console.error("Usage: node list_artboards.js <ui/index.html> [keyword]");
    process.exit(1);
  }

  const html = fs.readFileSync(file, "utf8");
  const data = extractData(html);

  data.artboards
    .filter((artboard) => {
      if (!keyword) {
        return true;
      }
      return (
        String(artboard.slug || "").includes(keyword) ||
        String(artboard.name || "").includes(keyword)
      );
    })
    .forEach((artboard) => {
      console.log(
        [
          artboard.slug || "",
          artboard.name || "",
          artboard.width || "",
          artboard.height || "",
          artboard.imagePath || "",
        ].join(" | ")
      );
    });
}

main();
