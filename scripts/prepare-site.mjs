import {cpSync,existsSync,mkdirSync,readdirSync,rmSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
process.chdir(fileURLToPath(new URL('..',import.meta.url)));
const build=spawnSync('npm',['run','build'],{stdio:'inherit'});
if(build.status!==0)process.exit(build.status??1);
mkdirSync('docs/assets',{recursive:true});
// Only remove Vite-generated entry assets. Preserve unrelated documentation.
for(const name of readdirSync('docs/assets')){
 if(/^index-.*\.(?:js|css)$/.test(name))rmSync(`docs/assets/${name}`);
}
if(!existsSync('dist/index.html'))throw new Error('Production entry point is missing');
cpSync('dist','docs',{recursive:true});
writeFileSync('docs/.nojekyll','');
console.log('Prepared docs/ for GitHub Pages. Commit it with the source changes.');
