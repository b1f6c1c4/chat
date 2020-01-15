/* eslint-disable no-console */

const Bundler = require('parcel-bundler');
const shell = require('shelljs');

process.env.NODE_ENV = 'production';

async function makeBundle() {
  const bundler = new Bundler([
    'index.html',
    'app.html',
  ]);

  await bundler.bundle();
  const html = shell.cat('art/html_code.html');
  shell.sed('-i', /<title>/, `${html}<title>`, 'dist/*.html');
  shell.cp('art/*', 'dist/');
}

makeBundle();
