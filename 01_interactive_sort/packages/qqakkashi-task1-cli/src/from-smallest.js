const fromSmallest = (array) => {
  return array.filter((item) => +item === +item / 1).sort((a, b) => a - b);
};

module.exports = fromSmallest;
