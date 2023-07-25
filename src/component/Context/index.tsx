import { createContext, useReducer } from 'react'
import { produce } from 'immer'

export const ProductContext = createContext({} as any)
const initialState = {
  products: [],
  isLoading: false,
  error: ""
} as { products: any[], isLoading: boolean; error: string }

const ProductReducer = (state: any, action: any) => {
  switch (action.type) {
    case "product/fetching":
      state.isLoading = true
      // state.products = action.payload
      break;
    case "product/fetchingSuccess":
      state.isLoading = false
      state.products = action.payload
      break;
    case "product/fetchingFailed":
      state.isLoading = false
      state.error = action.payload
      break;
    case "product/add":
      state.products.push(action.payload)
      break;
    case "product/update":
      const product = action.payload
      state.products = state.products?.map((item: any) => item.id === product.id ? product : item)
      break;
    case "product/delete":
      const id = action.payload;
      state.products = state.products.filter((item: any) => item.id !== id);
      break;

    default:
      return state
  }
}

const ProductProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(produce(ProductReducer), initialState)
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider