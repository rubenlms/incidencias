import { Link, Navigate, useNavigate } from 'react-router-dom';
import { SidebarAdmin } from './SideBarAdmin';
export const MenuAdmin = () => {

    let navigate = useNavigate();
    
    return (
        <>
            <SidebarAdmin/>
            <div className='principal'>
                <Link to={"/gestores"}>Ver Gestores</Link><br />
                <Link to={"/tickets"}>Ver tickets</Link><br />
                <Link to={"/clientes"}>Ver clientes</Link><br />
            </div>
        </>
        
    ) 
}