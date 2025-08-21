type CaseBy = {
  [key: string]: React.ReactNode;
};

interface SwitchCaseProps {
  value?: string;
  caseBy: CaseBy;
  defaultComponent?: React.ReactNode;
}

export default function SwitchCase({
  value,
  caseBy,
  defaultComponent,
}: SwitchCaseProps) {
  if (!value) {
    return defaultComponent ? <>{defaultComponent}</> : null;
  }
  if (caseBy[value]) {
    return <>{caseBy[value]}</>;
  }
  return defaultComponent ? <>{defaultComponent}</> : null;
}
