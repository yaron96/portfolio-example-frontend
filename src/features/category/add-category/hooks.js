import { useMutation ,useQueryClient } from "react-query";
import { categoryKeys} from "entities/category/query-keys"
import { categoryApi } from "shared/api/category";

export const useAddCategory = () => {
    const queryClient = useQueryClient();

    const afterAdding = (added) => {
        let tree = queryClient.getQueryData(categoryKeys.tree);
        queryClient.setQueryData(categoryKeys.tree, {
            ...tree,
            children: [...tree.children, added],
        });
    }

    const addCategoryMutation = useMutation(
        (title) => categoryApi.create(title),
        { onSuccess: afterAdding },
    );

    return addCategoryMutation
}