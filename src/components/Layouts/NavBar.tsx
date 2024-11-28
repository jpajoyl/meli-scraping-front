import React, { useContext } from 'react';
import {
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <Navbar color="light" expand="lg" className="bg-body-tertiary mb-4">
            <Container>
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto mb-2 mb-lg-0" navbar>
                        {!isAuthenticated ? (
                            <>
                                <NavItem>
                                    <NavLink>
                                        <Link to={"/"} className="nav-link">Login</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <Link to={"/register"} className="nav-link">Registrar</Link>
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink>
                                        <Link to={"/users"} className="nav-link">Usuarios</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <Link to={"/products"} className="nav-link">Productos</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <Link to={"/wish-list"} className="nav-link">Lista de deseos</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#" onClick={handleLogout}>
                                        <Link to={''} className='nav-link'>Cerrar Sesión</Link>

                                    </NavLink>
                                </NavItem>
                            </>
                        )}

                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;