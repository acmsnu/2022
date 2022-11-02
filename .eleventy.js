const markdownIt = require("markdown-it");

module.exports = (config) => {
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
