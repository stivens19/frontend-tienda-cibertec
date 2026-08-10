import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { useLogin } from "../../hooks/useLogin";

// 1. Definimos el esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, loading, error: authError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card p-4 shadow-sm border-0"
    >
      <h4 className="mb-4 text-center">Iniciar Sesión</h4>

      {authError && (
        <div className="alert alert-dark text-center">{authError}</div>
      )}

      <div className="mb-3">
        <FormField
          id="email"
          label="Correo Electrónico"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-danger small">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-3">
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-danger small">{errors.password.message}</span>
        )}
      </div>

      <div className="mt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Acceder"}
        </Button>
      </div>
      <div className="mt-4">
        <p className="text-muted small mb-1">Credenciales de prueba:</p>
        <p className="text-muted small mb-0">
          Correo:
          <span className="fw-semibold">admin@admin.com</span>
        </p>
        <p className="text-muted small mb-0">
          Contraseña:
          <span className="fw-semibold">password</span>
        </p>
      </div>
    </form>
  );
};
