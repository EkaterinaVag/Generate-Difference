const getValueType = (value) => {
  if (typeof value !== 'object' || value === null) {
    return typeof value === 'string' ? `'${value}'` : `${value}`;
  }
  return '[complex value]';
};

const plain = (tree) => {
  const iter = (nodes, keyName = '') => {
    const result = nodes.filter((node) => node.type !== 'unchanged')
      .map((item) => {
        const { type } = item;
        const keyPath = [...keyName, item.key].join('');
        switch (type) {
          case 'deleted':
            return `Property '${keyPath}' was removed`;
          case 'changed':
            return `Property '${keyPath}' was updated. From ${getValueType(item.value1)} to ${getValueType(item.value2)}`;
          case 'added':
            return `Property '${keyPath}' was added with value: ${getValueType(item.value)}`;
          case 'nested':
            return iter(item.children, `${keyPath}.`);
          default:
            throw new Error(`Unknown type: '${type}'!`);
        }
      });
    return result.join('\n');
  };
  return iter(tree, '');
};

export default plain;
