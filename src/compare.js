import _ from 'lodash';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortKeys = _.sortBy(_.union(keys1, keys2));

  return sortKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        value: value2,
        type: 'added',
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        value: value1,
        type: 'deleted',
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: compare(value1, value2),
    }
  }
    if (data1[key] !== data2[key]) {
      return {
        key,
        value1,
        value2,
        type: 'changed',
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key,
        value: value1,
        type: 'unchanged',
      };
    }
  });
};

export default compare;
