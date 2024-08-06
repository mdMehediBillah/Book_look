import { useEffect, useState } from "react";
import "./AllUsers.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { API } from "../../../Utils/security/secreteKey";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/users`);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      field: "image",
      headerName: "Photo",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.value || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt={params.row.firstName}
          style={{ width: "3rem", height: "2rem", objectFit: "contain" }}
        />
      ),
    },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "street", headerName: "Street", width: 150 },
    { field: "zipCode", headerName: "Postal Code", width: 100 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "County", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="action-wrapper">
          <Link to={`/users/${params.id}`}>
            <FaEdit className="edit" />
          </Link>
          <FaTrashAlt
            onClick={() => {
              setUserId(params.id);
              setConfirmDeletion(true);
            }}
            className="delete"
          />
        </div>
      ),
    },
  ];

  // Populate rows with user data
  const rows = users.map((user) => ({
    id: user._id,
    image: user?.image,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    street: user?.street || "",
    zipCode: user?.zipCode || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || "",
  }));

  // Handle user deletion
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${API}/api/v1/users/${userId}`);
      toast.success(data.message);
      setUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting the user");
    } finally {
      setConfirmDeletion(false);
    }
  };

  return (
    <section className="">
      <h3 className=""> List of Users </h3>
      <DataGrid
        // Rows
        rows={rows}
        // Columns
        columns={columns}
        // Initial state
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // Create search bar
        slots={{ toolbar: GridToolbar }}
        // Search a specific user
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        // Page size options
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight // Adjust the height automatically
        //
      />

      {confirmDeletion && (
        <article className="service-delete-confirmation-wrapper">
          <span
            className="delete-icon"
            onClick={() => setConfirmDeletion(false)}
          >
            X
          </span>
          <h3 className="you-want-delete-user">
            Are you sure you want to delete this user?
          </h3>
          <aside className="cancel-or-confirm-delete">
            <p
              className="cancel-delete"
              onClick={() => setConfirmDeletion(false)}
            >
              Cancel
            </p>
            <h3 className="confirm-delete" onClick={handleDelete}>
              Confirm
            </h3>
          </aside>
        </article>
      )}
    </section>
  );
};

export default AllUsers;
