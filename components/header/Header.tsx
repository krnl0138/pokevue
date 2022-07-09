import styles from "./Header.module.scss";

export const Header = ({ title }: { title: string }) => {
  return <h2 className={styles.header}>{title}</h2>;
};
