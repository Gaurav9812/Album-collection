import { createContext } from "react";

import { useProvideAlbum } from "../hooks";

const initialState = {
  Albums: [],
  addAlbum: () => {},
  deleteAlbums: () => {},
  loading: true,
  editAlbum: () => {},
};

export const AlbumContext = createContext(initialState);

export const AlbumProvider = ({ children }) => {
  const albums = useProvideAlbum();

  return (
    <AlbumContext.Provider value={albums}>{children}</AlbumContext.Provider>
  );
};
