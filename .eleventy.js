const fs = require("fs/promises");
const path = require("path");

const markdownIt = require("markdown-it");
const yaml = require("js-yaml");

module.exports = (config) => {
  config.addPassthroughCopy("src/static");

  config.addCollection("people", async (_) => {
    const dir = await fs.readdir("./people");
    const people = await Promise.all(
      dir.map(async (file) => {
        const name = path.join("./people/", file);
        const content = (await fs.readFile(name)).toString("utf8");
        const loaded = yaml.load(content);

        return {
          name: loaded.name || "",
          line: loaded.line || "",
        };
      })
    );

    return people;
  });

  const md = new markdownIt({
    html: true,
  });

  config.addPairedShortcode("markdown", (content) => {
    return md.render(content);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
