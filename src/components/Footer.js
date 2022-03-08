import React from 'react'
import {Container} from "react-bootstrap"
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
const styles = css`
 background: #198754;
 padding-top: 3rem;
 padding-bottom: 2rem;
 color: white;
`;

export default function Footer() {
  return (
    <div css={styles}>
        <Container>
            <p className="text-sm-center">
                &copy;{new Date().getFullYear()} WeatherDB  - All Rights Reserved
            </p>

        </Container>
    </div>
  )
}
