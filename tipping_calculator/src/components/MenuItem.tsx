import type { MenuItem } from "../types"

type MenuItemProps = {
    item : MenuItem, 
}

export default function MenuItem({item} : MenuItemProps) {
    return (
        <div key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.price}</span>
        </div>
    )
}
