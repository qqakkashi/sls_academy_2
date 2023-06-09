const wordsByNameSort = (array) => {
  return array.filter((item) => +item !== +item).sort();
};

module.exports = wordsByNameSort;
