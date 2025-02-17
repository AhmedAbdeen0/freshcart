import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../loading/loading';

export default function Brands() {
  // Function to fetch all brands
  const getAllBrands = () => {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  };

  // Using useQuery hook to fetch brands data
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['getBrands'],
    queryFn: getAllBrands,
  });

  // Early returns for loading and error states
  if (isLoading) return <Loading />;
  if (isError) return <h2>There was an error: {error?.message || 'Unknown error'}</h2>;

  return (
    <>
      <div className="py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.data?.length ? (
          data.data.data.map((brand) => (
            <div
              key={brand._id}
              className="group bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <img
                src={brand.image}
                className="w-full h-48 object-cover transition-transform transform group-hover:scale-110"
                alt={brand.name}
              />
              <div className="p-4">
                <h3 className="text-center text-lg font-semibold text-gray-700 group-hover:text-green-600">
                  {brand.name}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p>No brands available.</p>
        )}
      </div>

      <title>Fresh Cart - Brands</title>
    </>
  );
}
