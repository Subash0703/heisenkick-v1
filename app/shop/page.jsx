"use client";
import SidebarFilters from "@/components/SidebarFilters";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { SlidersHorizontal } from "lucide-react";

const mockProducts = [
    { id: 1, name: "Real Madrid Home Jersey 24/25", price: 1799, image: "https://picsum.photos/200/300?1", category: "Jersey", club: "Real Madrid", size: ["S", "M", "L", "XL"] },
    { id: 2, name: "Barcelona Away Jersey 24/25", price: 1899, image: "https://picsum.photos/200/300?2", category: "Jersey", club: "Barcelona", size: ["S", "M", "L", "XL"] },
    { id: 3, name: "Argentina World Cup Jersey", price: 1599, image: "https://picsum.photos/200/300?3", category: "Jersey", nationalTeam: "Argentina", size: ["M", "L", "XL"] },
    { id: 4, name: "Brazil Home Jersey", price: 1699, image: "https://picsum.photos/200/300?4", category: "Jersey", nationalTeam: "Brazil", size: ["S", "M", "L", "XL"] },
    { id: 5, name: "Manchester United T-Shirt", price: 999, image: "https://picsum.photos/200/300?5", category: "T-Shirt", club: "Manchester United", size: ["S", "M", "L"] },
    { id: 6, name: "Chelsea Fan T-Shirt", price: 899, image: "https://picsum.photos/200/300?6", category: "T-Shirt", club: "Chelsea", size: ["S", "M", "L", "XL"] },
];

const ShopPage = () => {
    const [filters, setFilters] = useState({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleFilters = (updatedFilters) => setFilters(updatedFilters);

    const filteredProducts = mockProducts.filter((p) => {
        if (filters.category?.length && !filters.category.includes(p.category)) return false;
        if (filters.club?.length && !filters.club.includes(p.club)) return false;
        if (filters.nationalTeam?.length && !filters.nationalTeam.includes(p.nationalTeam)) return false;
        if (filters.size?.length && !p.size.some((s) => filters.size.includes(s))) return false;
        if (p.price > (filters.maxPrice ?? 2000)) return false;
        return true;
    });

    return (
        <div className="flex flex-col md:flex-row gap-4 px-4 pt-24 bg-gradient-to-br from-[#0b0b0f] to-[#13161d] text-white min-h-screen">
            {/* Sidebar (Desktop) */}
            <div className="hidden md:block md:w-[260px] flex-shrink-0">
                <SidebarFilters onFilterChange={handleFilters} />
            </div>

            {/* Mobile Filter Button */}
            <div className="md:hidden fixed top-20 left-0 right-0 z-30 px-4 my-3">
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
                >
                    <SlidersHorizontal size={18} /> Filter & Sort
                </button>
            </div>

            {/* Drawer (Mobile) */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDrawerOpen(false)}
                        />
                        <motion.div
                            className="fixed top-0 left-0 h-full w-4/5 sm:w-2/3 bg-[#181b22] shadow-2xl z-50 rounded-r-2xl border-r border-white/10 flex flex-col"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 90, damping: 18 }}
                        >
                            <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
                                <h2 className="text-lg font-semibold text-white/90">Filter & Sort</h2>
                                <button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="text-white/80 hover:text-green-400 transition"
                                >
                                    <FiX size={22} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto px-5 pb-10">
                                <SidebarFilters onFilterChange={handleFilters} />
                            </div>
                            <div className="p-5 bg-[#181b22]/90 border-t border-white/10">
                                <button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="w-full py-2 bg-green-500 hover:bg-green-600 rounded-full font-semibold text-white transition-all duration-300"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 md:mt-0 mb-20 self-start px-2 sm:px-4 md:px-6">
                {filteredProducts.length ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-lg flex flex-col hover:border-green-500/50 hover:shadow-green-500/10 transition-all duration-300 overflow-hidden"
                        >
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative w-full h-44 sm:h-48 md:h-52 overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </motion.div>
                            <div className="flex flex-col justify-between p-3 sm:p-4">
                                <div>
                                    <h3 className="font-medium text-sm sm:text-base text-white/90 leading-snug mb-1 line-clamp-2">{product.name}</h3>
                                    <p className="text-green-400 font-bold text-sm sm:text-base">₹{product.price}</p>
                                </div>
                                <button
                                    className="mt-3 py-1.5 sm:py-2 bg-green-500 hover:bg-green-600 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-300 cursor-pointer"
                                    onClick={() => alert(`${product.name} added to cart!`)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-white/70 text-lg">No products match your filters.</div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;