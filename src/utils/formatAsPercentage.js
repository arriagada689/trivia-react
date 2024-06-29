function formatAsPercentage(decimalNumber) {
    const percentage = (decimalNumber * 100).toFixed(0); // Multiply by 100 and round to the nearest whole number
    return `${percentage}%`; // Return the percentage as a string with a '%' sign
}


export default formatAsPercentage