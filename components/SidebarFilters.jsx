"use client";
import { memo, useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const SidebarFilters = ({ onFilterChange }) => {
    const [openSection, setOpenSection] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        club: [],
        nationalTeam: [],
        priceRange: "",
        size: [],
        maxPrice: 2000,
    });

    useEffect(() => {
        onFilterChange?.(selectedFilters);
    }, [selectedFilters, onFilterChange]);

    const toggleSection = (section) =>
        setOpenSection((prev) => (prev === section ? null : section));

    const handleCheckboxChange = (section, value) => {
        setSelectedFilters((prev) => {
            const updated = prev[section].includes(value)
                ? prev[section].filter((v) => v !== value)
                : [...prev[section], value];
            return { ...prev, [section]: updated };
        });
    };

    const handlePriceChange = (value) =>
        setSelectedFilters((prev) => ({ ...prev, maxPrice: Number(value) }));

    const FilterSection = memo(({ title, section, children }) => (
        <div className="border-b border-white/20 py-3">
            <button
                onClick={() => toggleSection(section)}
                className="flex justify-between items-center w-full text-white/90 hover:text-green-400 transition-colors duration-300 cursor-pointer"
            >
                <span className="font-semibold tracking-wide">{title}</span>
                {openSection === section ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${openSection === section ? "max-h-96 mt-3" : "max-h-0"
                    }`}
            >
                {children}
            </div>
        </div>
    ));

    return (
        <aside className="w-full md:w-72 p-5 rounded-2xl border border-white/30 
            bg-white/10 backdrop-blur-2xl shadow-xl text-white sticky top-28 
            h-fit space-y-3 mb-8 overflow-y-auto overflow-x-hidden 
            scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

            <h2 className="text-xl font-bold mb-2 text-green-400">Filters</h2>

            {/* Category */}
            <FilterSection title="Category" section="category">
                <div className="space-y-2 text-sm">
                    {["T-Shirt", "Jersey"].map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedFilters.category.includes(item)}
                                onChange={() => handleCheckboxChange("category", item)}
                                className="accent-green-500 cursor-pointer"
                            />
                            {item}
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Clubs */}
            <FilterSection title="Football Clubs" section="club">
                <div className="space-y-2 text-sm">
                    {[
                        "Real Madrid",
                        "Barcelona",
                        "Manchester United",
                        "Liverpool",
                        "Chelsea",
                        "Arsenal",
                        "Juventus",
                        "Inter Milan",
                        "AC Milan",
                        "PSG",
                        "Bayern Munich",
                    ].map((club) => (
                        <label key={club} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedFilters.club.includes(club)}
                                onChange={() => handleCheckboxChange("club", club)}
                                className="accent-green-500 cursor-pointer"
                            />
                            {club}
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* National Teams */}
            <FilterSection title="National Teams" section="nationalTeam">
                <div className="space-y-2 text-sm">
                    {[
                        "Argentina",
                        "Brazil",
                        "France",
                        "Germany",
                        "Portugal",
                        "England",
                        "Spain",
                        "Italy",
                    ].map((team) => (
                        <label key={team} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedFilters.nationalTeam.includes(team)}
                                onChange={() => handleCheckboxChange("nationalTeam", team)}
                                className="accent-green-500 cursor-pointer"
                            />
                            {team}
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Size */}
            <FilterSection title="Size" section="size">
                <div className="space-y-2 text-sm">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <label key={size} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedFilters.size.includes(size)}
                                onChange={() => handleCheckboxChange("size", size)}
                                className="accent-green-500 cursor-pointer"
                            />
                            {size}
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Max Price Slider */}
            <FilterSection title="Max Price (₹)" section="maxPrice">
                <div className="p-1">
                    <div className="flex items-center justify-between text-sm text-white/60 mb-1">
                        <span>₹800</span>
                        <span>₹{selectedFilters.maxPrice}</span>
                    </div>
                    <input
                        type="range"
                        min="800"
                        max="2000"
                        step="50"
                        value={selectedFilters.maxPrice}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="w-full accent-green-500 cursor-pointer"
                    />
                </div>
            </FilterSection>

            {/* Clear Filters */}
            <button
                onClick={() =>
                    setSelectedFilters({
                        category: [],
                        club: [],
                        nationalTeam: [],
                        priceRange: "",
                        size: [],
                        maxPrice: 2000,
                    })
                }
                className="mt-4 w-full py-2 bg-green-500 hover:bg-green-600 
                    text-white font-semibold rounded-full transition-all duration-300"
            >
                Clear All
            </button>
        </aside>
    );
};

export default SidebarFilters;