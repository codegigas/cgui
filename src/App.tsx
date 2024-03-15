import { useState } from "react";
import { initState } from "./components/CheckboxGroup";
import type { TCheckboxItem } from "./components/CheckboxGroup";
import useCheckboxGroup from "./components/CheckboxGroup/CheckboxGroupExample";

type Data = {
    id: string,
    name: string
}

const languagesAndTechnologies: TCheckboxItem<Data>[] = [
    {
        label: "All",
        value: {
            id: "",
            name: ""
        },
        children: [
            {
                label: "Languages",
                value: {
                    id: "1",
                    name: "Languages"
                },
                children: [
                    {
                        label: "All",
                        value: { 
                            id: "", 
                            name: "" 
                        },
                        children: [
                            {
                                label: "JavaScript",
                                value: { 
                                    id: "1.1", 
                                    name: "C#" 
                                },
                            },
                            {
                                label: "TypeScript",
                                value: { 
                                    id: "1.2", 
                                    name: "TypeScript" 
                                },
                            }
                        ]
                    }
                ]
            },
            {
                label: "Technologies",
                value: {
                    id: "2",
                    name: "Technologies"
                },
                children: [
                    {
                        label: "All",
                        value: { 
                            id: "", 
                            name: "" 
                        },
                        children: [
                            {
                                label: "React",
                                value: { 
                                    id: "2.1", 
                                    name: "React" 
                                },
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const App = () => {
    const [state, setState] = useState(initState(languagesAndTechnologies));

    const checkboxInstance = useCheckboxGroup({
        state: state,
        onStateChange: (newState) => setState(newState)
    })

    return (
        <div className="App">
            {checkboxInstance.languagesElement()}
            {checkboxInstance.technologiesElement()}
        </div>
    )
}

export default App;