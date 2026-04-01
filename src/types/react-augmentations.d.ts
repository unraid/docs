import "react";

declare module "react" {
  interface IframeHTMLAttributes<T> {
    credentialless?: boolean;
  }
}
