import { useMutation ,useQueryClient } from "react-query";
import { categoryKeys } from "../../entities/category/query-keys";
import { categoryApi } from "../../shared/api/category";

const ROOT_ID = '622f1b64ffb25fd1ecac1ad7'

export const useAddCategory = () => {
    const queryClient = useQueryClient();

    const afterAdding = (added) => {
        let list = queryClient.getQueryData(categoryKeys.all);
        const rootIndex = list.findIndex((e) => e.id == ROOT_ID);
        list[rootIndex].children.push(added.id);
        queryClient.setQueryData(categoryKeys.all, [...list, added]);
    }

    const addCategoryMutation = useMutation(
        (title) => categoryApi.create(title),
        { onSuccess: afterAdding },
    );

    return addCategoryMutation
}