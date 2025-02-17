import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../loading/loading';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function Categories() {
  const [dataSubcategories, setDataSubcategories] = useState(null);
  const [nameCategory, setNameCategory] = useState(null);

  async function getCategories() {
    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/categories',
      method: 'GET',
    };
    return axios.request(options);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Categories'],
    queryFn: getCategories,
    refetchOnMount: false,
  });

  async function getSubCategories({ productId }) {
    toast.dismiss();
    const subCat = toast.loading('Waiting...', {
      position: 'top-right', // عرض الرسالة في الأعلى يمين
    });
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/categories/${productId}/subcategories`,
        method: 'GET',
      };
      const { data } = await axios.request(options);
      setDataSubcategories(data.data);
      toast.success('Success', { position: 'top-right' });
    } catch (error) {
      console.log(error);
      toast.error('Error loading subcategories', { position: 'top-right' });
    } finally {
      toast.dismiss(subCat);
    }
  }

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="error-message text-red-600">
        {error?.message || 'An error occurred while fetching data.'}
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-primary-600 border-b-4 pb-4">
        Explore Categories
      </h1>
      <title>Categories - Freshcart</title>
      <meta name="description" content="Browse through various categories of products and find what you need at Freshcart." />
      <meta name="keywords" content="Categories, Freshcart, Shopping, Products, Online Store" />
      <meta property="og:title" content="Categories - Freshcart" />
      <meta property="og:description" content="Explore a wide range of products under different categories at Freshcart. Find your favorite items now!" />
      
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {data?.data?.data?.map((category, index) => (
          <div
            onClick={() => {
              getSubCategories({ productId: category._id });
              setNameCategory(category.name);
              setDataSubcategories(null);
            }}
            key={category._id}
            className="cursor-pointer category text-center rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="h-64 bg-gradient-to-r from-primary-500 to-primary-300">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="content-body p-4 text-2xl text-primary-500 font-semibold hover:text-primary-700">
              {category.name}
            </div>
          </div>
        ))}
      </section>

      {dataSubcategories && (
        <section className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-md p-5">
          <h2 className="name-sub-category font-bold text-3xl text-primary-500 text-center mb-5">
            {nameCategory}
          </h2>
          <div className="subs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
            {dataSubcategories.map((cat) => (
              <div
                key={cat._id}
                className="bg-white text-center p-6 rounded-lg shadow-lg text-sm md:text-lg font-bold capitalize transition-all duration-300 hover:bg-primary-100"
              >
                {cat.name}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
