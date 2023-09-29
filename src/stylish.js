const stylish = (arrayWhithType) => {
     arrayWhithType.map((diff) => {
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
      case 'nasted':
        return 
      default:
        return null;
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default stylish;