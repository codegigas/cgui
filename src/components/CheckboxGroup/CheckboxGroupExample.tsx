import { useCheckboxGroup as _useCheckboxGroup } from "./CheckboxGroup";
import type { TInternalCheckboxItem } from "./CheckboxGroupTypes"; 
import Checkbox from "../Checkbox/Checkbox";

type TCheckboxGroupProps<T> = {
    state: TInternalCheckboxItem<T>[],
    onStateChange: (newState: TInternalCheckboxItem<T>[]) => void
};

const useCheckboxGroup = <T,>({ state, onStateChange }: TCheckboxGroupProps<T>) => {
    const checkboxInstance = _useCheckboxGroup({
        state: state,
        levelsPadding: "1.5em",
        onStateChange: onStateChange
    });

    const languagesElement = () => {
        return (
            <div className="CheckboxGroup">
                {checkboxInstance.getNodesAt(0).map(node => {
                    return (
                        <div
                            key={node.label}
                            className="CheckboxNode"
                        >
                            <Checkbox
                                label={node.label}
                                checked={node.checked}
                                indeterminate={node.indeterminate}
                                onChange={node.handleChange}
                            />
                        </div>
                    )
                })}
                {checkboxInstance.getNodesAt(1).map(node => {
                    return (
                        <div
                            key={node.label}
                            className="CheckboxNode"
                        >
                            <Checkbox
                                label={node.label}
                                checked={node.checked}
                                indeterminate={node.indeterminate}
                                onChange={node.handleChange}
                            />
                        </div>
                    )
                })}
            </div>
        )
    };

    const technologiesElement = () => {
        return (
            <div className="CheckboxGroup">
                {checkboxInstance.getNodesAt(0).map(node => {
                    return (
                        <div
                            key={node.label}
                            className="CheckboxNode"
                        >
                            <Checkbox
                                label={node.label}
                                checked={node.checked}
                                indeterminate={node.indeterminate}
                                onChange={node.handleChange}
                            />
                        </div>
                    )
                })}
                {checkboxInstance.getNodesAt(3).map(node => {
                    return (
                        <div
                            key={node.label}
                            className="CheckboxNode"
                        >
                            <Checkbox
                                label={node.label}
                                checked={node.checked}
                                indeterminate={node.indeterminate}
                                onChange={node.handleChange}
                            />
                        </div>
                    )
                })}
            </div>
        )
    };

    return {
        languagesElement: languagesElement, 
        technologiesElement: technologiesElement,
        renderElement: checkboxInstance.renderElement
    };
};

export default useCheckboxGroup;