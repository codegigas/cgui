import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import style from "./CheckboxMenu.module.css";

type TCheckboxItem = {
    label: string,
    value: string,
    checked: boolean,
    indeterminate?: boolean,
    children?: TCheckboxItem[]
};

type TCheckboxMenu = {
    checkboxItems: TCheckboxItem[]
};

type TDFS = {
    parent: TCheckboxItem | null,
    items: TCheckboxItem[],
    item: TCheckboxItem
};

type TDFSMarkAll = {
    parent: TCheckboxItem,
    items: TCheckboxItem[]
};

const CheckboxMenu = ({ checkboxItems }: TCheckboxMenu) => {
    const [_checkboxItems, _setCheckboxItems] = useState<TCheckboxItem[]>(checkboxItems);

    const DFSMarkAll = ({ parent, items }: TDFSMarkAll): TCheckboxItem[] | undefined => {
        const newItems: TCheckboxItem[] = [];
        const itemsLength = items.length;
        for (let i = 0; i < itemsLength; ++i) {
            const currItem = items[i];
            const newItem: TCheckboxItem = {
                label: currItem.label,
                value: currItem.value,
                checked: parent.checked
            };
            if (typeof currItem.children !== "undefined") {
                const newChildren = DFSMarkAll({
                    parent: newItem,
                    items: currItem.children
                })!;
                newItem.children = newChildren;
            }
            newItems.push(newItem);
        }
        return newItems;
    }

    const DFS = ({ parent, items, item }: TDFS): TCheckboxItem[] | undefined => {
        const newItems: TCheckboxItem[] = [];
        const itemsLength = items.length;
        for (let i = 0; i < itemsLength; ++i) {
            const currItem = items[i];
            const newItem: TCheckboxItem = {
                label: currItem.label,
                value: currItem.value,
                checked: currItem.checked
            };

            if (currItem === item) {
                // Toggle the clicked checkbox item checked state
                newItem.checked = !currItem.checked;
                if (typeof currItem.children !== "undefined") {
                    const newChildren = DFSMarkAll({
                        parent: newItem,
                        items: currItem.children
                    })!;
                    newItem.children = newChildren;
                }
            } else {
                if (typeof currItem.children !== "undefined") {
                    const newChildren = DFS({
                        parent: newItem,
                        items: currItem.children,
                        item: item
                    })!;

                    const countChildrenChecked = newChildren
                        .reduce((count, item) => count + (item.checked ? 1 : 0), 0);

                    // check parent if all children are checked, otherwise uncheck
                    if (newChildren.length === countChildrenChecked) {
                        newItem.checked = true;
                        // newItem.indeterminate = false;
                    } else {
                        newItem.checked = false;
                        // newItem.indeterminate = true;
                    }

                    newItem.children = newChildren;
                }
            }

            newItems.push(newItem);
        }

        return newItems;
    }

    const handleCheckboxChange = (item: TCheckboxItem) => {
        const newItems = DFS({
            parent: null,
            items: _checkboxItems,
            item: item
        })!;
        _setCheckboxItems(newItems);
    };

    const renderCheckboxItemsRecursively = (items: TCheckboxItem[]) => {
        return items.map((item) => {
            return (
                <div 
                    key={item.label}
                    className={style["checkbox-group"]}    
                >
                    <Checkbox
                        label={item.label}
                        checked={item.checked}
                        indeterminate={item.indeterminate}
                        onChange={handleCheckboxChange.bind(this, item)}
                    />
                    {item.children && renderCheckboxItemsRecursively(item.children)}
                </div>
            )
        });
    };

    return (
        <div className={style["checkbox-menu"]}>
            {renderCheckboxItemsRecursively(_checkboxItems)}
        </div>
    )
};

export default CheckboxMenu;
export { TCheckboxItem };