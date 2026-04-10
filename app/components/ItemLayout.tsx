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
                        <div key={idx.toString()}>
                            <Item {...item} />
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}