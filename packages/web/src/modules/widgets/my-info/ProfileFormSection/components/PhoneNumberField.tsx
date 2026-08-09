import ROUTE from "@shared/constants/route";
import { useMyProfileFormContext } from "@shared/hooks/domain/form/useMyProfileForm";
import Button from "@shared/components/primitives/ui/Button";
import TextField from "@shared/components/primitives/ui/TextField";
import { useStackLinkRouter } from "stack-link";

const PhoneNumberField = () => {
  const { navigate } = useStackLinkRouter({
    prefetchHref: ROUTE.CHANGE_PHONE_NUMBER,
  });
  const { watch } = useMyProfileFormContext();

  return (
    <TextField
      label="전화번호"
      color="white"
      value={watch("phoneNumber")}
      disabled
      right={
        <Button
          size={"sm"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate({
              href: ROUTE.CHANGE_PHONE_NUMBER,
            });
          }}
        >
          인증하기
        </Button>
      }
    />
  );
};

export default PhoneNumberField;
