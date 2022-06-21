import { categoryApi } from "../../shared/api/product/category";
import { useMutation, useQueryClient } from "react-query";
import { categoryKeys } from "../../entities/category/query-keys";

const ROOT_ID = '622f1b64ffb25fd1ecac1ad7'

export const useAddRenameCategory = () => {
    const queryClient = useQueryClient();

    const afterAdding = (added) => {
        let list = queryClient.getQueryData(categoryKeys.all);
        const rootIndex = list.findIndex((item) => item.id == ROOT_ID);
        list[rootIndex].children.push(added.id);
        queryClient.setQueryData(categoryKeys.all, [...list, added]);
    }

    const afterRemoving = (deleted) => {
        let list = queryClient.getQueryData(categoryKeys.all);
        list = list.filter((item) => item.id != deleted.id);
        const parrentIndex = list.findIndex((item) =>
            item.children.includes(deleted.id)
        );
        list[parrentIndex].children = list[parrentIndex].children.filter(
            (item) => item != deleted.id
        );
        queryClient.setQueryData(categoryKeys.all, list);
    }

    const afterUpdating = (category) => {

    }

    const addCategoryMutation = useMutation(
        (title) => categoryApi.create(title),
        { onSuccess: afterAdding },
    );

    const removeCategoryMutation = useMutation(
        (id) => categoryApi.remove(id),
        { onSuccess: afterRemoving },
    )

    const updateCategoryMutation = useMutation(
        (id, updates) => categoryApi.update(id, updates),
        { onSuccess: afterUpdating },
    );

    const isLoading =
        addCategoryMutation.isLoading ||
        updateCategoryMutation.isLoading ||
        removeCategoryMutation.isLoading;

    return {
        addCategoryMutation,
        removeCategoryMutation,
        updateCategoryMutation,
        isLoading,
    };
};