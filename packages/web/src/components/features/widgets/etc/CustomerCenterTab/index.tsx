"use client";

import SwitchCase from "@entities/SwitchCase";
import Tabs from "@entities/Tabs";
import CustomerCenterTabFaqContentSection from "@pages/customer-center/CustomerCenterTabFaqContentSection";
import CustomerCenterTabInquiryContentSection from "@pages/customer-center/CustomerCenterTabInquiryContentSection";
import CustomerCenterTabInquiryListContentSection from "@pages/customer-center/CustomerCenterTabInquiryListContentSection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CUSTOMER_CENTER_TABS = ["FAQ", "내 문의내역", "문의하기"];

export default function CustomerCenterTab() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTab = searchParams.get("tab");

  const onChangeHandler = useCallback(
    (selectedTab: string | null) => {
      if (selectedTab) {
        const url = `${pathname}?tab=${selectedTab}`;
        router.replace(url);
      }
    },
    [pathname, router]
  );
  return (
    <Tabs onChange={onChangeHandler}>
      <Tabs.TabList>
        {CUSTOMER_CENTER_TABS.map((tabLabel, index) => (
          <Tabs.Tab
            key={`${index}-${tabLabel}`}
            label={tabLabel}
            defaultSelected={tabLabel === selectedTab || index === 0}
            selectedColor="border-black"
            defaultColor="border-gray-30"
            grow
          />
        ))}
      </Tabs.TabList>
      <Tabs.Content>
        {({ selectedTab }) => (
          <SwitchCase
            value={selectedTab ?? ""}
            caseBy={{
              FAQ: <CustomerCenterTabFaqContentSection />,
              "내 문의내역": <CustomerCenterTabInquiryListContentSection />,
              문의하기: <CustomerCenterTabInquiryContentSection />,
            }}
            defaultComponent={<CustomerCenterTabFaqContentSection />}
          />
        )}
      </Tabs.Content>
    </Tabs>
  );
}
