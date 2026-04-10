import { z } from "zod";

const NoticeSchema = z.object({
  name: z.string().min(1),
  image: z.string().optional(),
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
  image: z.string().optional(),
})



const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a 6-digit hex color (e.g. #1a2b3c)");

export const MenuConfigSchema = z.object({
  cafe: z.object({
    name: z.string().min(1),
    hero_image: z.string().optional(),
    theme: z.object({
      color1: hexColor,
      color2: hexColor,
      color3: hexColor.optional(),
    }).optional(),
  }),
  notices: z.array(NoticeSchema),
  filter_chips: z.array(FilterChipSchema),
  filter_categories: z.array(FilterCategorySchema),
  items: z.array(MenuItemSchema)
});

export type MenuConfig = z.infer<typeof MenuConfigSchema>;
