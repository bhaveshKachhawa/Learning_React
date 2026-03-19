const account = {
  balance: 1000,
  withdraw: function (amount) {
    this.balance -= amount;
    console.log(`Remaining Balance: ${this.balance}`);
  },
};

const subtractMoney = account.withdraw.bind(account, 50);
console.log("Function is created, but balance is still 1000");

subtractMoney();
subtractMoney();
