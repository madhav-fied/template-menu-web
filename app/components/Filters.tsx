"use client"
import { useState, useRef, useEffect } from "react"
import { chipClassMap } from "./Item"

// ─── Custom dropdown ───────────────────────────────────────────────────────────

interface DropdownOption {
    value: string
    label: string
}

interface CustomDropdownProps {
    value: string
    onChange: (value: string) => void
    options: DropdownOption[]
}

function CustomDropdown({ value, onChange, options }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const selectedLabel = options.find(o => o.value === value)?.label ?? value

    // Close on outside click or Escape
    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false) }
        document.addEventListener("mousedown", onMouseDown)
        document.addEventListener("keydown", onKeyDown)
        return () => {
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [])

    return (
        <div ref={containerRef} className="relative shrink-0">
            {/* Trigger button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-cream bg-espresso rounded-full pl-3 pr-2.5 py-1.5 cursor-pointer hover:bg-espresso-mid transition-colors"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {selectedLabel}
                <svg
                    className={`text-cream/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    aria-hidden="true"
                >
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <ul
                    role="listbox"
                    className="absolute top-full left-0 mt-1.5 z-50 min-w-full bg-cream border border-divider rounded-lg shadow-lg overflow-hidden py-1"
                >
                    {options.map(opt => (
                        <li key={opt.value} role="option" aria-selected={value === opt.value}>
                            <button
                                onClick={() => { onChange(opt.value); setIsOpen(false) }}
                                className={`w-full text-left px-3 py-1.5 text-xs tracking-wide whitespace-nowrap cursor-pointer transition-colors ${
                                    value === opt.value
                                        ? "bg-espresso text-cream font-semibold"
                                        : "text-espresso hover:bg-cream-dark"
                                }`}
                            >
                                {opt.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

// ─── Filter bar ────────────────────────────────────────────────────────────────

interface FilterChip { name: string }
interface FilterCategory { name: string }

interface FilterBarProps {
    filterCategories: Array<FilterCategory>
    filterChips: Array<FilterChip>
    selectedCategory: string
    selectedChips: Set<string>
    onCategoryChange: (category: string) => void
    onChipToggle: (chip: string) => void
}

export default function FilterBar({
    filterCategories,
    filterChips,
    selectedCategory,
    selectedChips,
    onCategoryChange,
    onChipToggle,
}: FilterBarProps) {
    const categoryOptions: DropdownOption[] = [
        { value: "all", label: "all" },
        ...filterCategories.map(c => ({ value: c.name, label: c.name })),
    ]

    return (
        <div className="sticky top-0 z-20 bg-cream border-b border-divider shadow-sm">
            <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center gap-3">
                <CustomDropdown
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    options={categoryOptions}
                />

                <div className="h-4 w-px bg-divider shrink-0" />

                {/* Chips — horizontally scrollable */}
                <div className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
                    {filterChips.map((chip) => {
                        const isActive = selectedChips.has(chip.name)
                        const colorClass = chipClassMap[chip.name] ?? "bg-cream-dark text-espresso-mid border-divider"
                        return (
                            <button
                                key={chip.name}
                                onClick={() => onChipToggle(chip.name)}
                                className={`text-xs rounded-full px-3 py-1 border transition-all cursor-pointer shrink-0 ${
                                    isActive
                                        ? `${colorClass} ring-1 ring-offset-1 ring-espresso-mid font-semibold`
                                        : `${colorClass} opacity-50 hover:opacity-80`
                                }`}
                            >
                                {chip.name}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
