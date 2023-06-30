import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import connexion from "../../../services/connexion";

function AdminCard() {
  const params = useParams();
  const [profil, setProfil] = useState([]);
  const [localisationId, setLocalisationId] = useState([]);

  const getProfil = async () => {
    try {
      const profilsInfo = await connexion.get(`/admin/profile/${params.id}`);
      setProfil(profilsInfo);
    } catch (err) {
      console.error(err);
    }
  };
  const getLocalisation = async () => {
    try {
      const localisation = await connexion.get(`/localisation`);
      setLocalisationId(localisation);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfil();
    getLocalisation();
  }, []);

  if (!profil || profil.length === 0) {
    return <p>Chargement en cours...</p>;
  }

  const handleUser = (event) => {
    const updatedProfile = {
      ...profil[0],
      [event.target.name]: event.target.value,
    };
    setProfil([updatedProfile]);
  };

  const UpdateProfil = async (event) => {
    event.preventDefault();
    try {
      await connexion.put(`/admin/update/${params.id}`, profil);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {profil[0].src ? (
        <img src={profil[0].src} alt="profil de l'utilisateur" />
      ) : (
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"
          alt="profil de l'utilisateur"
        />
      )}

      <label htmlFor="firstname">Prénom</label>
      <input
        type="text"
        value={profil[0]?.firstname || ""}
        onChange={handleUser}
        name="firstname"
        required
      />
      <label htmlFor="lastname">Nom</label>
      <input
        type="text"
        value={profil[0]?.lastname || ""}
        onChange={handleUser}
        name="lastname"
        required
      />
      <label htmlFor="src">Photo de profil</label>
      <input
        type="text"
        value={profil[0] ? profil[0].src : ""}
        onChange={handleUser}
        name="src"
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        value={profil[0] ? profil[0].email : ""}
        onChange={handleUser}
        name="email"
        required
      />

      <select name="localisation_id" onClick={(event) => handleUser(event)}>
        {localisationId.map((localisation) => (
          <option key={localisation.id} value={localisation.id}>
            {localisation.place}
          </option>
        ))}
      </select>
      <label htmlFor="localisation">localisation</label>

      <button type="button" onClick={(event) => UpdateProfil(event)}>
        Mettre a jour le profil
      </button>
    </div>
  );
}

export default AdminCard;
