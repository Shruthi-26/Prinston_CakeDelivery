import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { getUser } from "../utils/auth";

const faqs = [
  {
    question: "Do I need an account to view cakes?",
    answer: "No. You can browse the full cake menu on the home page without logging in."
  },
  {
    question: "Do I need to log in to place an order?",
    answer: "Yes. Customers must register or log in before placing an order."
  },
  {
    question: "What payment method is available?",
    answer: "Cash on Delivery (COD) only."
  },
  {
    question: "Can I cancel my order?",
    answer: "Yes, depending on the time remaining before delivery and the current order status."
  }
];

function Home() {
  const [cakes, setCakes] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/cakes")
      .then((res) => setCakes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleOrder = async (cake) => {
    const user = getUser();

    if (!user) {
      alert("Please login or register to place an order.");
      navigate("/login");
      return;
    }

    const address = prompt("Enter pickup/store note or address:");
    if (!address) return;

    const deliveryDate = prompt("Enter pickup/delivery date and time in this format: 2026-04-28T18:00");
    if (!deliveryDate) return;

    try {
      await API.post("/orders", {
        items: [{ cakeId: cake._id, quantity: 1 }],
        address,
        deliveryDate
      });

      alert("Order placed successfully. COD, pickup mode, and cancellation status are now active.");
      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="container">
      <section className="hero">
        <h1>Browse Our Cake Menu</h1>
        <p>Explore available cakes. Login is required only for placing an order.</p>
      </section>

      <section>
        <h2 className="section-title">Available Cakes</h2>
        <div className="grid">
          {cakes.map((cake) => (
            <div className="card" key={cake._id}>
              <img src={cake.image} alt={cake.title} />
              <h3>{cake.title}</h3>
              <p>{cake.description}</p>
              <p><strong>Category:</strong> {cake.category}</p>
              <p><strong>Flavor:</strong> {cake.flavor}</p>
              <p><strong>Weight:</strong> {cake.weight}</p>
              <p><strong>Type:</strong> {cake.eggless ? "Eggless" : "With Egg"}</p>
              <p><strong>Price:</strong> ₹{cake.price}</p>
              <button onClick={() => handleOrder(cake)}>Order Now</button>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                aria-expanded={openFaq === index}
              >
                {faq.question}
                <span>{openFaq === index ? "-" : "+"}</span>
              </button>

              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
