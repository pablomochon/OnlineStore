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
    const response = await axios.post(API_URL + "admin/categories",
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
      alert("category created succesfully!")
    }else{
      alert("error, please try another one")
    }
  }
  catch(e){
    return console.error("error ==>", e)
  }
}

const ProductService = {
    getProducts,
    sendCategory,

  };
  
export default ProductService;