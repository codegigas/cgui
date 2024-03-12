import { useState, useEffect } from "react";
import type { TInternalCheckboxItem, TCheckboxMenuProps } from "./CheckboxMenuTypes";
import {
    initRecursively,
    traverseRecursively 
} from "./CheckboxMenuUtils";
import Checkbox from "../Checkbox/Checkbox";
import style from "./CheckboxMenu.module.css";

const CheckboxMenu = ({ 
    checkboxItems,
    levelPadding = "1em",
    onStateChange
}: TCheckboxMenuProps) => {
    const [internalState, setInternalState] = useState<TInternalCheckboxItem[]>(initRecursively(checkboxItems));

    const handleCheckboxChange = (item: TInternalCheckboxItem) => {
        const newItems = traverseRecursively({
            items: internalState,
            item: item
        });
        setInternalState(newItems);
    };

    const renderCheckboxItemsRecursively = (items: TInternalCheckboxItem[]) => {
        return items.map((item) => {
            return (
                <div
                    key={item.label}
                    className={style["checkbox-group"]}
                    style={{ paddingLeft: item.level === 0 ? "0em" : levelPadding }}
                >
                    <Checkbox
                        label={item.label}
                        checked={item.checked}
                        indeterminate={item.indeterminate}
                        onChange={handleCheckboxChange.bind(this, item)}
                    />
                    {item.children && renderCheckboxItemsRecursively(item.children as TInternalCheckboxItem[])}
                </div>
            );
        });
    };

    useEffect(() => {
        if (typeof onStateChange !== "undefined") {
            onStateChange(internalState);
        }
    }, [internalState]);

    return (
        <div className={style["checkbox-menu"]}>
            {renderCheckboxItemsRecursively(internalState)}
        </div>
    );
};

export default CheckboxMenu;
export { initRecursively as initState }