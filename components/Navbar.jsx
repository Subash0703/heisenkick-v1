"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cartCount, setCartCount] = useState(3);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [menuOpen]);

    useEffect(() => {
        if (search.trim().length > 0) {
            const filtered = mockProducts.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [search]);

    const mockProducts = [
        { id: 1, name: "Adidas Predator", image: "/images/boots1.jpg", price: "₹4,999" },
        { id: 2, name: "Nike Mercurial", image: "/images/boots2.jpg", price: "₹5,499" },
        { id: 3, name: "Puma Ultra", image: "/images/boots3.jpg", price: "₹3,899" },
        { id: 4, name: "Nivia Dominator", image: "/images/boots4.jpg", price: "₹2,499" },
    ];

    return (
        <header className="sticky top-4 z-50 px-4 sm:px-6 md:px-10">
            <div className="flex items-center justify-between px-6 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-2xl shadow-lg transition-all duration-300" >
                <div className="text-white font-extrabold text-2xl tracking-wide">
                    <Link href="/" className="relative group hover:scale-105 transition-all duration-300">HeisenKick</Link>
                </div>

                <nav className="hidden md:flex items-center justify-end-safe w-full text-white font-light text-lg">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="relative group hover:scale-105 transition-all duration-300">
                            <span className="text-white/90 group-hover:text-white transition-colors duration-300">Home</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/shop" className="relative group hover:scale-105 transition-all duration-300">
                            <span className="text-white/90 group-hover:text-white transition-colors duration-300">Shop</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/category" className="relative group hover:scale-105 transition-all duration-300">
                            <span className="text-white/90 group-hover:text-white transition-colors duration-300">Category</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/contact" className="relative group hover:scale-105 transition-all duration-300">
                            <span className="text-white/90 group-hover:text-white transition-colors duration-300">Contact us</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 ml-8">
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-4 pr-10 py-2 rounded-full bg-white/5 text-white placeholder-white/80 
                                focus:outline-none focus:ring-2 focus:ring-white/60 border border-white/30
                                backdrop-blur-xl transition-all duration-300 hover:bg-white/30"
                            />
                            {search && search?.length > 0 ?
                                <MdArrowDropDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 text-lg" /> :
                                <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 text-lg" />
                            }
                            {filteredProducts.length > 0 && (
                                <div className="absolute top-full mt-2 left-0 w-full bg-white/15 backdrop-blur-2xl border border-white/30 rounded-xl shadow-lg z-50 overflow-hidden">
                                    {filteredProducts.map((item) => (
                                        <Link
                                            href={`/product/${item.id}`}
                                            key={item.id}
                                            className="flex items-center justify-between px-3 py-2 hover:bg-white/20 transition-all duration-300"
                                            onClick={() => setSearch("")}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={item.image} alt={item.name} className="w-8 h-8 rounded-md object-cover" />
                                                <span className="text-white text-sm">{item.name}</span>
                                            </div>
                                            <span className="text-white/90 text-sm">{item.price}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="relative cursor-pointer hover:scale-110 transition-transform duration-300">
                            <Link href="/cart">
                                <FaShoppingCart className="text-white text-xl" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </nav>
                <button onClick={() => setMenuOpen(true)} className="md:hidden text-white text-2xl focus:outline-none" >
                    <FiMenu />
                </button>
            </div>
            {/* Mobile View */}
            <div className={`fixed top-0 right-0 h-screen w-72 sm:w-80 bg-white/10 backdrop-blur-2xl border-l border-white/30 
                    shadow-2xl transform transition-transform duration-500 ease-in-out z-40
                    ${menuOpen ? "translate-x-0" : "translate-x-full"}`} >
                <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-3 text-white text-2xl">
                    <FiX />
                </button>

                <div className="flex flex-col h-full space-y-8 text-white text-lg font-medium p-4">
                    <div className="relative w-64 mt-10">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 rounded-full bg-white/5 text-white placeholder-white/80
                            focus:outline-none focus:ring-2 focus:ring-white/60 border border-white/30
                            backdrop-blur-xl transition-all duration-300 hover:bg-white/30"
                        />
                        {search && search?.length > 0 ?
                            <MdArrowDropDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 text-lg" /> :
                            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 text-lg" />
                        }
                    </div>
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>
                    <Link href="/shop" onClick={() => setMenuOpen(false)}>
                        Shop
                    </Link>
                    <Link href="/category" onClick={() => setMenuOpen(false)}>
                        Category
                    </Link>
                    <Link href="/contact" onClick={() => setMenuOpen(false)}>
                        Contact us
                    </Link>
                </div>
            </div>

            {menuOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden" onClick={() => setMenuOpen(false)}></div>
            )}
        </header>
    );
};

export default Navbar;