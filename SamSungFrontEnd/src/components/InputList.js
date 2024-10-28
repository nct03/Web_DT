import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import productService from '../service/login/product/productService';

export default function InputList() {
  const [productListNotData, setProductListNotData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const role = localStorage.getItem('role');

  const fetchProductList = async (page = 0) => {
    try {
      const res = await productService.productListNotData(page);
      setProductListNotData(res.data.content);
      setCurrentPage(res.data.number);
      setPageCount(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const handlePageClick = async (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    await fetchProductList(selectedPage);
  };

  return (
      <>
        {role !== "ROLE_ADMIN" ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <img
                  src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png"
                  alt="403 Forbidden"
                  style={{ width: '100%', height: 'auto' }}
              />
            </div>
        ) : (
            <div style={{ marginTop: '200px', padding: '20px' }}>


              <main style={{ padding: '20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <h2 style={{ textAlign: 'center', color: '#343a40', marginBottom: '20px' }}>
                    Nhập liệu sản phẩm
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {productListNotData.map((element) => (
                        <div key={element.id} style={{ background: '#fff', border: '1px solid #dee2e6', borderRadius: '5px', overflow: 'hidden', width: '100%', maxWidth: '300px' }}>
                          <img
                              src={element.imageSet[0]?.name || 'https://via.placeholder.com/150'}
                              alt={element.name}
                              style={{ width: '100%', height: 'auto' }}
                          />
                          <div style={{ padding: '15px' }}>
                            <h5 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{element.name}</h5>
                            <NavLink
                                to={`/product/data-entry/${element.id}/${element.name}/${encodeURIComponent(element.imageSet[0]?.name.replaceAll('%', '*'))}`}
                                style={{
                                  display: 'inline-block',
                                  padding: '10px 15px',
                                  backgroundColor: '#007bff',
                                  color: '#fff',
                                  textDecoration: 'none',
                                  borderRadius: '5px',
                                }}
                            >
                              Nhập dữ liệu
                            </NavLink>
                          </div>
                        </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <ReactPaginate
                        previousLabel="Trước"
                        nextLabel="Sau"
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName="pagination"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        activeClassName="active"
                        activeLinkClassName="page-link"
                        forcePage={currentPage}
                    />
                  </div>
                </div>
              </main>
            </div>
        )}
      </>
  );
}
