import rawLoader from "raw-loader";
import raw from "raw.macro";

module.exports = {
    module: {
      rules: [
        {
          test: /\.md$/i,
          use: rawLoader,
        },
      ],
    },
  };