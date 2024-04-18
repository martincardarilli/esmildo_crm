import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../../../components/ui";
import { useCustomers } from "../context/customersContext"; // Asume que tienes un contexto similar para clientes
import { useForm } from "react-hook-form";

export function CustomerFormPage() {
  const { createCustomer, getCustomer, updateCustomer } = useCustomers();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateCustomer(params.id, data);
      } else {
        createCustomer(data);
      }

      // navigate("/customers"); // Redirigir a la lista de clientes después de la creación/actualización
    } catch (error) {
      console.log(error);
      // window.location.href = "/"; // Manejo de errores
    }
  };

  useEffect(() => {
    const loadCustomer = async () => {
      if (params.id) {
        const customer = await getCustomer(params.id);
        setValue("name", customer.name);
        setValue("address", customer.address);
        setValue("hourFee", customer.hourFee);
      }
    };
    loadCustomer();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          {...register("name")}
          autoFocus
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">Please enter a name.</p>
        )}

        <Label htmlFor="address">Address</Label>
        <Input
          type="text"
          name="address"
          placeholder="Address"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-500 text-xs italic">Please enter an address.</p>
        )}

        <Label htmlFor="hourFee">Hour Fee</Label>
        <Input
          type="number"
          name="hourFee"
          placeholder="Hour Fee"
          {...register("hourFee")}
        />
        {errors.hourFee && (
          <p className="text-red-500 text-xs italic">Please enter the hour fee.</p>
        )}

        <Button>Save</Button>
      </form>
    </Card>
  );
}
