import React, { useContext, useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { ProductsContext } from '../../contexts/ProductsContext';
import styles from './ProductsGrid.module.scss';
import { Fragment } from 'react';
import Select from 'react-select'


const ProductsGrid = () => {

    const { products, handleChange } = useContext(ProductsContext)

    const [values, setValues] = useState({
        category: 'all',
        filteredProducts: products
    })

    const { category, filteredProducts } = values

    const options = [
        { value: 'all', label: 'All' },
        { value: 'ts', label: 'T-Shirts' },
        { value: 'l', label: 'Leggings' },
    ]

    // filter products
    const onChange = (event) => {
        console.log(event.target.value)
        setValues({ ...values, category: event.target.value })

    }

    // filter products on page load
    useEffect(() => {
        if(category && category != "all"){
             setValues({...values, filteredProducts: products.filter(q => q.category == category) })
        } else {
            setValues({...values, filteredProducts: products })
        }
    }, [category])

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-3">
                    <select id="lang" onChange={onChange} value={category}>
                        {options.map((option) => {
                            return (<option value={option.value}>{option.label}</option>)
                        })}
                    </select>
                </div>
            </div>

                <div className={styles.p__container}>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="py-3">
                                {filteredProducts.length} Products
                    </div>
                        </div>
                    </div>
                    <div className={styles.p__grid}>

                        {
                            filteredProducts.map(product => (
                                <ProductItem key={product.id} product={product} />
                            ))
                        }

                    </div>
                    <div className={styles.p__footer}>

                    </div>
                </div>
        </Fragment>
    );
}

export default ProductsGrid;