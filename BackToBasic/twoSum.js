const twoSum = (nums, target) => {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    const complement = target - value;

    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[value] = i;
  }
};
