import { Link, Navigate, useNavigate } from 'react-router-dom';

export const MenuAdmin = () => {

    let navigate = useNavigate();
    
    return (
        <> 
            <div className='principal'>
                <Link to={"/gestores"}>Ver Gestores</Link><br />
                <Link to={"/tickets"}>Ver tickets</Link><br />
                <Link to={"/clientes"}>Ver clientes</Link><br />
            </div>
        </>
        
    ) 
}