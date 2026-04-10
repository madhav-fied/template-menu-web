import type { ItemProps } from "./Item"
import Item from "./Item"

interface ItemLayoutProps {
    items: Array<ItemProps>
    cart: Record<string, number>
    onAdd: (name: string) => void
    onRemove: (name: string) => void
}

export default function ItemLayout({ items, cart, onAdd, onRemove }: ItemLayoutProps) {
    if (items.length === 0) {
        return (
            <main className="max-w-2xl mx-auto w-full px-4 py-16 flex-1 flex items-start justify-center">
                <p className="text-warm-gray text-sm tracking-wide">no items match the selected filters</p>
            </main>
        )
    }

    const categoryOrder: string[] = [];
    const grouped: Record<string, ItemProps[]> = {};

    for (const item of items) {
        if (!grouped[item.category]) {
            grouped[item.category] = [];
            categoryOrder.push(item.category);
        }
        grouped[item.category].push(item);
    }

    return (
        <main className="max-w-2xl mx-auto w-full px-4 py-8 flex-1">
            {categoryOrder.map((category) => (
                <section key={category} className="mb-10">
                    <div className="category-divider">
                        <h2 className="text-sm font-bold tracking-widest text-espresso uppercase px-2 whitespace-nowrap">
                            {category}
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {grouped[category].map((item) => (
                            <Item
                                key={item.name}
                                {...item}
                                qty={cart[item.name] ?? 0}
                                onAdd={() => onAdd(item.name)}
                                onRemove={() => onRemove(item.name)}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </main>
    )
}
