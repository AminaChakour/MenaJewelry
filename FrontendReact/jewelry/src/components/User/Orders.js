import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Swal from "sweetalert2";

import { ReactSession } from "react-client-session";
import ReactLoading from "react-loading";

const Orders = (props) => {
  const [loading, setLoading] = useState(false);
  const [Orders, setOrders] = useState([]);
  const [SearchText, SetSearchText] = useState("");
  const [SearchedOrders, SetSearchedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);
  const [nPages, setnPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [indexOfLastRecord, setLastRec] = useState(
    currentPage * recordsPerPage
  );
  const [indexOfFirstRecord, setFirstRec] = useState(
    indexOfLastRecord - recordsPerPage
  );

  useEffect(() => {
    setLoading(true);

    axios.get("http://127.0.0.1:8000/orders/"+ ReactSession.get("idUser")).then((res) => {
      setOrders(res.data);

      setLastRec(currentPage * recordsPerPage);
      setFirstRec(currentPage * recordsPerPage - recordsPerPage);

      setCurrentRecords(
        res.data.slice(
          currentPage * recordsPerPage - recordsPerPage,
          currentPage * recordsPerPage
        )
      );
      console.log("current", currentRecords);

      setnPages(Math.ceil(Orders.length / recordsPerPage));

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
      Orders.slice(
        currentPage * recordsPerPage - recordsPerPage,
        currentPage * recordsPerPage
      )
    );
    console.log("current", currentRecords);
    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);

    SetSearchedOrders(
      Orders.filter((ord) =>
        ord.PurchaseDate.toLowerCase()
          .trim()
          .includes(SearchText.toLowerCase().trim())
      )
    );
    setLoading(false);
  }, [SearchText]);

  function redirectToSelected(id) {

    ReactSession.set("SelectedOrderId", id);

    window.location.href = "/orderDetails";
  }

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

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
              ? currentRecords.map((currentOrder) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          redirectToSelected(currentOrder.OrderId);
                        }}
                        className="col-4 OrdersCard"
                      >
                       
                       <h3 className="titleOrder align-items-center">
                          Order ID #{currentOrder.OrderId}
                        </h3>
                        <h3 className="dateOrder align-items-center">
                          {currentOrder.PurchaseDate}
                        </h3>

                        <h3 className="totalOrder align-items-center">
                          Total {currentOrder.Total}$
                        </h3>
                      </div>
                    </>
                  );
                })
              : SearchedOrders.map((currentOrder) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          redirectToSelected(currentOrder.OrderId);
                        }}
                        className="col-4 OrdersCard"
                      >
                      
                      <h3 className="titleOrder align-items-center">
                          Order ID #{currentOrder.OrderId}
                        </h3>
                        <h3 className="dateOrder align-items-center">
                        {currentOrder.PurchaseDate}
                        </h3>

                        <h3 className="totalOrder align-items-center">
                          {currentOrder.Total}$
                        </h3>
                      </div>
                    </>
                  );
                })}
          </div>

          {(SearchText.length === 0 && Orders.length >0 )&& (
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

{Orders.length == 0 && (
        <div className="EmptyCart">N O &nbsp;&nbsp;O R D E R S &nbsp;&nbsp;Y E T</div>
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

export default Orders;
