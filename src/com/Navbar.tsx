import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  let menus = [
    { name: "Home", path: "/" },
    { name: "Weather", path: "/weather" },
    { name: "Product", path: "/products" },
    { name: "Cart", path: "/cart" },
  ];
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Aeve</div>
      <nav>
        <ul className={styles.menuList}>
          {menus.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? styles.active : undefined)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
