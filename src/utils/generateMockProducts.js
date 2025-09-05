
const categories = ["Mobiles", "Laptops", "Tablets", "Accessories", "Wearables"];
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateMockProducts = (count = 1000) => {

    const products = []
    const productMap = new Map()
    const categorySet = new Set()
    const catLength = categories.length

    for (let i = 1; i <= count; i++) {
        const category = categories[i % catLength]
        categorySet.add(category)

        const newProduct = {
            id: `${String(i)}`,
            image: `https://picsum.photos/seed/${i}/120/80`,
            name: `Product ${i}`,
            category: category,
            price: +(randomNum(50, 2000) + Math.random()).toFixed(2),
            stock: randomNum(0, 200),
            status: Math.random() > 0.2 ? "active" : "inactive",
        }

        products.push(newProduct)
        productMap.set(newProduct.id,newProduct)
    }

    return {products,productMap, categories:[...categorySet]}


}


export default generateMockProducts