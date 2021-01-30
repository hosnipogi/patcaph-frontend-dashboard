import React from 'react';
import SidebarContent from './SidebarContent';

const DesktopSidebar = () => {
  return (
    <aside
      className={`bg-white overflow-y-auto hidden lg:block lg:col-span-3 xl:col-span-2`}
    >
      <SidebarContent />
    </aside>
  );
};

export default DesktopSidebar;
