import type { 
    TSelectRecursively, 
    TCheckboxItem, 
    TInternalCheckboxItem, 
    TSelectDownRecursively 
} from "./CheckboxMenuTypes";

const initRecursively = (items: TCheckboxItem[], level: number = 0): TInternalCheckboxItem[] => {
    const newItems: TInternalCheckboxItem[] = [];
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
        const currItem = items[i];
        const newItem: TInternalCheckboxItem = {
            label: currItem.label,
            value: currItem.value,
            checked: false,
            level: level++,
            indeterminate: false
        };
        if (typeof currItem.children !== "undefined") {
            const newChildren = initRecursively(currItem.children, level);
            newItem.children = newChildren;
        };
        newItems.push(newItem);
    };
    return newItems;
};

const traverseDownRecursively = ({ parent, items }: TSelectDownRecursively): TInternalCheckboxItem[] => {
    const newItems: TInternalCheckboxItem[] = [];
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
        const currItem = items[i];
        const newItem: TInternalCheckboxItem = {
            label: currItem.label,
            value: currItem.value,
            checked: parent.checked,
            level: currItem.level,
            indeterminate: false
        };
        if (typeof currItem.children !== "undefined") {
            const newChildren = traverseDownRecursively({
                parent: newItem,
                items: currItem.children as TInternalCheckboxItem[]
            });
            newItem.children = newChildren;
        };
        newItems.push(newItem);
    };
    return newItems;
};

const traverseRecursively = ({
    items,
    item
}: TSelectRecursively): TInternalCheckboxItem[] => {
    const newItems: TInternalCheckboxItem[] = [];
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
        const currItem = items[i];
        const newItem: TInternalCheckboxItem = {
            label: currItem.label,
            value: currItem.value,
            checked: currItem.checked,
            level: currItem.level,
            indeterminate: currItem.indeterminate
        };

        if (currItem === item) {
            // Toggle the clicked checkbox item checked state
            newItem.checked = !currItem.checked;
            if (newItem.checked) { 
                newItem.indeterminate = false; 
            }
            if (typeof currItem.children !== "undefined") {
                const newChildren = traverseDownRecursively({
                    parent: newItem,
                    items: currItem.children as TInternalCheckboxItem[],
                });
                newItem.children = newChildren;
            }
        } else {
            if (typeof currItem.children !== "undefined") {
                const newChildren = traverseRecursively({
                    items: currItem.children as TInternalCheckboxItem[],
                    item: item
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
                        newItem.indeterminate = false;
                    };
                    newItem.checked = false;
                };
                newItem.children = newChildren;
            };
        };

        newItems.push(newItem);
    };
    return newItems;
};

export {
    initRecursively,
    traverseRecursively
};