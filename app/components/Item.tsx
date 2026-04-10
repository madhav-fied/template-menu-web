export interface ItemProps {
    name: string
    price: number
    category: string
    chips: Array<string>
    image?: string
}

export const chipClassMap: Record<string, string> = {
    veg: "chip-veg",
    egg: "chip-egg",
    "non-veg": "chip-non-veg",
    spicy: "chip-spicy",
    "must-try": "chip-must-try",
};

interface ItemComponentProps extends ItemProps {
    qty: number
    onAdd: () => void
    onRemove: () => void
}

export default function Item({ name, price, chips, image, qty, onAdd, onRemove }: ItemComponentProps) {
    return (
        <article className="border border-divider rounded-lg overflow-hidden bg-cream flex flex-col">
            {image ? (
                <img
                    src={image}
                    alt={name}
                    className="w-full h-36 object-cover"
                />
            ) : (
                <div className="w-full h-36 bg-cream-dark flex items-center justify-center">
                    <span className="text-warm-gray text-[10px] tracking-widest uppercase">no image</span>
                </div>
            )}
            <div className="p-3 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-espresso leading-snug">
                        {name}
                    </span>
                    <span className="text-sm font-semibold text-espresso-mid tabular-nums shrink-0">
                        &#8377;{price}
                    </span>
                </div>
                {chips.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {chips.map((chip) => (
                            <span
                                key={chip}
                                className={`inline-block text-[10px] font-medium leading-none rounded-full px-2 py-0.5 border ${chipClassMap[chip] ?? "bg-cream-dark text-warm-gray border-divider"}`}
                            >
                                {chip}
                            </span>
                        ))}
                    </div>
                )}

                {/* Add / qty controls */}
                <div className="mt-auto pt-3 flex justify-end">
                    {qty === 0 ? (
                        <button
                            onClick={onAdd}
                            className="text-xs font-semibold text-espresso border border-espresso/40 rounded-full px-3 py-1 active:scale-95 transition-transform"
                        >
                            + Add
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 border border-espresso/30 rounded-full px-2 py-0.5">
                            <button onClick={onRemove} className="w-5 h-5 flex items-center justify-center text-espresso text-base leading-none">−</button>
                            <span className="text-xs font-semibold text-espresso tabular-nums w-3 text-center">{qty}</span>
                            <button onClick={onAdd} className="w-5 h-5 flex items-center justify-center text-espresso text-base leading-none">+</button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}
