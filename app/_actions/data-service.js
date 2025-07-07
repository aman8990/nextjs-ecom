import axios from 'axios';
import prisma from '@/app/_libs/prismadb';
import { ObjectId } from 'bson';

export async function fetchProducts() {
  try {
    const products = await prisma.product.findMany({});
    return products;
  } catch (error) {
    console.error('Error in Prisma query:', error);
    return null;
  }
}

export async function fetchProductById(productId) {
  if (!ObjectId.isValid(productId)) {
    console.warn('Invalid ProductID');
    return null;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    return product;
  } catch (error) {
    console.error('Error in Prisma query:', error);
    return null;
  }
}

export async function getCart() {
  try {
    const response = await axios.get('/api/cart/index');

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function addItemToLocalCart({ product, quantity = 1 }) {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || { cartItems: [] };

    if (!Array.isArray(cart.cartItems)) {
      cart.cartItems = [];
    }

    const index = cart.cartItems.findIndex(
      (cartItem) => cartItem.product.id === product.id
    );

    if (index !== -1) {
      cart.cartItems[index].quantity = quantity;
    } else {
      cart.cartItems.push({
        product: {
          id: product.id,
          name: product.name,
          photo: product.photo,
          price: product.price,
        },
        quantity: quantity,
      });
    }

    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
      const price = item.product.price;
      totalPrice += price * item.quantity;
    });

    cart.totalPrice = totalPrice;

    localStorage.setItem('cart', JSON.stringify(cart));

    return {
      success: true,
      message:
        index !== -1 ? 'Item updated successfully' : 'Item added to cart',
    };
  } catch (error) {
    throw error;
  }
}

export async function deleteLocalCartItem(productId) {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cart.cartItems.findIndex(
      (cartItem) => cartItem.product.id === productId
    );

    if (index !== -1) {
      cart.cartItems.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    return { success: true };
  } catch (error) {
    throw error;
  }
}
