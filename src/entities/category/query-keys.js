export const categoryKeys = {
    all: ['categories'],
    details: () => [...categoryKeys.all, 'detail'],
    detail: (id) => [categoryKeys.details(), id]
}