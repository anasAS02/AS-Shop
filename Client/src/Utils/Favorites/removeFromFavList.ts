import axios from "axios";
import Swal from "sweetalert2";
import { REMOVE_FROM_FAVORITES_LIST } from "../Apis";
import { config } from "../Auth/handleAuth";

export const removeFromFavList = async (productId: string) => {
    try{
      const res = await axios.post(REMOVE_FROM_FAVORITES_LIST, {productId}, config)
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