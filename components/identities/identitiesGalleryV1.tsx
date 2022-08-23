/* eslint-disable @next/next/no-img-element */
import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/components/identitiesV1.module.css";
import Image from "next/image";

export type Identity = {
  image_uri: string;
  token_id: string;
};

type IdentitiesGalleryV1Props = {
  identities: Identity[];
};

const IdentitiesGalleryV1: FunctionComponent<IdentitiesGalleryV1Props> = ({
  identities,
}) => {
  const router = useRouter();

  return (
    <>
      {identities.map((identity, index) => (
        <div key={index} className={styles.imageGallery}>
          <Image
            width={150}
            height={150}
            src={identity.image_uri}
            alt="avatar"
            onClick={() => router.push(`/identities/${identity.token_id}`)}
          />
        </div>
      ))}
    </>
  );
};

export default IdentitiesGalleryV1;
