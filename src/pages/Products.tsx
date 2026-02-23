import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./CartContext";
import type { Product } from "../types/products";
import styles from "./Products.module.scss";

const Products: React.FC = () => {
  const [list, setList] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { cart, add, inc, dec } = useCart();
  const [page, setPage] = useState(1);

  const perPage = 8;

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get<Product[]>("/aeve/products.json");
        setList(data);
      } catch (err) {
        setError("상품 목록을 불러오지 못했습니다");
        console.log(err);
      }
    };
    load();
  }, []);

  // 공유 키값에서 수량 들고오기
  const getQty = (id: number) => {
    const found = cart.find((kk) => kk.product.id === id);
    return Math.max(found ? found.qty : 0, 0);
  };

  if (error) return <div style={{ color: "red", padding: 20 }}>{error}</div>;

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageList = list.slice(start, end);

  const totalPages = Math.ceil(list.length / perPage);

  return (
    <div className={styles.products}>
      <h2>Products</h2>
      <div className={styles.contentBox}>
        {/* <h2>상품소개</h2> */}
        <div className={styles.gridBox}>
          {pageList.map((item) => {
            const qty = getQty(item.id);
            return (
              // 출력하는 역할
              <article key={item.id} className={styles.card}>
                <img
                  src={import.meta.env.BASE_URL + item.image}
                  alt={item.title}
                  className={styles.imgs}
                />
                <div className={styles.info}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.price}>{item.price.toLocaleString()}원</p>
                </div>
                <div className={styles.btns}>
                  {qty === 0 ? (
                    // 담기 버튼
                    <button onClick={() => add(item, 1)} className={styles.addBtn}>
                      담기 (상품선택)
                    </button>
                  ) : (
                    // +, - 버튼, 수량
                    <div className={styles.btnOutBox}>
                      <button
                        onClick={() => dec(item.id)}
                        aria-label={`${item.title}"상품 수량 감소 빼기`}
                        className={styles.minus}
                      >
                        -
                      </button>
                      <span className={styles.qty}>{qty}</span>
                      <button
                        onClick={() => inc(item.id)}
                        aria-label={`${item.title}"상품 수량 증가 더하기`}
                        className={styles.plus}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`${styles.pageBtn} ${page === i + 1 ? styles.active : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
