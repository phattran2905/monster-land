import { useState } from "react";
import { IconType } from "react-icons";

import TabContent from "./TabContent";
import TabHeader from "./TabHeader";

interface TabContainerProps {
  children?: React.ReactNode;
  data: {
    content?: any[];
    headers?: Array<{
      icon?: IconType;
      label?: string;
    }>;
  };
}
const TabContainer = ({ data }: TabContainerProps) => {
  const { content, headers } = data || {};
  const [activeTab, setActiveTab] = useState<string | undefined>(
    (headers && headers[0]?.label) ?? undefined,
  );

  const switchTab = (tab?: string) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="h-full flex flex-col shadow-xl rounded-sm items-center sm:items-start">
      {!!headers?.length && headers && (
        <TabHeader
          activeTab={activeTab}
          headers={headers}
          onClick={switchTab}
        />
      )}

      {content && <TabContent activeTab={activeTab} />}
    </div>
  );
};
export default TabContainer;
