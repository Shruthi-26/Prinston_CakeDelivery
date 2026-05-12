import { useState } from "react";
import API from "../api";

function CustomCake() {
  const [form, setForm] = useState({
    shape: "",
    size: "",
    flavor: "",
    cream: "",
    messageOnCake: "",
    deliveryDate: "",
    designNotes: "",
    imageReference: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.post("/custom-cakes", form);
    alert("Custom cake request submitted");
  } catch (error) {
    alert(error.response?.data?.message || "Submission failed");
  }
};

  return (
    <div className="form-container">
      <h2>Customize Your Cake</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Shape" onChange={(e) => setForm({ ...form, shape: e.target.value })} />
        <input placeholder="Size" onChange={(e) => setForm({ ...form, size: e.target.value })} />
        <input placeholder="Flavor" onChange={(e) => setForm({ ...form, flavor: e.target.value })} />
        <input placeholder="Cream" onChange={(e) => setForm({ ...form, cream: e.target.value })} />
        <input placeholder="Message on Cake" onChange={(e) => setForm({ ...form, messageOnCake: e.target.value })} />
        <input type="date" onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} />
        <textarea placeholder="Design notes" onChange={(e) => setForm({ ...form, designNotes: e.target.value })}></textarea>
        <input placeholder="Image reference URL" onChange={(e) => setForm({ ...form, imageReference: e.target.value })} />
        <button type="submit">Submit Custom Cake</button>
      </form>
    </div>
  );
}

export default CustomCake;
