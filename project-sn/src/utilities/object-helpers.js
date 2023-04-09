export const updateObjectInArray = (item, itemId, objPropName, newObjectProps) => {

    return item.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjectProps}
        }
        return u;
    })
}