import React from "react";

const dirTree = require("directory-tree");

export function useFileTree() {
  const build = path => {
    console.log(path);
    const tree = dirTree(path);
    console.log(tree);
  };

  return {
    build
  };
}
