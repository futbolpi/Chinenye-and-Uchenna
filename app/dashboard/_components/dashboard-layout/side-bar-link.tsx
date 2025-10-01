"use client";

import { usePathname } from "next/navigation";

import { SidebarMenuButton } from "@/components/ui/sidebar";

type SideBarLinkProps = { item: { url: string; title: string } };

const SideBarLink = ({ item: { title, url } }: SideBarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <a href={url}>{title}</a>
    </SidebarMenuButton>
  );
};

export default SideBarLink;
