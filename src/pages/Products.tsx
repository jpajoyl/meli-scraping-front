import React, { useState } from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Input, Row } from 'reactstrap'
import { getProductList } from '../services/authService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IAddWishList } from '../models/wishListModel';
import { addToWishList } from '../services/wishListService';
import Swal from 'sweetalert2';

function Products() {
    const [product, setProduct] = useState('')
    const [resultProducts, setResultProducts] = useState<any>()

    async function handlerSearch() {
        if (!!product) {
            const products = (await getProductList(product)).data
            setResultProducts(products)
        }

    }
    async function addToWishListHandler(data: IAddWishList) {
        addToWishList(data)
            .then(response => {
                if (response.status === 201) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Se agregó el producto correctamente a la lista de deseos',
                        icon: 'success',
                    })
                }
            }).catch(error => {
                alert(error.response.data)
            })
    }
    return (
        <Container>
            <h2>Productos</h2>
            <Row className='mb-2'>
                <Col md="10">
                    <Input
                        placeholder='Buscar...'
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                    />
                </Col>
                <Col md="2">
                    <Button className=' w-100' onClick={handlerSearch}>
                        Buscar
                    </Button>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col md="3">
                    <Card>
                        <CardBody>
                            {!!resultProducts && (
                                <>
                                    {/* Producto más económico */}
                                    <div className="my-2 position-relative">
                                        <h5 className="text-center">Producto más económico</h5>
                                        <Card style={{ height: '400px', width: '100%', position: 'relative' }}>
                                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                                <img
                                                    alt={resultProducts.recommendations.min_price.name}
                                                    src={resultProducts.recommendations.min_price.image_url}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <CardBody>
                                                <CardTitle tag="h5" className="text-center">
                                                    {resultProducts.recommendations.min_price.name}
                                                </CardTitle>
                                                <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                                                    {resultProducts.recommendations.min_price.seller.name}
                                                </CardSubtitle>
                                                <CardText className="text-center">
                                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                                                        resultProducts.recommendations.min_price.discounted_price,
                                                    )}
                                                </CardText>
                                                <Button
                                                    color="primary"
                                                    href={resultProducts.recommendations.min_price.product_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Ir al producto
                                                </Button>
                                            </CardBody>
                                            <div className="position-absolute bottom-0 end-0 p-2">
                                                <Button
                                                    color="link"
                                                    className="p-0"
                                                    onClick={() => addToWishListHandler({
                                                        name: resultProducts.recommendations.min_price.name,
                                                        image: resultProducts.recommendations.min_price.image_url,
                                                        price: resultProducts.recommendations.min_price.discounted_price,
                                                        mercado_libre_url: resultProducts.recommendations.min_price.product_url
                                                    })}
                                                >
                                                    <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.5rem', color: '#ff4d4f' }} />
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Producto más costoso */}
                                    <div className="my-2 position-relative">
                                        <h5 className="text-center">Producto más costoso</h5>
                                        <Card style={{ height: '400px', width: '100%', position: 'relative' }}>
                                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                                <img
                                                    alt={resultProducts.recommendations.max_price.name}
                                                    src={resultProducts.recommendations.max_price.image_url}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <CardBody>
                                                <CardTitle tag="h5" className="text-center">
                                                    {resultProducts.recommendations.max_price.name}
                                                </CardTitle>
                                                <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                                                    {resultProducts.recommendations.max_price.seller.name}
                                                </CardSubtitle>
                                                <CardText className="text-center">
                                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                                                        resultProducts.recommendations.max_price.discounted_price,
                                                    )}
                                                </CardText>
                                                <Button
                                                    color="primary"
                                                    href={resultProducts.recommendations.max_price.product_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Ir al producto
                                                </Button>
                                            </CardBody>
                                            <div className="position-absolute bottom-0 end-0 p-2">
                                                <Button
                                                    color="link"
                                                    className="p-0"
                                                    onClick={() => addToWishListHandler({
                                                        name: resultProducts.recommendations.max_price.name,
                                                        image: resultProducts.recommendations.max_price.image_url,
                                                        price: resultProducts.recommendations.max_price.discounted_price,
                                                        mercado_libre_url: resultProducts.recommendations.max_price.product_url
                                                    })}
                                                >
                                                    <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.5rem', color: '#ff4d4f' }} />
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Producto con más descuento */}
                                    <div className="my-2 position-relative">
                                        <h5 className="text-center">Producto con más descuento</h5>
                                        <Card style={{ height: '400px', width: '100%', position: 'relative' }}>
                                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                                <img
                                                    alt={resultProducts.recommendations.max_desc.name}
                                                    src={resultProducts.recommendations.max_desc.image_url}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <CardBody>
                                                <CardTitle tag="h5" className="text-center">
                                                    {resultProducts.recommendations.max_desc.name}
                                                </CardTitle>
                                                <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                                                    {resultProducts.recommendations.max_desc.seller.name}
                                                </CardSubtitle>
                                                <CardText className="text-center">
                                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                                                        resultProducts.recommendations.max_desc.discounted_price,
                                                    )}
                                                </CardText>
                                                <Button
                                                    color="primary"
                                                    href={resultProducts.recommendations.max_desc.product_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Ir al producto
                                                </Button>
                                            </CardBody>
                                            <div className="position-absolute bottom-0 end-0 p-2">
                                                <Button
                                                    color="link"
                                                    className="p-0"
                                                    onClick={() => addToWishListHandler({
                                                        name: resultProducts.recommendations.max_desc.name,
                                                        image: resultProducts.recommendations.max_desc.image_url,
                                                        price: resultProducts.recommendations.max_desc.discounted_price,
                                                        mercado_libre_url: resultProducts.recommendations.max_desc.product_url
                                                    })}
                                                >
                                                    <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.5rem', color: '#ff4d4f' }} />
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Producto con mejor calificación */}
                                    <div className="my-2 position-relative">
                                        <h5 className="text-center">Producto con mejor calificación</h5>
                                        <Card style={{ height: '400px', width: '100%', position: 'relative' }}>
                                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                                <img
                                                    alt={resultProducts.recommendations.best_rating.name}
                                                    src={resultProducts.recommendations.best_rating.image_url}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <CardBody>
                                                <CardTitle tag="h5" className="text-center">
                                                    {resultProducts.recommendations.best_rating.name}
                                                </CardTitle>
                                                <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                                                    {resultProducts.recommendations.best_rating.seller.name}
                                                </CardSubtitle>
                                                <CardText className="text-center">
                                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                                                        resultProducts.recommendations.best_rating.discounted_price,
                                                    )}
                                                </CardText>
                                                <Button
                                                    color="primary"
                                                    href={resultProducts.recommendations.best_rating.product_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Ir al producto
                                                </Button>
                                            </CardBody>
                                            <div className="position-absolute bottom-0 end-0 p-2">
                                                <Button
                                                    color="link"
                                                    className="p-0"
                                                    onClick={() => addToWishListHandler({
                                                        name: resultProducts.recommendations.best_rating.name,
                                                        image: resultProducts.recommendations.best_rating.image_url,
                                                        price: resultProducts.recommendations.best_rating.discounted_price,
                                                        mercado_libre_url: resultProducts.recommendations.best_rating.product_url
                                                    })}
                                                >
                                                    <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.5rem', color: '#ff4d4f' }} />
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                </>
                            )}
                        </CardBody>
                    </Card>
                </Col>

                <Col md="9">
                    <Card>
                        <CardBody>
                            {!!resultProducts && (
                                <Row>
                                    {resultProducts.results.map((prod: any, index: number) => (
                                        <Col key={index} md="4" className="mb-4 d-flex align-items-stretch position-relative">
                                            <Card style={{ height: '400px', width: '100%', position: 'relative' }}>
                                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                                    <img
                                                        alt={prod.name}
                                                        src={prod.image_url}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <CardBody>
                                                    <CardTitle tag="h5" className="text-center">
                                                        {prod.name}
                                                    </CardTitle>
                                                    <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                                                        {prod.seller?.name || 'Vendedor desconocido'}
                                                    </CardSubtitle>
                                                    <CardText className="text-center">
                                                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                                                            prod.discounted_price,
                                                        )}
                                                    </CardText>
                                                    <Button
                                                        color="primary"
                                                        href={prod.product_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Ir al producto
                                                    </Button>
                                                </CardBody>
                                                <div className="position-absolute bottom-0 end-0 p-2">
                                                    <Button
                                                        color="link"
                                                        className="p-0"
                                                        onClick={() => addToWishListHandler({
                                                            name: prod.name,
                                                            image: prod.image_url,
                                                            price: prod.discounted_price,
                                                            mercado_libre_url: prod.product_url
                                                        })}
                                                    >
                                                        <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.5rem', color: '#ff4d4f' }} />
                                                    </Button>
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </CardBody>
                    </Card>
                </Col>


            </Row>
        </Container>

    )
}

export default Products