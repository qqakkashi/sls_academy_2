const fromBiggest = (array) => {
  return array.filter((item) => +item === +item).sort((a, b) => b - a);
};

module.exports = fromBiggest;
