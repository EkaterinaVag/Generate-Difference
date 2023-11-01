const indent = (depth, type = 'first') => {
  const replacer = ' ';
  const spacesCount = 4;
  const currentSpace = spacesCount * depth;
  return type === 'last' ? replacer.repeat(currentSpace - spacesCount) : replacer.repeat(currentSpace - 2);
};

const stringify = (node, depth) => {
  if (typeof node !== 'object' || node === null) {
    return `${node}`;
  }

  const array = Object.entries(node);
  const result = array.map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${result.join('\n')}\n  ${indent(depth)}}`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    if (typeof node !== 'object' || node === null) {
      return `${node}`;
    }

    const result = node.map((item) => {
      const { type } = item;
      switch (type) {
        case 'deleted':
          return `${indent(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'unchanged':
          return `${indent(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return (`${indent(depth)}- ${item.key}: ${stringify(item.value1, depth)}\n${indent(depth)}+ ${item.key}: ${stringify(item.value2, depth)}`);
        case 'added':
          return `${indent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'nested':
          return `${indent(depth)}  ${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
    return `{\n${result.join('\n')}\n${indent(depth, 'last')}}`;
  };
  return iter(tree, 1);
};

export default stylish;
