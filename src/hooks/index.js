import { useContext, useEffect, useState } from "react";
import { AlbumContext } from "../providers/albumProvider";
import { useToasts } from "react-toast-notifications";

import { addAlbums, deleteAlbum, getAlbums, editAlbums } from "../api";
export const useAlbum = () => {
  return useContext(AlbumContext);
};
export const useProvideAlbum = () => {
  console.log("hemlo");
  const [Albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await getAlbums();
      // console.log("response ", response);
      if (response.success) setAlbums(response.data);
    };
    fetchAlbum();

    setLoading(false);
  }, []);

  // to add the album

  const addAlbum = (title, userId) => {
    setLoading(true);
    const postAlbum = async () => {
      const response = await addAlbums(title, userId);
      if (response.success) {
        // console.log("This is the response", response);
        setAlbums([response.data, ...Albums]);
      }

      setLoading(false);
      addToast("Album added succesfully", {
        appearance: "success",
      });
    };
    postAlbum();
  };
  // to delete the album
  const deleteAlbums = (Id) => {
    setLoading(true);
    const deAlbum = async () => {
      const response = await deleteAlbum();
      if (response.success) {
        // console.log("This is the response", response);
        let newAlbum = Albums.filter((al) => al.id !== Id);
        setAlbums(newAlbum);
      }
      setLoading(false);
      addToast("Album deleted succesfully", {
        appearance: "success",
      });
    };
    deAlbum();
  };
  // to edit the album
  const editAlbum = (content, userId, Id) => {
    setLoading(true);
    const deAlbum = async () => {
      const response = await editAlbums(content, userId, Id);
      if (response.success) {
        // console.log("This is the response", response);
        let newAlbum = Albums.map((album) => {
          if (album.id === Id) {
            console.log(content, userId, Id);
            album.edited = true;
            album.title = content;
            album.userId = userId;
          }

          return album;
        });
        setAlbums(newAlbum);
        setLoading(false);
        addToast("Album edit succesfully", {
          appearance: "success",
        });
      }
    };
    deAlbum();
  };
  return {
    Albums,
    loading,
    addAlbum,
    deleteAlbums,
    editAlbum,
  };
};
