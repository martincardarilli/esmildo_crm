import { z } from "zod";

export const createVehiculoSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).min(1, { message: "Name is required" }),
  address: z.string({
    required_error: "Address is required",
    invalid_type_error: "Address must be a string",
  }).min(1, { message: "Address is required" }),
  hourFee: z.string({
    required_error: "Hour fee is required",
    invalid_type_error: "Hour fee must be a string",
  }).min(1, { message: "Hour fee is required" }),
  // Agrega más campos según sea necesario
});
