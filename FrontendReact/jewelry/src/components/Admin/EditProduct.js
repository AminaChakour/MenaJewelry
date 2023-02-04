import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Swal from "sweetalert2";
import { MdEdit } from "react-icons/md";

import { ReactSession } from "react-client-session";
import ReactLoading from "react-loading";
import Modal from "./Modal.js";

const ListProducts = (props) => {
  if (ReactSession.get("userEmail") !== "admin@gmail.com") {
    window.location.href = "/home";
  }
  const [openModal, setOpenModal] = useState(false);
  const [prodToEdit,setProdToEdit] = useState([])
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState([]);
  const [SearchText, SetSearchText] = useState("");
  const [SearchedProducts, SetSearchedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);
  const [nPages, setnPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [indexOfLastRecord, setLastRec] = useState(
    currentPage * recordsPerPage
  );
  const [indexOfFirstRecord, setFirstRec] = useState(
    indexOfLastRecord - recordsPerPage
  );


    
  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
   const handleUpdate = (newProductData) =>{

    axios.put("http://127.0.0.1:8000/product", 
    newProductData )
    .then((res) => {

    const data = res.data;

        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            text:  "Product updated !",
            icon: "success",
            confirmButtonText: "Ok",
          });
        
          
          
        } else if (data.status === "error") {
          Swal.fire({
            title: "Error !",
            text: "Try again",
            icon: "error",
            confirmButtonText: "Ok",
          });
        } 

        sleep(2000).then((r) => {
            window.location.href = "/editproducts";
          });

    })

   }
  useEffect(() => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/product").then((res) => {
      setProducts(res.data);


      setLastRec(currentPage * recordsPerPage);
      setFirstRec(currentPage * recordsPerPage - recordsPerPage);

      setCurrentRecords(
        res.data.slice(
          currentPage * recordsPerPage - recordsPerPage,
          currentPage * recordsPerPage
        )
      );


      setnPages(Math.ceil(Products.length / recordsPerPage));

      setPageNumbers(
        [
          ...Array(Math.ceil(res.data.length / recordsPerPage) + 1).keys(),
        ].slice(1)
      );
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    setLastRec(currentPage * recordsPerPage);
    setFirstRec(currentPage * recordsPerPage - recordsPerPage);
    setCurrentRecords(
      Products.slice(
        currentPage * recordsPerPage - recordsPerPage,
        currentPage * recordsPerPage
      )
    );

    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);


    SetSearchedProducts(
      Products.filter((prod) =>
        prod.Title.toLowerCase()
          .trim()
          .includes(SearchText.toLowerCase().trim())
      )
    );
    setLoading(false);
  }, [SearchText]);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleModal= (CURRENTprod) => {
    setProdToEdit(CURRENTprod)
    setOpenModal(true)
  };
  useEffect(()=> {
    if(openModal===false){
        setProdToEdit([])

    }

  },[openModal])
 
  return (
    <>
      {loading ? (
        <div className="loader">
          <ReactLoading type="cylon" color="gray" height={667} width={400} />
        </div>
      ) : (
        <div>
          <div className="row searchBarDiv">
            <input
              value={SearchText}
              placeholder="SEARCH"
              onChange={(e) => SetSearchText(e.target.value)}
              type="search"
              id="form1"
              className="searchBar form-control"
            />
          </div>

          <div className="row align-items-center">
            {SearchText.length === 0
              ? currentRecords.map((currentProd) => {
                  return (
                    <>
                      <div className="col-4 ProductCard">
                      <button
                          className="btnEditProd"
                          onClick={() => handleModal(currentProd)}
                        >
                          <MdEdit size={30} />
                        </button>
                        <img
                          className="ProductListImages"
                          alt="y"
                          src={currentProd.Image}
                        />

                        <br />

                        <h3 className="titleProd align-items-center">
                          {currentProd.Title}
                        </h3>

                        <h3 className="priceProd align-items-center">
                          {currentProd.Price}$
                        </h3>
                      
                        <Modal
                          open={openModal}
                          onClose={() => setOpenModal(false)}
                          onSave={(newProd) => handleUpdate(newProd)}
                          prod={prodToEdit}
                                                
                        />
                      </div>
                    </>
                  );
                })
              : SearchedProducts.map((currentProd) => {
                  return (
                    <>
                      <div className="col-4 ProductCard">
                      <button
                          className="btnEditProd"
                          onClick={() => handleModal(currentProd)}
                        >
                          <MdEdit size={30} />
                        </button>
                        <img
                          className="ProductListImages"
                          alt="y"
                          src={currentProd.Image}
                        />

                        <br />

                        <h3 className="titleProd align-items-center">
                          {currentProd.Title}
                        </h3>

                        <h3 className="priceProd align-items-center">
                          {currentProd.Price}$
                        </h3>
                       
                        <Modal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            onSave={(newProd) => handleUpdate(newProd)}
                            prod={prodToEdit}
                        />
                      </div>
                    </>
                  );
                })}
          </div>

          {SearchText.length === 0 && (
            <nav className="paginationNav" aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="#" onClick={prevPage}>
                    Previous
                  </a>
                </li>
                {pageNumbers.map((pgNumber) => (
                  <li
                    key={pgNumber}
                    className={`page-item ${
                      currentPage === pgNumber ? "active" : ""
                    }`}
                  >
                    <a
                      onClick={() => setCurrentPage(pgNumber)}
                      className="page-link"
                      href="#"
                    >
                      {pgNumber}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a className="page-link" onClick={nextPage} href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default ListProducts;
