import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { categoryKeys } from "entities/category/query-keys";
import { categoryApi } from "shared/api/category";

export const useChooseCategory = ({ id, updateFunc }) => {
    const [value, setValue] = useState(null);

    const { data, isLoading } = useQuery(
        categoryKeys.tree,
        () => categoryApi.getTree(),
        {
            initialData: {},
        }
    );

    useEffect(() => {
        if (id) {
            setValue(id);
        }
    }, [id]);

    function onSelect(e) {
        updateFunc({ category: e });
    }

    return {
        data,
        value,
        onSelect,
        isLoading,
    };
};