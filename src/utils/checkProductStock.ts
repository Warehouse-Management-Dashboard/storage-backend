export const checkProductStock = (productStock: number, quantity: number) => {
    if(productStock < quantity) return false
    return true
}