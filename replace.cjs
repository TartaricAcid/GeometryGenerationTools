const fs = require("fs");

fs.readFile("geometry-generation-tools.js", "utf-8", (error, data) => {
    let out = data.replaceAll("__vue_component__", "__vue_component__ggt")
        .replaceAll("__vue_script__", "__vue_script__ggt")
        .replaceAll("__vue_render__", "__vue_render__ggt")
    fs.writeFile("geometry-generation-tools.js", out, (error) => {
    })
})