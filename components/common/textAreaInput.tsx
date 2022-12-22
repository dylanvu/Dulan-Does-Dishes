
import titleStyles from "../../styles/common/title.module.css";
import inputStyles from "../../styles/common/input.module.css";

import { ChangeEventHandler, useEffect } from "react";

const TextAreaInput = ({ title, placeholder, changeTextAreaState, value }: { title: string, placeholder: string, changeTextAreaState: (newState: string) => void, value?: string }) => {
    useEffect(() => {
    }, []);

    const handleAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        e.preventDefault();
        changeTextAreaState(e.target.value);
    }

    return (
        <div className={inputStyles["generic-textarea-div-wrapper"]}>
            <h1 className={titleStyles["generic-h1"]}>{title}</h1>
            <textarea value={value ? value : undefined} name={title} placeholder={placeholder} className={inputStyles["generic-textarea"]} onChange={handleAreaChange}></textarea>
        </div>
    )
}

export default TextAreaInput;