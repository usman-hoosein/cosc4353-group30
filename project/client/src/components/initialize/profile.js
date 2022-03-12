import { useContext, useEffect } from "react";

import ProfileInfoContext from "../../contexts/profile-info";
import LoadingContext from "../../contexts/loading";
import LoginContext from "../../contexts/login";
import { getProfile } from "../../requests/profile";

function InitializeProfile(props) {
  const ProfileInfoCtx = useContext(ProfileInfoContext);
  const LoadingCtx = useContext(LoadingContext);
  const LoginCtx = useContext(LoginContext);

  var isLoading = false;

  useEffect(() => {
    if (isLoading) LoadingCtx.currentlyLoading();
    LoadingCtx.finishedLoading();
  });

  //Retreiving the data from the db to prefill the form
  if (!ProfileInfoCtx.ProfileInfo) {
    isLoading = true;
    (async () => {
      const profileInfo = await getProfile(LoginCtx.Login);
      let res = profileInfo.data;
      if (res != null) {
        console.log("Profile initialized");
        ProfileInfoCtx.updateProfileInfo({
          fullName: res.fullName,
          addr1: res.addr1,
          addr2: res.addr2,
          city: res.city,
          state: res.state,
          zip: res.zip,
        });
      } else {
        console.log("No profile data in database");
      }
      props.setInit(false);
      isLoading = false;
    })().catch((err) => {
      console.log(err.stack);
      props.setInit(false);
      isLoading = false;
    });
  }

  return <div></div>;
}

export default InitializeProfile;
