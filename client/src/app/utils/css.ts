import indexStyle from "../index.module.css";
import {
  CSS_SIZE,
  CSS_PROPS_NAMES,
  CSS_PUBLIC_CLASSNAME,
  CSS_PRIVATE_CLASSNAME,
} from "../types/css";

const publicClassNameKeys = Object.keys(CSS_PUBLIC_CLASSNAME);
const privateClassNameKeys = Object.keys(CSS_PRIVATE_CLASSNAME);
const cssKey = Object.keys(CSS_PROPS_NAMES);
const cssSize = Object.keys(CSS_SIZE);
const classNameKeys = [...publicClassNameKeys, ...privateClassNameKeys];

const helper = {
  isCss(key: string) {
    return cssKey.includes(key) ? true : false;
  },
  // true if key is a className (cf css type) and v is not a number and v does not match ("5px 12px" or ('2rem') etc)
  isClassName(key: string, v: string | number) {
    return classNameKeys.includes(key) &&
      typeof v !== "number" &&
      !v.toString().match(/(?:\d+(?:\.\d+)?)(px|rem|em|vh|vw|%|fr)/)
      ? true
      : false;
  },
  isPublicClassName(key: string) {
    return publicClassNameKeys.includes(key) ? true : false;
  },
  isCoumpound(v: string) {
    return cssSize.includes(v) ? true : false;
  },
  handleVariant(k: string, v: string, classes: any, styleModule: any) {
    const arr = v.split(" ");
    arr.forEach((e) => {
      classes.push(styleModule[e]);
    });
  },
  handleStyle(k: string, v: string, classes: any, styleModule: any) {
    if (k === "variant") this.handleVariant(k, v, classes, styleModule);
    else {
      classes.push(
        helper.isCoumpound(v)
          ? styleModule[`${k}-${v}`]
          : styleModule[k] || styleModule[v]
      );
    }
  },
};

export function cssClassAndStyleBuilder(props: any, styleModule?: any) {
  let classes: any = [];
  const styleObject: any = {};
  const propsArr: any = Object.entries(props);
  for (let [k, v] of propsArr) {
    if (!helper.isCss(k)) continue;

    if (helper.isClassName(k, v)) {
      if (helper.isPublicClassName(k)) {
        classes.push(
          helper.isCoumpound(v) ? indexStyle[`${k}-${v}`] : indexStyle[k]
        );
      } else {
        helper.handleStyle(k, v, classes, styleModule);
      }
    } else {
      styleObject[k] = v;
    }
  }

  if (props.style) {
    Object.assign(props.style, styleObject);
  } else {
    props.style = styleObject;
  }

  classes = classes.join(" ") || null;
  return [classes, styleObject];
}
