import { categoryApi } from "../../shared/api/category"
import { useMutation, useQueryClient } from "react-query";
import { categoryKeys } from "../../entities/category/query-keys";

export const useRenameRemoveCategory = () => {
    const queryClient = useQueryClient();

    const afterRemoving = (deleted) => {
        const currList = queryClient.getQueryData(categoryKeys.all);
        let updatedList = currList.filter((e) => e.id !== deleted.id)
        updatedList = updatedList.map((e) => {
            if (e.children.includes(deleted.id)) return {
                ...e,
                children: e.children.filter((e) => e !== deleted.id)
            }
            else return e
        })
        queryClient.setQueryData(categoryKeys.all, updatedList);
    }

    const afterRenaming = (updated) => {
        const currList = queryClient.getQueryData(categoryKeys.all);
        const updatedList = currList.map((e) => {
            if(e.id == updated.id) return updated
            else return e
        })
        queryClient.setQueryData(categoryKeys.all, updatedList);
    }

    const removeCategoryMutation = useMutation(
        (id) => categoryApi.remove(id),
        { onSuccess: afterRemoving },
    )

    const renameCategoryMutation = useMutation(
        ({id, updates}) => categoryApi.update(id, updates),
        { onSuccess: afterRenaming },
    );

    const isLoading =
        renameCategoryMutation.isLoading || removeCategoryMutation.isLoading;

    return {
        removeCategoryMutation,
        renameCategoryMutation,
        isLoading,
    };
};