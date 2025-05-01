import s from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink to="home" end className={s.link}>
        {({ isActive }) => (
          <div className={isActive ? s.active : ""}>
            <div className={s.iconBox}>
              <svg className={s.icon}>
                <use href="/symbol-defs.svg#icon-home" />
              </svg>
            </div>
            <span className={s.label}>Home</span>
          </div>
        )}
      </NavLink>

      <NavLink to="statistics" className={s.link}>
        {({ isActive }) => (
          <div className={isActive ? s.active : ""}>
            <div className={s.iconBox}>
              <svg className={s.icon} draggable={false}>
                <use href="/symbol-defs.svg#icon-chart" />
              </svg>
            </div>
            <span className={s.label}>Statistics</span>
          </div>
        )}
      </NavLink>

      <NavLink to="currency" className={`${s.link} ${s.link_statistics}`}>
        {({ isActive }) => (
          <div className={isActive ? s.active : ""}>
            <div className={s.iconBox}>
              <svg className={s.icon} draggable={false}>
                <use href="/symbol-defs.svg#icon-money" />
              </svg>
            </div>
          </div>
        )}
      </NavLink>
    </nav>
  );
};

export default Navigation;
