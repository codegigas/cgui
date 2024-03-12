import CheckboxMenu from "./components/CheckboxMenu/CheckboxMenu";
import { TCheckboxItem } from "./components/CheckboxMenu/CheckboxMenuTypes";

const checkboxItems: TCheckboxItem[] = [
    {
        label: "Label 1",
        value: "",
        children: [
            {
                label: "Label 1.1",
                value: "1"
            },
            {
                label: "Label 1.2",
                value: "2"
            },
            {
                label: "Label 1.3",
                value: "3",
                children: [
                    {
                        label: "Label 1.3.1",
                        value: "1"
                    },
                    {
                        label: "Label 1.3.2",
                        value: "2"
                    },
                    {
                        label: "Label 1.3.3",
                        value: "2"
                    }
                ]
            }
        ]
    }
];

const App = () => {
    return (
        <div className="App">
            <CheckboxMenu
                checkboxItems={checkboxItems}
                levelPadding="1.5em"
                onStateChange={(newState) => console.log(newState)}
            />
        </div>
    )
}

export default App;