import { useState, useEffect } from "react";
import type { TInternalCheckboxItem, TCheckboxGroupProps } from "./CheckboxGroupTypes";
import {
    initState,
    traverseRecursively,
    markRecursivelyWhere
} from "./CheckboxGroupUtils";
import Checkbox from "../Checkbox/Checkbox";
import style from "./CheckboxGroup.module.css";

type TCheckboxGroup<T> = {
    getVirtualNodes: (level: number) => TInternalCheckboxItem<T>[],
    renderNodesRecursively: (nodes: TInternalCheckboxItem<T>[]) => JSX.Element[],
    handleCheckboxChange: (item: TInternalCheckboxItem<T>) => void
}

const useCheckboxGroup = <T,>({
    initialState,
    levelsPadding = "1em",
    state,
    onStateChange
}: TCheckboxGroupProps<T>): TCheckboxGroup<T> => {
    const [internalState, setInternalState] = useState<TInternalCheckboxItem<T>[]>(state ?? initState(initialState!));

    const handleCheckboxChange = (item: TInternalCheckboxItem<T>) => {
        const newItems = traverseRecursively({
            items: internalState,
            item: item
        });
        setInternalState(newItems);
    };

    const getVirtualNodes = (level: number): TInternalCheckboxItem<T>[] => {
        const vnodes: TInternalCheckboxItem<T>[] = [];
        const traverse = (vnodes: TInternalCheckboxItem<T>[], nodes: TInternalCheckboxItem<T>[], level: number): void => {
            const nodesLength = nodes.length;
            for (let i = 0; i < nodesLength; ++i) {
                const currNode = nodes[i];
                if (currNode.level === level) {
                    vnodes.push(currNode);
                } else {
                    if (typeof currNode.children !== "undefined") {
                        traverse(vnodes, currNode.children, level);
                    };
                };
            };
        }
        traverse(vnodes, internalState, level);
        return vnodes;
    }

    const renderNodesRecursively = (nodes: TInternalCheckboxItem<T>[]) => {
        return nodes.map((item) => {
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
                    {item.children && renderNodesRecursively(item.children)}
                </div>
            );
        });
    };

    // Update externall state, if such exists.
    useEffect(() => {
        if (onStateChange) {
            onStateChange(internalState);
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

    return {
        getVirtualNodes: getVirtualNodes,
        renderNodesRecursively: renderNodesRecursively,
        handleCheckboxChange: handleCheckboxChange
    };
};

export { useCheckboxGroup };
