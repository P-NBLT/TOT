import React from "react";
import backgroundImage from "@/assets/images/jabba palace 2.jpeg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>Registration</title>
      </head>
      <body>
        <div
          style={{
            backgroundImage: `url("${backgroundImage.src}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
            width: "100%",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
