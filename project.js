const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};
//deposit money
const deposit = () => {
  while (true) {
    const getDeposit = prompt("Enter the Deposit amount ");
    const deposit = parseFloat(getDeposit);
    if (isNaN(deposit) || deposit <= 0) {
      console.log("Invalid Deposit");
    } else {
      return deposit;
    }
  }
};
//Get lines
const getNumberOfLines = () => {
  while (true) {
    const getlines = prompt("Enter the number of line ");
    const lines = parseFloat(getlines);
    if (isNaN(lines) || lines <= 0 || lines >= 3) {
      console.log("Invalid Number of Lines");
    } else {
      return lines;
    }
  }
};
const getBet = (balance, lines) => {
  while (true) {
    const getBet = prompt("Enter the Bet per line");
    const Bet = parseFloat(getBet);
    if (isNaN(Bet) || Bet <= 0 || Bet >= balance / lines) {
      console.log("Invalid Try Again");
    } else {
      return Bet;
    }
  }
};
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const ramdomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[ramdomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(ramdomIndex, 1);
    }
  }
  return reels;
};
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};
const printRows = (rows) => {
  for (const row of rows) {
    let rowStr = "";
    for (const [i, symbol] of row.entries()) {
      rowStr += symbol;
      if (i != row.length - 1) {
        rowStr += "|";
      }
    }
    console.log(rowStr);
  }
};

const getWinning = (rows, bet, lines) => {
  let wining = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      wining += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return wining;
};
const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have a balance of $" + balance);
    const NumberOfLines = getNumberOfLines();
    const bet = getBet(balance, NumberOfLines);
    balance -= bet * NumberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winning = getWinning(rows, bet, NumberOfLines);
    balance += winning;
    console.log("YOU WOM $" + winning.toString);
    if (balance <= 0) {
      console.log("You ran out of money");
      break;
    }
    const playAgain = prompt("DO you want to play again(y/n)");

    if (playAgain != "y") {
      break;
    }
  }
};

game();
