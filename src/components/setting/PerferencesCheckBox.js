const PerferencesCheckBox = (props) => {
    return (
        <label>
            <input 
                type="checkbox"
                className="preferencesCheckbox"
                id={props.option}
                checked={props.checked}
                onClick={props.onClick}
            /> {props.option}
        </label>
    );
}

export default PerferencesCheckBox;