import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { formatNumber } from '../../helpers/utils';
import { Button, ButtonGroup } from 'react-bootstrap'
import $ from "jquery";
import ClickAwayListener from 'react-click-away-listener';

const ProductItem = ({ product }) => {

    const [productSelected, setSelectedProduct] = useState(product)


    const { addProduct, cartItems, increase } = useContext(CartContext);

    const isInCart = product => {
        return cartItems.find(item => item.id === product.id && product.size == item.size);
    }

    const onClick = (event) => {

        // find product with value == buttongroup.value
        console.log(event.target.parentNode.parentNode.id)

        // set value of product.size == buttongroup.value
        productSelected.size = event.target.value
        productSelected.button = event.target.value

        // setButton(event.target.value);
        console.log(event.target.value)
        console.log(productSelected.size)

    }

    const handleClickAway = (event) => {
        if (event.target.id != productSelected.id) {
            product.size = null
        }

    };

    $(".type").click(function () {
        $(".type").removeClass("active");
        $(this).addClass("active");
    });

    return (
        <div className="card card-body">
            <img style={{ display: "block", margin: "0 auto 10px", maxHeight: "200px" }} className="img-fluid"
                src={product.photo + '?v=' + product.id} alt="" />
            <p>{product.name}</p>
            <h3 className="text-left">{formatNumber(product.price)}</h3>
            <div className="text-left" id={product.id}>
                <ClickAwayListener onClickAway={handleClickAway} >
                    <ButtonGroup onClick={onClick} ref={product.value} aria-label="Basic example">
                        <Button className="type" active={product.size == "s"} value="s" variant="secondary">Small</Button>
                        <Button className="type" active={product.size == "m"} value="m" variant="secondary">Medium</Button>
                        <Button className="type" active={product.size == "l"} value="l" variant="secondary">Large</Button>
                    </ButtonGroup>
                </ClickAwayListener>
            </div>
            <div className="text-right">
                <Link to="/" className="btn btn-link btn-sm mr-2">Details</Link>

                {
                    isInCart(productSelected) &&
                    <button
                        id={product.id}
                        onClick={() =>
                            increase(productSelected)}
                        className="btn btn-outline-primary btn-sm">Add more</button>
                }

                {
                    !isInCart(productSelected) &&
                    <button
                        id={product.id}
                        onClick={() => addProduct(productSelected)}
                        className="btn btn-primary btn-sm">Add to cart</button>
                }

            </div>
        </div>
    );
}

export default ProductItem;