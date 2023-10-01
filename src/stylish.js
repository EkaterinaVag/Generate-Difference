const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (node, depth) => {
    if (typeof node !== 'object' || node === null) {
      return `${node}`;
    }

    const currentSpace = spacesCount * depth;
    const ident = replacer.repeat((currentSpace) - 2);
  
    const result = node.map((item) => {
      const { type } = item;
      switch (type) {
        case 'deleted':
          return `${ident}- ${item.key}: ${item.value}`;
        case 'unchanged':
          return `${ident}  ${item.key}: ${item.value}`;
        case 'changed':
          return (`${ident}- ${item.key}: ${item.value1} \n${ident}+ ${item.key}: ${item.value2}`);
        case 'added':
          return `${ident}+ ${item.key}: ${item.value}`;
        case 'nasted':
          return `${ident}  ${item.key}: ${iter(item.value, depth + 1)}`;
        default:
          return null;
      }
    }); 
    return `{\n${result.join('\n')}\n}`;   
  };
  return iter(tree, 1);
};

export default stylish;