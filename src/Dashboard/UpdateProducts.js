import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProducts = () => {
    const { id } = useParams()
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const imageStorageApi = '19bf4cd9f8fbd132a1a0e00b0808ce6a';
    const onSubmit = async data => {
        console.log(data)
        fetch(`https://warm-eyrie-71382.herokuapp.com/products/${id}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data:', data);
                if(data.modifiedCount>0){
                    toast('Product Updated successfully')
                   }else{
                    toast.error('Product Updated Filed')
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
                            <label for="image">Image Url</label>
                            <br />
                            <input className='w-full' type='text' {...register("img", { required: true })} />
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