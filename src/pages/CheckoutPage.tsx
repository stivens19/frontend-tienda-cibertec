import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { OrderService } from "../services/OrderService";
import { FormField } from "../components/molecules/FormField";
import { Button } from "../components/atoms/Button";

export const CheckoutPage = () => {
  const {
    cart,
    cartTotal,
    clearCart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    document: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.id]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        customer_name: customer.name,
        customer_email: customer.email,
        customer_document: customer.document,
        customer_phone: customer.phone,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.cartQuantity,
        })),
      };

      await OrderService.checkout(payload);
      clearCart();
      alert("¡Pedido realizado con éxito!");
      navigate("/");
    } catch (err) {
      setError("Hubo un problema al procesar el pedido. Verifica el stock.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container text-center py-5">
        <h4>Tu carrito está vacío</h4>
        <Button variant="outline-primary" onClick={() => navigate("/")}>
          Volver al catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Finalizar Compra</h2>

      <div className="row">
        <div className="col-md-7">
          <form
            onSubmit={handleCheckout}
            className="card p-4 shadow-sm border-0 mb-4"
          >
            <h5 className="mb-3">Datos de Facturación</h5>
            {error && <div className="alert alert-danger">{error}</div>}

            <FormField
              id="name"
              label="Nombre Completo"
              type="text"
              required
              value={customer.name}
              onChange={handleChange}
            />
            <FormField
              id="email"
              label="Correo Electrónico"
              type="email"
              required
              value={customer.email}
              onChange={handleChange}
            />
            <FormField
              id="document"
              label="Documento de Identidad (DNI/RUC)"
              type="text"
              value={customer.document}
              onChange={handleChange}
            />
            <FormField
              id="phone"
              label="Teléfono"
              type="text"
              value={customer.phone}
              onChange={handleChange}
            />

            <Button
              type="submit"
              disabled={loading}
              className="mt-3 btn btn-success w-100"
            >
              {loading ? "Procesando..." : "Confirmar Pedido"}
            </Button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="mb-3">Resumen de tu Pedido</h5>
            <ul className="list-group list-group-flush mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex flex-column py-3 px-0"
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="my-0 text-truncate pe-2" title={item.name}>
                      {item.name}
                    </h6>
                    <span className="fw-semibold text-nowrap">
                      S/ {(Number(item.price) * item.cartQuantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group btn-group-sm" role="group">
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-2"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="btn btn-outline-secondary disabled px-3 text-dark fw-bold">
                        {item.cartQuantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-2"
                        onClick={() => addToCart(item)}
                        disabled={item.cartQuantity >= item.stock}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger border-0"
                      onClick={() => removeFromCart(item.id)}
                      title="Eliminar producto"
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-3">
              <span>Total (PEN)</span>
              <span>S/ {cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
