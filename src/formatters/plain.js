const valueType = (value) => {
    if (typeof value !== 'object' || value === null) {
        return typeof value === 'string' ? `'${value}'` : `${value}`;
      }
      return `[complex value]`;
};

const plain = (tree) => {
  const iter = (node, keyName = '') => {
    const result = node.filter((item) => item.type !== 'unchanged')
    .map((item) => {
        const { type } = item;
        const keyPath = [...keyName, item.key].join('');
        switch (type) {
          case 'deleted':
            return `Property '${keyPath}' was removed`;
          case 'changed':
            return `Property '${keyPath}' was updated. From ${valueType(item.value1)} to ${valueType(item.value2)}`;
          case 'added':
            return `Property '${keyPath}' was added with value: ${valueType(item.value)}`;
          case 'nested':
            return iter(item.children, `${keyPath}.`);
          default:
            return null;
        }
    });
    return result.join('\n');
  };
  return iter(tree, '');
};

export default plain;
 