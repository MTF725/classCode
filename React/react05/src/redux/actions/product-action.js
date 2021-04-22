export const ADD_PRODUCT='ADD_PRODUCT';
export const DELETE_PRODUCT='DELETE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';

export function addProduct(proName,proPrice,proCount) {
    return{
        type:ADD_PRODUCT,//必须包含type属性
        payload:{
            proName,proPrice,proCount
        }
    }
}
export function deleteProduct(proName) {
    return{
        type:DELETE_PRODUCT,
        payload: {
            proName
        }
    }
}
export function updateProduct(proName,proPrice,proCount) {
    return{
        type:UPDATE_PRODUCT,
        payload:{
            proName,proPrice,proCount
        }
    }
}