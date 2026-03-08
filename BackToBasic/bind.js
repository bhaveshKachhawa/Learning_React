function calculateTax(taxRate, amount) {
  const total = amount + amount * taxRate;
  console.log(`The total price with ${taxRate * 100}% tax is: ${total}`);
}

const calculateGST = calculateTax.bind(null, 0.18);
const calculateVAT = calculateTax.bind(null, 0.05);

calculateGST(100);
calculateVAT(100);
