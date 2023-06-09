const byQuantity = (array) => {
  return array
    .filter((item) => +item !== +item)
    .sort((a, b) => a.length - b.length);
};

module.exports = byQuantity;
