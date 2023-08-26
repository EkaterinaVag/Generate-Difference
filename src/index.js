import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParsedData from './parsers.js';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortKeys = _.sortBy(_.union(keys1, keys2));

  const arrayWhithType = sortKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        value: value2,
        type: 'added',
      };
    } else if (!Object.hasOwn(data2, key)) {
      return {
        key,
        value: value1,
        type: 'deleted',
      };
    } else if (data1[key] !== data2[key]) {
      return {
        key,
        value1,
        value2,
        type: 'changed',
      };
    } else {
      return {
        key,
        value: value1,
        type: 'unchanged',
      };
    }
  });

  const result = arrayWhithType.map((diff) => {
    const { type } = diff;
    switch (type) {
      case 'deleted':
        return `  - ${diff.key}: ${diff.value}`;
      case 'unchanged':
        return `    ${diff.key}: ${diff.value}`;
      case 'changed':
        return (`  - ${diff.key}: ${diff.value1} \n  + ${diff.key}: ${diff.value2}`);
      case 'added':
        return `  + ${diff.key}: ${diff.value}`;
      default:
        return null;
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

const readFile = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
const getExt = (filePath) => path.extname(filePath);

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const ext1 = getExt(filepath1);
  const ext2 = getExt(filepath2);

  const obj1 = getParsedData(file1, ext1);
  const obj2 = getParsedData(file2, ext2);
  return compare(obj1, obj2);
};

export default genDiff;
