// Faz com que o nosso programa consiga usar svgs.
declare module "*.svg" {
  import React from "react";
  import {} from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
