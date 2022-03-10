import { createContext, useState } from "react";

const ProfileInfoContext = createContext({
  ProfileInfo: {},
  updateProfileInfo: (info) => {},
});

export function ProfileInfoContextProvider(props) {
  const [userProfileInfo, setUserProfileInfo] = useState(false);

  function updateProfileInfoHandler(info) {
    setUserProfileInfo({
      fullName: info.fullName,
      addr1: info.addr1,
      addr2: info.addr2,
      city: info.city,
      state: info.state,
      zip: info.zip,
    });
  }

  const context = {
    ProfileInfo: userProfileInfo,
    updateProfileInfo: updateProfileInfoHandler,
  };

  return (
    <ProfileInfoContext.Provider value={context}>
      {props.children}
    </ProfileInfoContext.Provider>
  );
}

export default ProfileInfoContext;
