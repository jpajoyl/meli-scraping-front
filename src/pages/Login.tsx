import React, { useContext, useState } from 'react'
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import { ILoginFormData } from '../models/authModel';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ILoginFormData>({
        username: '',
        password: '',
    });
    const [error, setError] = useState<string>('');

    type ErrorMessages = Record<string, string[]>;

    function formatErrorMessages(errors: ErrorMessages): string {
        return Object.entries(errors)
            .map(([key, messages]) => `${messages.join(", ")}`)
            .join("\n");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            login(formData)
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.access)
                        setIsAuthenticated(true)
                        navigate('/products')
                    }
                }).catch(error => {
                    setError(formatErrorMessages(error.response.data));
                })

        } catch (err) {
            setError('Error al intentar iniciar sesión.');
        }
    };
    return (
        <Container>
            <Card className='w-50 mx-auto'>
                <CardBody>
                    <h2>Login</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username">Email</Label>
                            <Input
                                type="email"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Contraseña</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <Button type="submit" color="primary" className='mt-2'>
                            Iniciar sesión
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Login