import { useParams } from "react-router-dom";
import { EnvironmentProvider } from "src/context/EnvironmentContext";

const EnvironmentWrapper: React.FC<EnvironmentWrapperProps> = ({
  children,
}) => {
  const { id } = useParams();
  if (!id) return <div>No ID provided</div>;

  return <EnvironmentProvider id={id}>{children}</EnvironmentProvider>;
};

export default EnvironmentWrapper;

interface EnvironmentWrapperProps {
  children: React.ReactNode;
}
