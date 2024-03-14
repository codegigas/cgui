import type { 
    TSelectRecursively, 
    TCheckboxItem, 
    TInternalCheckboxItem, 
    TSelectDownRecursively,
    TMarkRecursivelyWhere
} from "./CheckboxGroupTypes";

const initRecursively = <T>(items: TCheckboxItem<T>[], level: number): TInternalCheckboxItem<T>[] => {
    const newItems: TInternalCheckboxItem<T>[] = [];
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
        const currItem = items[i];
        const newItem: TInternalCheckboxItem<T> = {
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

const initState = <T>(items: TCheckboxItem<T>[]): TInternalCheckboxItem<T>[] => {
    const state = initRecursively(items, 0);
    return state;
}

const traverseDownRecursively = <T>({ parent, items }: TSelectDownRecursively<T>): TInternalCheckboxItem<T>[] => {
    const newItems: TInternalCheckboxItem<T>[] = [];
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
        const currItem = items[i];
        const newItem: TInternalCheckboxItem<T> = {
            label: currItem.label,
            value: currItem.value,
            checked: parent.checked,
            level: currItem.level,
            indeterminate: false
        };
        if (typeof currItem.children !== "undefined") {
            const newChildren = traverseDownRecursively({
                parent: newItem,
                items: currItem.children
            });
            newItem.children = newChildren;
        };
        newItems.push(newItem);
    };
    return newItems;
};

const traverseRecursively = <T>({
    items,
    item
}: TSelectRecursively<T>): TInternalCheckboxItem<T>[] => {
    const newItems: TInternalCheckboxItem<T>[] = [];
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
        const currItem = items[i];
        const newItem: TInternalCheckboxItem<T> = {
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
                    items: currItem.children,
                });
                newItem.children = newChildren;
            }
        } else {
            if (typeof currItem.children !== "undefined") {
                const newChildren = traverseRecursively({
                    items: currItem.children,
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

const markRecursivelyWhere = <T>({
    items,
    predicate
}: TMarkRecursivelyWhere<T>): TInternalCheckboxItem<T>[] => {
    const newItems: TInternalCheckboxItem<T>[] = [];
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; ++i) {
        const currItem = items[i];
        const newItem: TInternalCheckboxItem<T> = {
            label: currItem.label,
            value: currItem.value,
            checked: currItem.checked,
            level: currItem.level,
            indeterminate: currItem.indeterminate
        };

        if (predicate(currItem)) {
            newItem.checked = true;
            if (newItem.checked) { 
                newItem.indeterminate = false; 
            }
            if (typeof currItem.children !== "undefined") {
                const newChildren = traverseDownRecursively({
                    parent: newItem,
                    items: currItem.children,
                });
                newItem.children = newChildren;
            }
        } else {
            newItem.checked = false;
            if (typeof currItem.children !== "undefined") {
                const newChildren = markRecursivelyWhere({
                    items: currItem.children,
                    predicate: predicate
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
    initState,
    traverseRecursively,
    markRecursivelyWhere
};