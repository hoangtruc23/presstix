export const formatPrice = (price) => {
    if ((typeof(price)) === 'string') {
        price = Number(price);
    }
    return price.toLocaleString();
};