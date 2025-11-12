/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"

// Fix for logo not loading on first visit
// Inject CSS to make eager-loaded images visible immediately
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <style
      key="eager-image-fix"
      dangerouslySetInnerHTML={{
        __html: `
        img[loading="eager"][data-main-image] {
          opacity: 1 !important;
        }
      `,
      }}
    />,
  ])
}
