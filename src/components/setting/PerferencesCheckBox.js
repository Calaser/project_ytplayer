const PerferencesCheckBox = (props) => {
    return (
        <label>
            <input 
                type="checkbox"
                className="preferencesCheckbox"
                id={props.option}
                checked={props.checked}
                onChange={props.onClick}
            /> {props.name}
        </label>
    );
}

export default PerferencesCheckBox;