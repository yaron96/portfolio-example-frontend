import { useState, useEffect } from "react";

export const useUpdateDelay = ({
    initialValue,
    updateFunc,
    propertyName, 
    delayMs,
}) => {
    const [value, setValue] = useState(initialValue);
    const [isChanged, setIsChanged] = useState(false);
    const [isInitiated, setIsInitiated] = useState(false);

    useEffect(() => {
        if (initialValue !== undefined) {
            setValue(initialValue);
        }
    }, [initialValue])

    let timer;
    useEffect(() => {
        if (value) {
            if (isInitiated) {
                setIsChanged(true);
                timer = setTimeout(() => {
                    if (value) {
                        update();
                    }
                    setIsChanged(false);
                }, delayMs);
    
                return () => clearTimeout(timer);
            } else {
                setIsInitiated(true);
            }
        }
    }, [value]);

    function update() {
        const obj = {};
        obj[propertyName] = value;
        updateFunc(obj);
    }

    function onChange(value) {
        setValue(value);
    }

    function onMouseLeave() {
        clearTimeout(timer);
        if (isChanged) {
            setIsChanged(false);
            update()
        }
    }

    return {
        value,
        onChange,
        onMouseLeave,
    };
};