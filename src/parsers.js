import yaml from 'js-yaml';


const getParsedData = (data, ext) => {
    switch (ext) {
        case '.json': 
            return JSON.parse(data);
        case '.yml':
            return yaml.load(data);
        case '.yaml': 
            return yaml.load(data);
        default:
            throw new Error(`Format ${format} - is incorrect`);
    }
}

export default getParsedData;
