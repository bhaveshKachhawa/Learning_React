export const useWinner = () => {
  return function fetchWinner(boxArr) {
    //for row
    let winner;
    for (let i = 0; i < boxArr.length; i++) {
      winner = boxArr[i][0];
      if (winner) {
        for (let j = 1; j < boxArr[i].length; j++) {
          if (winner !== boxArr[i][j]) {
            winner = null;
            break;
          }
        }
        if (winner) {
          break;
        }
      }
    }
    //for column
    if (!winner) {
      for (let i = 0; i < boxArr.length; i++) {
        winner = boxArr[0][i];
        if (winner) {
          for (let j = 1; j < boxArr[i].length; j++) {
            if (winner !== boxArr[j][i]) {
              winner = null;
              break;
            }
          }
          if (winner) break;
        }
      }
    }
    //for digonal
    if (!winner) {
      winner = boxArr[0][0];
      for (let i = 1; i < boxArr.length; i++) {
        if (winner !== boxArr[i][i]) {
          winner = null;
          break;
        }
      }
    }

    if (!winner) {
      winner = boxArr[0][boxArr.length - 1];
      for (let i = 1; i < boxArr.length; i++) {
        if (winner !== boxArr[i][boxArr.length - 1 - i]) {
          winner = null;
          break;
        }
      }
    }
    console.log(winner);
    return winner;
  };
};
