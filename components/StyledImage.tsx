import Image from 'next/image';
import styled from 'styled-components';

const StyledImage = styled(Image)`
  object-fit: contain;
  position: relative !important;
`;

export default StyledImage;
