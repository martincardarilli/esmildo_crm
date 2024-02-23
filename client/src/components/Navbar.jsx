import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

import CsLineIcons from '../pages/CRM/components/cs-line-icons/CsLineIcons';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg webHeader">
      <div className="headerLeft">
      <h1 className="text-2xl font-bold">
         {/* <Link to={isAuthenticated ? "/tasks" : "/"}><img src="/logo.png" className="logoNavBar"/></Link> */}
         MASSARI C.R.M.
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
         
            <li className="navbarOption">
              <ButtonLink to="/customers"> <CsLineIcons icon="activity" />Metricas</ButtonLink>
            </li>
            {/*<li className="navbarOption">
              <ButtonLink to="/add-task"> <CsLineIcons icon="plus" /> Add Task</ButtonLink>
            </li>
            <li className="navbarOption">
              <ButtonLink to="/EditableRows"> <CsLineIcons icon="plus" />EditableRows</ButtonLink>
            </li>*/}
            
            <li className="navbarOption">
              <ButtonLink to="/customers"> <CsLineIcons icon="home-garage" />Propiedades </ButtonLink>
            </li>
            <li className="navbarOption">
              <ButtonLink to="/customers"> <CsLineIcons icon="car" />Vehiculos </ButtonLink>
            </li>
           {/* <li className="navbarOption">
              <ButtonLink to="/asana"> <CsLineIcons icon="eye" />Asana (beta)</ButtonLink>
          </li> */}
            <li className="navbarOption">
              <ButtonLink to="/customers"> <CsLineIcons icon="user" />Personas</ButtonLink>
            </li>

            <li className="navbarOption">
              <ButtonLink to="/customers"> <CsLineIcons icon="lock-on" />Admin</ButtonLink>
            </li>
             
           
     
          </>
        ) : (
          <>
    
          </>
        )}
      </ul>
      </div>
      <div className="headerRight">
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
          
            <li>
              <Link to="/" onClick={() => logout()}>
             
              {user.email}
         
              <CsLineIcons icon="logout" />
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
