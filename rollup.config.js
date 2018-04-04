import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

const copyright = `/* ${pkg.name} - v${pkg.version} - ${new Date().toString()}
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author} 
 * ${pkg.license} */`;

export default {

  input: 'src/VegaLayer.js',

  output: {
    // moduleName: 'Popup',
    // name: 'ol.vega',
    file: 'dist/ol-vega.js',
    format: 'umd',
    sourcemap: true,
    banner: copyright,
    globals: {
      openlayers: 'ol',
      'openlayers-vega': 'ol.vega',
      'ol/map': 'ol.Map',
      'ol/overlay': 'ol.Overlay',
    },
  },

  plugins: [
    nodeResolve(),
    commonJs(),
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],

  external: id => /ol\//.test(id),

};
