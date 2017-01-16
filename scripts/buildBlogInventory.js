#!/usr/local/bin/node

const yamlFront = require('yaml-front-matter');
const file = require('file');
const path = require('path');

const markdownFiles = [];

function extractFrontMatter(markdownPath) {
  const results = yamlFront.loadFront(markdownPath);

  delete results.__content;

  results.id = markdownPath.replace(/\.md$/, '').replace(/^src\/blog\/posts\//, '');

  return results;
}

function markdownOnly(filename) {
  return filename.match(/\.md$/);
}

file.walkSync('./src/blog/posts', (filePath, _, files) =>
  markdownFiles.push(...files
    .map(each => path.join(filePath, each))
    .filter(markdownOnly)
    .map(extractFrontMatter))
);

markdownFiles.sort((a, b) => a.date < b.date);

const result = {
  posts: markdownFiles.map(md => md.id),
  recent: markdownFiles.slice(0, 5)
};

process.stdout.write(JSON.stringify(result));
