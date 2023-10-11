const valueType = (value) => {
    if (typeof value !== 'object' || value === null) {
        return `${value}`;
      }
      return `[complex value]`;
};

const plain = (tree) => {
    tree.map((item) => {
    const { type } = item;
    switch (type) {
      case 'deleted':
        return `Property '${item.key}' was removed`;
      case 'unchanged':
        return `Property '${item.key}' was unchanged`;
      case 'changed':
        return `Property '${item.key}' was updated. From '${valueType(item.value1)}' to '${valueType(item.value2)}'`;
      case 'added':
        return `Property '${item.key}' was added with value: ${valueType(item.value2)}`;
      case 'nested':
        return ;
      default:
        return null;
    }
})
};
 