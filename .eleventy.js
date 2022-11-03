const markdownIt = require("markdown-it");

module.exports = (config) => {
  config.addPassthroughCopy("src/static");

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
