require("ignore-styles");
require("@babel/register")(
    {
        "plugins": [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
        ],
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript"
        ],
        "extensions": [
            ".jsx",
            ".js",
            ".tsx",
            ".ts"
        ]
    }
);
require("./server.tsx");