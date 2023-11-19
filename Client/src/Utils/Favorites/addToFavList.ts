import axios from "axios";
import Swal from "sweetalert2";
import { ADD_TO_FAVORITES_LIST } from "../Apis";
import { config } from "../Auth/handleAuth";

export type favProduct = {
    id: string,
    email: string | undefined,
    title: string,
    description: string,
    price: number,
    discountPercentage: number | 0,
    brand: string,
    category: string,
    thumbnail: string,
    images: [string]
}

export const addToFavoritesList = async (product: favProduct) => {
    try{
      const res = await axios.post(ADD_TO_FAVORITES_LIST, product, config)
      Swal.fire({
          position: 'center',
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        });
    }catch(err){
      console.log(err)
    }
};