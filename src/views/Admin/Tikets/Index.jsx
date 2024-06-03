//import hook
import { useState, useEffect } from "react";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import service api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import Link
import { Link } from "react-router-dom";

//import react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function TiketIndex() {
  //title page
  document.title = "Loket Tiket";  

  const [layanans, setLayanans] = useState([]);
  

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataLayanans"
  const fetchDataLayanans = async () => {
    try {
      const response = await Api.get("/api/admin/layanans/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLayanans(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error('Terlalu banyak permintaan. Silakan coba lagi setelah beberapa saat.');
      } else {
        console.error(error);
      }
    }
  };

  //hook useEffect
  useEffect(() => {
    //call function "fetchDataLayanans"
    fetchDataLayanans();    
    
  }, [token]);

  return (
    <LayoutAdmin>
      <main>      
        <div className="container-fluid px-4 mt-5">
          <div className="row">
            {layanans.map((layanan) => (
              <div className="col-xl-6 col-md-6" key={layanan.id}>
                <div className="card mb-4 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <img src={layanan.image} alt="" width={150} height={150} />
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small stretched-link btn"
                      to={`/admin/tiket/create/${layanan.id}`}
                    >
                      <strong>{layanan.name}</strong>
                    </Link>
                    <div className="small">
                      <i className="fas fa-ticket"></i> 
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </LayoutAdmin>
  );
}
