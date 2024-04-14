import { useEffect } from "react";

import UploadFile from "../../Components/File/UploadFile";
import AuthService from "../../Services/AuthService";


const FilePage = () => {
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/auth";
    }
  })

  return (
    <div>
      <UploadFile />
    </div>
  );
};

export default FilePage;
