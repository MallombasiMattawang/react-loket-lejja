//import hook
import { useState, useEffect } from "react";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import service api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import MoneyFormat
import moneyFormat from "../../../utils/MoneyFormat";

//import Link
import { Link } from "react-router-dom";

export default function Dashboard() {
  //title page
  document.title = "Dashboard - Desa Digital";

  //init state
  const [today, setToday] = useState(0);
  const [moon, setMoon] = useState(0);
  const [perusdaToday, setPerusdaToday] = useState(0);
  const [pnbpToday, setPnbpToday] = useState(0);
  const [asuransiToday, setAsuransiToday] = useState(0);

  const [perusdaMoon, setPerusdaMoon] = useState(0);
  const [pnbpMoon, setPnbpMoon] = useState(0);
  const [asuransiMoon, setAsuransiMoon] = useState(0);

  const [perusdaTotal, setPerusdaTotal] = useState(0);
  const [pnbpTotal, setPnbpTotal] = useState(0);
  const [asuransiTotal, setAsuransiTotal] = useState(0);

  const [totalToday, setTotalToday] = useState(0);
  const [totalMoon, setTotalMoon] = useState(0);
  const [totalAll, setTotalAll] = useState(0);

  const [countCategories, setCountCategories] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [countAparaturs, setCountAparaturs] = useState(0);

  //token from cookies
  const token = Cookies.get("token");

  //hook useEffect
  useEffect(() => {
    //fetch api
    Api.get("/api/admin/dashboard", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setToday(response.data.data.today);
      setMoon(response.data.data.moon);
      setPerusdaToday(response.data.data.perusdaToday);
      setPnbpToday(response.data.data.pnbpToday);
      setAsuransiToday(response.data.data.asuransiToday);
      setPerusdaMoon(response.data.data.perusdaMoon);
      setPnbpMoon(response.data.data.pnbpMoon);
      setAsuransiMoon(response.data.data.asuransiMoon);
      setPerusdaTotal(response.data.data.perusdaTotal);
      setPnbpTotal(response.data.data.pnbpTotal);
      setAsuransiTotal(response.data.data.asuransiTotal);
      setTotalToday(response.data.data.totalToday);
      setTotalMoon(response.data.data.totalMoon);
      setTotalAll(response.data.data.totalAll);

      setCountCategories(response.data.data.categories);
      setCountPosts(response.data.data.posts);
      setCountProducts(response.data.data.products);
      setCountAparaturs(response.data.data.aparaturs);
    });
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="card bg-default mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <table className="table">
                    <tr>
                      <td>Perusda</td>
                      <td className="text-end">{moneyFormat(perusdaToday)}</td>
                    </tr>
                    <tr>
                      <td>PNPB</td>
                      <td className="text-end">{moneyFormat(pnbpToday)}</td>
                    </tr>
                    <tr>
                      <td>Asuransi</td>
                      <td className="text-end">{moneyFormat(asuransiToday)}</td>
                    </tr>
                  </table>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  Pemasukan Hari ini, {today}
                  <div>
                    {moneyFormat(totalToday)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-6">
              <div className="card bg-default mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <table className="table">
                    <tr>
                      <td>Perusda</td>
                      <td className="text-end"> {moneyFormat(perusdaMoon)}</td>
                    </tr>
                    <tr>
                      <td>PNPB</td>
                      <td className="text-end"> {moneyFormat(pnbpMoon)}</td>
                    </tr>
                    <tr>
                      <td>Asuransi</td>
                      <td className="text-end"> {moneyFormat(asuransiMoon)}</td>
                    </tr>
                  </table>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  Pemasukan Bulan {moon}
                  <div className="">
                  {moneyFormat(totalMoon)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-end">
                  <strong> {moneyFormat(perusdaTotal)}</strong>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  Total Perusda
                  <div className="small text-white">
                    <i className="fas fa-home"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-end">
                  <strong> {moneyFormat(pnbpTotal)}</strong>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  Total PNBP
                  <div className="small text-white">
                    <i className="fas fa-tree"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-end">
                  <strong> {moneyFormat(asuransiTotal)}</strong>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  Total Asuransi
                  <div className="small text-white">
                    <i className="fas fa-medkit"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-danger text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-end">
                  <strong> {moneyFormat(totalAll)}</strong>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  Total Pemasukan
                  <div className="small text-white">
                    <i className="fas fa-bank"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
