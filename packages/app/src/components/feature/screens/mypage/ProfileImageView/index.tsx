import useProfileImageUrlQuery from "@hooks/feature/query/query/useProfileImageUrlQuery";
import { Suspense } from "@suspensive/react";
import ProfileImageViewLoader from "./loader";
import styled from "@emotion/native";

const ProfileImageView = Suspense.with(
  {
    fallback: <ProfileImageViewLoader />,
  },
  () => {
    const { data: uri } = useProfileImageUrlQuery();

    return <ProfileImage source={{ uri }} />;
  },
);

const ProfileImage = styled.Image`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: #e0e0e0;
`;

export default ProfileImageView;
