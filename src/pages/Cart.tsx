import { useCart } from "./CartContext";
import styles from "./Cart.module.scss";

const Cart: React.FC = () => {
  const { cart, inc, dec, remove, clear, totalCount, totalPrice } = useCart();

  // ❌ 여기에 return이 두 번 있어서 아래 코드 실행이 안 됐음
  // ✅ 조건문 바깥으로 return을 하나만 남기도록 수정
  if (cart.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>Cart</h1>
        <h3 className={styles.emptyMessage}>선택된 상품이 없습니다.</h3>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h2>Cart</h2>
      {/* <div className={styles.contentBox}></div> */}

      <ul>
        {cart.map((item) => (
          <li key={item.product.id}>
            <img src={import.meta.env.BASE_URL + item.product.image} alt={item.product.title} />
            <div className={styles.desBox}>
              <h3 className={styles.productTitle}>{item.product.title}</h3>
              <div className={styles.right}>
                <h4 className={styles.price}>
                  {(item.qty * item.product.price).toLocaleString()}원
                </h4>
                <div className={styles.btnBox}>
                  <button className={styles.minus} onClick={() => dec(item.product.id)}>
                    -
                  </button>
                  <span className={styles.qty}>{item.qty}</span>
                  <button className={styles.plus} onClick={() => inc(item.product.id)}>
                    +
                  </button>
                </div>
                {/* ❌ clear는 전체삭제 함수인데, map 안에서 쓰면 각 아이템마다 실행됨 */}
                {/* ✅ 개별 삭제는 remove 사용, 전체 삭제는 따로 버튼 추가 */}
                <button className={styles.delBtn} onClick={() => remove(item.product.id)}>
                  삭제
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ 전체삭제 버튼은 하단에 */}
      <div className={styles.total}>
        <p className={styles.count}>
          <strong>총 수량 :</strong> {totalCount}
          <strong> 개</strong>
        </p>
        <p className={styles.totalPrice}>
          <strong>총 금액 :</strong> {totalPrice.toLocaleString()} <strong>원</strong>
        </p>
        <button className={styles.clear} onClick={clear}>
          전체 삭제
        </button>
      </div>
    </div>
  );
};

export default Cart;
