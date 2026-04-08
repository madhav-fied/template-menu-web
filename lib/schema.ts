import { z } from "zod";

const NoticeSchema = z.object({
  name: z.string().min(1)
})

const FilterChipSchema = z.object({
  name: z.string().min(1)
})

const FilterCategorySchema = z.object({
  name: z.string().min(1)
})

const MenuItemSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  chips: z.array(z.string().min(1)),
})



export const MenuConfigSchema = z.object({
  cafe: z.object({
    name: z.string().min(1),
  }),
  notices: z.array(NoticeSchema),
  filter_chips: z.array(FilterChipSchema),
  filter_categories: z.array(FilterCategorySchema),
  items: z.array(MenuItemSchema)
});

export type MenuConfig = z.infer<typeof MenuConfigSchema>;
