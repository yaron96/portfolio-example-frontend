export const productKeys = {
    all: ['products'],
    lists: () => [...productKeys.all, 'list'], 
    list: (filters) => 
        [...productKeys.lists(), {...filters}]
}