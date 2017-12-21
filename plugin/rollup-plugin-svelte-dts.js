import { readFile, writeFileSync, unlinkSync } from 'fs'
import printInferredTypes from './inferred-types'

const readText = filename =>
	new Promise(res =>
		readFile(filename, (err, data) => (err ? res(null) : res(data.toString())))
	)

export default function svelteCombinerDts(
	{ extensions = ['.html', '.svelte'] } = {}
) {
    const externalFiles = new Set()
    console.log('svelteCombiner + d.ts');
	return {
		load: id => {
			if (externalFiles.has(id)) {
				return ''
			}
            const extension = extensions.find(extension => id.endsWith(extension))            
			if (extension) {
				const baseId = id.slice(0, -extension.length)
				const jsId = baseId + '.js'
				const cssId = baseId + '.css'
				externalFiles.add(jsId);
                externalFiles.add(cssId);
				return Promise.all([id, jsId, cssId].map(readText)).then(
					([html, js, css]) => {
                        const r = js
							? css
								? `${html}
<script>
${js}
</script>
<style>
${css}
</style>`
								: `${html}
<script>
${js}
</script>`
                            : html;
                        if (js) {
							let paths = id.split('/');
							if (paths.length === 1) paths = id.split('\\');
							const name = paths[paths.length - 1];
							const filePath = baseId + '.ts';
                            // console.log('name, filePath', name, filePath);
                            writeFileSync(filePath, js.replace('export default ', `let ${name} = `));
							const dts = printInferredTypes(filePath, name);
							writeFileSync(`${baseId}.html.d.ts`, dts);
							unlinkSync(filePath);
                        }   
                        return r;
                    }
				)
			}
		},
	}
}