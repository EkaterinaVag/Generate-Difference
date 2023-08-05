import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { cwd } from 'node:process';

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
    const type = diff.type;
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


const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1)));    
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2)));
  return compare(obj1, obj2);
};

export default genDiff;