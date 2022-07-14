import { useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { useMutation } from "react-query"
import { draftApi } from "shared/api/product/draft";
import { productApi } from "shared/api/product";
import { productKeys } from "entities/product/query-keys"

export const useCreateUpdateDeleteProd = (productId = null) => {
    const [draft, setDraft] = useState({});

    const query = useQuery(
        "draft",
        () => draftApi.createDraft({ productId }),
    );

    const queryClient = useQueryClient();

    const afterAddingProd = (added) => {
        console.log(added)
        const obj = queryClient.getQueryData(productKeys.list);
        console.log(obj)
        queryClient.setQueryData(productKeys.list, {
            ...obj,
            data: [
                ...obj.data,
                added
            ]
        })
    }

    const afterUpdatingProd = (updated) => {
        console.log(updated)
        //const curr = queryClient.getQueryData(productKeys.all)

    }

    const afterUpdateDraft = (updated) => {
        console.log('afterUpdateDraft')
        console.log(updated)
        queryClient.setQueryData("draft", {
            ...draft, ...updated
        })
    }

    const addProductMutation = useMutation(
        (draftId) => productApi.createProduct({draftId}),
        { onSuccess: afterAddingProd },
    )

    const updateDraftMutation = useMutation(
        (updates) => draftApi.updateDraft(draft.id, updates),
        { onSuccess: afterUpdateDraft },
    )

    const updateProductMutation = useMutation(
        (draftId) => productApi.updateProduct(productId, draftId),
        { onSuccess: afterUpdatingProd },
    )

    useEffect(() => {
        query.refetch();
    }, [productId]);

    useEffect(() => {
        if (query.data) {
            setDraft(query.data);
        }
    }, [query.data]);

    const isLoading = query.isLoading
    || addProductMutation.isLoading
    || updateDraftMutation.isLoading
    || updateProductMutation.isLoading;

    return {
        draft,
        isLoading,
        addProductMutation,
        updateDraftMutation,
        updateProductMutation,
    };
};
