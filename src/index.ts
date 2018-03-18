import { readFile, writeFileSync, unlinkSync } from 'fs';
import Requests from './api/request';
import { allWithMapAsync } from './api/async';
import printInferredTypes from '../ts/inferred-types';

const folder = 'data';

const readText = filename =>
	new Promise(res =>
		readFile(filename, (err, data) => (err ? res(null) : res(data.toString())))
    );

function writeInterfaceFile(name, data){
    const filePath = `${folder}\\${name}.ts`; 
    const code = printInferredTypes(filePath, name);
    const targetFilePath = `${folder}\\${name}.i.ts`;
    writeFileSync(targetFilePath, code);
}

async function getData() {    
    const articles = Requests.get('articles');

    return allWithMapAsync({ articles });
}

function writeFile(name, data) {
    const filePath = `data\\${name}.ts`;
    let json = JSON.stringify(data);
    writeFileSync(filePath, `let ${name} = ${json}`);
    readText(filePath).then(x => {
        writeInterfaceFile(name, x);
    });
}

getData().then((data: any) => {
        const keys = Object.keys(data);
        keys.forEach(x => {
            const d = data[x];
            // console.log(x, d);
            let u = d.articles[0];  
            console.log(x, u);   
            writeFile(x, u);         
        });
    }
);

console.log('done');