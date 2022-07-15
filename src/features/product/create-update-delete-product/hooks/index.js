import { useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { draftApi } from "shared/api/product/draft";
import { productApi } from "shared/api/product";
import { productKeys } from "entities/product/query-keys";

export const useCreateUpdateDeleteProd = (productId = null) => {
    const [draft, setDraft] = useState({});

    const query = useQuery("draft", () => draftApi.createDraft({ productId }));

    const queryClient = useQueryClient();

    const afterAddingProduct = () => {
        queryClient.refetchQueries(productKeys.all);
    };

    const afterUpdatingProduct = () => {
        queryClient.refetchQueries(productKeys.all);
    };

    const afterUpdateDraft = (updated) => {
        queryClient.setQueryData("draft", {
            ...updated,
        });
    };

    const afterDeletingProduct = (deletedId) => {
        const all = queryClient.getQueriesData(productKeys.all)
        all.map((query) => {
            const queryKey = query[0];
            const queryData = query[1];
            queryClient.setQueryData(queryKey, {
                ...queryData,
                data: queryData.data.filter((product) => product.id !== deletedId)
            });
        })
    };

    const addProductMutation = useMutation(
        (draftId) => productApi.createProduct(draftId),
        { onSuccess: afterAddingProduct }
    );

    const updateDraftMutation = useMutation(
        (updates) => draftApi.updateDraft(draft.id, updates),
        { onSuccess: afterUpdateDraft }
    );

    const updateProductMutation = useMutation(
        (draftId) => productApi.updateProduct(draftId),
        { onSuccess: afterUpdatingProduct }
    );

    const deleteProductMutation = useMutation(
        () => productApi.deleteProduct(productId),
        { onSuccess: afterDeletingProduct }
    );

    useEffect(() => {
        query.refetch();
    }, [productId]);

    useEffect(() => {
        if (query.data) {
            setDraft(query.data);
        }
    }, [query.data]);

    const isLoading =
        query.isLoading || 
        query.isRefetching ||
        addProductMutation.isLoading ||
        updateDraftMutation.isLoading ||
        updateProductMutation.isLoading ||
        deleteProductMutation.isLoading;

    return {
        draft,
        isLoading,
        addProductMutation,
        updateDraftMutation,
        updateProductMutation,
        deleteProductMutation,
    };
};
