import { useMutation, useQueryClient } from "react-query"
import { categoryApi } from "../../../shared/api/category"
import { categoryKeys } from "../query-keys";

export const useMoveCategory = () => {
    const queryClient = useQueryClient();

    const afterMoving = (updated) => {
        console.log(updated)
        const currList = queryClient.getQueryData(categoryKeys.all);
        const updatedList = currList.map((e) => {
            if (e.id === updated.id) return updated;
            else if (e.children.some((e) => updated.children.indexOf(e) >= 0))
                return {
                    ...e,
                    children: e.children.filter(
                        (e) => !updated.children.includes(e)
                    ),
                };
            else return e;
        });
        queryClient.setQueryData(categoryKeys.all, updatedList);
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