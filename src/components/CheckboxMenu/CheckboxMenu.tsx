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
    item: TCheckboxItem,
    isElementFound: boolean
};

const DFS = ({ parent, items, item, isElementFound }: TDFS): TCheckboxItem[] | undefined => {
    const newItems: TCheckboxItem[] = [];
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
        const currItem = items[i];
        const newItem: TCheckboxItem = {
            label: currItem.label,
            value: currItem.value,
            checked: currItem.checked
        };

        if (isElementFound) {
            newItem.checked = parent!.checked
            if (typeof currItem.children !== "undefined") {
                const newChildren = DFS({
                    parent: newItem,
                    items: currItem.children,
                    item: item,
                    isElementFound: isElementFound
                })!;
                newItem.children = newChildren;
            }
            newItems.push(newItem);
        } else {
            let _isElementFound = false;
            if (currItem === item) {
                // Toggle the clicked checkbox item checked state
                newItem.checked = !currItem.checked;
                _isElementFound = true;
            }

            if (typeof currItem.children !== "undefined") {
                const newChildren = DFS({
                    parent: newItem,
                    items: currItem.children,
                    item: item,
                    isElementFound: _isElementFound
                })!;

                // Check parent only if all children are checked, otherwise uncheck parent. 
                // OR check indeterminate parent only if some children are checked or indeterminate.
                const allChildrenAreChecked = newChildren.every(x => x.checked);
                const someChildrenAreChecked = newChildren.some(x => x.checked);
                const someChildrenAreIndeterminate = newChildren.some(x => x.indeterminate);
                if (allChildrenAreChecked) {
                    newItem.checked = true;
                    newItem.indeterminate = false;
                } else {
                    if (someChildrenAreChecked || someChildrenAreIndeterminate) {
                        newItem.indeterminate = true;
                    } else {
                        newItem.checked = false;
                        newItem.indeterminate = false;
                    }
                }
                newItem.children = newChildren;
            }
            newItems.push(newItem);
        }
    }
    return newItems;
}

const CheckboxMenu = ({ checkboxItems }: TCheckboxMenu) => {
    const [_checkboxItems, _setCheckboxItems] = useState<TCheckboxItem[]>(checkboxItems);

    const handleCheckboxChange = (item: TCheckboxItem) => {
        const newItems = DFS({
            parent: null,
            items: _checkboxItems,
            item: item,
            isElementFound: false
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