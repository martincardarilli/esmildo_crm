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
        <Link to={isAuthenticated ? "/tasks" : "/"}><img src="/logo.png" className="logoNavBar"/></Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>

            <li className="navbarOption">
              <ButtonLink to="/metrics"> <CsLineIcons icon="activity" />Metrics</ButtonLink>
            </li>
            {/*<li className="navbarOption">
              <ButtonLink to="/add-task"> <CsLineIcons icon="plus" /> Add Task</ButtonLink>
            </li>
            <li className="navbarOption">
              <ButtonLink to="/EditableRows"> <CsLineIcons icon="plus" />EditableRows</ButtonLink>
            </li>*/}
            <li className="navbarOption">
              <ButtonLink to="/customers"> <CsLineIcons icon="suitcase" />Customers</ButtonLink>
            </li>
            <li className="navbarOption">
              <ButtonLink to="/completed-tasks"> <CsLineIcons icon="check-circle" />Completed Tasks</ButtonLink>
            </li>
           {/* <li className="navbarOption">
              <ButtonLink to="/asana"> <CsLineIcons icon="eye" />Asana (beta)</ButtonLink>
          </li> */}
            <li className="navbarOption">
              <ButtonLink to="/asana"> <CsLineIcons icon="router" />Devices</ButtonLink>
            </li>
             
            <li className="navbarOption">
              <ButtonLink to="/bills"> <CsLineIcons icon="dollar" />Bills</ButtonLink>
            </li>
            <li className="navbarOption">
              <ButtonLink to="/reports"> <CsLineIcons icon="chart-4" />Reports</ButtonLink>
          </li> 
            <li className="navbarOption">
              <ButtonLink to="/team"> <CsLineIcons icon="diagram-2" />Team</ButtonLink>
            </li>

            <li className="navbarOption">
              <ButtonLink to="/automations"> <CsLineIcons icon="spinner" />Automations</ButtonLink>
            </li>

            <li className="navbarOption">
              <ButtonLink to="/admin"> <CsLineIcons icon="lock-on" />Admin</ButtonLink>
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
