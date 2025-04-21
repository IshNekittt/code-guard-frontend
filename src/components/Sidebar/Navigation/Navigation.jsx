import s from './Navigation.module.css';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
  
  return (
    <nav className={s.nav}>
      <NavLink to="/home" className={s.link} tabIndex={-1} >
        {({ isActive }) => (
          <div className={isActive ? s.active : ''}>
            <div className={s.iconBox}>
              <svg className={s.icon} >
                <use href="/src/assets/sidebarsvg/symbol-defs.svg#icon-home" />
              </svg>
            </div>
            <span className={s.label}>Home</span>
          </div>
        )}
      </NavLink>

      <NavLink to="/statistics" className={s.link} tabIndex={-1}>
        {({ isActive }) => (
          <div className={isActive ? s.active : ''}>
            <div className={s.iconBox}>
              <svg className={s.icon} draggable={false}>
                <use href="/src/assets/sidebarsvg/symbol-defs.svg#icon-hrafic" />
              </svg>
            </div>
            <span className={s.label}>Statistics</span>
          </div>
        )}
      </NavLink>

      <NavLink to="/exchange-rates" className={`${s.link} ${s.link_statistics}`} tabIndex={-1}>


        {({ isActive }) => (
          <div className={isActive ? s.active : ''}>
            <div className={s.iconBox}>
              <svg className={s.icon} draggable={false}>
                <use href="/src/assets/sidebarsvg/symbol-defs.svg#icon-Valyte" />
              </svg>
            </div>
          </div>
        )}
      </NavLink>
    </nav>
  );
};

export default Navigation;
