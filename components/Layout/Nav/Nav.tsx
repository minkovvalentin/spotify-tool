import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Icon from "../../Icon/Icon";
import styles from "./Nav.module.scss";

export enum Paths {
  Playlists = "/playlists",
  Home = "/",
}

const defaultNavItems: NavItem[] = [
  { path: Paths.Playlists, label: "Playlists" },
  {
    path: Paths.Home,
    label: <Icon prefix="fas" iconName="house" iconClass={styles.icon} />,
  },
];

interface NavItem {
  path: Paths;
  label: string | JSX.Element;
  current?: boolean;
}

const Nav = () => {
  const { pathname } = useRouter();
  const [navItemsObj, setNavItemsObj] = useState<NavItem[]>([]);

  useEffect(() => {
    setNavItemsObj(flagCurrentItemAndPlaceLastInNavItemArr(defaultNavItems));
  }, [pathname]);

  const flagCurrentItemAndPlaceLastInNavItemArr = (items: NavItem[]) => {
    let currentItem: NavItem | null = null;
    const orderedItems: NavItem[] = [];
    items.forEach((item) => {
      if (pathname === item.path) {
        // Assign and flag current item.
        currentItem = { ...item, current: true };
      } else {
        orderedItems.push(item);
      }
    });
    // and finally add to array
    if (currentItem) {
      orderedItems.push(currentItem);
    }
    return orderedItems;
  };

  const renderPath = (navItem: NavItem, key: string) => {
    const { path, label, current } = navItem;
    return (
      <Link href={path} key={key}>
        <span className={styles.navLink}>{label}</span>
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      {navItemsObj.map((navItem) => {
        return renderPath(navItem, navItem.path);
      })}
    </div>
  );
};

export default Nav;
