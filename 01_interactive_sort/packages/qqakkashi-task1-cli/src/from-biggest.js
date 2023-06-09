const fromBiggest = (array) => {
  return array.filter((item) => +item === +item / 1).sort((a, b) => b - a);
};

module.exports = fromBiggest;
