import React, { useMemo, useState } from 'react'
import Header from '../components/header/Header'
import StatsCards from '../components/stats/StatsCards'
import generateMockProducts from '../utils/generateMockProducts'
import ProductTable from '../components/productTable/ProductTable'
import useDebounce from '../hooks/useDebounce'
import searchProducts from '../utils/searchProducts'

const { products, productMap, categories } = generateMockProducts(1000)


const Dashboard = ({ setOpen }) => {
  const [search, setSearch] = useState("")

  const searchedKey=useDebounce(search,300)
  
  // console.log(prodMap)
  // console.log(productMap)

  const filter=useMemo(()=>searchProducts(searchedKey,products,productMap),[searchedKey,products,productMap])



  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStock = products.filter((p) => p.stock < 10).length;
  const categoriesCount = categories.length;





  return (
    <div className='p-4 md:p-6'>
      <Header setOpen={setOpen} search={search} setSearch={setSearch} />

      <StatsCards
        totalProducts={totalProducts}
        totalRevenue={totalRevenue}
        lowStock={lowStock}
        categoriesCount={categoriesCount}
      />

      <ProductTable products={filter} categories={categories} />

    </div>
  )
}

export default Dashboard