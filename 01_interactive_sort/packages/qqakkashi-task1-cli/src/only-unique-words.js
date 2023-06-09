const onlyUniqueWords = (array) => {
  const words = array.filter((item) => +item !== +item);
  let uniqueWords = [];
  const sortedWords = words.map((word) => {
    if (uniqueWords.includes(word)) {
      return;
    }
    uniqueWords.push(word);
  });
  return uniqueWords;
};

module.exports = onlyUniqueWords;
