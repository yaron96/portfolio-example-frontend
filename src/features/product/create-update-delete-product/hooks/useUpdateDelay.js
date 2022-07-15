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
    }, [initialValue]);

    let timer;
    useEffect(() => {
        if (value) {
            if (isInitiated) {
                if (value !== initialValue) {
                    setIsChanged(true);
                    timer = setTimeout(update, delayMs);

                    return () => clearTimeout(timer);
                }
            } else {
                setIsInitiated(true);
            }
        }
    }, [value]);

    function update() {
        const obj = {};
        obj[propertyName] = value;
        setIsChanged(false);
        updateFunc(obj);
    }

    function onChange(value) {
        setValue(value);
    }

    function onMouseLeave() {
        clearTimeout(timer);
        if (isChanged) {
            update();
        }
    }

    return {
        value,
        onChange,
        onMouseLeave,
    };
};
