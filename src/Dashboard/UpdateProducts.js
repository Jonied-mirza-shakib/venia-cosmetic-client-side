import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const UpdateProducts = () => {
    const { id } = useParams()
    const { register, formState: { errors },reset, handleSubmit } = useForm();
    const onSubmit = async data => {

    }
    return (
        <div>
            <h1 className='text-2xl text-center text-blue-700 uppercase font-bold mb-5 mt-5'>Update Product</h1>
            <div class="card w-2/4 bg-base-100 shadow-xl">
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
    );
};

export default UpdateProducts;