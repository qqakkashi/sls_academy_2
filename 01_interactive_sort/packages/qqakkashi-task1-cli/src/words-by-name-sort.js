const wordsByNameSort = (array) => {
  return array.filter((item) => +item !== +item / 1).sort();
};

module.exports = wordsByNameSort;
