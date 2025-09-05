import React, { useEffect, useMemo, useState } from 'react'
import paginateData from '../../utils/paginateData'
import { useCartDispatch } from '../cart/CartProvider'
import Modal from '../common/Modal'

const ProductTable = ({ products, categories }) => {
    const dispatch = useCartDispatch()
    const [selectedProduct, setSelectedProduct] = useState(null);

    console.log(selectedProduct)

    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const [sort, setSort] = useState({
        key: null,
        dir: "ASC"
    })
    const [filterProduct, setFilterProduct] = useState("")

    // console.log(size)

    const totalPages = Math.ceil(products.length / size);

    const [columns, setColumns] = useState([
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "image", label: "Image" },
        { key: "price", label: "Price" },
        { key: "category", label: "Category" },
        { key: "stock", label: "Stock" },
        { key: "status", label: "Status" },
    ])

    const filteredProducts = useMemo(() => {
        if (!filterProduct) return products; // no filter → all
        return products.filter((p) => p.category === filterProduct);
    }, [products, filterProduct]);


    const sortedProducts = useMemo(() => {
        if (!sort.key) return filteredProducts;
        return [...filteredProducts].sort((a, b) => {
            let aVal = a[sort.key];
            let bVal = b[sort.key];
            // Handle numbers correctly
            if (sort.key === "price" || sort.key === "stock" || sort.key === "id") {
                aVal = Number(aVal);
                bVal = Number(bVal);
            }

            // Handle strings case-insensitively
            if (typeof aVal === "string") aVal = aVal.toLowerCase();
            if (typeof bVal === "string") bVal = bVal.toLowerCase();
            if (aVal < bVal) return sort.dir === "ASC" ? -1 : 1;
            if (aVal > bVal) return sort.dir === "ASC" ? 1 : -1;
            return 0;
        });
    }, [filteredProducts, sort]);




    const handlePageSize = (e) => {
        setSize(Number(e.target.value));
        setPage(1)
    }



    const paged = useMemo(() => paginateData(sortedProducts, page, Number(size)), [sortedProducts, page, Number(size)])


    const handleSort = (key) => {
        setSort(prev => {
            if (prev.key === key && prev.dir === "ASC") {
                return { key, dir: "DESC" }
            }
            return { key, dir: "ASC" }
        })
    }

    // console.log(sort)

    const handleDragStart = (e, src) => {
        e.dataTransfer.setData("colIndex", src);

    }

    const handleDrop = (e, des) => {
        e.preventDefault();
        const src = e.dataTransfer.getData("colIndex");
        if (src === undefined) return;
        const cols = [...columns];
        const [moved] = cols.splice(src, 1);
        cols.splice(des, 0, moved);
        setColumns(cols);
    };

    const allowDrop = (e) => e.preventDefault();




    return (
        <>
            <div className='flex justify-end mb-1'>
                <select
                    value={filterProduct}
                    onChange={(e) => setFilterProduct(e.target.value)}
                    className="px-3 py-1 border rounded m-2 bg-red"
                >
                    <option value="">All</option> {/* Show all products */}
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>


            <div className='overflow-x-auto border rounded  '>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className="bg-gray-100">
                            {columns.map((col, idx) => (
                                <th
                                    key={col.key}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, idx)}
                                    onDragOver={allowDrop}
                                    onDrop={(e) => handleDrop(e, idx)}
                                    onClick={() => handleSort(col.key)}
                                    className="p-2 text-center cursor-move transition-colors hover:bg-indigo-100 select-none"
                                >
                                    {col.key}
                                    {sort.key === col.key &&
                                        (sort.dir === "ASC" ? " 🔼" : " 🔽")}
                                </th>
                            ))}
                            <th className="p-2 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paged.length > 0 ? (
                            paged.map((prod) => (
                                <tr key={prod.id} className="border-t hover:bg-gray-50 transition">
                                    {columns.map((col) => (
                                        <td key={col.key} className="p-2 text-center">
                                            {col.key === "image" ? (
                                                <img
                                                    src={prod.image}
                                                    alt={prod.name}
                                                    loading="lazy"
                                                    className="w-20 h-12 object-cover rounded mx-auto"
                                                />
                                            ) : col.key === "price" ? (
                                                `₹${prod.price}`
                                            ) : (
                                                prod[col.key]
                                            )}
                                        </td>
                                    ))}
                                    <td className="p-2 flex gap-2 justify-center">
                                        <button
                                            className="px-2 py-1 bg-green-600 text-white rounded"
                                            onClick={() => dispatch({ type: "ADD", product: prod })}
                                        >
                                            Add
                                        </button>
                                        <button
                                            onClick={() => setSelectedProduct(prod)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded"
                                        >
                                            View
                                        </button>
                                        <button className="px-2 py-1 bg-yellow-500 text-white rounded">
                                            Edit
                                        </button>
                                        <button className="px-2 py-1 bg-red-600 text-white rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="p-4 text-center text-gray-500"
                                >
                                    No Products
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
                {
                    paged.length > 0 ? (<div className='flex items-center justify-center p-2 '>
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50 mr-1"

                        >prev</button>
                        <span>Page {page} / {totalPages}</span>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50 mr-1">next</button>
                        <div>
                            <select name="" value={size} onChange={handlePageSize} className="px-3 py-1 border rounded disabled:opacity-50">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>) : (<div className='w-full text-2xl flex items-center justify-center m-auto'>
                        <h3>No Products</h3>
                    </div>)
                }
                {selectedProduct && (
                    <Modal selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                )}

            </div>
        </>
    )
}

export default ProductTable