//Quick sort
// takes pivot and two pointers(LP, RP). Sorted respectively to the pivot, pointer values will be moved either to the left or right sides of the pivot
// continue doing it with sub arrays until all of the numbers being sorted.
// Time Complexity: worst case - O(N^2) time, best case O(N log(N)), average case O(N log(N)) - mathematically proven
// Space Complexity -  O(log(N)) - recursive solution for subarrays in place.

export default function quickSort(array) {
  let steps = [];
  helperSort(array, 0, array.length - 1, steps);
  return steps;
}
const helperSort = (array, startIdx, endIdx, steps) => {
  if (startIdx >= endIdx) return;

  let pivotIdx = startIdx;
  let leftPoint = startIdx + 1;
  let rightPoint = endIdx;

  while (leftPoint <= rightPoint) {
    if (
      array[leftPoint] > array[pivotIdx] &&
      array[rightPoint] < array[pivotIdx]
    ) {
      steps.push([leftPoint, rightPoint]);
      steps.push([leftPoint, rightPoint]);
      steps.push([leftPoint, array[rightPoint]]);
      steps.push([rightPoint, array[leftPoint]]);
      [array[leftPoint], array[rightPoint]] = [
        array[rightPoint],
        array[leftPoint],
      ];
    }
    if (array[leftPoint] <= array[pivotIdx]) {
      leftPoint++;
    }
    if (array[rightPoint] >= array[pivotIdx]) {
      rightPoint--;
    }
  }
  steps.push([pivotIdx, rightPoint]);
  steps.push([pivotIdx, rightPoint]);
  steps.push([pivotIdx, array[rightPoint]]);
  steps.push([rightPoint, array[pivotIdx]]);
  [array[pivotIdx], array[rightPoint]] = [array[rightPoint], array[pivotIdx]];
  const smallestSubArray =
    rightPoint - 1 - startIdx < endIdx - (rightPoint + 1);
  if (smallestSubArray) {
    helperSort(array, startIdx, rightPoint - 1, steps);
    helperSort(array, rightPoint + 1, endIdx, steps);
  } else {
    helperSort(array, rightPoint + 1, endIdx, steps);
    helperSort(array, startIdx, rightPoint - 1, steps);
  }
};
