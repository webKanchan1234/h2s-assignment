// src/utils/simpleSearch.js
const searchProducts=(search, products,productMap) =>{
  if (!search || !search.trim()) return products;

  const q = search.toLowerCase();

  if(productMap.has(q)){
    return [productMap.get(q)]
  }

  return products.filter(
    (p) =>
      p.id.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}


export default searchProducts