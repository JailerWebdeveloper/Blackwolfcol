import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../css/Reactstyles.css"
import Cookies from "js-cookie"; // Importa la biblioteca js-cookie

const Pagination = () => {
  const GetAllProducts = async () => {
    const res = await fetch(
      `https://backend-wolf-psi.vercel.app/Productos/todos`
    );
    const data = await res.json();
    return data;
  };

  const [prods, setProds] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await GetAllProducts();
      setProds(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const savedFilter = Cookies.get("filter"); // Lee el valor de la cookie al cargar la página
    if (savedFilter) {
      setFilter(savedFilter);
    }
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    Cookies.set("filter", newFilter); // Guarda el valor del filtro en una cookie
  };

  const itemsPerPage = 1;

  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = prods.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setPageNumber(pageNumber);

  return (
    <>
      <div>
        {loading ? (
          <div class="loader z-10 absolute inset-0">
            <div data-glitch="Loading..." class="glitch">
              Loading...
            </div>
          </div>
        ) : (
          <>
            <div class="md:flex hidden ml-10 text-sm breadcrumbs"></div>
            <div class="bg-base overflow-y-auto w-full antialiased">
              <div class="flex flex-row relative h-full">
                <Sidebar client:load  filtro={setFilter} />
                <div class="flex-1 overflow-auto h-full w-4/5">
                  <div class="w-full h-full">
                    <section class="text-gray-600 body-font">
                      <div class="container px-5 mt-5 mx-auto">
                        <div class="grid md:grid-cols-4 grid-cols-2 grid-rows-2">
                          {currentItems.map((post, index) => (
                            <div class=" p-4 w-full" key={index}>
                              <a
                                href={`/${post.id}`}
                                class="block relative h-48 rounded border-2 overflow-hidden"
                              >
                                <img
                                  alt="ecommerce"
                                  class="object-contain object-center w-full h-full block"
                                  src={`https://backend-wolf-psi.vercel.app/imagen/${post.Imagen[0]}`}
                                />
                              </a>
                              <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                                  {post.Tematica}
                                </h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">
                                  {post.NombreProducto}
                                </h2>
                                <p class="mt-1">${post.Precio}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                  <div class="join w-full flex justify-center">
                    <button
                      onClick={() => paginate(pageNumber - 1)}
                      disabled={pageNumber === 1}
                      class={`join-item btn ${
                        pageNumber === 1 ? "btn-disabled" : ""
                      }`}
                    >
                      Atras
                    </button>
                    <span class="join-item btn">{pageNumber}</span>
                    <button
                      onClick={() => paginate(pageNumber + 1)}
                      disabled={
                        pageNumber === Math.ceil(prods.length / itemsPerPage)
                      }
                      class={`join-item btn ${
                        pageNumber === Math.ceil(prods.length / itemsPerPage)
                          ? "btn-disabled"
                          : ""
                      }`}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Pagination;
