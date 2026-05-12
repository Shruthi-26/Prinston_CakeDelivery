import { useState } from "react";
import API from "../api";

function SellerDashboard() {
  const [cake, setCake] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    flavor: "",
    weight: "",
    eggless: false,
    image: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.post("/cakes", cake);
    alert("Cake added successfully");
  } catch (error) {
    alert(error.response?.data?.message || "Failed to add cake");
  }
};

  return (
    <div className="form-container">
      <h2>Seller Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Cake title" onChange={(e) => setCake({ ...cake, title: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setCake({ ...cake, description: e.target.value })}></textarea>
        <input type="number" placeholder="Price" onChange={(e) => setCake({ ...cake, price: e.target.value })} />
        <input placeholder="Category" onChange={(e) => setCake({ ...cake, category: e.target.value })} />
        <input placeholder="Flavor" onChange={(e) => setCake({ ...cake, flavor: e.target.value })} />
        <input placeholder="Weight" onChange={(e) => setCake({ ...cake, weight: e.target.value })} />
        <input placeholder="Image URL" onChange={(e) => setCake({ ...cake, image: e.target.value })} />
        <label>
          <input type="checkbox" onChange={(e) => setCake({ ...cake, eggless: e.target.checked })} />
          Eggless
        </label>
        <button type="submit">Add Cake</button>
      </form>
    </div>
  );
}

export default SellerDashboard;
