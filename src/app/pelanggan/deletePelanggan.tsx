"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type pelanggan = {
  id: number;
  kategori_id: string;
  nama_pelanggan: string;
};

const API_URL = "http://127.0.0.1:8000/api";
const Deletepelanggan = (pelanggan: pelanggan) => {
  const [modal, setModal] = useState(false);
  const [kategori_id, setKategori_id] = useState("");
  const [nama_pelanggan, setNamapelanggan] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleDelete = async (pelangganId: Number) => {
    setIsMutating(true);
    let params = { id: pelangganId };
    let endpoint = `${API_URL}/pelanggan/${pelangganId}`;
    const data = { kategori_id: kategori_id,nama_pelanggan:nama_pelanggan };
    await axios.delete(endpoint);

    setIsMutating(false);
    router.refresh();
    setModal(false);
  };
  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {" "}
            Yakin Mau Hapus {pelanggan.nama_pelanggan}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(pelanggan.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Deletepelanggan;