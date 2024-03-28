import Header from '@/components/common/Header'
import CreateProduct from '@/components/products/CreateProduct';
import React from 'react'

const Create = () => {
    return (
        <section className="w-full min-h-screen flex flex-col">
            <Header title={"Create a Product"} />
            <CreateProduct />
        </section>
    )
}

export default Create;
