type TCheckboxItem<T> = {
    label: string,
    value: T,
    children?: TCheckboxItem<T>[]
};

type TInternalCheckboxItem<T> = {
    label: string,
    value: T,
    children?: TInternalCheckboxItem<T>[],
    checked: boolean,
    indeterminate: boolean,
    level: number,
};

type TCheckboxGroupProps<T> = {
    initialState?: TCheckboxItem<T>[],
    levelsPadding?: "0em" | "0.5em" | "1em" | "1.5em" | "2.em" | "2.5em" | "3em",
    state?: TInternalCheckboxItem<T>[],
    onStateChange?: (newState: TInternalCheckboxItem<T>[]) => void,
};

type TSelectRecursively<T> = {
    items: TInternalCheckboxItem<T>[],
    item: TInternalCheckboxItem<T>
};

type TSelectDownRecursively<T> = {
    parent: TInternalCheckboxItem<T>,
    items: TInternalCheckboxItem<T>[]
}

type TMarkRecursivelyWhere<T> = {
    items: TInternalCheckboxItem<T>[],
    predicate: (item: TInternalCheckboxItem<T>) => boolean;
}

export type {
    TCheckboxItem,
    TInternalCheckboxItem,
    TCheckboxGroupProps,
    TSelectRecursively,
    TSelectDownRecursively,
    TMarkRecursivelyWhere
};