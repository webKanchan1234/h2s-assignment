import React from 'react'

const Modal = ({selectedProduct,setSelectedProduct}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                {/* Close button */}
                <button
                    className="absolute top-2 right-2 h-5 w-5 rounded-full bg-red-400 text-white cursor-pointer"
                    onClick={() => setSelectedProduct(null)}
                >
                    ✖
                </button>

                <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>

                <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded mb-4"
                />

                <p><strong>ID:</strong> {selectedProduct.id}</p>
                <p><strong>Category:</strong> {selectedProduct.category}</p>
                <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
                <p><strong>Stock:</strong> {selectedProduct.stock}</p>
                <p><strong>Status:</strong> {selectedProduct.status}</p>
            </div>
        </div>
    )
}

export default Modal