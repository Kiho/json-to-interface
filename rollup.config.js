import svelte from 'rollup-plugin-svelte';
import typescript from 'rollup-plugin-typescript';
import tscompile from 'typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

import sveltedts from './plugin/rollup-plugin-svelte-dts';

const production = !process.env.ROLLUP_WATCH;

console.log('production', production);

export default {
	input: 'src/main.ts',	
	output: {
		sourcemap: true,	
		format: 'iife',
		file: 'public/app.js',
	},
	name: 'app',
	plugins: [
		commonjs(),
		sveltedts(),
		typescript({typescript: tscompile}),
		svelte({
			dev: !production,
			css: css => {
				css.write('public/app.css');
			},
			cascade: true
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		production && buble({ exclude: 'node_modules/**' }),
		production && uglify()
	]
};