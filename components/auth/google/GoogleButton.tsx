import React, { useRef } from "react";
import { useScript } from "../../../hook/useScript";

const googleId = process.env.NEXT_PUBLIC_GOOGLE_ID;

const GoogleButton = ({ handlerLogin }: any) => {
  const divRef = useRef<HTMLDivElement>(null);

  const callBack = (rs: any) => handlerLogin(rs.credential);

  useScript("https://accounts.google.com/gsi/client", () => {
    if (window) {
      try {
        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: googleId,
          callback: callBack,
        });
      } catch (err) {
        console.error("init Google error: ", err);
      }

      // @ts-ignore
      window.google.accounts.id.renderButton(divRef.current, {
        size: "medium",
      });
    }
  });

  return <div ref={divRef} />;
};

export default GoogleButton;
