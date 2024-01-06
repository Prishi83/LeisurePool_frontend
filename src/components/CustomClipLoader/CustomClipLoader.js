import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function CustomClipLoader(props) {
  const { loading } = props;

  return (
    <div className="h-96 flex items-center">
      <ClipLoader color="#FF5D73" loading={loading} css={override} size={65} />
    </div>
  );
}
