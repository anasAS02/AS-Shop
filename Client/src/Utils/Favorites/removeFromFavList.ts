import axios from "axios";
import Swal from "sweetalert2";
import { REMOVE_FROM_FAVORITES_LIST } from "../Apis";
import { config } from "../Auth/handleAuth";
import { EMAIL } from "../Cookies";
import { favProduct } from "./addToFavList";

export const removeFromFavList = async (product: favProduct) => {
    try{
      const res = await axios.post(REMOVE_FROM_FAVORITES_LIST, product, config)
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