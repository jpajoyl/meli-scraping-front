import React, { useState } from 'react'
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { IRegisterFormData } from '../models/authModel';
import { registerUser } from '../services/authService';
import Swal from 'sweetalert2';


function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<IRegisterFormData>({
        username: '',
        password: '',
        email: '',
        name: '',
        last_name: '',
        phone: '',
        gender: 'M',
    })
    const [error, setError] = useState<string>('');

    type ErrorMessages = Record<string, string[]>;

    function formatErrorMessages(errors: ErrorMessages): string {
        return Object.entries(errors)
            .map(([key, messages]) => `${key}: ${messages.join(", ")}`)
            .join("\n");
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            registerUser(formData)
                .then(response => {
                    if (response.status === 201) {
                        Swal.fire({
                            title: 'Éxito',
                            text: 'Usuario creado con éxito',
                            icon: 'success',
                        }).then(result => {

                            navigate('/login')

                        })
                    }
                }).catch(error => {
                    setError(formatErrorMessages(error.response.data));
                })

        } catch (err) {
            setError('Error al registrar el usuario.');
        }
    };
    return (
        <Container>
            <Card>
                <CardBody>
                    <h2>Registro</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Nombre</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Apellido</Label>
                            <Input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value, username: e.target.value });
                                }}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Teléfono</Label>
                            <Input
                                type="text"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="gender">Género</Label>
                            <Input
                                type="select"
                                id="gender"
                                name="gender"
                                required
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </Input>
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
                            Registrar usuario
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Register