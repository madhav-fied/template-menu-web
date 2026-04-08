import type { ItemProps } from "./Item"
import Item from "./Item"

interface ItemLayoutProps {
    items: Array<ItemProps>
}

export default function ItemLayout({ items }: ItemLayoutProps) {
    return (
        <div>
            {
                items.map((item, idx) => {
                    return (
                        <div>
                            <Item key={idx.toString()} {...item} />
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}