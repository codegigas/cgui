import CheckboxMenu, { TCheckboxItem } from "./components/CheckboxMenu/CheckboxMenu";

const checkboxItems: TCheckboxItem[] = [
    {
        label: "Label 1",
        value: "",
        checked: false,
        children: [
            {
                label: "Label 1.1",
                value: "1",
                checked: false
            },
            {
                label: "Label 1.2",
                value: "2",
                checked: false
            },
            {
                label: "Label 1.3",
                value: "3",
                checked: false,
                children: [
                    {
                        label: "Label 1.3.1",
                        value: "1",
                        checked: false
                    },
                    {
                        label: "Label 1.3.2",
                        value: "2",
                        checked: false
                    },
                    {
                        label: "Label 1.3.3",
                        value: "2",
                        checked: false
                    }
                ]
            }
        ]
    }
];

const App = () => {
    return (
        <div className="App">
            <CheckboxMenu checkboxItems={checkboxItems} />
        </div>
    )
}

export default App;