export const formatNumber = number => {
    return new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(number);
}