import React from 'react';
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const AuthButton = ({ isLoading, buttonText }) => {
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
  color : white;
  `;

  return (
    <button className="authButton" type="submit">
      {isLoading ? 
        <HashLoader
          css={override}
          size={30}
          color={"#fff"}
          loading={isLoading}
        /> :
        <>
          <span>{buttonText}</span>
          <i class="fas fa-arrow-right"></i>
        </>
      }
    </button>
  );
}

export default AuthButton;
