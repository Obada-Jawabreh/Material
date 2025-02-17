import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Package,
  Barcode,
  Currency,
  Calculator,
  Scale,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const MaterialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedMaterial, setEditedMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/material/get/${id}`
        );
        setMaterial(response.data);
        setEditedMaterial(response.data);
      } catch (error) {
        console.error("Error fetching material details:", error);
      }
    };
    fetchMaterialDetails();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/api/material/delete/${id}`
      );
      toast.success(response.data.message || "Material deleted successfully!");
      navigate("/manage-material");
    } catch (error) {
      console.error("Error deleting material:", error);
      toast.error("An error occurred while deleting. Please try again.");
    }
  };

  const openDeleteConfirmation = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this material?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMaterial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setEditedMaterial((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8001/api/material/update/${id}`,
        editedMaterial
      );
      setMaterial(editedMaterial);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating material:", error);
    }
  };

  if (!material) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center">
        <div className="animate-pulse text-[#0B66B1]">Loading...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#7B7979] hover:text-[#0B66B1] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Materials
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#231F20] mb-2">
                {material.name_en}
              </h1>
              <p className="text-xl text-[#7B7979]">{material.name_ar}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#0082AD] text-white px-4 py-2 rounded-lg flex items-center">
                <Barcode className="w-4 h-4 mr-2" />
                {material.barcode}
              </div>
              <button
                onClick={() => setIsEditDialogOpen(true)}
                className="bg-[#2960EC] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#17398EEE] transition-colors"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => openDeleteConfirmation(material.id)}
                className="bg-[#f20c46] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#7B7979] transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Rest of your current details UI code remains the same */}
        {/* Just update the color codes in the existing sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={material.image_url}
                alt={material.name_en}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Price Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#181d27] mb-4 flex items-center">
                  <Currency className="w-5 h-5 mr-2 text-[#2960EC]" />
                  Pricing Information
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="bg-[#F8FAFF] p-4 rounded-lg">
                      <p className="text-[#7B7979] text-sm mb-1">Price {num}</p>
                      <p className="text-lg font-semibold text-[#181d27]">
                        {material[`price_${num}`]}
                        <span className="text-sm text-[#7B7979] ml-1">
                          {material.currency_en}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#181d27] mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-[#2960EC]" />
                  Tax Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#F8FAFF] p-4 rounded-lg">
                    <p className="text-[#7B7979] text-sm mb-1">
                      Tax Percentage
                    </p>
                    <p className="text-lg font-semibold text-[#181d27]">
                      {material.tax_percentage}%
                    </p>
                  </div>
                  <div className="bg-[#F8FAFF] p-4 rounded-lg">
                    <p className="text-[#7B7979] text-sm mb-1">Tax Value</p>
                    <p className="text-lg font-semibold text-[#181d27]">
                      {material.tax_value}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h2 className="text-xl font-semibold text-[#181d27] mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-[#2960EC]" />
                  Additional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#F8FAFF] p-4 rounded-lg">
                    <p className="text-[#7B7979] text-sm mb-1">Unit</p>
                    <div className="flex items-center">
                      <Scale className="w-4 h-4 mr-2 text-[#2960EC]" />
                      <p className="text-lg font-semibold text-[#181d27]">
                        {material.unit}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#F8FAFF] p-4 rounded-lg">
                    <p className="text-[#7B7979] text-sm mb-1">Created At</p>
                    <p className="text-lg font-semibold text-[#181d27]">
                      {formatDate(material.createdAt)}
                    </p>
                  </div>
                  <div className="bg-[#F8FAFF] p-4 rounded-lg">
                    <p className="text-[#7B7979] text-sm mb-1">Last Updated</p>
                    <p className="text-lg font-semibold text-[#181d27]">
                      {formatDate(material.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#231F20]">
                  Edit Material
                </h2>
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="text-[#7B7979] hover:text-[#231F20] text-2xl"
                >
                  ×
                </button>
              </div>

              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleUpdate}
              >
                {/* Name (Arabic) */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Name (Arabic)
                  </label>
                  <input
                    type="text"
                    name="name_ar"
                    value={editedMaterial.name_ar}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Name (English) */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Name (English)
                  </label>
                  <input
                    type="text"
                    name="name_en"
                    value={editedMaterial.name_en}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Barcode */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    value={editedMaterial.barcode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Currency (Arabic) */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Currency (Arabic)
                  </label>
                  <input
                    type="text"
                    name="currency_ar"
                    value={editedMaterial.currency_ar}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Currency (English) */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Currency (English)
                  </label>
                  <input
                    type="text"
                    name="currency_en"
                    value={editedMaterial.currency_en}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Price 1 */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Price 1
                  </label>
                  <input
                    type="number"
                    name="price_1"
                    value={editedMaterial.price_1}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Price 2 */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Price 2
                  </label>
                  <input
                    type="number"
                    name="price_2"
                    value={editedMaterial.price_2}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Price 3 */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Price 3
                  </label>
                  <input
                    type="number"
                    name="price_3"
                    value={editedMaterial.price_3}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Price 4 */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Price 4
                  </label>
                  <input
                    type="number"
                    name="price_4"
                    value={editedMaterial.price_4}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Tax Percentage */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Tax Percentage
                  </label>
                  <input
                    type="number"
                    name="tax_percentage"
                    value={editedMaterial.tax_percentage}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Tax Value */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Tax Value
                  </label>
                  <input
                    type="number"
                    name="tax_value"
                    value={editedMaterial.tax_value}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-medium text-[#7B7979] mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={editedMaterial.unit}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#0B66B1] focus:ring-1 focus:ring-[#0B66B1]"
                  />
                </div>

                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#0B66B1] text-white py-2 px-4 rounded-lg hover:bg-[#1C2D69] transition-colors duration-200"
                  >
                    Update Material
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialDetails;
