const fromSmallest = (array) => {
  return array.filter((item) => +item === +item).sort((a, b) => a - b);
};

module.exports = fromSmallest;
