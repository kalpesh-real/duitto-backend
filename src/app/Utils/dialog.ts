import Swal from "sweetalert2";

export class Dialog {
    

    showAlert(type, title, msg){
        Swal.fire({
            icon: type,
            title: title,
            text: msg,
           
          })
    }
    
}
