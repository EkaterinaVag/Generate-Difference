const stringify = (node, depth) => {
  if (typeof node !== 'object' || node === null) {
    return `${node}`;
  }
  const replacer = ' ';
  const spacesCount = 4;
  const currentSpace = spacesCount * depth;
  const ident = replacer.repeat(currentSpace - 2);

  const array = Object.entries(node);
  const result = array.map(([key, value]) => `${ident}      ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${result.join('\n')}\n  ${ident}}`;
};

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (node, depth) => {
    if (typeof node !== 'object' || node === null) {
      return `${node}`;
    }

    const currentSpace = spacesCount * depth;
    const ident = replacer.repeat(currentSpace - 2);
    const closedIdent = replacer.repeat(currentSpace - 4)
  
    const result = node.map((item) => {
      const { type } = item;
      switch (type) {
        case 'deleted':
          return `${ident}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'unchanged':
          return `${ident}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return (`${ident}- ${item.key}: ${stringify(item.value1, depth)}\n${ident}+ ${item.key}: ${stringify(item.value2, depth)}`);
        case 'added':
          return `${ident}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'nested':
          return `${ident}  ${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          return null;
      }
    }); 
    return `{\n${result.join('\n')}\n${closedIdent}}`;
  };
  return iter(tree, 1);
};

export default stylish;