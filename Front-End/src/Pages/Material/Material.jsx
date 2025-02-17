import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../assets/Layout/Navbar";
import MaterialCard from "./Card";

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name_ar: "",
    name_en: "",
    barcode: "",
    currency_ar: "",
    currency_en: "",
    price_1: "",
    price_2: "",
    price_3: "",
    price_4: "",
    tax_percentage: "",
    tax_value: "",
    unit: "",
    image: null,
  });
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/material/get"
        );
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewMaterial((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(newMaterial).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:8001/api/material/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Material added:", response.data);

      setMaterials((prevMaterials) => [...prevMaterials, response.data]);

      setIsAddDialogOpen(false);
      setNewMaterial({
        name_ar: "",
        name_en: "",
        barcode: "",
        currency_ar: "",
        currency_en: "",
        price_1: "",
        price_2: "",
        price_3: "",
        price_4: "",
        tax_percentage: "",
        tax_value: "",
        unit: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  return (
    <>
      {" "}
      <NavBar />
      <div className="min-h-screen bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#181d27] text-2xl font-bold">Materials</h1>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-[#2960EC] text-white px-6 py-2 rounded-lg hover:bg-[#17398EEE] transition-colors duration-200 flex items-center gap-2 shadow-md"
            >
              <span className="text-xl">+</span> Add Material
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </div>

        {isAddDialogOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#181d27]">
                    Add New Material
                  </h2>
                  <button
                    onClick={() => setIsAddDialogOpen(false)}
                    className="text-[#7B7979] hover:text-[#231F20] text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Name (English)
                    </label>
                    <input
                      type="text"
                      name="name_en"
                      value={newMaterial.name_en}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Name (Arabic)
                    </label>
                    <input
                      type="text"
                      name="name_ar"
                      value={newMaterial.name_ar}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Barcode
                    </label>
                    <input
                      type="text"
                      name="barcode"
                      value={newMaterial.barcode}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Currency (English)
                    </label>
                    <input
                      type="text"
                      name="currency_en"
                      value={newMaterial.currency_en}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Currency (Arabic)
                    </label>
                    <input
                      type="text"
                      name="currency_ar"
                      value={newMaterial.currency_ar}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Price 1
                    </label>
                    <input
                      type="number"
                      name="price_1"
                      value={newMaterial.price_1}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Price 2
                    </label>
                    <input
                      type="number"
                      name="price_2"
                      value={newMaterial.price_2}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Price 3
                    </label>
                    <input
                      type="number"
                      name="price_3"
                      value={newMaterial.price_3}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Price 4
                    </label>
                    <input
                      type="number"
                      name="price_4"
                      value={newMaterial.price_4}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Tax Percentage
                    </label>
                    <input
                      type="number"
                      name="tax_percentage"
                      value={newMaterial.tax_percentage}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Tax Value
                    </label>
                    <input
                      type="number"
                      name="tax_value"
                      value={newMaterial.tax_value}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={newMaterial.unit}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#7B7979] mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-2 border border-[#DAE3EB] rounded focus:border-[#2960EC] focus:ring-1 focus:ring-[#2960EC]"
                    />
                  </div>
                  <div className="md:col-span-2 mt-4">
                    <button
                      type="submit"
                      className="w-full bg-[#2960EC] text-white py-2 px-4 rounded-lg hover:bg-[#17398EEE] transition-colors duration-200"
                    >
                      Add Material
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MaterialList;
