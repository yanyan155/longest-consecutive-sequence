module.exports = function longestConsecutiveLength(array) {
  if(array.length<3) {
    return array.length;
  }
  var addToSort = [];
  var count = 0;
  var firstIndex = 0;
  var lastIndex = array.length-1; 
  while((lastIndex - firstIndex > 1 || addToSort.length>0) && count<100) {
    count++;
    var checkingElem = array[lastIndex];
    var lowerI = [firstIndex, firstIndex];
    var higherI = [firstIndex, firstIndex];

    for (var i = firstIndex; i<lastIndex; i++) {
      if (array[i] >= checkingElem) {
        higherI[1]++;
      }
      if (array[i] < checkingElem && higherI[0] === higherI[1]) {

        lowerI[1]++;
        higherI[0]++;
        higherI[1]++;
      }
      if (array[i] < checkingElem && higherI[0] != higherI[1]) {

        var value  = array[i];
        array[i] = array[lowerI[1]];
        array[lowerI[1]] = value;

        lowerI[1]++;
        higherI[0]++;
        higherI[1]++;
      }
    }
    if (higherI[0] === higherI[1]) {

      lowerI[1]--;
    }
    if (higherI[1] != higherI[0]) {
      array[lastIndex] = array[higherI[0]];
      array[higherI[0]] = checkingElem;
      higherI[0]++;
    }
    if (lowerI[1] - lowerI[0] === 1 &&
      array[lowerI[0]] > array[lowerI[1]]) {

      var value = array[lowerI[0]];
      array[lowerI[0]] = array[lowerI[1]];
      array[lowerI[1]] = value;
    }
    if (higherI[1] - higherI[0] === 1 &&
      array[higherI[0]] > array[higherI[1]]) {

      var value = array[higherI[0]];
      array[higherI[0]] = array[higherI[1]];
      array[higherI[1]] = value;
    }
    var changes = false;
    if (lowerI[1] - lowerI[0] > 1) {
      
      firstIndex = lowerI[0];
      lastIndex = lowerI[1];
      changes = true;
    }
    if (higherI[1] - higherI[0] > 1) {
      addToSort.push([higherI[0], higherI[1]]);
     
    }
    if(!changes && addToSort.length>0) {
      var values = addToSort.pop();
      firstIndex = values[0];
      lastIndex = values[1];
    }
  }

  var delta = array[1] - array[0];
  var countMax = 2;
  var countTest = 2;

  for (var i = 2; i<array.length; i++) {
    var testdelta = array[i] - array[i-1];
    if (delta === testdelta) {
    	countTest++;
    }else {
    	if(countTest>countMax) {
    		countMax= countTest;
    	}
    	countTest = 2;
    	delta = testdelta;
    }
  }

  return countMax;
}
