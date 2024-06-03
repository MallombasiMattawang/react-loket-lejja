//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

//import react Quill
import ReactQuill from "react-quill";

// quill CSS
import "react-quill/dist/quill.snow.css";

//format number input
import FormattedNumberInput from "../../../components/admin/FormattedNumberInput";

//money format
import moneyFormat from "../../../utils/MoneyFormat";

export default function TiketCreate() {
  //title page
  document.title = "Buat Tiket Layanan";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define status hari
  const [status, setStatus] = useState("");

  //define state for form
  const [layanan_id, setLayananId] = useState("");
  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  const [tarif_pnbp_hr_kerja, setTarif_pnbp_hr_kerja] = useState("");
  const [tarif_pemda_hr_kerja, setTarif_pemda_hr_kerja] = useState("");
  const [tarif_pnbp_hr_libur, setTarif_pnbp_hr_libur] = useState("");
  const [tarif_pemda_hr_libur, setTarif_pemda_hr_libur] = useState("");
  const [tarif_asuransi, setTarif_asuransi] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

 
  //define jumlah tiket
  const [jumlah, setJumlah] = useState(0);

  //define total bayar
  const [total, setTotal] = useState(0);

  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchStatusHari"
  const fetchStatusHari = async () => {
    await Api.get(`/api/admin/config-day/1`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setStatus(response.data.data.status);
    });
  };

  //function "fetchDataLayanan"
  const fetchDataLayanan = async () => {
    await Api.get(`/api/admin/layanans/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setLayananId(response.data.data.id);
      setName(response.data.data.name);
      setActive(response.data.data.active);
      setDescription(response.data.data.description);
      setTarif_asuransi(response.data.data.tarif_asuransi);
      setTarif_pemda_hr_kerja(response.data.data.tarif_pemda_hr_kerja);
      setTarif_pemda_hr_libur(response.data.data.tarif_pemda_hr_libur);
      setTarif_pnbp_hr_kerja(response.data.data.tarif_pnbp_hr_kerja);
      setTarif_pnbp_hr_libur(response.data.data.tarif_pnbp_hr_libur);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchStatusHari dan fetchDataLayanan"
    fetchStatusHari();
    fetchDataLayanan();
  }, []);

  //function "updateLayanan"
  const updateLayanan = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("layanan_id", layanan_id);
    formData.append("name", name);
    formData.append("image", image);
    formData.append("active", active);
    formData.append("tarif_pnbp_hr_kerja", tarif_pnbp_hr_kerja);
    formData.append("tarif_pemda_hr_kerja", tarif_pemda_hr_kerja);
    formData.append("tarif_pnbp_hr_libur", tarif_pnbp_hr_libur);
    formData.append("tarif_pemda_hr_libur", tarif_pemda_hr_libur);
    formData.append("tarif_asuransi", tarif_asuransi);
    formData.append("jumlah", jumlah);
    formData.append("description", description);
    // formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/tiket`, formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // Use the id from response directly
        navigate(`/admin/tiket-cetak/${response.data.data.id}`);

        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };

  // Universal handler for all input changes
  const handleInputChange = (name, value) => {
    switch (name) {
      case "tarif_pnbp_hr_kerja":
        setTarif_pnbp_hr_kerja(value);
        break;
      case "tarif_pemda_hr_kerja":
        setTarif_pemda_hr_kerja(value);
        break;
      case "tarif_pnbp_hr_libur":
        setTarif_pnbp_hr_libur(value);
        break;
      case "tarif_pemda_hr_libur":
        setTarif_pemda_hr_libur(value);
        break;
      case "tarif_asuransi":
        setTarif_asuransi(value);
        break;
      case "total":
        setTotal(value);

        break;
      default:
        break;
    }
  };
  const hargaPerTiketKerja =
    tarif_asuransi + tarif_pemda_hr_kerja + tarif_pnbp_hr_kerja; // Contoh harga per tiket
  const hargaPerTiketLibur =
    tarif_asuransi + tarif_pemda_hr_libur + tarif_pnbp_hr_libur; // Contoh harga per tiket

  const handleJumlahChange = (e) => {
    const newJumlah = parseInt(e.target.value, 10);

    setJumlah(newJumlah);

    if (status == "BIASA") {
      setTotal(newJumlah * hargaPerTiketKerja);
    } else {
      setTotal(newJumlah * hargaPerTiketLibur);
    }
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/tiket"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <span className="badge bg-secondary">
                      <i className="fa fa-pencil-alt"></i> Buat Tiket {name}
                    </span>{" "}
                    <span className="badge bg-secondary">STATUS: {status}</span>
                  </h6>
                  <hr />
                  <div className="table-responsive mb-4">
                    {status == "BIASA" ? (
                      <table className="table table-bordered table-centered mb-0 rounded">
                        <thead className="thead-dark">
                          <tr className="border-0 text-center">
                            <th className="border-0">
                              Rincian Tarif Hari Biasa
                            </th>
                            <th className="border-0">Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Tarif PERUSDA</td>
                            <td className="text-end">
                              {moneyFormat(tarif_pemda_hr_kerja)}
                            </td>
                          </tr>
                          <tr>
                            <td>Tarif PNBP</td>
                            <td className="text-end">
                              {moneyFormat(tarif_pnbp_hr_kerja)}
                            </td>
                          </tr>
                          <tr>
                            <td>Tarif Asuransi</td>
                            <td className="text-end">
                              {moneyFormat(tarif_asuransi)}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total</strong>
                            </td>
                            <td className="text-end">
                              <strong>
                                {moneyFormat(
                                  tarif_asuransi +
                                    tarif_pemda_hr_kerja +
                                    tarif_pnbp_hr_kerja
                                )}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <table className="table table-bordered table-centered mb-0 rounded">
                        <thead className="thead-dark">
                          <tr className="border-0 text-center">
                            <th className="border-0">
                              Rincian Tarif Hari Libur
                            </th>
                            <th className="border-0">Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Tarif PERUSDA</td>
                            <td className="text-end">
                              {moneyFormat(tarif_pemda_hr_libur)}
                            </td>
                          </tr>
                          <tr>
                            <td>Tarif PNBP</td>
                            <td className="text-end">
                              {moneyFormat(tarif_pnbp_hr_libur)}
                            </td>
                          </tr>
                          <tr>
                            <td>Tarif Asuransi</td>
                            <td className="text-end">
                              {moneyFormat(tarif_asuransi)}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total</strong>
                            </td>
                            <td className="text-end">
                              <strong>
                                {moneyFormat(
                                  tarif_asuransi +
                                    tarif_pemda_hr_libur +
                                    tarif_pnbp_hr_libur
                                )}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                  <form onSubmit={updateLayanan}>
                    <input
                      type="hidden"
                      className="form-control"
                      value={layanan_id}
                      onChange={(e) => setLayananId(e.target.value)}
                      placeholder="Enter Layanan Id"
                      readOnly
                    />

                    {status == "BIASA" ? (
                      <div>
                        <input
                          type="hidden"
                          value={tarif_pnbp_hr_kerja}
                          onChange={handleInputChange}
                          placeholder="Tarif PNBP Hari Kerja/Biasa"
                          name="tarif_pnbp_hr_kerja"
                        />

                        <input
                          type="hidden"
                          value={tarif_pemda_hr_kerja}
                          onChange={handleInputChange}
                          placeholder="Tarif PEMDA Hari Kerja/Biasa"
                          name="tarif_pemda_hr_kerja"
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          type="hidden"
                          value={tarif_pnbp_hr_libur}
                          onChange={handleInputChange}
                          placeholder="Tarif PNBP Hari Libur"
                          name="tarif_pnbp_hr_libur"
                        />

                        <input
                          type="hidden"
                          value={tarif_pemda_hr_libur}
                          onChange={handleInputChange}
                          placeholder="Tarif PEMDA Hari Libur"
                          name="tarif_pemda_hr_libur"
                        />
                      </div>
                    )}
                    <input
                      type="hidden"
                      value={tarif_asuransi}
                      onChange={handleInputChange}
                      placeholder="Tarif Asuransi"
                      name="tarif_asuransi"
                    />

                    <div className="mb-3">
                      <label className="form-label fw-bold">Jumlah Tiket</label>
                      <input
                        type="number"
                        className="form-control"
                        value={jumlah}
                        // onChange={(e) => setJumlah(e.target.value)}
                        onChange={handleJumlahChange}
                        min={1}
                        placeholder="Enter Jumlah Tiket"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Total Bayar</label>
                      <FormattedNumberInput
                        value={total}
                        onChange={handleInputChange}
                        placeholder="Total bayar"
                        name="total"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                      >
                        <i className="fa fa-save"></i> Save
                      </button>
                      <button type="reset" className="btn btn-md btn-warning">
                        <i className="fa fa-redo"></i> Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
