interface FilterChip {
    name: string
}

interface FilterCategory {
    name: string
}

interface FilterBarProps {
    filter_categories: Array<FilterChip>,
    filter_chips: Array<FilterCategory>,
}

export default function FilterBar({ filter_categories, filter_chips }: FilterBarProps) {
    return (
        <div>
            <div>
                {
                    filter_chips.map((chip) => {
                        return (
                            <div key={chip.name}>{chip.name}</div>
                        )
                    })
                }
            </div>
            <div>
                <select name="category" id="categories">
                    {
                        filter_categories.map((category, idx) => {
                            return (
                                <option key={idx.toString()} value={category.name}>{category.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    );
}
