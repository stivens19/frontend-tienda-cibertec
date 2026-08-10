import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "../hooks/useCart";
import { OrderService } from "../services/OrderService";
import { FormField } from "../components/molecules/FormField";
import { Button } from "../components/atoms/Button";

const checkoutSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Debe ser un correo electrónico válido"),
  document: z.string().min(8, "El documento debe tener al menos 8 caracteres"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

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

  const {
    register,
    handleSubmit,
    setError, 
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (cart.length === 0) {
      setError("root", { message: "Tu carrito está vacío." });
      return;
    }

    try {
      const payload = {
        customer_name: data.name,
        customer_email: data.email,
        customer_document: data.document,
        customer_phone: data.phone,
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
      setError("root", {
        message: "Hubo un problema al procesar el pedido. Verifica el stock.",
      });
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
            onSubmit={handleSubmit(onSubmit)}
            className="card p-4 shadow-sm border-0 mb-4"
          >
            <h5 className="mb-3">Datos de Facturación</h5>
            
            {errors.root && (
              <div className="alert alert-danger">{errors.root.message}</div>
            )}

            <div className="mb-3">
              <FormField
                id="name"
                label="Nombre Completo"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-danger small">{errors.name.message}</span>
              )}
            </div>

            <div className="mb-3">
              <FormField
                id="email"
                label="Correo Electrónico"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-danger small">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-3">
              <FormField
                id="document"
                label="Documento de Identidad (DNI/RUC)"
                type="text"
                {...register("document")}
              />
              {errors.document && (
                <span className="text-danger small">{errors.document.message}</span>
              )}
            </div>

            <div className="mb-3">
              <FormField
                id="phone"
                label="Teléfono"
                type="text"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-danger small">{errors.phone.message}</span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 btn btn-success w-100"
            >
              {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
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