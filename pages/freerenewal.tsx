import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/search.module.css";
import { freeRenewalDiscount } from "../utils/discounts/freeRenewal";
import DiscountEndScreen from "../components/discount/discountEndScreen";
import FreeRenewalPresentation from "@/components/discount/freeRenewalPresentation";
import FreeRenewalCheckout from "@/components/discount/freeRenewalCheckout";

const FreeRenewalPage: NextPage = () => {
  const [screen, setScreen] = useState<number>(1);

  useEffect(() => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    if (timestamp >= freeRenewalDiscount.expiry) {
      setScreen(0);
    }
  }, []);

  function goBack() {
    setScreen(screen - 1);
  }

  return (
    <div className={homeStyles.screen}>
      {screen === 0 ? (
        <DiscountEndScreen
          title={`${freeRenewalDiscount.name} has ended`}
          image={freeRenewalDiscount.image}
        />
      ) : null}

      {screen === 1 ? (
        <FreeRenewalPresentation
          title={freeRenewalDiscount.offer.title}
          desc={freeRenewalDiscount.offer.desc}
          image={freeRenewalDiscount.image}
          setScreen={setScreen}
          expiry={freeRenewalDiscount.expiry}
        />
      ) : null}
      {screen === 2 ? (
        <div className={styles.container}>
          <FreeRenewalCheckout
            groups={[
              process.env.NEXT_PUBLIC_MAILING_LIST_GROUP_AUTO_RENEWAL ?? "",
              freeRenewalDiscount.discountMailGroupId,
            ]}
            offer={freeRenewalDiscount.offer}
            goBack={goBack}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FreeRenewalPage;
