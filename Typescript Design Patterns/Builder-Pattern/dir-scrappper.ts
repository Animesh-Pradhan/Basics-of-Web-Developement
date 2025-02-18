import fs from "fs";

interface IfileReader {
    isJSONFile(file: string): boolean;
    readText(file: string): string;
    readJSON(file: string): unknown;
}

const directoryScrapper = (dirPath: string, fileReader: IfileReader) =>  {
    return fs.readdirSync(dirPath)?.reduce<Record<string, unknown>>((acc: Record<string, unknown>, file: string) => {
        if(fileReader.isJSONFile(file)) {
            acc[file] = fileReader.readJSON(`${dirPath}/${file}`)
        } else {
            acc[file] = fileReader.readText((`${dirPath}/${file}`))
        }
 
        return acc;
    }, {}) 
}


const fileReader: IfileReader = {
    isJSONFile(file: string): boolean {
        return file.endsWith(".json");
    }, 

    readText(file: string): string {
        return fs.readFileSync(file, "utf-8").toString();
    },

    readJSON(file: string): unknown {
        return JSON.parse(fs.readFileSync(file, "utf-8"))
    }
}


const output = directoryScrapper("./data", fileReader)
console.log(output);

