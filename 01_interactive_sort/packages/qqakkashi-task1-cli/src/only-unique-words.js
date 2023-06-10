const onlyUniqueWords = (array) => {
  const words = array.filter((item) => +item !== +item);
  return [...new Set(words)];
};

module.exports = onlyUniqueWords;
