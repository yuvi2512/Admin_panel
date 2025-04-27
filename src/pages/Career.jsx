import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Button,
  Modal,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const Career = () => {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    GetData();
  }, []);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Carrer"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Operations",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            color="primary"
            onClick={() => handleEdit(params.row)}
            variant="contained"
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>

          <Button
            color="error"
            onClick={() => handleDelete(params.row)}
            variant="contained"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const GetData = async () => {
    try {
      const response = await axios.get(
        "https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Career/allCareer"
      );

      if (response.data.status === 200 && response.data) {
        
        setRows(response.data.data);
      }
    } catch (error) {
      console.error("Error Getting Data:", error);
      toast.error("Failed to Get Data.");
    }
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    setFormData({ image: "", title: "", description: "" });
    setImageFile(null);
    setOpenModal(true);
  };

  const handleEdit = (row) => {
    setIsEditing(true);
    setCurrentRowId(row._id);
    setFormData({
      image: row.image,
      title: row.title,
      description: row.description,
    });
    setImageFile(null);
    setOpenModal(true);
  };

  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(`https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Career/deleteCareer/${row?._id}`);
      console.log('deleted successfully:', response.data);
      toast.error("deleted successfully!");
      GetData();
    } catch (error) {
      console.error('Error deleting:', error.response ? error.response.data : error.message);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ image: "", title: "", description: "" });
    setImageFile(null);
    setCurrentRowId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        const updateData = {
          description: formData.description,
          title: formData.title,
        };
        const response = await axios.put(
          `https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Career/updateCareer/${currentRowId}`,
          updateData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("updated successfully!");
          GetData(); 
        }
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append("description", formData.description);
        formDataToSend.append("title", formData.title);
        if (imageFile) {
          formDataToSend.append("image", imageFile);
        }

        const response = await axios.post(
          "https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Career/addCareer",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          toast.success("added successfully!");
          GetData();
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(isEditing ? "Failed to update." : "Failed to add.");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <>
      <Card sx={{ m: 1 }}>
        <CardHeader
          sx={{ pb: 2, pt: 2 }}
          title="Career"
          action={
            <>
              <Button
                variant="contained"
                sx={{ marginRight: 1 }}
                onClick={handleOpenModal}
              >
                Add new Career
              </Button>
              <IconButton
                color="error"
                onClick={() => {
                  toast.success("Delete icon clicked");
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
        />
        <Divider />

        <CardContent sx={{ mb: 2, mt: 4 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            disableRowSelectionOnClick
            checkboxSelection
          />
        </CardContent>
      </Card>
      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Career</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderRadius: "50%",
                width: 80,
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="preview"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              ) : (
                "Upload Image"
              )}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Title *"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Description *"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            sx={{ mb: 2 }}
            variant="outlined"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "teal", "&:hover": { bgcolor: "darkcyan" } }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Career;