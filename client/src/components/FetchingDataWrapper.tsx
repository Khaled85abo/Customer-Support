import { ReactNode } from "react";
import ErrorDisplayData from "./ErrorDisplayData";
import Loading from "./Loading";
import NoData from "./NoData";

type FetchingDataWrapperProps = {
  loading: boolean;
  error: string | null;
  dataText: string;
  dataArr: any[];
  children: ReactNode;
};
const FetchingDataWrapper = ({
  loading,
  error,
  dataArr,
  dataText,
  children,
}: FetchingDataWrapperProps) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorDisplayData error={error} />;
  }

  if (dataArr.length == 0) {
    return <NoData text={dataText} />;
  }

  return <>{children}</>;
};

export default FetchingDataWrapper;
