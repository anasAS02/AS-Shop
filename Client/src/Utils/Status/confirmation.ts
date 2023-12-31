import Swal from "sweetalert2";
import axios from "axios";

interface Data {
  url: string;
  data?: any;
  config: any;
  successMsg?: string | null;
  setSuccessMsg?: React.Dispatch<React.SetStateAction<string | null>>;
  func?: () => void;
}

const confirmation = async ({ url, data, config, successMsg, setSuccessMsg, func }: Data) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
  });

  try {
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      preConfirm: async () => {
        try {
          if(data){
            await axios.put(url, data, config).then((data) => setSuccessMsg && setSuccessMsg(data.data.message));
          }else{
            await axios.delete(url, config).then((data) => setSuccessMsg && setSuccessMsg(data.data.message));
          }
          func && func();
        } catch (error: any) {
          console.error(error);
          Swal.showValidationMessage(`Request failed: ${error?.response?.data?.message}`);
        }
      },
    });

    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: `${successMsg || 'Done'}`,
        icon: "success"
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default confirmation;
