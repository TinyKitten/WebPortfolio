import { useMemo } from 'react';
import styled from 'styled-components';
import { Resume } from '../models/Resume';

type Props = {
  resume: Resume;
};

const Container = styled.div`
  color: ${({ theme }) => theme.boxBg};
  margin-bottom: 32px;
  position: relative;
  margin-left: 32px;
  border-radius: 4px;
  border-top: ${({ theme }) => ` 4px solid ${theme.primary}`};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  padding: 24px;
  width: 480px;
  max-width: 60vw;
  &:before {
    content: '';
    background-color: ${({ theme }) => theme.primary};
    width: 32px;
    height: 4px;
    position: absolute;
    top: 16px;
    left: -32px;
  }
`;

const PeriodText = styled.time`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const CompanyNameText = styled.h3`
  font-weight: bold;
  margin-top: 16px;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.25;
`;

const DescriptionText = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.headingText};
  line-height: 1.5;
  white-space: pre-wrap;
`;

const ResumeItem: React.FC<Props> = ({ resume }: Props) => {
  const period = useMemo(() => {
    if (resume.startAtFullYear === resume.endAtFullYear) {
      return `${resume.startAtFullYear}`;
    }
    if (!resume.endAtFullYear) {
      return `${resume.startAtFullYear}-`;
    }

    return `${resume.startAtFullYear}-${resume.endAtFullYear}`;
  }, [resume.endAtFullYear, resume.startAtFullYear]);

  return (
    <Container>
      <PeriodText>{period}</PeriodText>
      <CompanyNameText>{resume.companyName}</CompanyNameText>
      <DescriptionText>{resume.description}</DescriptionText>
    </Container>
  );
};

export default ResumeItem;
