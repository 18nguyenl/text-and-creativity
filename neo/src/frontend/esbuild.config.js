const esbuild = require('esbuild');
const alias = require('esbuild-plugin-alias');

esbuild.build({
    entryPoints: ["main.js"],
    bundle: true,
    outfile: "../public/js/main.js",
    minify: process.env.NODE_ENV === "production" ? true : false,
    watch: process.env.NODE_ENV === "development" ? true : false,
    plugins: [
        alias({
            'three': require.resolve("three"),
        }),
    ],
})