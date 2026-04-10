"use client"
import { useState } from "react"
import type { ItemProps } from "./Item"

interface CartProps {
    cart: Record<string, number>
    items: Array<ItemProps>
}

export default function Cart({ cart, items }: CartProps) {
    const [open, setOpen] = useState(false)

    const cartItems = items.filter((i) => (cart[i.name] ?? 0) > 0)
    const totalCount = cartItems.reduce((sum, i) => sum + cart[i.name], 0)

    if (totalCount === 0) return null

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-5 z-40 flex items-center gap-2 bg-espresso text-cream px-4 py-3 rounded-full shadow-lg active:scale-95 transition-transform"
                aria-label="Open cart"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13H5.4M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
                <span className="text-sm font-semibold tabular-nums">{totalCount}</span>
            </button>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Bottom sheet */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-50 bg-cream rounded-t-2xl shadow-xl transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}
            >
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-espresso/20" />
                </div>

                <div className="px-5 pb-2 pt-1 flex items-center justify-between">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-espresso">Your Order</h2>
                    <button onClick={() => setOpen(false)} className="text-warm-gray text-xl leading-none">×</button>
                </div>

                <ul className="px-5 pb-6 space-y-3 max-h-72 overflow-y-auto">
                    {cartItems.map((item) => (
                        <li key={item.name} className="flex items-center justify-between">
                            <span className="text-sm text-espresso leading-snug flex-1 pr-4">{item.name}</span>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-warm-gray tabular-nums">×{cart[item.name]}</span>
                                <span className="text-sm font-semibold text-espresso tabular-nums">
                                    ₹{item.price * cart[item.name]}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mx-5 mb-6 pt-3 border-t border-divider flex items-center justify-between">
                    <span className="text-xs tracking-widest uppercase text-warm-gray">Total</span>
                    <span className="text-base font-bold text-espresso tabular-nums">
                        ₹{cartItems.reduce((sum, i) => sum + i.price * cart[i.name], 0)}
                    </span>
                </div>
            </div>
        </>
    )
}
