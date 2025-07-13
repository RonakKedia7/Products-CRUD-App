import { supabase } from "../config/supabase.js";

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields.",
    });
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([{ name, price: parseFloat(price), image }])
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const { data, error } = await supabase
      .from('products')
      .update({ name, price: parseFloat(price), image })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in updating product:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};