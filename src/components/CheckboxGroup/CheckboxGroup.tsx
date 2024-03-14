import { useState, useEffect } from "react";
import type { TInternalCheckboxItem, TCheckboxGroupProps } from "./CheckboxGroupTypes";
import {
    initState,
    traverseRecursively
} from "./CheckboxGroupUtils";
import Checkbox from "../Checkbox/Checkbox";
import style from "./CheckboxGroup.module.css";

const CheckboxGroup = <T,>({
    checkboxItems,
    levelsPadding = "1em",
    state,
    onChange
}: TCheckboxGroupProps<T>) => {
    const [internalState, setInternalState] = useState<TInternalCheckboxItem<T>[]>(state ?? initState(checkboxItems));

    const handleCheckboxChange = (item: TInternalCheckboxItem<T>) => {
        const newItems = traverseRecursively({
            items: internalState,
            item: item
        });
        setInternalState(newItems);
    };

    const renderCheckboxItemsRecursively = (items: TInternalCheckboxItem<T>[]) => {
        return items.map((item) => {
            return (
                <div
                    key={item.label}
                    className={style["checkbox-node"]}
                    style={{ paddingLeft: item.level === 0 ? "0em" : levelsPadding }}
                >
                    <Checkbox
                        label={item.label}
                        checked={item.checked}
                        indeterminate={item.indeterminate}
                        onChange={handleCheckboxChange.bind(this, item)}
                    />
                    {item.children && renderCheckboxItemsRecursively(item.children)}
                </div>
            );
        });
    };

    // Update externall state, if such exists.
    useEffect(() => {
        if (onChange) {
            onChange(internalState);
        };
    }, [internalState]);
    
    // Update internal state if controlled state changes
    useEffect(() => {
        if (typeof state === "undefined") {
            return;
        }
        if (JSON.stringify(state) === JSON.stringify(internalState)) {
            return;
        }
        setInternalState(state);
    }, [state]);

    return (
        <div className={style["checkbox-group"]}>
            {renderCheckboxItemsRecursively(internalState)}
        </div>
    );
};

export default CheckboxGroup;