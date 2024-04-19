import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import CsLineIcons from '../pages/CRM/components/cs-line-icons/CsLineIcons';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation(); // Hook para obtener la ubicación actual

  // Función para verificar si la ruta es la activa
  const isActive = (path) => location.pathname === path;

  console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg webHeader">
      <div className="headerLeft">
      <ButtonLink to="/"> <h1 className="text-2xl font-bold navbarTitle">MASS.group</h1></ButtonLink>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li className={`navbarOption ${isActive('/inicio') ? 'navbarActive' : ''}`}>
                <ButtonLink to="/inicio"><CsLineIcons icon="activity" />Inicio</ButtonLink>
              </li>
              <li className={`navbarOption ${isActive('/propiedades') ? 'navbarActive' : ''}`}>
                <ButtonLink to="/propiedades"><CsLineIcons icon="home-garage" />Propiedades</ButtonLink>
              </li>
              <li className={`navbarOption ${isActive('/vehiculos') ? 'navbarActive' : ''}`}>
                <ButtonLink to="/vehiculos"><CsLineIcons icon="car" />Vehiculos</ButtonLink>
              </li>
              <li className={`navbarOption ${isActive('/personas') ? 'navbarActive' : ''}`}>
                <ButtonLink to="/personas"><CsLineIcons icon="user" />Personas</ButtonLink>
              </li>
       
            </>
          ) : null}
        </ul>
      </div>
      <div className="headerRight">
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
                   <li className={`navbarOption ${isActive('/admin') ? 'navbarActive' : ''}`}>
                <ButtonLink to="/admin"><CsLineIcons icon="lock-on" />Admin</ButtonLink>
              </li>
              <li className='navbarOption'>
         

                  <ButtonLink><CsLineIcons icon="gear" />                  {user.username}</ButtonLink>
          
              </li>

              
              <li className='navbarOption'>
                <Link to="/" onClick={() => logout()}>

                  <ButtonLink><CsLineIcons icon="logout" /></ButtonLink>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLink to="/login">Login</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
