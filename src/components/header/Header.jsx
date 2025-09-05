import React from 'react'
import { useCartState } from '../cart/CartProvider'

const Header = ({ setOpen, search, setSearch }) => {
    const { products } = useCartState()

    const itemCount = Array.from(products.values()).reduce(
        (sum, entry) => sum + entry.qty,
        0
    );


    return (
        <header className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-3 bg-gray-300'>

            {/* navigation */}
            <span className='text-xl font-bold text-indigo-600 cursor-pointer'>Admin Dashboard</span>
            <nav className='hidden md:flex gap-3 text-gray-600'>
                <a href="" >Products</a>
                <a href="" >Orders</a>
            </nav>

            {/* search bar */}
            <div className="flex-1">
                <input
                    type="text"
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Search products by id, name, category..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </div>
            <div className='flex items-center gap-2'>
                <button className="relative px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer"
                    onClick={setOpen}
                >View cart
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </button>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s" alt="User Avatar"
                loading="lazy"
                    className="w-10 h-10 rounded-full border" />
            </div>
        </header>
    )
}

export default Header