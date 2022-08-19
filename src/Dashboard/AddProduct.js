import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';



const AddProduct = () => {
  const { register, formState: { errors }, reset, handleSubmit } = useForm();
  const imageStorageApi = '19bf4cd9f8fbd132a1a0e00b0808ce6a';

  const onSubmit = async data => {
    console.log(data)
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageApi}`
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          const image = result.data.url;
          const productsDetails = {
            name: data.name,
            price: data.price,
            img: image
          }
          fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productsDetails),
          })
            .then(res => res.json())
            .then(data => {
              console.log('Success:', data);
              if (data.insertedId) {
                toast('Added Product Successfully')
              } else {
                toast.error('Added Product field')
              }

            })
        }
      })
    reset()
  }
  return (
    <div>
      <h1 className='text-3xl text-center text-blue-700 uppercase font-bold mt-5'>Product Added</h1>
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
            <input type="submit" value='ADD' className='btn mt-5 text-xl font-bold cursor-pointer w-full' />
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddProduct;