type TCheckboxItem = {
    label: string,
    value: string,
    children?: TCheckboxItem[]
};

type TInternalCheckboxItem = TCheckboxItem & {
    checked: boolean,
    indeterminate: boolean,
    level: number,
};

type TCheckboxMenuProps = {
    checkboxItems: TCheckboxItem[],
    levelPadding?: "0em" | "0.5em" | "1em" | "1.5em" | "2.em" | "2.5em" | "3em",
    onStateChange?: (newState: TInternalCheckboxItem[]) => void,
};

type TSelectRecursively = {
    items: TInternalCheckboxItem[],
    item: TInternalCheckboxItem
};

type TSelectDownRecursively = {
    parent: TInternalCheckboxItem,
    items: TInternalCheckboxItem[]
}

export type {
    TCheckboxItem,
    TInternalCheckboxItem,
    TCheckboxMenuProps,
    TSelectRecursively,
    TSelectDownRecursively
};