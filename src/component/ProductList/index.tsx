import { useContext, useEffect } from 'react'
import { ProductContext } from '../Context'
import axios from 'axios'
import { pause } from '../untils/pause'



const ProductList = () => {
    const { state, dispatch } = useContext(ProductContext)
    const { isLoading } = state;

    useEffect(() => {
        const fetchProduct = async () => {
            dispatch({ type: "product/fetching" })
            try {
                await pause(2000)
                const { data } = await axios.get(`http://localhost:3000/products`)
                dispatch({ type: "product/fetchingSuccess", payload: data })
            } catch (error: any) {
                dispatch({ type: "product/fetchingFailed", payload: error?.message })
            }
        }
        fetchProduct()


    }, [])


    const addProduct = async (product: any) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/products/`, product)
            dispatch({ type: "product/add", payload: data })
        } catch (error: any) {

        }
    }
    const updateProduct = async (product: any) => {
        try {
            const { data } = await axios.put(`http://localhost:3000/products/${product.id}`, product)
            dispatch({ type: "product/update", payload: data })
        } catch (error: any) {

        }
    }
    const removeProduct = async (product: any) => {
        try {
            await axios.delete(`http://localhost:3000/products/${product.id}`)
            dispatch({ type: "product/update", payload: product.id })
            // window.location.reload()
        } catch (error: any) {

        }
    }
    return (
        <div className='text-center'>
            <h2 className='text-base font-medium'>ProductList</h2>
            {isLoading && <p>Loading...</p>}
            {state.products?.map((item: any) => (
                <div key={item.id}>{item.name}</div>
            ))}

            <button onClick={() => addProduct({ name: "Product C" })}>add</button>
            <button onClick={() => updateProduct({ name: "Product C updated", id: 3 })}>update</button>
            <button onClick={() => removeProduct({ id: 3 })}>delete</button>
        </div>
    )
}

export default ProductList