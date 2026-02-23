// .d.ts :: 컴파일시 파일 생성 안 함
// 타입스크립트 :: js 안정성 ==? 컴파일 단계에서 에러 표시
// let name:string = "홍길동"
// let name = "홍길동" :: 타입추론(자동인식)

import type { Product } from "./products"

export interface CartItem{
    product : Product
    qty : number
}

export type Cart = CartItem[]
// import type [Cart, cartItem] from '../types/cart'
// let [item, setItem] = useState<Cart>([])
// .then((data:Cart) => setItem(data)) 