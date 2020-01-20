const fs = require("fs")
const path = require("path")

const removeExt = str => {
  return str.replace(/\.[^/.]+$/, "")
}

const walkSync = (dir, filelist = [], filter) => {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const dirFile = path.join(dir, file)
    const dirent = fs.statSync(dirFile)
    const name = path.basename(dirFile)
    if (dirent.isDirectory()) {
      var odir = {
        path: dirFile,
        name: name,
        files: []
      }
      odir.files = walkSync(dirFile, dir.files, filter)
      if (odir.files.length) {
        filelist.push(odir)
      }
    } else if (filter.test(dirFile)) {
      filelist.push({
        path: dirFile,
        name: removeExt(name)
      })
    }
  }
  return filelist
}

// /\.(jpe?g|png|gif|bmp)$/i
const allowed = /\.(svg)$/i
//const allowed = /\.()$/i;
const iconsFolder = "./public/icons"
const tree = walkSync(iconsFolder, [], allowed)
const json = JSON.stringify(tree)
fs.writeFile("data.json", json, "utf8", function() {
  console.log("file ready...")
})
console.log("Reading files at " + iconsFolder)

// exports.build = function(pathToFolder, fileList = [], allowedFiles) {
//   console.log("Reading files at " + pathToFolder);
//   const hiTree = walkSync(pathToFolder, fileList, allowedFiles);
//   const json = JSON.stringify(hiTree);
//   fs.writeFile("tree.json", json, "utf8", function() {
//     console.log("hiTree is ready...");
//   });
// };
