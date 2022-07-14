import { useQueryClient, useMutation } from "react-query"
import { draftApi } from "shared/api/product/draft"

export const useEditProductImages = (id) => {
    const queryClient = useQueryClient();

    const afterUpload = (uploaded) => {
        const draft = queryClient.getQueryData('draft')
        queryClient.setQueryData('draft', {
            ...draft,
            images: [
                ...draft.images,
                ...uploaded
            ]
        })
    }

    const afterDelete = (deleted) => {
        const draft = queryClient.getQueryData('draft')
        queryClient.setQueryData('draft', {
            ...draft,
            images: draft.images.filter((link) => link !== deleted)
        })
    }

    const afterSort = (sorted) => {
        const draft = queryClient.getQueryData('draft')
        queryClient.setQueryData('draft', {
            ...draft,
            images: sorted
        })
    }

    const uploadImagesMutation = useMutation(
        (files) => draftApi.imagesUpload(id, files),
        {
            onSuccess: afterUpload,
        },
    );

    const deleteImageMutation = useMutation(
        (link) => draftApi.imageDelete(id, link),
        {
            onSuccess: afterDelete,
        },
    );

    const sortImagesMutation = useMutation(
        (sorted) => draftApi.imagesSort(id, sorted),
        {
            onSuccess: afterSort,
        }
    )

    const isLoading = uploadImagesMutation.isLoading
    || deleteImageMutation.isLoading
    || sortImagesMutation.isLoading

    return {
        isLoading,
        uploadImagesMutation,
        deleteImageMutation,
        sortImagesMutation,
    }
}