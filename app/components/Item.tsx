export interface ItemProps {
    name: string
    price: number
    category: string
    chips: Array<string>
}


export default function Item({ name, price, category, chips }: ItemProps) {
    return (
        <div>
            <div>
                {
                    chips.map((chip) => {
                        return (
                            <div key={chip}>
                                {chip}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {name} {price}
            </div>
            <div>
                {category}
            </div>
        </div>
    )
}