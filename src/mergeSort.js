// IN PROGRESS....

// O(nlog(n)) time// O(nlog(n)) space;
// const mergeSort = (array) => {
//   if (array.length <= 1) return array;
//   const middleIndex = Math.floor(array.length / 2);
//   let leftSide = array.slice(0, middleIndex);
//   let rightSide = array.slice(middleIndex);
//   return mergeSortedArrays(mergeSort(leftSide), mergeSort(rightSide));
// };
// const mergeSortedArrays = (leftSide, rightSide) => {
//   // using pointers
//   const sortedArray = [...leftSide, ...rightSide];
//   let sortedArrPointer = 0;
//   let leftSidePointer = 0;
//   let rightSidePointer = 0;
//   while (
//     leftSidePointer < leftSide.length &&
//     rightSidePointer < rightSide.length
//   ) {
//     if (leftSide[leftSidePointer] <= rightSide[rightSidePointer]) {
//       sortedArray[sortedArrPointer] = leftSide[leftSidePointer];
//       leftSidePointer++;
//     } else {
//       sortedArray[sortedArrPointer] = rightSide[rightSidePointer];
//       rightSidePointer++;
//     }
//     sortedArrPointer++;
//   }
//   while (leftSidePointer < leftSide.length) {
//     sortedArray[sortedArrPointer] = leftSide[leftSidePointer];
//     leftSidePointer++;
//     sortedArrPointer++;
//   }
//   while (rightSidePointer < rightSide.length) {
//     sortedArray[sortedArrPointer] = rightSide[rightSidePointer];
//     rightSidePointer++;
//     sortedArrPointer++;
//   }
//   console.log(sortedArray);
//   return sortedArray;
// };

// mergeSort similar

//Sorted in place O(nlog(n)) time // O(n) space;
const mergeSort = (array) => {
  debugger;
  if (array.length <= 1) return array;
  // create a copy of an arr
  let copyArray = array.slice(); // makes O(n)
  mergeSortHelper(array, 0, array.length - 1, copyArray);
  return array;
};
const mergeSortHelper = (mainArray, startIdx, endIdx, copyArray) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(copyArray, startIdx, middleIdx, mainArray);
  mergeSortHelper(copyArray, middleIdx + 1, endIdx, mainArray);
  doMerge(mainArray, startIdx, middleIdx, endIdx, copyArray);
};
const doMerge = (mainArray, startIdx, middleIdx, endIdx, copyArray) => {
  let mainIdx = startIdx;
  let copyArrIdx = startIdx;
  let secondArrIdx = middleIdx + 1;
  while (copyArrIdx <= middleIdx && secondArrIdx <= endIdx) {
    if (copyArray[copyArrIdx] <= copyArray[secondArrIdx]) {
      mainArray[mainIdx] = copyArray[copyArrIdx];
      copyArrIdx++;
    } else {
      mainArray[mainIdx] = copyArray[secondArrIdx];
      secondArrIdx++;
    }
    mainIdx++;
  }
  while (copyArrIdx <= middleIdx) {
    mainArray[mainIdx] = copyArray[copyArrIdx];
    mainIdx++;
    copyArrIdx++;
  }
  while (secondArrIdx <= endIdx) {
    mainArray[mainIdx] = copyArray[secondArrIdx];
    secondArrIdx++;
    mainIdx++;
  }
};
// console.log(mergeSort([6, 4, 1, 55, 1, 35, 28, 2]));
