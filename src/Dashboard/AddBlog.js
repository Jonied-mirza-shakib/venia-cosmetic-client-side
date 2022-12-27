import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

const AddBlog = () => {
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
          const blogDetails = {
            name: data.name,
            description: data.description,
            img: image
          }
          fetch('https://venia-cosmetic-sever-side-production-0705.up.railway.app/blog', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogDetails),
          })
            .then(res => res.json())
            .then(data => {
              console.log('Success:', data);
              if (data.insertedId) {
                toast('Added Blog Successfully')
              } else {
                toast.error('Added Blog field')
              }

            })
        }
      })
    reset()
  }
  return (
    <div>
      <h1 className='text-3xl text-center text-blue-700 uppercase font-bold mt-5'>Blog added</h1>
      <div className='sm:w-full md:w-6/12 lg:w-6/12 m-auto'>
      <div className="card w-full bg-base-100 shadow-xl mb-5">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label for="name">Name</label>
              <br />
              <input className='w-full' type='text' {...register("name", { required: true })} />
              {errors.name?.type === 'required' && "name is required"}
            </div>
            <div>
              <label for="description">Description</label>
              <br />
              <textarea style={{ border: '1px solid green' }} className='w-full' type='text' rows="10" cols="50" {...register("description", { required: true })}></textarea>
              {errors.description && <p>Description is required</p>}
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

export default AddBlog;