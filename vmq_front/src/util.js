const createNumeralArray = (n) => [...Array(n).keys()];
const uniqueArray = (items) => [...new Set(items)];
const jsonObjectTolist = (n) => Object.values(n);
const filterByVote = (t) => {
  //    console.log( Object.keys( t.key ).length ) ;
  //    console.log(t.vote1)

  const filterKeyArray = createNumeralArray(Object.keys(t.vote1).length).reduce(
    (sum, c) => (t.vote1[c] > 16 ? [...sum, c] : sum),
    []
  );
  //console.log(filterKeyArray)
  const newKey = filterKeyArray.map((i) => t.key[i]);
  const newName = filterKeyArray.map((i) => t.name[i]);
  const newVote1 = filterKeyArray.map((i) => t.vote1[i]);
  const newVote2 = filterKeyArray.map((i) => t.vote2[i]);
  const newYear = filterKeyArray.map((i) => t.year[i]);
  console.log({
    key: newKey,
    name: newName,
    vote1: newVote1,
    vote2: newVote2,
    year: newYear,
  });
  return {
    key: newKey,
    name: newName,
    vote1: newVote1,
    vote2: newVote2,
    year: newYear,
  };
};

// function shuffle(array) {
//   var currentIndex = array.length,
//     randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// }

const shuffleArray = (array) => {
  let _array = array;
  for (let i = _array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_array[i], _array[j]] = [_array[j], _array[i]];
  }
  return _array;
};

const getRandomNFromArray = (array, n) => shuffleArray(array).slice(0, n);

export {
  getRandomNFromArray,
  shuffle,
  filterByVote,
  createNumeralArray,
  jsonObjectTolist,
  uniqueArray,
};
