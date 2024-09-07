import React from "react";

export default function Galery() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Galería
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="relative group">
            <img
              src="https://via.placeholder.com/600"
              alt="Imagen 1"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-semibold text-lg">Imagen 1</span>
            </div>
          </div>
          <div className="relative group">
            <img
              src="https://via.placeholder.com/600"
              alt="Imagen 2"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-semibold text-lg">Imagen 2</span>
            </div>
          </div>
          <div className="relative group">
            <img
              src="https://via.placeholder.com/600"
              alt="Imagen 3"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-semibold text-lg">Imagen 3</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
