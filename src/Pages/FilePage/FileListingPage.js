import { useEffect } from "react";

import AuthService from "../../Services/AuthService";
import ListFile from "../../Components/File/ListingFile";


const FileListingPage = () => {
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/auth";
    }
  })

  return (
    <div>
      <ListFile />
    </div>
  );
};

export default FileListingPage;
