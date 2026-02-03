import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';

const util = {
  errorAlert: (text, confirmBtn = '확인') => {
    return Swal.fire({
      text,
      icon: 'error',
      confirmButtonText: confirmBtn,
    });
  },

  successAlert: (text, confirmBtn = '확인') => {
    return Swal.fire({
      text,
      icon: 'success',
      confirmButtonText: confirmBtn,
    });
  },
};

export default util;
