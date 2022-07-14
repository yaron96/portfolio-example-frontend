export const categoryKeys = {
    tree: ['categories'],
    details: () => [...categoryKeys.tree, 'detail'],
    detail: (id) => [categoryKeys.details(), id]
}