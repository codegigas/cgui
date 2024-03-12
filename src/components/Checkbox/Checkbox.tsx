import style from "./Checkbox.module.css";

type TCheckbox = {
    label: string,
    checked: boolean,
    indeterminate?: boolean,
    onChange: React.ChangeEventHandler<HTMLInputElement>
};

const Checkbox = ({
    label,
    checked,
    indeterminate = false,
    onChange
}: TCheckbox) => {
    return (
        <div className={style["checkbox"]}>
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    ref={(el) => { if (el) el.indeterminate = indeterminate; }}
                />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;