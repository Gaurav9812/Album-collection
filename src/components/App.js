import { useState } from "react";
import { useAlbum } from "../hooks";
import Table from "./table";
import { useToasts } from "react-toast-notifications";
import Loader from "./loader";
function App() {
  const albumsC = useAlbum();
  const { addToast } = useToasts();

  //  states
  const [Add, setAdd] = useState(false);
  const [Content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [Id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  //albums
  const albums = albumsC.Albums;

  function handleButtonClick() {
    setAdd(true);
    setShowForm(true);
    setEdit(false);
    setContent("");
    setUserId("");
  }
  //to submit form
  function submitForm(e) {
    e.preventDefault();

    if (Content === "" || userId === "") {
      addToast("Field Cannot Be empty", {
        appearance: "error",
      });
      return;
    }

    albumsC.addAlbum(Content, userId);

    setAdd(false);
    setShowForm(false);
  }
  //to delete the album
  const handleDeleteClick = (id) => {
    albumsC.deleteAlbums(id);
  };
  //to edit the album
  const handleEditClick = (album) => {
    setEdit(true);
    setShowForm(true);
    setAdd(false);
    // console.log(album);
    setContent(album.title);
    setUserId(album.userId);
    setId(album.id);
  };

  const EditAlbum = (e) => {
    e.preventDefault();
    if (Content === "" || userId === "") {
      addToast("Field Cannot Be empty", {
        appearance: "error",
      });
      return;
    }
    albumsC.editAlbum(Content, userId, Id);
  };
  //to close form
  const handleClose = (e) => {
    e.preventDefault();
    setShowForm(false);
  };
  // if loading true show loader
  if (albumsC.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <h1>Album Collection</h1>
      <button onClick={handleButtonClick}>Add Album</button>
      {/* //if show form is true then show form  */}
      {showForm && (
        <div id="Form">
          <button onClick={handleClose}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
              alt="close"
            />
          </button>
          <form>
            {/* changing heading   */}
            <h2>{Add ? "Add Album" : "Edit Album"}</h2>
            <label>
              Content
              <input
                type="text"
                value={Content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="type Content Here"
              />
            </label>
            <label>
              userId
              <input
                type="number"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                placeholder="type UserId Here"
              />
            </label>
            {/* //button to show if album add or edit */}
            {Add && <button onClick={submitForm}> Submit Form</button>}
            {edit && <button onClick={EditAlbum}> Edit ALbum</button>}
          </form>
        </div>
      )}
      {/* showing album */}
      <div>
        <Table
          Albums={albums}
          delete={handleDeleteClick}
          edit={handleEditClick}
        />
      </div>
    </div>
  );
}

export default App;
