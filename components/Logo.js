import React from 'react';
import styled from 'styled-components';

const DefaultStyles = `
  font-family: 'Quicksand';
`;

const LogoStyles = `
  font-weight: bold;
  font-size: 3rem;
  ${DefaultStyles}
`;

const Rapi = styled.span`
  color: bfafd9;
  ${LogoStyles}
`;

const Yapp = styled.span`
  color: #64DD17;
  ${LogoStyles}
`;

const Title = styled.div`
  margin-bottom: 1em;
`

function Logo(props) {
    return (
        <div>
            <Title>
                <Rapi>Rapi</Rapi>
                <Yapp>YApp</Yapp>
            </Title>
        </div>
    );
}

export default Logo;
