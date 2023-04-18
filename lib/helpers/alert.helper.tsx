import Swal from 'sweetalert2';

export const alertSuccess = (title: string): any => {
  return Swal.fire({
    title,
    icon: 'success',
    showConfirmButton: false,
    customClass: {
      popup: 'alert',
    },
  });
};

export const alertError = (title: string): any => {
  Swal.fire({
    title,
    icon: 'error',
    showConfirmButton: false,
    customClass: {
      popup: 'alert',
    },
  });
};
