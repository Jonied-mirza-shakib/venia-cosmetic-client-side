import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const UpdateProducts = () => {
    const { id } = useParams()
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const imageStorageApi = '19bf4cd9f8fbd132a1a0e00b0808ce6a';
    const onSubmit = async data => {
        console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageApi}`
        fetch(url, {
            method: 'PUT',
            body: formData
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                if (result.success) {
                    const images = result.data.url;
                    const updateProduct = {
                        name: data.name,
                        price: data.price,
                        img: images
                    }
                    fetch(`http://localhost:5000/products/${id}`, {
                        method: 'PUT', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updateProduct),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('data:', data);
                        })
                }
            })
        reset()
    }
    return (
        <div>
            <h1 className='text-2xl text-center text-blue-700 uppercase font-bold mb-5 mt-5'>Update Product</h1>
            <div className='sm:w-full md:w-6/12 lg:w-6/12 m-auto'>
            <div class="card w-full bg-base-100 shadow-xl">
                <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label for="name">Name</label>
                            <br />
                            <input className='w-full' type='text' {...register("name", { required: true })} />
                            {errors.name?.type === 'required' && "name is required"}
                        </div>
                        <div>
                            <label for="price">Price</label>
                            <br />
                            <input className='w-full' type='text' {...register("price", { required: true })} />
                            {errors.price && <p>price is required</p>}
                        </div>
                        <div>
                            <label for="image">Image</label>
                            <br />
                            <input className='w-full' type='file' {...register("image", { required: true })} />
                            {errors.image && <p>image is required</p>}
                        </div>
                        <input type="submit" value='UPDATE' className='btn mt-5 text-xl font-bold cursor-pointer w-full' />
                    </form>
                </div>
            </div>
            </div>
            
        </div>
    );
};

export default UpdateProducts;