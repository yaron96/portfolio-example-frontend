import { useMutation, useQueryClient } from "react-query"
import { categoryApi } from "shared/api/category"
import { categoryKeys } from "entities/category/query-keys";

export const useMoveCategory = () => {
    const queryClient = useQueryClient();

    const afterMoving = (updatedTree) => {
        queryClient.setQueryData(categoryKeys.tree, updatedTree);
    };

    const moveCategoryMutation = useMutation(
        ({ drag_id, drop_id, drop_pos }) =>
            categoryApi.move(drag_id, {
                drop_id,
                drop_pos,
            }),
        { onSuccess: afterMoving }
    );

    return moveCategoryMutation;
}