import React from 'react'

const StatsCards = ({
    totalProducts,
    totalRevenue,
    lowStock,
    categoriesCount,
}) => {
    const cards = [
        { label: "Total Products", value: totalProducts,bg:"bg-blue-500" },
        { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`,bg:"bg-green-500" },
        { label: "Low Stock Items", value: lowStock,bg:"bg-red-500" },
        { label: "Categories Count", value: categoriesCount,bg:"bg-yellow-500" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={`${card.bg} text-white p-4 rounded-lg shadow text-center`}
                >
                    <div className="text-2xl font-bold  overflow-auto text-center m-auto">{card.value}</div>
                    <div className="text-black-500 text-sm text-center">{card.label}</div>
                </div>
            ))}
        </div>
    );
}

export default StatsCards