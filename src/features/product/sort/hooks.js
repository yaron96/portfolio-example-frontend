import { useState, useEffect } from "react";
import { SORT_BY } from "shared/lib/constants";

export const useSort = (setSort) => {
    const [value, setValue] = useState(SORT_BY.CREATED_AT_DESC);

    useEffect(() => {
        setSort(value);
    }, [value]);

    return {
        value,
        setValue,
        sortBy: SORT_BY,
    };
};