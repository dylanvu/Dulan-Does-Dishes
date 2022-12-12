
import titleStyles from "../../styles/common/title.module.css";
import inputStyles from "../../styles/common/input.module.css";

const TextAreaInput = ({ title, placeholder }: { title: string, placeholder: string }) => {
    return (
        <div className={inputStyles["generic-textarea-div-wrapper"]}>
            <h1 className={titleStyles["generic-h1"]}>{title}</h1>
            <textarea name={title} placeholder={placeholder} className={inputStyles["generic-textarea"]}></textarea>
        </div>
    )
}

export default TextAreaInput;