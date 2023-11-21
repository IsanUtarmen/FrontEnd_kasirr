"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Menu = {
  id: number;
  jenis_id: string;
  nama_menu: string;
  harga: string;
  image: string;
  deskripsi: string;
};

const API_URL = "http://127.0.0.1:8000/api";
const DeleteMenu = (menu: Menu) => {
  const [modal, setModal] = useState(false);
  const [jenis_id, setJenis_id] = useState("");
  const [nama_menu, setNamaMenu] = useState("");
  const [harga, setHarga] = useState("");
  const [image, setImage] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleDelete = async (menuId: Number) => {
    setIsMutating(true);
    let params = { id: menuId };
    let endpoint = `${API_URL}/menu/${menuId}`;
    const data = {
      jenis_id: jenis_id,
      nama_menu: nama_menu,
      harga: harga,
      image: image,
      deskripsi: deskripsi,
    };
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
            Yakin Mau Hapus {menu.nama_menu}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(menu.id)}
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
export default DeleteMenu;
