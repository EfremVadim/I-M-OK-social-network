export const updateObjectInArray = (item: any, itemId: any, objPropName: any, newObjectProps: any) => {

    return item.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjectProps}
        }
        return u
    })
}