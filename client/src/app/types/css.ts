export enum CSS_SIZE {
  sm = "small",
  xs = "extra small",
  m = "medium",
  lg = "large",
  xl = "extra large",
}

export enum CSS_PROPS_NAMES {
  style = "style",
  margin = "margin",
  marginTop = "marginTop",
  marginBottom = "marginBottom",
  marginRight = "marginRight",
  marginLeft = "marginLeft",
  padding = "padding",
  paddingTop = "paddingTop",
  paddingBottom = "paddingBottom",
  paddingRight = "paddingRight",
  paddingLeft = "paddingLeft",
  color = "color",
  backgroundColor = "backgroundColor",
  size = "size", // mix of width and height
  width = "width",
  height = "height",
  fontSize = "fontSize",
  bold = "bold",
  zIndex = "zIndex",
  variant = "variant",
}

// Below is define all the css props that can be used
// by some components. Note some components have only
// a partial access to the props. e.g input tag does not have a fontSize css prop.
export type CSS_PROPS_TYPES = {
  bold?: boolean;
  style?: React.CSSProperties;
  margin?: string | number; // "lg" ; "4px 5px" ; 5
  marginTop?: string | number; // "lg" ; "4px 5px" ; 5
  marginBottom?: string | number; // "lg" ; "4px 5px" ; 5
  marginRight?: string | number; // "lg" ; "4px 5px" ; 5
  marginLeft?: string | number; // "lg" ; "4px 5px" ; 5
  padding?: string | number; // "lg" ; "4px 5px" ; 5
  paddingTop?: string | number; // "lg" ; "4px 5px" ; 5
  paddingBottom?: string | number; // "lg" ; "4px 5px" ; 5
  paddingRight?: string | number; // "lg" ; "4px 5px" ; 5
  paddingLeft?: string | number; // "lg" ; "4px 5px" ; 5
  color?: string; // "red" ; #00000 ; "rgb(0,0,0)" "rgba(0,0,0,0)"
  backgroundColor?: string; // "red" ; #00000 ; "rgb(0,0,0)" "rgba(0,0,0,0)"
  size?: string | number; // 1 ; "1rem" ; "lg"
  width?: string | number;
  height?: string | number;
  fontSize?: string | number; // 1 ; "1rem" ; "lg"
  zIndex?: number;
  variant?: string;
};

// The following are the classnames that can be use in
// the whole front end from the file index.module.css
// this enum is used in the file utils/css.ts
export enum CSS_PUBLIC_CLASSNAME {
  bold = "bold",
  margin = "margin",
  marginTop = "marginTop",
  marginBottom = "marginBottom",
  marginRight = "marginRight",
  marginLeft = "marginLeft",
  padding = "padding",
  paddingTop = "paddingTop",
  paddingBottom = "paddingBottom",
  paddingRight = "paddingRight",
  paddingLeft = "paddingLeft",
  fontSize = "fontSize",
}

// Below are the classname that a component
// will only have access within it's on
// css module. e.g Button component private className
// can be found in button.module.css
// not all keys below are necessaraly present in the css module.
// e.g input component may not have a size classname.
export enum CSS_PRIVATE_CLASSNAME {
  size = "size",
  width = "width",
  height = "height",
  variant = "variant",
}
