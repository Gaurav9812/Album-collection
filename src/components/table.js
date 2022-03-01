import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
function Table(props) {
  const albums = props.Albums;

  return (
    <table className="table">
      <thead className="table table-success table-striped">
        <tr>
          <th>Id</th>
          <th>userId</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {albums.map((album) => (
          <tr key={album.id}>
            <td>{album.id} </td>
            <td>{album.userId} </td>
            <td>
              {album.title}
              <i style={{ color: "red" }}>{album.edited ? " [edited]" : ""}</i>
            </td>
            <td>
              <button
                onClick={() => {
                  props.delete(album.id);
                }}
              >
                Delete
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  props.edit(album);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
