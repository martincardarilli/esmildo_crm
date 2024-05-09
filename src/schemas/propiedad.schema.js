import { z } from "zod";

export const createPropiedadSchema = z.object({
          propiedad: z.string({
                    required_error: "Nombre de inmueble es requerido.",
                  }),
      
});


