// Faz com que o nosso programa consiga usar png.
declare module "*.png" {
  import React from "react";
  import {} from "react-native-svg";
  const content: React.FC<pngProps>;
  export default content;
}
