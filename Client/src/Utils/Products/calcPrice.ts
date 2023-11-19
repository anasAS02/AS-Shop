export const calcPrice = (price: number, des: number) => {
    return price - (price * des / 100);
}    