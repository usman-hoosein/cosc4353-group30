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
      try {
        const profileInfo = await getProfile(LoginCtx.Login);
        let res = profileInfo.data.rows;
        if (res.length !== 0) {
          res = res[0];
          console.log("Profile initialized");
          ProfileInfoCtx.updateProfileInfo({
            fullName: res.full_name,
            addr1: res.addr1,
            addr2: res.addr2,
            city: res.city,
            state: res.us_state,
            zip: res.zipcode,
          });
        } else {
          console.log("No profile data in database");
          LoginCtx.registration();
        }
      } catch (err) {
        console.log(err.stack);
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
