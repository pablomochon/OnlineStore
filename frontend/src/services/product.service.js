import axios from "axios";
import AuthService from "../services/auth.service";

const API_URL = "http://localhost:8080/api/";


const getProducts = () => {
  return axios.get(API_URL + "products");
};

const sendCategory = async(name) => {

  try{
    const currentUser = AuthService.getCurrentUser();
    const token = currentUser.accessToken;
    const response = await axios.post(API_URL + "admin/category",
    { name },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }
    );
    

    if (response.status === 200) {
      // Categoría creada exitosamente, puedes realizar acciones adicionales aquí
      console.log("Categoría creada exitosamente");
    } else {
      // Ocurrió un error al crear la categoría, maneja la respuesta adecuadamente
      console.error("Error al crear categoría");
      console.log(response);
    }

  }
  catch(e){
    console.error("error ==>", e)
  }
}

const ProductService = {
    getProducts,
    sendCategory
  };
  
export default ProductService;