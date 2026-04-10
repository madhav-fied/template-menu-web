"use client"
import { useState, useMemo } from "react"
import FilterBar from "./Filters"
import ItemLayout from "./ItemLayout"
import Cart from "./Cart"
import type { ItemProps } from "./Item"

interface MenuViewProps {
    items: Array<ItemProps>
    filterCategories: Array<{ name: string }>
    filterChips: Array<{ name: string }>
}

export default function MenuView({ items, filterCategories, filterChips }: MenuViewProps) {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set())
    const [cart, setCart] = useState<Record<string, number>>({})

    const toggleChip = (chip: string) => {
        setSelectedChips((prev) => {
            const next = new Set(prev)
            if (next.has(chip)) next.delete(chip)
            else next.add(chip)
            return next
        })
    }

    const addToCart = (name: string) => {
        setCart((prev) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }))
    }

    const removeFromCart = (name: string) => {
        setCart((prev) => {
            const qty = (prev[name] ?? 0) - 1
            if (qty <= 0) {
                const next = { ...prev }
                delete next[name]
                return next
            }
            return { ...prev, [name]: qty }
        })
    }

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
            const chipMatch = selectedChips.size === 0 || [...selectedChips].every((chip) => item.chips.includes(chip))
            return categoryMatch && chipMatch
        })
    }, [items, selectedCategory, selectedChips])

    return (
        <>
            <FilterBar
                filterCategories={filterCategories}
                filterChips={filterChips}
                selectedCategory={selectedCategory}
                selectedChips={selectedChips}
                onCategoryChange={setSelectedCategory}
                onChipToggle={toggleChip}
            />
            <ItemLayout
                items={filteredItems}
                cart={cart}
                onAdd={addToCart}
                onRemove={removeFromCart}
            />
            <Cart cart={cart} items={items} />
        </>
    )
}
