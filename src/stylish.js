const stringify = (node, depth) => {
  if (typeof node !== 'object' || node === null) {
    return `${node}`;
  }
  const replacer = ' ';
  const spacesCount = 4;
  const currentSpace = spacesCount * depth;
  const ident = replacer.repeat((currentSpace) - 2);

  const array = Object.entries(node);
  const result = array.map(([key, value]) => `${ident}  ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${result.join('\n')}\n  ${ident}}`;
};

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
          return `${ident}- ${item.key}: ${stringify(item.value)}`;
        case 'unchanged':
          return `${ident}  ${item.key}: ${stringify(item.value)}`;
        case 'changed':
          return (`${ident}- ${item.key}: ${stringify(item.value1)} \n${ident}+ ${item.key}: ${stringify(item.value2)}`);
        case 'added':
          return `${ident}+ ${item.key}: ${stringify(item.value)}`;
        case 'nested':
          return `${ident}  ${item.key}: ${iter(item.children, depth + 1)}${ident}`;
        default:
          return null;
      }
    }); 
    return `{\n${result.join('\n')}\n}`;
  };
  return iter(tree, 1);
};

export default stylish;