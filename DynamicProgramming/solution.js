/*
  Greetings, algorithmics!

  Your task today is to find the minimum path through a grid 
  of numbers, top to bottom, where at each row, you are permitted 
  to move straight down, down and left, or down and right.

  This is a famous problem for introducing Dynamic Programming,
  a technique for solving recursive problems more optimally.  
  When we do DP, we try not to solve the same sub-problem twice, 
  and we build solutions from the bottom up instead of the top down.

  INPUT:  A two-dimensional grid of size NxN, where N is the `size` 
          variable listed below.
  
  OUTPUT: A single array, listing the columns that you pass through.  
          For example, [5, 4, 4, 5..] means:
            - in row 0, you are in column 5
            - in row 1, you are in column 4
            - in row 2, you are in column 4
            - in row 3, you are in column 5
          The output should be of length equal to the `size` variable.
*/

var size = 12;

var solution = function(input) {
    for (var row = size -2; row >= 0; row--) {
        for (var col = 0; col < size; col ++) {
            var left = input[row+1][col-1] || Infinity;
            var center = input[row+1][col];
            var right = input[row+1][col+1] || INfinity;

            //Update square above
            input[row][col] += Math.min.apply(null, [left, center, right]);
        }
    }
}
//And then run greedy algo on the resulting output

var bestPath = function(input) {

    for (var j = input.length - 1; j >= 0; j--) {
        var currentRow = input[j];

        for (var i = 0; i < currentRow.length; i++) {
            var bestPath;
            if (i = 0) {
                bestPath = Math.min(input[currentRow + 1][i], input[currentRow + 1][i + 1]);
            } else if (i = input.length - 1) {
                bestPath = Math.min(input[currentRow + 1[i]], input[currentRow + 1][i-1]);
            } else {
                bestPath = Math.min(input[currentRow+1][i], input[currentRow + 1[i+1], input[currentRow + 1[i-1]]);
            }

            currentRow[i] += bestPath;
        }
    }
};

var findMinimumPath = function(input) {

  // This is the "greedy" solution - it's not very good, because
  // it never "looks ahead" to the rows yet to come.
  // But it might be of some help to you as you write your own!

  // We'll store our steps in this array.
  var solution = [];

  // Walk through each column of the first row, and pick the
  // one with the lowest value as our starting column.
  var currentCol = 0;
  var firstRow = input[0];
  for (var i = 1; i < size; i++) {
    if (firstRow[i] < firstRow[currentCol]) {
      currentCol = i;
    }
  }
  solution.push(currentCol);

  // Now, for each subsequent row, and look at the three
  // columns we can visit from our current location.
  for (var y = 1; y < size; y++) {
    var currentRow = input[y];
    
    // Figure out which column has the lowest value.
    // If the value at that location is undefined, pretend
    // that it's Infinity, which will never be the lowest.
    var left = currentRow[currentCol - 1] || Infinity;
    var below = currentRow[currentCol];
    var right = currentRow[currentCol + 1] || Infinity;
    var min = Math.min(left, below, right);

    // If the min value is from the left column, shift our
    // current column to the left.  Same for the right.
    if (min == left) {
      currentCol--;
    } else if (min == right) {
      currentCol++;
    }

    // Push our current column into our solution array.
    solution.push(currentCol);
  }
  return solution;
};
