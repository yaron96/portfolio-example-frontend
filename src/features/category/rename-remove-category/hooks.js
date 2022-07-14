import { useMutation, useQueryClient } from "react-query";
import { categoryKeys } from "entities/category/query-keys";
import { categoryApi } from "shared/api/category";

export const useRenameRemoveCategory = () => {
    const queryClient = useQueryClient();

    const afterRemoving = (deleted) => {
        const tree = queryClient.getQueryData(categoryKeys.tree);
        const updated = update(tree)

        queryClient.setQueryData(categoryKeys.tree, updated);

        function update(node) {
            if (node.children.find((c) => c.id === deleted.id)) {
                node.children = node.children.filter(
                    (e) => e.id !== deleted.id
                );
            } else {
                node.children = node.children.map((e) => update(e));
            }
            return node;
        }
    }

    const afterRenaming = (renamed) => {
        const tree = queryClient.getQueryData(categoryKeys.tree);
        const updated = update(tree)

        queryClient.setQueryData(categoryKeys.tree, updated);

        function update(node) {
            if (node.children.find((c) => c.id === renamed.id)) {
                node.children = node.children.map((e) => {
                    if (e.id === renamed.id) {
                        e.title = renamed.title;
                    }
                    return e;
                });
            } else {
                node.children = node.children.map((e) => update(e));
            }
            return node;
        }
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