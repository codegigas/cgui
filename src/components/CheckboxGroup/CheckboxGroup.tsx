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
    getNodesAt: (level: number) => TInternalCheckboxItem<T>[],
    renderElement: () => JSX.Element,
};

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

    const getNodesAt = (level: number): TInternalCheckboxItem<T>[] => {
        const vnodes: TInternalCheckboxItem<T>[] = [];
        const traverse = (vnodes: TInternalCheckboxItem<T>[], nodes: TInternalCheckboxItem<T>[], level: number): void => {
            const nodesLength = nodes.length;
            for (let i = 0; i < nodesLength; ++i) {
                const currNode = nodes[i];
                currNode.handleChange = handleCheckboxChange.bind(this, currNode);
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
    };

    const renderElement = () => {
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
        return (
            <div className="CheckboxGroup">
                {renderNodesRecursively(internalState)}
            </div>
        );
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
        getNodesAt: getNodesAt,
        renderElement: renderElement
    };
};

export { useCheckboxGroup };
