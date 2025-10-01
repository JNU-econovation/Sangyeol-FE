import ROUTE from "@/constants/route";
import { useMyProfileFormContext } from "@/hooks/feature/form/useMyProfileForm";
import Button from "@shared/ui/Button";
import TextField from "@shared/ui/TextField";
import { useStackLinkRouter } from "stack-link";

const PhoneNumberField = () => {
  const { navigate } = useStackLinkRouter({
    prefetchHref: ROUTE.CHANGE_PHONE_NUMBER,
  });
  const { watch } = useMyProfileFormContext();

  return (
    <TextField
      label="전화번호"
      placeholder="010-0000-0000"
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
